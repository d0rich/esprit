import "@stdlib/deploy";
import "@stdlib/ownable";
import "./lib/trait_accounting.tact";
import "./messages_d.tact";
import "./d_social_network_blog.tact";

contract DSocialNetworkMaster with Deployable, OwnableTransferable, Accounting  {
    version: String = "v0.0.1-beta";
    owner: Address;
    next_blog_index: Int as uint32 = 0;

    init() {
        let ctx: Context = context();
        self.owner = ctx.sender;
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
        require(self.next_blog_index >= 0, "non-sequential NFTs");
        let ctx: Context = context();
        let blog_init: StateInit = self.getBlogInit(self.next_blog_index);
        send(SendParameters{
                to: contractAddress(blog_init),
                value: self.calculateFullAmountForSending(),
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
    }

    fun getBlogInit(account_id: Int): StateInit {
        return initOf DSocialNetworkBlog(account_id, myAddress());
    }
}
