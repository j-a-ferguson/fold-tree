import { BaseAst, FileAst, FoldAst, TextAst, AnyAst } from "./ast"
import { Lexer, TokenType, Token } from './lexer'

export class Parser {

    lex: Lexer
    tok_current: Token

    constructor(lang: string, buffer: string) {
        this.lex = new Lexer(lang, buffer)
        this.tok_current = this.lex.next()
    }


    parseText(): TextAst {

        let text_ast = new TextAst()

        if(this.expect(TokenType.Textline)) {
            text_ast.src_pos = Object.assign({}, this.tok_current.src_pos)
            this.advance()
            let text_ast2 : TextAst = this.parseText()
            text_ast.src_pos.len += text_ast2.src_pos.len
        }
        else 
        {
            text_ast.is_empty = true
            text_ast.src_pos = Object.assign({}, this.tok_current.src_pos)
            text_ast.src_pos.len = 0
        }
        return text_ast
    }

    parseFold(): FoldAst {

        let fold_ast = new FoldAst
    }

    private expect(type: TokenType): boolean {
        return this.tok_current.isOfType(type)
    }
    private advance() {
        this.tok_current = this.lex.next()
    }


}