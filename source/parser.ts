import * as lexer from './lexer'
import * as ast from './ast'

export class Parser {

    lex: lexer.Lexer

    tok_previous: lexer.Token = {
        type: lexer.TokenType.Unknown,
        buf_position: [0, 0, 0],
        len: 0
    }

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


    expect(type: lexer.TokenType) {
        return (this.tok_current.type == type);
    }

    consume(token_type: lexer.TokenType) {

        var resume: boolean = false 
        if (this.expect(token_type)) {
            this.tok_previous = this.tok_current
            this.tok_current = this.lex.next()
            this.tok_lookahead = this.lex.peek()
            resume = true 
        }
        return resume 
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
        return file_ast
    }

    parseFold() {

        var fold_ast = new ast.FoldAST()

        if(this.expect(lexer.TokenType.OpenBracket))
        {
            /** doc
             * This branch deals with the following production rule:
             * ```
             * fold ::= fold_open fold fold_close
             * ```
             */
            fold_ast.fold_open = this.parseFoldOpen()
            fold_ast.buf_position = fold_ast.fold_open.buf_position
            fold_ast.len = fold_ast.fold_open.len

            fold_ast.fold = this.parseFold()
            fold_ast.len += fold_ast.fold.len

            fold_ast.fold_close = this.parseFoldClose()
            fold_ast.len += fold_ast.fold_close.len
        }
        else if(this.expect(lexer.TokenType.ID))
        {
            fold_ast.text = this.parseText()
            fold_ast.is_text = true;
            fold_ast.buf_position = fold_ast.text.buf_position
            fold_ast.len = fold_ast.len
        }
        else 
        {
            var err_str = 'Error in parsing fold\n' + lexer.errorString(this.tok_current)
            throw Error(err_str)
        }

        return fold_ast
    }

    parseFoldOpen(): ast.FoldOpenAST {

        var fold_open_ast = new ast.FoldOpenAST()

        if(this.consume(lexer.TokenType.OpenBracket))
        {
            fold_open_ast.buf_position = this.tok_previous.buf_position
            fold_open_ast.len = this.tok_previous.len
        }
        else 
        {
            var err_str = 'Error in parsing open fold\n' + lexer.errorString(this.tok_previous)
            throw Error(err_str)
        }

        if(this.consume(lexer.TokenType.ID))
        {
            fold_open_ast.len += this.tok_previous.len
            fold_open_ast.text = this.lex.getText(this.tok_previous) 
        }

        if(this.consume(lexer.TokenType.Newline))
        {
            fold_open_ast.len += this.tok_previous.len
        }
        else 
        {
            var err_str = 'Error in parsing open fold\n' + lexer.errorString(this.tok_previous)
            throw Error(err_str)
        }

        return fold_open_ast
    }

    parseFoldClose() : ast.FoldCloseAST{
        var fold_close_ast = new ast.FoldCloseAST()

        if( this.consume(lexer.TokenType.CloseBracket))
        {
            fold_close_ast.buf_position = this.tok_previous.buf_position
            fold_close_ast.len = this.tok_previous.len
            
            if(this.consume(lexer.TokenType.Newline))
            {
                fold_close_ast.has_newline = true
                fold_close_ast.len += 1
            }
        }
        else 
        {
            var err_str = "Error in parsing a close fold\n" + lexer.errorString(this.tok_previous)
            throw Error(err_str)
        }
        return fold_close_ast
    }

    parseText(): ast.TextAST {

        var text_ast = new ast.TextAST()

        if(this.consume(lexer.TokenType.ID)){

            text_ast.buf_position = this.tok_previous.buf_position
            text_ast.len = this.tok_previous.len

            if(this.consume(lexer.TokenType.Newline))
            {
                var text_ast2 = this.parseText()
                text_ast.len += text_ast2.len + 1
            }
        }
        else { // choose the empty production
            text_ast.is_empty = true;
        }

        return text_ast
    }
    

}
