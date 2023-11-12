import "@stdlib/deploy";
import "./lib/trait_nft_collection.tact";
import "./lib/trait_nft_collection_royalty_extention.tact";
import "./d_social_network_post.tact";

contract DSocialNetworkAccount with NftCollection, NftCollectionRoyaltyExtention {
    account_id: Int;
    next_item_index: Int as uint32 = 0;
    owner: Address;
    royalty_params: RoyaltyParams;
    collection_content: Cell;

    init(account_id: Int, owner: Address, collection_content: Cell, royalty_params: RoyaltyParams){
        self.account_id = account_id;
        self.owner = owner;
        self.collection_content = collection_content;
        self.royalty_params = royalty_params;
    }

    override fun getNftItemInit(item_index: Int): StateInit {
        return initOf DSocialNetworkPost(
            myAddress(),
            item_index,
            self.owner,
            self.collection_content
        );
    }
}
