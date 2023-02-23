import * as fs from 'fs'
import * as lexer from './lexer'

function main() {

    var data_out = fs.readFileSync('assets/folds1.c', 'utf-8');
    var data_out_lines = data_out.split('\n')
    // console.log(data_out_lines)

    var lex: lexer.Lexer = new lexer.Lexer('c', data_out)

    // for(var i = 0; i < data_out.length; ++i)
    // {
    //     if(data_out[i] == '\n')
    //     {
    //         console.log('%d  \\n', i);
    //     }
    //     else 
    //     {
    //         console.log('%d %s', i, data_out[i])
    //     }
        
    // }
    // console.log(lex.next())

    while (true) {

        var token_after = lex.peek()
        var token = lex.next()
        console.log('--------------------------------------------')        
        
        console.log(JSON.stringify(token))

        console.log(data_out.substring(token.buf_position[0],
            token.buf_position[0] + token.len))

        console.log(data_out_lines[token.buf_position[1]].substring(token.buf_position[2],
            token.buf_position[2] + token.len))

        if (token == lex.eoi) break;
    }


}

main()

