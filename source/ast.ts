export enum ASTType {
    File = "File",
    Fold = "Fold",
    FoldOpen = "FoldOpen",
    FoldClose = "FoldClose",
    Text = "Text",
}

export interface ASTNode<T extends ASTType> {
    type: T,
    buf_position: [number, number, number]
    len: number

}

export class FileAST implements ASTNode<ASTType.File> {
    type: ASTType.File = ASTType.File
    buf_position: [number, number, number] = [0, 0, 0]
    len: number = 0
    children: Array<ASTNode<ASTType.Fold> | ASTNode<ASTType.File>> = []

    constructor() { }

};

export class FoldAST implements ASTNode<ASTType.Fold>{

    type: ASTType.Fold = ASTType.Fold
    buf_position: [number, number, number] = [0, 0, 0]
    len: number = 0

    fold_open: FoldOpenAST | null = null
    fold_close: FoldCloseAST | null = null
    children: Array<ASTNode<ASTType.Fold> | ASTNode<ASTType.Text>> = []

    constructor() { }
}

export class FoldOpenAST implements ASTNode<ASTType.FoldOpen>{

    type: ASTType.FoldOpen = ASTType.FoldOpen
    buf_position: [number, number, number] = [0, 0, 0]
    len: number = 0
    text: string = ""

    constructor(){
    }
}

export class FoldCloseAST implements ASTNode<ASTType.FoldClose>{

    type: ASTType.FoldClose = ASTType.FoldClose
    buf_position: [number, number, number] = [0, 0, 0]
    len: number = 0
    has_newline: boolean = false
    constructor(){}
}

/**
 * This represents a Text node in the AST and has the following
 * BNF Grammar:
 * ```
 * text ::= ID NEWLINE text
 * text ::= ID
 * text ::= EPS 
 * ```
 */
export class TextAST implements ASTNode<ASTType.Text>{

    type: ASTType.Text = ASTType.Text
    buf_position: [number, number, number] = [0, 0, 0]
    len: number = 0
    is_empty: boolean = false


    constructor(){}
}

