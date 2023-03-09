import * as lexer from './lexer'


export enum ASTType {
    File = "File",
    Fold = "Fold",
    FoldOpen = "FoldOpen",
    FoldClose = "FoldClose",
    Text = "Text",
    Textline = "TextLine",
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
    children: Array<ASTNode<ASTType.Fold>> = []


    constructor() { }
}

export class FoldAST implements ASTNode<ASTType.Fold>{

    type: ASTType.Fold = ASTType.Fold
    buf_position: [number, number, number] = [0, 0, 0]
    len: number = 0

    fold_open: FoldOpenAST | null = null
    fold_close: FoldCloseAST | null = null
    fold: FoldAST | null = null
    text: TextAST | null = null

    constructor() { }
}

export class FoldOpenAST implements ASTNode<ASTType.FoldOpen>{

    type: ASTType.FoldOpen = ASTType.FoldOpen
    buf_position: [number, number, number] = [0, 0, 0]
    len: number = 0

    text: TextAST | null = null

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


export class TextAST implements ASTNode<ASTType.Text>{

    type: ASTType.Text = ASTType.Text
    buf_position: [number, number, number] = [0, 0, 0]
    len: number = 0
    text_lines: Array<TextlineAST> = []

    constructor(){}
}

export class TextlineAST implements ASTNode<ASTType.Textline> {

    type: ASTType.Textline = ASTType.Textline
    buf_position: [number, number, number] = [0, 0, 0]
    len: number = 0

    value: string = ''
    has_newline: boolean = false

    constructor(){}
}
