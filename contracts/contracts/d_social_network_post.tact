import "@stdlib/deploy";
import "@stdlib/ownable";
import "./lib/trait_nft_item.tact";

contract DSocialNetworkPost with NftItem {
    collection_address: Address;
    item_index: Int;
    owner: Address;
    is_initialized: Bool;
    individual_content: NftMetadataPlain;
    attributes: map<Int, NftMetadataAttribute>;

    init(collection_address: Address, item_index: Int, owner: Address){
        self.collection_address = collection_address;
        self.item_index = item_index;
        self.owner = collection_address;
        // TODO: set individual_content
        self.individual_content = NftMetadataPlain{
            image: "",
            name: "",
            description: "",
            content_url: ""
        };
        self.is_initialized = false;
    }


}
