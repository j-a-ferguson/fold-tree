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


    toJSON(): object {
        return {
            src_pos: this.src_pos, 
            children: this.children,
            type: "FILE"
        }
    }

    static fromJSON(json: string | object): FileAst {
        let obj = typeof json == 'string' ? JSON.parse(json) : json
        let file_ast = new FileAst()
        file_ast.src_pos =  obj.src_pos
        
        for(let child in obj.children) {
            switch (child.type)
            {
                case
            }
            file_ast.children.push()
        }
        return Object.assign(new FileAst(), {
            src_pos: obj.src_pos, 
            children: obj.children, 

        }) 
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
    indent: number = 0
    children: Array<FoldAst | TextAst> = []

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


    toJSON(): object {
        return {
            src_pos: this.src_pos, 
            header_text: this.header_text,
            indent: this.indent, 
            children: this.children,
            type: "FOLD"
        }
    }


    static fromJSON(json: string | object): FileAst
    {
        return new FileAst();
    }
}

export class TextAst extends BaseAst {

    is_empty: boolean = false

    toJSON(): object {
        return {
            src_pos: this.src_pos, 
            is_empty: this.is_empty,
            type: "TEXT"
        }
    }

    static fromJSON(json: string | object): TextAst
    {
        return new TextAst();
    }
}

export type AnyAst = FoldAst | TextAst