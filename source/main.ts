import * as fs from 'fs'
import * as lexer from './lexer'
import * as parser from './parser'




function fcn1() {

    var data_out = fs.readFileSync('assets/fold-open.c', 'utf-8');
    var lex: lexer.Lexer = new lexer.Lexer('c', data_out)


    while (true) {

        var token = lex.next()

        if (token.type != lexer.TokenType.Newline) {

            var str1 = data_out.substring(token.buf_position[0],
                token.buf_position[0] + token.len)

        }

        console.log(JSON.stringify(token))

        if (token == lex.eoi) break;
    }

}

function fcn2() {

    var data_out = fs.readFileSync('assets/fold-open.c', 'utf-8');
    var lex: lexer.Lexer = new lexer.Lexer('c', data_out)
    var par: parser.Parser = new parser.Parser(lex)

    var ast = par.parseFoldOpen()
    console.log(JSON.stringify(ast))

}


function main() {

    fcn1()
    // console.log('-------------------------------------')
    // fcn2()

}

main()

