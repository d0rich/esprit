import "@stdlib/deploy";
import "@stdlib/ownable";
import "./lib/trait_nft_item.tact";
import "./messages_d.tact";

contract DSocialNetworkPost with NftItem {
    collection_address: Address;
    item_index: Int;
    owner: Address;
    is_initialized: Bool;
    individual_content: NftMetadata;

    init(collection_address: Address, item_index: Int, owner: Address){
        self.collection_address = collection_address;
        self.item_index = item_index;
        self.owner = collection_address;
        // TODO: set individual_content
        self.individual_content = NftMetadata{
            image: "",
            name: "",
            description: "",
            content_url: "",
            attributes: emptyMap()
        };
        self.is_initialized = false;
    }

    get fun get_post_info(): PostInfo {
        return PostInfo{
            account: self.collection_address,
            id: self.item_index,
            owner: self.owner,
            nft_content: self.individual_content
        };
    }


}
