import "@stdlib/deploy";
import "./messages_nft.tact";
import "./trait_accounting.tact";

trait NftCollection with Deployable, Accounting {
    next_item_index: Int;
    owner: Address;
    collection_content: Cell;

    // ===== Customizable functions ===== //

    virtual fun getNftCollectionContent(): Cell {
        let b: StringBuilder = beginString();
        let collectionDataString: String = self.collection_content.asSlice().asString();
        b.append(collectionDataString);
        b.append("meta.json");
        return b.toCell();
    }

    virtual fun getNftItemInit(item_index: Int): StateInit {
        require(false, "Not implemented");
    }

    virtual fun requireEnoughTonForMinting() {
    }

    virtual fun calculateNftItemInitalBalance(): Int {
        return self.calculateFullAmountForSending();
    }

    // ------------------ Get Function  ------------------ //


    // ------------------ NFT standard getters  ------------------ //
    // https://github.com/ton-blockchain/TEPs/blob/master/text/0062-nft-standard.md#get-methods-1

    get fun get_collection_data(): CollectionData {
        return CollectionData{
            next_item_index: self.next_item_index,
            collection_content: self.getNftCollectionContent(),
            owner_address: self.owner
        };
    }

    get fun get_nft_address_by_index(item_index: Int): Address?{
        let initCode: StateInit = self.getNftItemInit(item_index);
        return contractAddress(initCode);
    }

    get fun get_nft_content(index: Int, individual_content: Cell): Cell {
        let b: StringBuilder = beginString();
        let ic: String = individual_content.asSlice().asString();
        b.append(ic);
        return b.toCell();
    }

    // ===== Recievers ===== //

    receive("Mint"){
        require(self.next_item_index >= 0, "non-sequential NFTs");
        self.requireEnoughTonForMinting();
        let ctx: Context = context();
        let nft_init: StateInit = self.getNftItemInit(self.next_item_index);
        send(SendParameters{
                to: contractAddress(nft_init),
                value: self.calculateNftItemInitalBalance(),
                bounce: false,
                mode: SendIgnoreErrors,
                body: Transfer {
                    query_id: 0,
                    new_owner: ctx.sender,
                    response_destination: self.owner,
                    custom_payload: emptyCell(),
                    forward_amount: 0,
                    forward_payload: emptySlice()
                }.toCell(),
                code: nft_init.code,
                data: nft_init.data
            });
        self.next_item_index = self.next_item_index + 1;
    }

    // ===== Private Methods ===== //

}
