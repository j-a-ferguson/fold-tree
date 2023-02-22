import * as lexer from './lexer'
import * as ast from './ast'

export class Parser {

    lex: lexer.Lexer
    tok: lexer.Token = {
            type: lexer.TokenType.Unknown,
            buf_position: [0, 0, 0],
            len: 0
        };

    constructor(lex: lexer.Lexer) {
        this.lex = lex
    }

    advance(){
        this.tok = this.lex.next()
    }


    expect(type: lexer.TokenType.)



    parse(){
        
        var file_ast = this.parseFile()         
        return file_ast
    }

    parseFile() {

        var file_ast = new ast.FileAST()

        return file_ast
    }

}
