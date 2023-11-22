import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages_nft.tact";
import "./trait_accounting.tact";
import "./tep64_serialization.tact";

trait NftCollection with Deployable, Ownable, Accounting {
    next_item_index: Int;
    owner: Address;
    collection_content: NftCollectionMetadata;

    // ===== Customizable functions ===== //

    virtual fun serializeNftCollectionContent(): Cell {
        let tep64Dict: Cell? = beginTep64Dict();
        tep64Dict = storeTep64SnakeString(tep64Dict, "name", self.collection_content.name);
        tep64Dict = storeTep64SnakeString(tep64Dict, "description", self.collection_content.description);
        tep64Dict = storeTep64SnakeString(tep64Dict, "image", self.collection_content.image);
        return buildTep64OnchainContent(tep64Dict!!);
    }

    virtual fun getNftItemInit(item_index: Int): StateInit {
        require(false, "Not implemented");
    }

    virtual fun serializeNftContent(index: Int, individual_content: Cell): Cell {
        require(index >= 0, "index must be positive");
        require(index < self.next_item_index, "index must be less than next_item_index");
        return individual_content;
    }

    virtual fun actionBeforeMinting() {
    }

    virtual fun actionAfterMinting() {
    }

    virtual fun calculateNftItemInitialBalance(): Int {
        return self.calculateSendAmountToHoldEnoughTonForStorage();
    }

    // ------------------ Get Function  ------------------ //


    // ------------------ NFT standard getters  ------------------ //
    // https://github.com/ton-blockchain/TEPs/blob/master/text/0062-nft-standard.md#get-methods-1

    get fun get_collection_data(): CollectionData {
        return CollectionData{
            next_item_index: self.next_item_index,
            collection_content: self.serializeNftCollectionContent(),
            owner_address: self.owner
        };
    }

    get fun get_nft_address_by_index(item_index: Int): Address?{
        let initCode: StateInit = self.getNftItemInit(item_index);
        return contractAddress(initCode);
    }

    get fun get_nft_content(index: Int, individual_content: Cell): Cell {
        return self.serializeNftContent(index, individual_content);
    }

    // ===== Recievers ===== //

    receive(msg: MintNft){
        require(self.next_item_index >= 0, "non-sequential NFTs");
        self.actionBeforeMinting();
        let ctx: Context = context();
        let nft_init: StateInit = self.getNftItemInit(self.next_item_index);
        send(SendParameters{
                to: contractAddress(nft_init),
                value: self.calculateNftItemInitialBalance(),
                bounce: false,
                mode: SendIgnoreErrors,
                body: InitializeNft {
                    query_id: 0,
                    owner: ctx.sender,
                    individual_content: msg.individual_content
                }.toCell(),
                code: nft_init.code,
                data: nft_init.data
            });
        self.next_item_index = self.next_item_index + 1;
        self.actionAfterMinting();
    }

    // ===== Private Methods ===== //

}
