import "@stdlib/deploy";
import "./messages_nft.tact";

trait NftCollectionRoyaltyExtention {
    royalty_params: RoyaltyParams;
    owner: Address;

    // ===== Customizable functions ===== //

    // ------------------ Get Function  ------------------ //


    // ------------------ NFT standard getters  ------------------ //
    // https://github.com/ton-blockchain/TEPs/blob/master/text/0066-nft-royalty-standard.md#get-methods

    get fun royalty_params(): RoyaltyParams {
        return self.royalty_params;
    }

    // ===== Recievers ===== //

    // ------------------ NFT standard recievers  ------------------ //
    // https://github.com/ton-blockchain/TEPs/blob/master/text/0066-nft-royalty-standard.md#internal-messages

    receive(msg: GetRoyaltyParams) {
        let ctx: Context = context(); // get sender Info
        send(SendParameters{
            to: ctx.sender,
            value: 0,
            mode: 64,
            bounce: false,
            body: ReportRoyaltyParams {
                query_id: msg.query_id,
                numerator:  self.royalty_params.numerator,
                denominator: self.royalty_params.denominator,
                destination: self.owner
            }.toCell()
        });
    }

    // ===== Private Methods ===== //
}
