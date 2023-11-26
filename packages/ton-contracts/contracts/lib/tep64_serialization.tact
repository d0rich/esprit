import "./native_dict.tact";

fun beginTep64Dict(): Cell? {
    return newDict();
}

fun storeTep64Cell(tep64Dict: Cell?, key: String, value: Cell): Cell {
    return udictSetRef(
        tep64Dict,
        256, sha256(key),
        beginCell()
            .storeUint(1, 8)
            .storeRef(value)
            .endCell()
    );
}

fun storeTep64SnakeString(tep64Dict: Cell?, key: String, value: String): Cell {
    let sb: StringBuilder = beginTailString();
    sb.append(value);
    return udictSetRef(
        tep64Dict,
        256, sha256(key),
        sb.toCell()
    );
}

fun buildTep64OnchainContent(tep64Dict: Cell): Cell {
    let b: Builder = beginCell().storeUint(0, 8);
    return storeDict(b, tep64Dict).endCell();
}
