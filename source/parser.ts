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
            text_ast.assignSourcePos(this.tok_current)
            this.advance()
            let text_ast2 : TextAst = this.parseText()
            text_ast.incrementLength(text_ast2.src_pos.len)
        }
        else 
        {
            text_ast.is_empty = true
            text_ast.assignSourcePos(this.tok_current)
        }
        return text_ast
    }

    parseFold(): FoldAst | TextAst {


        if(this.expect(TokenType.OpenBracket)) {
            let fold_ast = new FoldAst()
            fold_ast.assignSourcePos(this.tok_current)
            this.advance()
            let file_ast = this.parseFile()
            fold_ast.incrementLength(file_ast.src_pos.len)
            if(this.expect(TokenType.CloseBracket))
            {
                this.advance()
                fold_ast.children = file_ast.children
            }
            else 
            {
                throw Error(this.tok_current.errorString())
            }
            return fold_ast
        }
        else if(this.expect(TokenType.Textline)) 
        {
            let text_ast = this.parseText()
            return text_ast
        }
        else 
        {
            throw new Error(this.tok_current.errorString())
        }
    }


    parseFile(): FileAst {

        let file_ast = new FileAst()
        while(!this.expect(TokenType.EOI, TokenType.CloseBracket))
        {
            let fold_ast2 = this.parseFold()
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