import { SourcePos } from "./utils"
import { Token, TokenType, OPEN_FOLD_MARKER } from "./lexer"


/**
 * The common base class for all AST nodes in the language. This 
 * only contains one thing: the position of the node in source, which 
 * is a common attribute for all AST nodes.
 */
export class BaseAst {

    /**
     * Position of the AST node in the file.
     */
    src_pos: SourcePos = new SourcePos([], 0 , 0)
}

/**
 * This is AST node representing an entire file. It is always the 
 * root node and any AST may only have one of these. It cannot be a 
 * leaf node, therefore it must have at least one child.
 */
export class FileAst extends BaseAst {

    /**
     * Children of the AST node. These must be stored in the same 
     * order in which they appear in the file. In other words nodes 
     * must be in ascending order w.r.t ``src_pos.line``
     */
    children: Array<FoldAst | TextAst> = []
    /**
     * Type of node, purely for debugging and testing purposes
     */
    type: string = "FILE"

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
            // we are going to perform a standard DFS on the tree
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

/**
 * This node represents a fold in the file. It may be a leaf node 
 * and may have 0 or more children.
 */
export class FoldAst extends BaseAst {

    /**
     * This is the text which appears just after the OPEN_BRACKET token.
     * For example the fold:
     * ``` c
     * //{{{ this is some text
     * //}}}
     * ```
     * will have the header text `` this is some text``
     */
    header_text: string = ""
    /**
     * Indent of the fold
     */
    indent: number = 0
    /**
     * Children of fold
     */
    children: Array<FoldAst | TextAst> = []
    /**
     * Type of node, purely for debugging and testing purposes
     */
    type: string = "FOLD"

    setHeaderText(open_fold_token: Token) {

        if (open_fold_token.isOfType(TokenType.OpenBracket)) {

            let token_string = open_fold_token.src_pos.text
            let idx = token_string.indexOf(OPEN_FOLD_MARKER)
            this.header_text = token_string.substring(idx + OPEN_FOLD_MARKER.length, token_string.length - 1)
        }
        else {
            throw Error("Token is not OpenBracket")
        }
    }


}

export class TextAst extends BaseAst {

    is_empty: boolean = false
    /**
     * Type of node, purely for debugging and testing purposes
     */
    type: string = "TEXT"
}

export type AnyAst = FoldAst | TextAst