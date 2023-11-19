@name(new_dict)
native newDict(): Cell?;

@name(idict_set_ref)
native idictSetRef(dict: Cell?, key_len: Int, index: Int, value: Cell): Cell;

@name(udict_set_ref)
native udictSetRef(dict: Cell?, key_len: Int, index: Int, value: Cell): Cell;

@name(store_dict)
native storeDict(b: Builder, c: Cell?): Builder;

fun beginTep64Dict(): Cell? {
  return newDict();
}

fun storeTep64SnakeString(tep64Dict: Cell?, key: String, value: String): Cell {
  return udictSetRef(
    tep64Dict,
    256, sha256(key),
    beginCell()
        .storeUint(0, 8)
        .storeSlice(value.asSlice())
        .endCell()
    );
}

fun buildTep64OnchainContent(tep64Dict: Cell): Cell {
    let b: Builder = beginCell().storeUint(0, 8);
    return storeDict(b, tep64Dict).endCell();
}
