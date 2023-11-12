import "@stdlib/deploy";
import "./nft_lib/trait_collection.tact";

const minTonsForStorage: Int = ton("0.03");
const gasConsumption: Int = ton("0.03");

contract DSocialNetworkAccount with NftCollection {
    next_item_index: Int as uint32 = 0;
    owner_address: Address;
    royalty_params: RoyaltyParams;
    collection_content: Cell;

    init(owner_address: Address, collection_content: Cell, royalty_params: RoyaltyParams){
        self.owner_address = owner_address;
        self.collection_content = collection_content;
        self.royalty_params = royalty_params;
    }
}
