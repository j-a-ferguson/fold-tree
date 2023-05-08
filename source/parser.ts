import * as lexer from './lexer'
import * as ast from './ast'

export class Parser {

    lex: lexer.Lexer

    tok_current: lexer.Token = {
        type: lexer.TokenType.Unknown,
        buf_position: [0, 0, 0],
        len: 0
    };


    tok_lookahead: lexer.Token = {
        type: lexer.TokenType.Unknown,
        buf_position: [0, 0, 0],
        len: 0
    };

    constructor(lex: lexer.Lexer) {
        this.lex = lex
        this.tok_current = this.lex.next()
        this.tok_lookahead = this.lex.peek()
    }


    expect(token: lexer.Token, ...types: Array<lexer.TokenType>) {
        var is_one_of = false
        for(var i = 0; (!is_one_of) && (i < types.length); ++i){
            is_one_of =  (token.type == types[i])
        }
        return is_one_of;
    }

    consume(token_type: lexer.TokenType) {

        var quit: boolean = true 
        if (this.tok_current.type == token_type) {
            this.tok_current = this.lex.next()
            this.tok_lookahead = this.lex.peek()
            quit = false
        }
        return quit
    }

    parse() {

        var file_ast = this.parseFile()
        if(this.tok_current.type != lexer.TokenType.EOI)
        {
            throw new Error(lexer.errorString(this.tok_current))
        }
        return file_ast
    }

    parseFile() {

        var file_ast = new ast.FileAST()
        file_ast.len = 0
        file_ast.buf_position = this.tok_current.buf_position
        

        file_ast.children.push(this.parseFold())

        file_ast.children.forEach(element => {
            file_ast.len += element.len
        });

        return file_ast
    }

    parseFold() {
        var fold_ast = new ast.FoldAST()
        

        return fold_ast
    }

    parseFoldOpen() {

        var fold_open_ast = new ast.FoldOpenAST()
        fold_open_ast.len = 0 
        fold_open_ast.buf_position = this.tok_current.buf_position

        console.log(this.tok_current)
        // console.log(this.expect(this.tok_current, lexer.TokenType.Comment))

        // if(this.consume(lexer.TokenType.Comment))
        // {
        //     throw Error(lexer.errorString(this.tok_current))
        // }

        if(this.consume(lexer.TokenType.OpenBracket))
        {
            throw Error(lexer.errorString(this.tok_current))
        }

        if(this.consume(lexer.TokenType.ID))
        {
            throw Error(lexer.errorString(this.tok_current))
        }

        if(this.consume(lexer.TokenType.Newline))
        {
            throw Error(lexer.errorString(this.tok_current))
        }


        return fold_open_ast
    }

    parseFoldClose() {
        var fold_close_ast = new ast.FoldCloseAST()
        return fold_close_ast
    }

    parseText(): ast.TextAST {

        var text_ast = new ast.TextAST()

        if(this.expect(this.tok_current, lexer.TokenType.Newline))
        {
            this.consume(lexer.TokenType.Newline)
            var text_ast2 = this.parseText()
            text_ast.len += text_ast2.len + 1
        }
        return text_ast
    }
    

}
