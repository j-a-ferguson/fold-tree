

type AST = FoldBracketAST | FoldBracketPairAST | ListAST | TextAST;

/**
 * 
 */
class FoldBracketAST {

    length: number = 0

    constructor(len: number) {
        this.length = len;
    }
}

/** Describes a matching bracket pair and the node in between, e.g. `{...}` */
class FoldBracketPairAST {

    length: number = 0;
    opening_bracket: FoldBracketAST | null = null;
    child: FoldBracketPairAST | ListAST | TextAST | null = null;
    closing_bracket: FoldBracketAST | null = null;

    constructor(opening_bracket: FoldBracketAST, 
                child: FoldBracketPairAST | ListAST | TextAST, 
                closing_bracket: FoldBracketAST)
    {

        this.length = opening_bracket.length + child.length + closing_bracket.length;
        this.opening_bracket = opening_bracket;
        this.child = child;
        this.closing_bracket = closing_bracket;
    }

    
}

/** Describes a list of bracket pairs or text nodes, e.g. `()...()` */
class ListAST {

    length: number;
    items: Array<FoldBracketPairAST | TextAST> | null = null;

    constructor( items: Array<FoldBracketPairAST | TextAST>)
    {
        this.items = items;
        this.length = this.items.sum(item => item.length);
    }

    
}

/** Describes text that has no brackets in it. */
class TextAST {
    constructor(public length: number) {}
}