
import * as def from './def'
export type AST = OpenBracketAST | FoldBracketPairAST | ListAST | TextAST;

/** 
 *  Represents a single instance of "$comment{{{" or "$comment}}}" where $comment represents 
 *  a single-line comment token for a given language.
 */
export class OpenBracketAST {

    length: number = 0

    constructor(language: string) {
        this.length = def.comments[language].length + 3
    }
}

export class CloseBracketAST {

    length: number = 0

    constructor(language: string) {
        this.length = def.comments[language].length + 3
    }    
}

/**
 * Represents a pair of open/close fold markers: "$comment{{{ ... $comment}}}"
 * 
 */
export class FoldBracketPairAST {

    length: number = 0;
    opening_bracket: OpenBracketAST | null = null;
    child: FoldBracketPairAST | ListAST | TextAST | null = null;
    closing_bracket: CloseBracketAST | null = null;

    constructor(opening_bracket: OpenBracketAST, 
                child: FoldBracketPairAST | ListAST | TextAST, 
                closing_bracket: CloseBracketAST)
    {

        this.length = opening_bracket.length + child.length + closing_bracket.length;
        this.opening_bracket = opening_bracket;
        this.child = child;
        this.closing_bracket = closing_bracket;
    }

    
}

/** 
 * Describes a list of open/close fold marker pairs and text
*/
export class ListAST {

    length: number;
    items: Array<FoldBracketPairAST | TextAST> | null = null;

    constructor( items: Array<FoldBracketPairAST | TextAST>)
    {
        this.items = items;
        this.length = 0
        this.items.forEach((elem, i) => {
            this.length += elem.length
        })        
    }
}

/** Describes text that has no brackets in it. */
export class TextAST {

    length: number = 0;

    constructor(length: number) 
    {
        this.length = length;
    }
}







