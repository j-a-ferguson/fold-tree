import { SourcePos } from "./utils"
import {Token, TokenType, OPEN_FOLD_MARKER} from "./lexer"

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

    setHeaderText(open_fold_token: Token) {

        if(open_fold_token.isOfType(TokenType.OpenBracket)) {
            
            let token_string = open_fold_token.src_pos.text()
            let idx = token_string.indexOf(OPEN_FOLD_MARKER)
            this.header_text = token_string.substring(idx + OPEN_FOLD_MARKER.length, token_string.length-1)
        }
        else {
            throw Error("Token is not OpenBracket")
        }
    }


}

export class TextAst extends BaseAst {

    readonly type: ASTType = ASTType.Text
    is_empty: boolean = false
}

export type AnyAst = FileAst | FoldAst | TextAst