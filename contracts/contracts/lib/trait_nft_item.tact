import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages_nft.tact";
import "./trait_accounting.tact";

trait NftItem with Deployable, Ownable, Accounting {
    collection_address: Address;
    item_index: Int;
    owner: Address;
    is_initialized: Bool;
    individual_content: NftMetadata;

    // ===== Customizable functions ===== //

    virtual fun serializeIndividualContent(): map<Int, Cell> {
        let dict: map<Int, Cell> = emptyMap();
        dict.set(sha256("name"), self.individual_content.name.asSlice().asCell());
        dict.set(sha256("description"), self.individual_content.description.asSlice().asCell());
        dict.set(sha256("image"), self.individual_content.image.asSlice().asCell());
        if (self.individual_content.content_url != null) {
            dict.set(sha256("content_url"), (self.individual_content.content_url!!).asSlice().asCell());
        }
        dict.set(
            sha256("antifraud_flag"),
            beginCell().storeBool(false).endCell()
        );
        return dict;
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
            individual_content: self.serializeIndividualContent()
        };
    }

    // ===== Recievers ===== //

    receive(msg: InitializeNft) {
        self.requireOwner();
        require(self.is_initialized == false, "NFT Item is already initialized");
        self.is_initialized = true;
        self.owner = msg.owner;
        self.individual_content = NftMetadata{
            name: msg.individual_content.name,
            description: msg.individual_content.description,
            image: msg.individual_content.image,
            content_url: msg.individual_content.content_url
        };
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
