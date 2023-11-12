import "@stdlib/deploy";
import "@stdlib/ownable";
import "./lib/trait_accounting.tact";
import "./messages/d.tact";
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
                body: Transfer {
                    query_id: 0,
                    new_owner: ctx.sender,
                    response_destination: self.owner,
                    custom_payload: emptyCell(),
                    forward_amount: 0,
                    forward_payload: emptySlice()
                }.toCell(),
                code: account_init.code,
                data: account_init.data
            });
        self.next_account_index = self.next_account_index + 1;
    }

    fun getAccountInit(account_id: Int): StateInit {
        return initOf DSocialNetworkAccount(
            account_id,
            myAddress(),
            self.generateAccountCollectionContent(),
            self.generateAccountRoyaltyParams()
        );
    }

    fun generateAccountCollectionContent(): Cell {
        require(false, "not implemented");
        return emptyCell();
    }

    fun generateAccountRoyaltyParams(): RoyaltyParams {
        require(false, "not implemented");
        return RoyaltyParams{
            numerator: 0,
            denominator: 0,
            destination: myAddress()
        };
    }
}
