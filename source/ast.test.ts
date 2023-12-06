
import * as fs from 'fs'
import {readFile} from './utils'
import * as parser from './parser'
import * as ast from './ast'


describe("Tests for querying the ast node at a given line", () => {

    test("nodeAtLine0", () => {

        let text = readFile('assets/file2.c')
        let par = new parser.Parser('c', text)
        let ast_root: ast.FileAst = par.parseFile()

        let json = fs.readFileSync('assets/find-node-0.json', 'utf-8')
        let correct_node = Object.assign(new ast.TextAst(), JSON.parse(json))

        let ast_node = ast_root.nodeAtLine(0)
        expect(ast_node).toEqual(correct_node)
    })


    test("nodeAtLine10", () => {
        let text = readFile('assets/file2.c')
        let par = new parser.Parser('c', text)


        let json = fs.readFileSync('assets/find-node-10.json', 'utf-8')
        let correct_node = Object.assign(new ast.FoldAst(), JSON.parse(json))

        let ast_root: ast.FileAst = par.parseFile()
        let ast_node = ast_root.nodeAtLine(10)

        expect(ast_node).toEqual(correct_node)
    })

    test("nodeAtLine42", () => {
        let text = readFile('assets/file2.c')
        let par = new parser.Parser('c', text)


        let json = fs.readFileSync('assets/find-node-42.json', 'utf-8')
        let correct_node = Object.assign(new ast.TextAst(), JSON.parse(json))

        let ast_root: ast.FileAst = par.parseFile()
        let ast_node = ast_root.nodeAtLine(42)

        expect(ast_node).toEqual(correct_node)
    })
})