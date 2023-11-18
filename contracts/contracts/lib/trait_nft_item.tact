import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages_nft.tact";
import "./trait_accounting.tact";
import "./native_dict_functions.tact";

fun serialize_short(s: String): Cell {
    return beginCell()
        .storeUint(0, 8)
        .storeSlice(s.asSlice())
        .endCell();
}

trait NftItem with Deployable, Ownable, Accounting {
    collection_address: Address;
    item_index: Int;
    owner: Address;
    is_initialized: Bool;
    individual_content: NftMetadata;

    // ===== Customizable functions ===== //

    virtual fun serializeMetadata(): Cell {
        // let d: map<Int, Cell> = emptyMap();
        // d.set(sha256("name"), self.individual_content.name.asSlice().asCell());
        // d.set(sha256("description"), self.individual_content.description.asSlice().asCell());
        // d.set(sha256("image"), self.individual_content.image.asSlice().asCell());
        // if (self.individual_content.content_url != null) {
        //     d.set(sha256("content_url"), (self.individual_content.content_url!!).asSlice().asCell());
        // }
        // return beginCell().storeUint(0, 8).storeRef((d.asCell()!!)).endCell();
        let d: Cell? = newDict();
        d = udictSetRef(d, 256, sha256("name"), serialize_short(self.individual_content.name));
        d = udictSetRef(d, 256, sha256("description"), serialize_short(self.individual_content.description));
        d = udictSetRef(d, 256, sha256("image"), serialize_short(self.individual_content.image));
        if (self.individual_content.content_url != null) {
            d = udictSetRef(d, 256, sha256("content_url"), serialize_short(self.individual_content.content_url!!));
        }
        let b: Builder = beginCell().storeUint(0, 8);
        return storeDict(b, d).endCell();
        // return beginCell().storeUint(0, 8).storeRef(self.individual_content.toCell()).endCell();
    }

    // --------- Get Function  --------- //


    // ------------------ NFT standard getters  ------------------ //
    // https://github.com/ton-blockchain/TEPs/blob/master/text/0062-nft-standard.md#get-methods
    get fun get_nft_data(): GetNftData {
         return GetNftData {
            is_initialized: self.is_initialized,
            index: self.item_index,
            collection_address: self.collection_address,
            owner_address: self.owner,
            individual_content: self.serializeMetadata()
        };
    }

    // ===== Recievers ===== //

    receive(msg: InitializeNft) {
        self.requireOwner();
        require(self.is_initialized == false, "NFT Item is already initialized");
        self.is_initialized = true;
        self.owner = msg.owner;
        self.individual_content = msg.individual_content;
        send(SendParameters{
            to: msg.response_destination,
            value: self.calculateFullAmountForSending(),
            mode:  SendIgnoreErrors,
            body: Excesses { query_id: msg.query_id }.toCell()
        });
    }

    receive(msg: Transfer){
        self.requireOwner();
        require(self.is_initialized == true, "NFT Item is not initialized");
        let msgValue: Int = self.calculateFullAmountForSending();
        let ctx: Context = context();
        self.owner = msg.new_owner;  // change current owner to the new_owner
        if (msg.forward_amount > 0) {
            send(SendParameters{
                to: msg.new_owner,
                value: msg.forward_amount,
                mode: SendIgnoreErrors,
                bounce: false,
                body: OwnershipAssigned{
                    query_id: msg.query_id,
                    prev_owner: ctx.sender,
                    forward_payload: msg.forward_payload
                }.toCell()
            });
        }

        msgValue = msgValue - ctx.readForwardFee();
        if (msg.response_destination != null) {
            send(SendParameters{
                to: msg.response_destination,
                value: msgValue - msg.forward_amount,
                mode: SendPayGasSeparately,
                body: Excesses { query_id: msg.query_id }.toCell()
            });
        }
    }

    receive(msg: GetStaticData){
        let ctx: Context = context();
        send(SendParameters {
            to: ctx.sender,
            value: 0,
            mode: 64,  // (return msg amount except gas fees)
            bounce: true,
            body: ReportStaticData{
                query_id: msg.query_id,
                index_id: self.item_index,
                collection: self.collection_address
            }.toCell()
        });
    }

    // ===== Private Methods ===== //
}
