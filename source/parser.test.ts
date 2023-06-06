
import * as fs from 'fs'
import * as parser from './parser'
import * as ast from './ast'


describe("Tests for exercising the parseText function", () => {
    test("parserText", () => {
        let files = ['text1', 'text2', 'text3']

        files.forEach(file => {
            let json = fs.readFileSync(`assets/${file}.json`, "utf-8")
            let correct_object = Object.assign(new ast.TextAst(), JSON.parse(json))

            let text: string = fs.readFileSync(`assets/${file}.c`, 'utf-8')
            let par = new parser.Parser('c', text)
            let test_object = par.parseText()

            expect(test_object).toEqual(correct_object)
        })
    })
})

