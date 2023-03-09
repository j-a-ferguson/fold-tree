import * as lexer from './lexer'
import * as ast from './ast'

export class Parser {

    lex: lexer.Lexer
    tok_old: lexer.Token = {
        type: lexer.TokenType.Unknown,
        buf_position: [0, 0, 0],
        len: 0
    };

    tok_current: lexer.Token = {
        type: lexer.TokenType.Unknown,
        buf_position: [0, 0, 0],
        len: 0
    };



    constructor(lex: lexer.Lexer) {
        this.lex = lex
    }

    advance() {
        this.tok_current = this.lex.next()
    }


    expect(token: lexer.Token, token_type: lexer.TokenType) {
        return (token.type == token_type)
    }

    consume(token_type: lexer.TokenType) {

        var quit: boolean = true
        if (this.expect(this.tok_current, token_type)) {
            this.tok_old = this.tok_current
            this.advance()
            quit = false
        }
        return quit
    }

    parse() {

        var file_ast = this.parseFile()
        return file_ast
    }

    parseFile() {

        var file_ast = new ast.FileAST()
        return file_ast
    }

    parseFold() {
        var fold_ast = new ast.FoldAST()
        return fold_ast
    }

    parseFoldOpen() {
        var fold_open_ast = new ast.FoldOpenAST()
        return fold_open_ast
    }

    parseFoldClose() {
        var fold_close_ast = new ast.FoldCloseAST()
        return fold_close_ast
    }

    parseText() {
        var text_ast = new ast.TextAST()
        return text_ast
    }
    
    parseTextline() {
        var textline_ast = new ast.TextlineAST()
        return textline_ast
    }

}
