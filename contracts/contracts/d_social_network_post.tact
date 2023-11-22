import "@stdlib/deploy";
import "@stdlib/ownable";
import "./lib/trait_nft_item.tact";
import "./lib/trait_storage_controller.tact";
import "./messages_d.tact";

contract DSocialNetworkPost with NftItem, StorageController {
    collection_address: Address;
    item_index: Int;
    owner: Address;
    is_initialized: Bool;
    individual_content: NftMetadata;

    init(collection_address: Address, item_index: Int, owner: Address){
        self.collection_address = collection_address;
        self.item_index = item_index;
        self.owner = collection_address;
        self.individual_content = NftMetadata {
            name: "",
            description: "",
            image: ""
        };
        self.is_initialized = false;
    }

    get fun get_post_info(): PostInfo {
        return PostInfo{
            blog: self.collection_address,
            id: self.item_index,
            owner: self.owner,
            nft_content: self.individual_content
        };
    }

    receive(msg: EditBlogPost) {
        require(self.is_initialized, "This post is not initialized yet");
        self.requireOwner();
        self.individual_content = msg.new_metadata;
        self.sendExcessesTo(
            self.calculateSendAmountToHoldEnoughTonForStorage(),
            self.owner,
            msg.query_id
        );
    }
}
