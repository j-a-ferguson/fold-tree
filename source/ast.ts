import { SourcePos } from "./utils"
import {Token} from "./lexer"

export enum  ASTType {
    Base = "Base", 
    File = "File", 
    Fold = "Fold", 
    Text = "Text"
}

export class BaseAst {
    readonly type: ASTType = ASTType.Base
    src_pos: SourcePos = new SourcePos("", 0, 0, 0, 0)


}

export class FileAst extends BaseAst {
    readonly type: ASTType = ASTType.File
    children: Array<FoldAst | TextAst> = []
} 

export class FoldAst extends BaseAst {

    readonly type: ASTType = ASTType.Fold
    header_text: string = ""
    indent: number = 0
    children: Array<FoldAst | TextAst> = []
}

export class TextAst extends BaseAst {

    readonly type: ASTType = ASTType.Text
    is_empty: boolean = false
}

export type AnyAst = FileAst | FoldAst | TextAst