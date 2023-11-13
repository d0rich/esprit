import "@stdlib/deploy";
import "@stdlib/ownable";
import "./lib/trait_accounting.tact";
import "./messages_d.tact";
import "./d_social_network_account.tact";

contract DSocialNetworkMaster with Deployable, OwnableTransferable, Accounting  {
    version: String = "v0.0.1";
    owner: Address;
    next_account_index: Int as uint32 = 0;

    init() {
        let ctx: Context = context();
        self.owner = ctx.sender;
    }

    receive(msg: RegisterAccount) {
        require(self.next_account_index >= 0, "non-sequential NFTs");
        let ctx: Context = context();
        let account_init: StateInit = self.getAccountInit(self.next_account_index);
        send(SendParameters{
                to: contractAddress(account_init),
                value: self.calculateFullAmountForSending(),
                bounce: false,
                mode: SendIgnoreErrors,
                body: InitializeAccount {
                    query_id: 0,
                    owner: ctx.sender,
                    collection_content: self.generateAccountCollectionContent(ctx.sender),
                    royalty_params: self.generateAccountRoyaltyParams(ctx.sender)
                }.toCell(),
                code: account_init.code,
                data: account_init.data
            });
        self.next_account_index = self.next_account_index + 1;
    }

    fun getAccountInit(account_id: Int): StateInit {
        return initOf DSocialNetworkAccount(account_id, myAddress());
    }

    fun generateAccountCollectionContent(owner: Address): NftCollectionMetadataPlain {
        require(false, "not implemented");
        return NftCollectionMetadataPlain{
            image: "",
            name: "",
            description: ""
        };
    }

    fun generateAccountRoyaltyParams(owner: Address): RoyaltyParams {
        require(false, "not implemented");
        return RoyaltyParams{
            numerator: 0,
            denominator: 0,
            destination: myAddress()
        };
    }
}
