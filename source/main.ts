import * as fs from 'fs'
import * as lexer from './lexer'

var file = 'assets/nested-fold1.c'

function fcn1() {

    
    let data_out = fs.readFileSync(file, 'utf-8');
    let lex = new lexer.Lexer("c", data_out)

    while (true) {
        let token = lex.next()
        console.log(token)
        console.log(token.src_pos.text())

        if(token.isOfType(lexer.TokenType.EOI)) break
    }

}

// function fcn2() {

//     var data_out = fs.readFileSync(file, 'utf-8');
//     var lex: lexer.Lexer = new lexer.Lexer('c', data_out)
//     var par: parser.Parser = new parser.Parser(lex)

//     var ast = par.parseFile()
//     console.log(JSON.stringify(ast, undefined, 4))

// }


function main() {

    fcn1()
    console.log('-------------------------------------')


}

main()

