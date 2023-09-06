import * as fs from 'fs'
import { readFile } from './utils'
import * as lexer from './lexer'


describe("Tests for exercising the lexer", () => {

    test("lexer", () => {

        let files = ["close-fold1",
        "close-fold2",
        "file-unbalanced1",
        "file1", 
        "file2",
        "nested-fold1",
        "nested-fold2",
        "nested-fold3",
        "open-fold1",
        "open-fold2",
        "single-fold1",
        "single-fold2",
        "single-fold3",
        "text1",
        "text2",
        "text3"]

        files.forEach(file => {

            
            let text = readFile(`assets/${file}.c`)
            let lex = new lexer.Lexer('c', text)
            let toks: Array<lexer.Token> = []

            let cur_tok = lex.next()
            while(!cur_tok.isOfType(lexer.TokenType.EOI))
            {
                toks.push(cur_tok)
                cur_tok = lex.next()
            }
            toks.push(cur_tok)


            let json = fs.readFileSync(`assets/${file}-lexer.json`, "utf-8")
            let correct_toks = Object.assign(new Array<lexer.Token>, JSON.parse(json))

            expect(toks).toEqual(correct_toks)
        })
    })
})

