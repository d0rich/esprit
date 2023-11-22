import "./trait_accounting.tact";

trait PersonalFees with Accounting {
    personal_fees_destination: Address;

    fun sendPersonalFee(amount: Int, comment: String) {
        send(SendParameters{
            to: self.personal_fees_destination,
            value: amount,
            mode: SendIgnoreErrors,
            body: comment.asComment()
        });
    }

    fun sendRemainingValueAsPersonalFee(comment: String) {
        send(SendParameters{
            to: self.personal_fees_destination,
            value: 0,
            mode: SendIgnoreErrors + SendRemainingValue,
            body: comment.asComment()
        });
    }
}
