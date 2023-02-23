import * as lexer from './lexer'
import * as ast from './ast'

export class Parser {

    lex: lexer.Lexer
    tok1: lexer.Token = {
        type: lexer.TokenType.Unknown,
        buf_position: [0, 0, 0],
        len: 0
    };



    constructor(lex: lexer.Lexer) {
        this.lex = lex
    }

    advance() {
        this.tok1 = this.lex.next()
    }


    expect(token: lexer.Token, token_type: lexer.TokenType) {
        return (token.type == token_type)
    }

    consume(token_type: lexer.TokenType) {

        var quit: boolean = true
        if (this.expect(this.tok1, token_type)) {
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

    }

    parseFoldOpen() {

    }

    parseFoldClose() {

    }

    parseText() {

    }
    
    parseTextline() {

    }

}
