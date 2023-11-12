trait Accounting {
    virtual const MIN_TON_FOR_STORAGE: Int = ton("0.03");

    virtual fun getGasConsumption(): Int {
        return ton("0.03");
    }

    fun getTonRecieved(): Int {
        let ctx: Context = context();
        return ctx.value;
    }

    fun getMinOperationFee(): Int {
        let tonBalanceBeforeMsg: Int = myBalance() - self.getTonRecieved();
        // calculate TON to keep in contract, handle case when balance is less than MIN_TON_FOR_STORAGE
        let storageFee: Int = self.MIN_TON_FOR_STORAGE - min(tonBalanceBeforeMsg, self.MIN_TON_FOR_STORAGE);
        return storageFee + self.getGasConsumption();
    }

    fun getFullAmountForSending(): Int {
        return self.getTonRecieved() - self.getMinOperationFee();
    }

    fun getFullAmountForSendingWithPersonalFee(personalFee: Int): Int {
        return self.getFullAmountForSending() - personalFee;
    }
}
