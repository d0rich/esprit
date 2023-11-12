import "@stdlib/deploy";
import "@stdlib/ownable";
import "./nft_lib/trait_item.tact";

contract DSocialNetworkPost with NftItem {
    collection_address: Address;
    item_index: Int;
    owner: Address;
    individual_content: Cell;
    is_initialized: Bool;

    init(collection_address: Address, item_index: Int, owner: Address, individual_content: Cell){
        self.collection_address = collection_address;
        self.item_index = item_index;
        self.owner = collection_address;
        self.individual_content = individual_content;
        self.is_initialized = false;
    }


}
