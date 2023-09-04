import { SourcePos } from "./utils"
import { Token, TokenType, OPEN_FOLD_MARKER } from "./lexer"

export enum ASTType {
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

    /**
     * Traverses the AST to find the node which contains a given 
     * line.
     * 
     * @param line Line number for which we want the AST node
     * @returns The AST node which contains the givin line
     */
    nodeAtLine(line: number): AnyAst | undefined {
        let out: AnyAst | undefined = undefined
        if (line >= 0) {
            // we are going to perform a standard BFS on the tree
            let ast_stack: Array<AnyAst> = []
            ast_stack.push(...this.children)
            while (ast_stack.length != 0) {
                let cur = ast_stack.pop()
                if (cur) {
                    if (line >= cur.src_pos.line) {
                        out = cur
                        break
                    }

                    if (cur instanceof FileAst) {
                        ast_stack.push(...cur.children)
                    }
                }

            }
        }

        return out
    }

    insertFold(line: number, text: string): void {
        
        let ast_node = this.nodeAtLine(line)
        if (ast_node) {

            let new_fold_ast = new FoldAst
            new_fold_ast.children.push(new TextAst)
            if( ast_node instanceof FoldAst) {

            }   
            else if ( ast_node instanceof TextAst) {

            } 
        }
    }
}

export class FoldAst extends BaseAst {

    readonly type: ASTType = ASTType.Fold
    header_text: string = ""

    indent: number = 0
    children: Array<FoldAst | TextAst> = []

    setHeaderText(open_fold_token: Token) {

        if (open_fold_token.isOfType(TokenType.OpenBracket)) {

            let token_string = open_fold_token.src_pos.text()
            let idx = token_string.indexOf(OPEN_FOLD_MARKER)
            this.header_text = token_string.substring(idx + OPEN_FOLD_MARKER.length, token_string.length - 1)
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

export type AnyAst = FoldAst | TextAst