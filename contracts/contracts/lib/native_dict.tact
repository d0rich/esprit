struct DictGetReturn {
  value: Slice?;
  found: Bool;
}

// Whole dict operations

@name(new_dict)
native newDict(): Cell?;

@name(store_dict)
native storeDict(b: Builder, c: Cell?): Builder;

// Setters

@name(idict_set)
native idictSet(dict: Cell?, key_len: Int, index: Int, value: Slice): Cell;

@name(udict_set)
native udictSet(dict: Cell?, key_len: Int, index: Int, value: Slice): Cell;

@name(dict_set)
native dictSet(dict: Cell?, key_len: Int, index: Int, value: Slice): Cell;

@name(idict_set_ref)
native idictSetRef(dict: Cell?, key_len: Int, index: Int, value: Cell): Cell;

@name(udict_set_ref)
native udictSetRef(dict: Cell?, key_len: Int, index: Int, value: Cell): Cell;

// Getters

@name(idict_get)
native idictGet(dict: Cell?, key_len: Int, index: Int): DictGetReturn;

@name(udict_get)
native udictGet(dict: Cell?, key_len: Int, index: Int): DictGetReturn;
