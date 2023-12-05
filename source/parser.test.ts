import * as fs from 'fs'
import {readFile} from './utils'
import * as parser from './parser'
import * as ast from './ast'


describe("Tests for exercising the parseText function", () => {
    test("parseText", () => {
        let files = ['text1', 'text2', 'text3']

        files.forEach(file => {

            let text = readFile(`assets/${file}.c`)
            let par = new parser.Parser('c', text)
            let test_object = par.parseText()

            {
                let out_json = JSON.stringify(test_object, null, 2)
                fs.writeFileSync(`assets/${file}.json`, out_json, 'utf-8')
            }

            let json = fs.readFileSync(`assets/${file}.json`, "utf-8")
            let correct_object = Object.assign(new ast.TextAst(), JSON.parse(json))

            expect(test_object).toEqual(correct_object)
        })
    })


    test("parseTextEmpty", () => {

        let files = ['open-fold1', 'close-fold1']

        files.forEach(file => {
            let text = readFile(`assets/${file}.c`)
            let par = new parser.Parser('c', text)
            let test_object = par.parseText()
            expect(test_object.is_empty).toBe(true)
        })
    })
})

describe("Tests for exercising the parseFold function", () => {
    test("parseFold", () => {

        let files = ['single-fold1', 'single-fold2', 'single-fold3', 
                    'nested-fold1', 'nested-fold2', 'nested-fold3']

        files.forEach(file => {

            let text = readFile(`assets/${file}.c`)
            let par = new parser.Parser('c', text)
            let test_object = par.parseFold()

            {
                let out_json = JSON.stringify(test_object, null, 2);
                fs.writeFileSync(`assets/${file}.json`, out_json)
            }

            let json = fs.readFileSync(`assets/${file}.json`, "utf-8")
            let correct_object = Object.assign(new ast.FoldAst(), JSON.parse(json))
            expect(test_object).toEqual(correct_object)
        })
    })


    test("parseFoldError", () => {

        let files = ['open-fold1', 'open-fold2']

        files.forEach(file => {
            
            let text = readFile(`assets/${file}.c`)
            let par = new parser.Parser('c', text)
            expect(() => par.parseFold()).toThrow()
        });
    })
})

describe("Tests for exercising the parseFile function", () => {

    test("parseFile", () => {
        let files = ['file1', 'file2']
        files.forEach(file => {

            let text = readFile(`assets/${file}.c`)
            let par = new parser.Parser('c', text)
            let test_object = par.parseFile()

            {
                let out_json = JSON.stringify(test_object, null, 2);
                fs.writeFileSync(`assets/${file}.json`, out_json)
            }

            let json = fs.readFileSync(`assets/${file}.json`, "utf-8")
            let correct_object = Object.assign(new ast.FileAst(), JSON.parse(json))

            expect(test_object).toEqual(correct_object)
        })
    })
})