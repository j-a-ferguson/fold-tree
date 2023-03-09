import * as fs from 'fs'
import * as lexer from './lexer'

function main() {

    var data_out = fs.readFileSync('assets/textline.c', 'utf-8');
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

main()

