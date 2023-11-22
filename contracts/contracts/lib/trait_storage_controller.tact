import "@stdlib/ownable";
import "./trait_accounting";

message Withdraw {
    query_id: Int as uint64;
    amount: Int;
}

message WithdrawAll {
    query_id: Int as uint64;
    destroy: Bool?;
}

message TopUp {
    query_id: Int as uint64;
}

trait StorageController with Ownable, Accounting {
    owner: Address;

    receive(msg: TopUp) {}

    receive(msg: Withdraw) {
        self.requireOwner();
        send(SendParameters{
            to: self.owner,
            value: min(msg.amount, self.calculateSendAmountToHoldEnoughTonForStorage()),
            mode: SendIgnoreErrors,
            body: "Withdraw".asComment()
        });
    }

    receive(msg: WithdrawAll) {
        self.requireOwner();
        let additionalMode: Int = 0;
        if (msg.destroy == true) {
            additionalMode = additionalMode + SendDestroyIfZero;
        }
        send(SendParameters{
            to: self.owner,
            value: 0,
            mode: SendRemainingBalance + SendIgnoreErrors + additionalMode,
            body: "Withdraw all".asComment()
        });
    }
}
