import "@stdlib/deploy";
import "./lib/trait_nft_item.tact";
import "./lib/trait_nft_collection.tact";
import "./lib/trait_nft_collection_royalty_extention.tact";
import "./lib/trait_personal_fees.tact";
import "./lib/trait_storage_controller.tact";
import "./messages_d.tact";
import "./d_social_network_post.tact";

contract DSocialNetworkBlog with NftItem, NftCollection, NftCollectionRoyaltyExtention, PersonalFees, StorageController {
    personal_fees_destination: Address;

    // NftItem
    item_index: Int;
    collection_address: Address; // Master contract
    owner: Address;
    is_initialized: Bool = false;
    individual_content: NftMetadata;

    // NftCollection
    next_item_index: Int as uint32 = 0;
    collection_content: NftCollectionMetadata;
    royalty_params: RoyaltyParams;


    const CREATE_POST_FEE: Int = ton("0.1");

    init(item_index: Int, collection_address: Address, personal_fees_destination: Address){
        self.item_index = item_index;
        self.collection_address = collection_address;
        self.owner = collection_address;
        self.personal_fees_destination = personal_fees_destination;
        self.royalty_params = RoyaltyParams{
            numerator: 3,
            denominator: 100,
            destination: self.owner
        };
        self.collection_content = NftCollectionMetadata {
            image: "",
            name: "",
            description: ""
        };
        self.individual_content = NftMetadata {
            image: "",
            name: "",
            description: ""
        };
    }

    get fun get_blog_info(): BlogInfo {
        return BlogInfo{
            id: self.item_index,
            owner: self.owner,
            master_contract: self.collection_address,
            collection_content: self.collection_content,
            is_initialized: self.is_initialized
        };
    }

    get fun get_next_item_index(): Int {
        return self.next_item_index;
    }

    receive(msg: EditBlogMetadata) {
        require(self.is_initialized, "Blog is not initialized");
        self.requireOwner();
        self.collection_content = msg.new_metadata;
        self.sendExcessesTo(
            self.calculateSendAmountToHoldEnoughTonForStorage(),
            self.owner,
            msg.query_id
        );
    }

    // Initialize this contract as NFT item

    override fun onNftItemInitialized(msg: InitializeNft) {
        self.collection_content = NftCollectionMetadata{
            image: msg.individual_content.image,
            name: msg.individual_content.name,
            description: msg.individual_content.description
        };
    }

    // Transfer this contract as NFT item

    override fun calculateNftItemTransferValue(msg: Transfer): Int {
        return self.calculateSendAmountToHoldEnoughTonForStorage() - ton("0.03");
    }

    override fun onNftItemTransfer(msg: Transfer) {
        self.royalty_params.destination = msg.new_owner;
    }

    // Mint NFT items (posts)

    override fun getNftItemInit(item_index: Int): StateInit {
        return initOf DSocialNetworkPost(
            myAddress(),
            item_index,
            self.owner
        );
    }

    override fun onBeforeMintNft(msg: MintNft) {
        self.requireOwner();
        require(context().value + ton("0.05") >= self.CREATE_POST_FEE, "not enough funds to create a post");
    }

    override fun onAfterMintNft(msg: MintNft) {
        let sb: StringBuilder = beginString();
        sb.append("D Blog Post Created by ");
        sb.append(self.collection_content.name);
        self.sendPersonalFee(self.CREATE_POST_FEE, sb.toString());
    }

    override fun calculateNftItemInitialBalance(): Int {
        return self.calculateSendAmountToHoldFeeFromRecieved(self.CREATE_POST_FEE + ton("0.05"));
    }
}
