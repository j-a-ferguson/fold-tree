import { FileAst, FoldAst, TextAst } from "./ast"
import { Lexer, TokenType, Token } from './lexer'

export class Parser {

    private lex: Lexer
    private tok_current: Token

    constructor(lang: string, buffer: Array<string>) {
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
        }
        return text_ast
    }

    parseFold(): FoldAst | TextAst {


        if(this.expect(TokenType.OpenBracket)) {

            let fold_ast = new FoldAst()
            fold_ast.src_pos = Object.assign({}, this.tok_current.src_pos)
            fold_ast.setHeaderText(this.tok_current)
            fold_ast.indent = this.tok_current.indent()

            this.advance()

            let file_ast = this.parseFile()

            if(this.expect(TokenType.CloseBracket))
            {
                fold_ast.src_pos.len =  file_ast.src_pos.len + 2
                this.advance()
                fold_ast.children = file_ast.children
            }
            else 
            {
                let error_string 
                = 
                `Fold located at line ${fold_ast.src_pos.line} is unclosed, ${this.tok_current.errorString()}`
                throw new Error(error_string)
            }
            return fold_ast
        }
        else if(this.expect(TokenType.Textline)) 
        {
            let text_ast = this.parseText()
            return text_ast
        }
        else if(this.expect(TokenType.CloseBracket))
        {
            let error_string 
            = 
            `Unmatched closing bracket at line ${this.tok_current.src_pos.line}`
            throw new Error(error_string)
        }
        else {
            throw new Error(`Unknown Error, ${this.tok_current.errorString()}`)
        }
    }


    parseFile(): FileAst {

        let file_ast = new FileAst()
        file_ast.src_pos = Object.assign({}, this.tok_current.src_pos)
        file_ast.src_pos.len = 0

        while(!this.expect(TokenType.EOI, TokenType.CloseBracket))
        {
            let fold_ast2 = this.parseFold()
            file_ast.src_pos.len += fold_ast2.src_pos.len
            file_ast.children.push(fold_ast2)
        }
        return file_ast
    }

    parse(): FileAst {

        let file_ast = this.parseFile()

        if(!this.expect(TokenType.EOI)) {
            throw new Error(this.tok_current.errorString())
        }
        return file_ast
    }

    private expect(...types: TokenType[]): boolean {
        return this.tok_current.isOfType(...types)
    }
    private advance() {
        this.tok_current = this.lex.next()
    }


}