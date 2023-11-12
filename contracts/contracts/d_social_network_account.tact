import "@stdlib/deploy";
import "./lib/trait_nft_collection.tact";
import "./d_social_network_post.tact";

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

    override fun getNftItemInit(item_index: Int): StateInit {
        return initOf DSocialNetworkPost(myAddress(), item_index, self.owner_address, self.collection_content);
    }
}
