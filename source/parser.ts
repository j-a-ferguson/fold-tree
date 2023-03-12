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


    expect(token: lexer.Token, ...types: Array<lexer.TokenType>) {
        var is_one_of = false
        for(var i = 0; !is_one_of && i < types.length; ++i){
            is_one_of = is_one_of || (token.type == types[i])
        }
        return is_one_of;
    }

    consume(token_type: lexer.TokenType) {

        var quit: boolean = true
        if (this.expect(this.tok_current, token_type)) {
            this.tok_old = this.tok_current
            this.tok_current = this.lex.next()
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

        while(!this.expect(this.tok_current, lexer.TokenType.EOI))
        {
            switch(this.tok_current.type) {
                case lexer.TokenType.Comment
            }
        }
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
        if(this.consume(lexer.TokenType.Text)) {

        }
        var textline_ast = new ast.TextlineAST()
        return textline_ast
    }

}
