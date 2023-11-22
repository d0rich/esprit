import "@stdlib/deploy";
import "@stdlib/ownable";
import "./lib/trait_accounting.tact";
import "./lib/trait_personal_fees.tact";
import "./lib/trait_storage_controller.tact";
import "./messages_d.tact";
import "./d_social_network_blog.tact";

contract DSocialNetworkMaster with Deployable, OwnableTransferable, Accounting, PersonalFees, StorageController  {
    version: String = "v1";
    owner: Address;
    personal_fees_destination: Address;
    next_blog_index: Int as uint32 = 0;

    const CREATE_POST_FEE: Int = ton("0.5");

    init() {
        let ctx: Context = context();
        self.owner = ctx.sender;
        self.personal_fees_destination = ctx.sender;
    }

     get fun get_version(): String {
        return self.version;
    }

   get fun get_blogs_count(): Int {
        return self.next_blog_index;
    }

    get fun get_blog_address_by_index(item_index: Int): Address?{
        let initCode: StateInit = self.getBlogInit(item_index);
        return contractAddress(initCode);
    }

    receive(msg: CreateBlog) {
        require(self.next_blog_index >= 0, "non-sequential blog id");
        let ctx: Context = context();
        require(ctx.value + ton("0.05") >= self.CREATE_POST_FEE, "not enough funds to create a blog");
        let blog_init: StateInit = self.getBlogInit(self.next_blog_index);
        send(SendParameters{
                to: contractAddress(blog_init),
                value: self.calculateSendAmountToHoldFeeFromRecieved(self.CREATE_POST_FEE),
                bounce: false,
                mode: SendIgnoreErrors,
                body: InitializeBlog {
                    query_id: 0,
                    owner: ctx.sender,
                    collection_content: msg.blog_metadata
                }.toCell(),
                code: blog_init.code,
                data: blog_init.data
            });
        self.next_blog_index = self.next_blog_index + 1;

        let sb: StringBuilder = beginString();
        sb.append("D Blog Created: ");
        sb.append(msg.blog_metadata.name);
        self.sendRemainingValueAsPersonalFee(sb.toString());
    }

    fun getBlogInit(account_id: Int): StateInit {
        return initOf DSocialNetworkBlog(account_id, myAddress(), self.personal_fees_destination);
    }
}
