import "@stdlib/deploy";
import "@stdlib/ownable";
import "./lib/trait_accounting.tact";
import "./messages_d.tact";
import "./d_social_network_account.tact";

contract DSocialNetworkMaster with Deployable, OwnableTransferable, Accounting  {
    version: String = "v0.0.1-metadata-arrays-as-empty-cells";
    owner: Address;
    next_account_index: Int as uint32 = 0;

    init() {
        let ctx: Context = context();
        self.owner = ctx.sender;
    }

    get fun get_version(): String {
        return self.version;
    }

    get fun get_accounts_count(): Int {
        return self.next_account_index;
    }

    get fun get_account_address_by_index(item_index: Int): Address?{
        let initCode: StateInit = self.getAccountInit(item_index);
        return contractAddress(initCode);
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
                    collection_content: self.generateAccountCollectionContent(msg)
                }.toCell(),
                code: account_init.code,
                data: account_init.data
            });
        self.next_account_index = self.next_account_index + 1;
    }

    fun getAccountInit(account_id: Int): StateInit {
        return initOf DSocialNetworkAccount(account_id, myAddress());
    }

    fun generateAccountCollectionContent(msg: RegisterAccount): NftCollectionMetadata {
        // TODO: add image link
        return NftCollectionMetadata{
            image: "some-image-link",
            name: msg.account_name,
            description: msg.account_description,
            social_links: emptyCell()
        };
    }
}
