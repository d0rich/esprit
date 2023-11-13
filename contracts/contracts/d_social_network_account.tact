import "@stdlib/deploy";
import "./lib/trait_nft_collection.tact";
import "./lib/trait_nft_collection_royalty_extention.tact";
import "./messages_d.tact";
import "./d_social_network_post.tact";

contract DSocialNetworkAccount with NftCollection, NftCollectionRoyaltyExtention {
    account_id: Int;
    next_item_index: Int as uint32 = 0;
    owner: Address;
    master_contract: Address;
    royalty_params: RoyaltyParams;
    is_initialized: Bool = false;
    collection_content: NftCollectionMetadata;

    init(account_id: Int, master_contract: Address){
        self.account_id = account_id;
        self.master_contract = master_contract;
        self.owner = master_contract;
        self.royalty_params = RoyaltyParams{
            numerator: 0,
            denominator: 0,
            destination: master_contract
        };
        // TODO: set real metadata
        self.collection_content = NftCollectionMetadata{
            image: "",
            name: "",
            description: "",
            social_links: emptyMap()
        };
    }

    receive(msg: InitializeAccount) {
        require(!self.is_initialized, "Account is already initialized");
        self.requireOwner();
        self.owner = msg.owner;
        self.collection_content = msg.collection_content;
        self.royalty_params = msg.royalty_params;
        self.is_initialized = true;
    }

    fun requireInitialization() {
        require(self.is_initialized, "Account is not initialized");
    }

    override fun getNftItemInit(item_index: Int): StateInit {
        return initOf DSocialNetworkPost(
            myAddress(),
            item_index,
            self.owner
        );
    }
}
