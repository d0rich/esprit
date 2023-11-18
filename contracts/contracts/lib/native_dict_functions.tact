

@name(new_dict)
native newDict(): Cell?;

@name(idict_set_ref)
native idictSetRef(dict: Cell?, key_len: Int, index: Int, value: Cell): Cell;

@name(udict_set_ref)
native udictSetRef(dict: Cell?, key_len: Int, index: Int, value: Cell): Cell;

@name(store_dict)
native storeDict(b: Builder, c: Cell?): Builder;
