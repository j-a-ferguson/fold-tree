import * as fs from 'fs'
import * as lexer from './lexer'



test("lexerTest1", () => {

    var data_out = fs.readFileSync('assets/folds1.c', 'utf-8');
    var data_out_lines = data_out.split('\n')
    var lex: lexer.Lexer = new lexer.Lexer('c', data_out)

    while (true) {

        var token = lex.next()

        if (token.type != lexer.TokenType.Newline) {

            var str1 = data_out.substring(token.buf_position[0],
                token.buf_position[0] + token.len)

            var str2 = data_out_lines[token.buf_position[1]].substring(token.buf_position[2],
                token.buf_position[2] + token.len)

            expect(str1 == str2).toBe(true)
        }

        if (token == lex.eoi) break;
    }
})