import "@stdlib/deploy";
import "@stdlib/ownable";
import "./d_social_network_account.tact";

contract DSocialNetworkMaster with Deployable, OwnableTransferable  {
    version: String = "v0.0.1";
    owner: Address;
    next_account_index: Int as uint32 = 0;

    init() {
        let ctx: Context = context();
        self.owner = ctx.sender;
    }

    receive(msg: RegisterAccount) {
        require(self.next_account_index >= 0, "non-sequential NFTs");
        self.requireEnoughTonForMinting();
        let ctx: Context = context();
        let account_init: StateInit = self.getAccountInit(self.next_account_index);
        send(SendParameters{
                to: contractAddress(account_init),
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
                code: account_init.code,
                data: account_init.data
            });
        self.next_account_index = self.next_account_index + 1;
    }

    fun getAccountInit(account_id: Int): StateInit {
        return initOf DSocialNetworkAccount(
            account_id,
            sender,
            self.generateAccountCollectionContent(sender),
            self.generateAccountRoyaltyParams(sender)
        );
    }

    fun generateAccountCollectionContent(sender: Address): Cell {
        require(false, "not implemented")
    }

    fun generateAccountRoyaltyParams(sender: Address): RoyaltyParams {
        require(false, "not implemented")
    }
}
