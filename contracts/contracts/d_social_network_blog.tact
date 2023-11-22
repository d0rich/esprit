import "@stdlib/deploy";
import "./lib/trait_nft_collection.tact";
import "./lib/trait_nft_collection_royalty_extention.tact";
import "./lib/trait_personal_fees.tact";
import "./lib/trait_storage_controller.tact";
import "./messages_d.tact";
import "./d_social_network_post.tact";

contract DSocialNetworkBlog with NftCollection, NftCollectionRoyaltyExtention, PersonalFees, StorageController {
    blog_id: Int;
    next_item_index: Int as uint32 = 0;
    owner: Address;
    personal_fees_destination: Address;
    master_contract: Address;
    royalty_params: RoyaltyParams;
    is_initialized: Bool = false;
    collection_content: NftCollectionMetadata;

    const CREATE_POST_FEE: Int = ton("0.1");

    init(blog_id: Int, master_contract: Address, personal_fees_destination: Address){
        self.blog_id = blog_id;
        self.master_contract = master_contract;
        self.owner = master_contract;
        self.personal_fees_destination = personal_fees_destination;
        self.royalty_params = RoyaltyParams{
            numerator: 13,
            denominator: 100,
            destination: master_contract
        };
        self.collection_content = NftCollectionMetadata {
            image: "",
            name: "",
            description: ""
        };
    }

    get fun get_blog_info(): BlogInfo {
        return BlogInfo{
            id: self.blog_id,
            owner: self.owner,
            master_contract: self.master_contract,
            collection_content: self.collection_content,
            is_initialized: self.is_initialized
        };
    }

    get fun get_next_item_index(): Int {
        return self.next_item_index;
    }

    receive(msg: InitializeBlog) {
        require(!self.is_initialized, "Blog is already initialized");
        self.requireOwner();
        self.owner = msg.owner;
        self.collection_content = msg.collection_content;
        self.is_initialized = true;
        self.sendExcessesTo(
            self.calculateSendAmountToHoldEnoughTonForStorage(),
            self.owner,
            msg.query_id
        );
    }

    receive(msg: EditBlogMetadata) {
        self.requireInitialization();
        self.requireOwner();
        self.collection_content = msg.new_metadata;
        self.sendExcessesTo(
            self.calculateSendAmountToHoldEnoughTonForStorage(),
            self.owner,
            msg.query_id
        );
    }

    fun requireInitialization() {
        require(self.is_initialized, "Blog is not initialized");
    }

    override fun getNftItemInit(item_index: Int): StateInit {
        return initOf DSocialNetworkPost(
            myAddress(),
            item_index,
            self.owner
        );
    }

    override fun actionBeforeMinting() {
        require(context().value + ton("0.05") >= self.CREATE_POST_FEE, "not enough funds to create a post");
    }

    override fun actionAfterMinting() {
        let sb: StringBuilder = beginString();
        sb.append("D Blog Post Created by ");
        sb.append(self.collection_content.name);
        self.sendRemainingValueAsPersonalFee(sb.toString());
    }

    override fun calculateNftItemInitialBalance(): Int {
        return self.calculateSendAmountToHoldFeeFromRecieved(self.CREATE_POST_FEE);
    }
}
