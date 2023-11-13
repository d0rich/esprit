import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages_nft.tact";
import "./trait_accounting.tact";

trait NftCollection with Deployable, Ownable, Accounting {
    next_item_index: Int;
    owner: Address;
    collection_content: NftCollectionMetadataPlain;
    social_links: map<Int, Cell>;

    // ===== Customizable functions ===== //

    virtual fun getNftCollectionContent(): Cell {
        // let b: StringBuilder = beginString();
        // let collectionDataString: String = self.collection_content.asSlice().asString();
        // b.append(collectionDataString);
        // b.append("meta.json");
        // return b.toCell();
        // TODO: if following works, remove the above
        let fullContent: NftCollectionMetadata = NftCollectionMetadata{
            image: self.collection_content.image,
            name: self.collection_content.name,
            description: self.collection_content.description,
            social_links: self.social_links
        };
        return fullContent.toCell();
    }

    virtual fun getNftItemInit(item_index: Int): StateInit {
        require(false, "Not implemented");
    }

    virtual fun getNftItemIndividualContent(index: Int, individual_content: Cell): Cell {
        // let b: StringBuilder = beginString();
        // let ic: String = individual_content.asSlice().asString();
        // b.append(ic);
        // return b.toCell();
        // TODO: if following works, remove the above
        return individual_content;
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
        return self.getNftItemIndividualContent(index, individual_content);
    }

    // ===== Recievers ===== //

    receive(msg: MintNft){
        require(self.next_item_index >= 0, "non-sequential NFTs");
        self.requireEnoughTonForMinting();
        let ctx: Context = context();
        let nft_init: StateInit = self.getNftItemInit(self.next_item_index);
        send(SendParameters{
                to: contractAddress(nft_init),
                value: self.calculateNftItemInitalBalance(),
                bounce: false,
                mode: SendIgnoreErrors,
                body: InitializeNft {
                    query_id: 0,
                    owner: ctx.sender,
                    response_destination: self.owner,
                    individual_content: msg.individual_content
                }.toCell(),
                code: nft_init.code,
                data: nft_init.data
            });
        self.next_item_index = self.next_item_index + 1;
    }

    // ===== Private Methods ===== //

}
