import * as fs from 'fs'
import * as lexer from './lexer'
import * as parser from './parser'

var file = 'assets/single-fold1.c'

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

function fcn2() {

    var data_out = fs.readFileSync(file, 'utf-8');
    var par: parser.Parser = new parser.Parser('c', data_out)

    var ast = par.parse()
    console.log(JSON.stringify(ast, null, 2))

}


function main() {

    // fcn1()
    // console.log('-------------------------------------')
    fcn2()

}

main()

