import * as fs from 'fs'
import * as lexer from './lexer'
import * as parser from './parser'
import * as ast from './ast'


describe("text", () => {

    test("parserTextline1", () => {

        const textline1 = fs.readFileSync('assets/textline1.c', 'utf-8')
        var lex: lexer.Lexer = new lexer.Lexer('c', textline1)
        var par = new parser.Parser(lex)

        var text_ast = par.parseText()
        expect(text_ast.type).toBe(ast.ASTType.Text)
        expect(text_ast.buf_position[0]).toBe(0)
        expect(text_ast.buf_position[1]).toBe(0)
        expect(text_ast.buf_position[2]).toBe(0)
        expect(text_ast.is_empty).toBe(false)
        expect(text_ast.len).toBe(45)

    })

    test("parserTextline2", () => {

        const textline1 = fs.readFileSync('assets/textline2.c', 'utf-8')
        var lex: lexer.Lexer = new lexer.Lexer('c', textline1)
        var par = new parser.Parser(lex)

        var text_ast = par.parseText()
        expect(text_ast.type).toBe(ast.ASTType.Text)
        expect(text_ast.buf_position[0]).toBe(0)
        expect(text_ast.buf_position[1]).toBe(0)
        expect(text_ast.buf_position[2]).toBe(0)
        expect(text_ast.is_empty).toBe(false)
        expect(text_ast.len).toBe(67)

    })

    test("parserTextlines", () => {

        const textline1 = fs.readFileSync('assets/textlines.c', 'utf-8')
        var lex: lexer.Lexer = new lexer.Lexer('c', textline1)
        var par = new parser.Parser(lex)

        var text_ast = par.parseText()
        expect(text_ast.type).toBe(ast.ASTType.Text)
        expect(text_ast.buf_position[0]).toBe(0)
        expect(text_ast.buf_position[1]).toBe(0)
        expect(text_ast.buf_position[2]).toBe(0)
        expect(text_ast.is_empty).toBe(false)
        expect(text_ast.len).toBe(291)

    })
})
describe("close fold", () => {

    test("parserCloseFold1", () => {
        const close_fold_text = fs.readFileSync('assets/close-fold1.c', 'utf-8')
        var lex: lexer.Lexer = new lexer.Lexer('c', close_fold_text)
        var par = new parser.Parser(lex)

        var fold_close_ast = par.parseFoldClose()
        expect(fold_close_ast.type).toBe(ast.ASTType.FoldClose)
        expect(fold_close_ast.buf_position[0]).toBe(0)
        expect(fold_close_ast.buf_position[1]).toBe(0)
        expect(fold_close_ast.buf_position[2]).toBe(0)
        expect(fold_close_ast.len).toBe(5)
        expect(fold_close_ast.has_newline).toBe(false)
    })


    test("parserCloseFold2", () => {
        const close_fold_text = fs.readFileSync('assets/close-fold2.c', 'utf-8')
        var lex: lexer.Lexer = new lexer.Lexer('c', close_fold_text)
        var par = new parser.Parser(lex)

        var fold_close_ast = par.parseFoldClose()
        expect(fold_close_ast.type).toBe(ast.ASTType.FoldClose)
        expect(fold_close_ast.buf_position[0]).toBe(0)
        expect(fold_close_ast.buf_position[1]).toBe(0)
        expect(fold_close_ast.buf_position[2]).toBe(0)
        expect(fold_close_ast.len).toBe(6)
        expect(fold_close_ast.has_newline).toBe(true)
    })


    test("parserCloseFold3", () => {

        {
            const close_fold_text = fs.readFileSync('assets/textline1.c', 'utf-8')
            var lex: lexer.Lexer = new lexer.Lexer('c', close_fold_text)
            var par = new parser.Parser(lex)
            expect(() => par.parseFoldClose()).toThrow()
        }
        {
            const close_fold_text = fs.readFileSync('assets/open-fold1.c', 'utf-8')
            var lex: lexer.Lexer = new lexer.Lexer('c', close_fold_text)
            var par = new parser.Parser(lex)
            expect(() => par.parseFoldClose()).toThrow()
        }
    })

})
describe("open fold", () => {

    test("parserOpenFold1", () => {
        const open_fold_text = fs.readFileSync('assets/open-fold1.c', 'utf-8')
        var lex = new lexer.Lexer('c', open_fold_text)
        var par = new parser.Parser(lex)

        var fold_open_ast = par.parseFoldOpen()
        expect(fold_open_ast.type).toBe(ast.ASTType.FoldOpen)
        expect(fold_open_ast.buf_position[0]).toBe(0);
        expect(fold_open_ast.buf_position[1]).toBe(0);
        expect(fold_open_ast.buf_position[2]).toBe(0);
        expect(fold_open_ast.len).toBe(6)
        expect(fold_open_ast.text).toBe("")
    })


    test("parseOpenFold2", () => {
        const open_fold_text = fs.readFileSync('assets/open-fold2.c', 'utf-8')
        var lex = new lexer.Lexer('c', open_fold_text)
        var par = new parser.Parser(lex)

        var fold_open_ast = par.parseFoldOpen()
        expect(fold_open_ast.type).toBe(ast.ASTType.FoldOpen)
        expect(fold_open_ast.buf_position[0]).toBe(0);
        expect(fold_open_ast.buf_position[1]).toBe(0);
        expect(fold_open_ast.buf_position[2]).toBe(0);
        expect(fold_open_ast.len).toBe(26)
        expect(fold_open_ast.text).toBe('   This is some text')
    })

    test("parseOpenFold3", () => {
        {
            const open_fold_text = fs.readFileSync('assets/textline1.c', 'utf8')
            var lex = new lexer.Lexer('c', open_fold_text)
            var par = new parser.Parser(lex)
            expect(() => par.parseFoldOpen()).toThrow()
        }
        {
            const open_fold_text = fs.readFileSync('assets/close-fold1.c', 'utf8')
            var lex = new lexer.Lexer('c', open_fold_text)
            var par = new parser.Parser(lex)
            expect(() => par.parseFoldOpen()).toThrow()
        }
    })

})
describe("fold", () => {

    test("parseFold1", () => {

        const fold_text = fs.readFileSync('assets/textlines.c', 'utf-8')
        var lex = new lexer.Lexer('c', fold_text)
        var par = new parser.Parser(lex)
        var fold_ast = par.parseFold()

        expect(fold_ast.type).toBe(ast.ASTType.Fold)
        expect(fold_ast.buf_position[0]).toBe(0)
        expect(fold_ast.buf_position[1]).toBe(0)
        expect(fold_ast.buf_position[2]).toBe(0)
        expect(fold_ast.len).toBe(291)
        expect(fold_ast.fold_open).toBeNull()
        expect(fold_ast.fold).toBeNull()
        expect(fold_ast.fold_close).toBeNull()
        expect(fold_ast.text).toBeTruthy()
        if (fold_ast.text) {
            var text_ast = fold_ast.text
            expect(text_ast.type).toBe(ast.ASTType.Text)
            expect(text_ast.buf_position[0]).toBe(0)
            expect(text_ast.buf_position[1]).toBe(0)
            expect(text_ast.buf_position[2]).toBe(0)
            expect(text_ast.is_empty).toBe(false)
            expect(text_ast.len).toBe(291)
        }
    })

    test("parseFold2", () => {
        const open_fold_text = fs.readFileSync('assets/single-fold1.c', 'utf-8')
        var lex = new lexer.Lexer('c', open_fold_text)
        var par = new parser.Parser(lex)
        var single_fold_ast = par.parseFold()

        expect(single_fold_ast.type).toBe(ast.ASTType.Fold)
        expect(single_fold_ast.is_text).toBe(false)
        expect(single_fold_ast.len).toBe(48)
        expect(single_fold_ast.buf_position[0]).toBe(0)
        expect(single_fold_ast.buf_position[1]).toBe(0)
        expect(single_fold_ast.buf_position[2]).toBe(0)
        expect(single_fold_ast.is_text).toBe(false)
        expect(single_fold_ast.text).toBeNull()

        expect(single_fold_ast.fold_open).toBeDefined()
        if (single_fold_ast.fold_open) {
            var fold_open_ast = single_fold_ast.fold_open
            expect(fold_open_ast.type).toBe(ast.ASTType.FoldOpen)
            expect(fold_open_ast.buf_position[0]).toBe(0);
            expect(fold_open_ast.buf_position[1]).toBe(0);
            expect(fold_open_ast.buf_position[2]).toBe(0);
            expect(fold_open_ast.len).toBe(21)
            expect(fold_open_ast.text).toBe(' This is a fold')
        }

        expect(single_fold_ast.fold).toBeTruthy()
        if (single_fold_ast.fold) {
            var inner_fold_ast = single_fold_ast.fold
            expect(inner_fold_ast.type).toBe(ast.ASTType.Fold)
            expect(inner_fold_ast.buf_position[0]).toBe(21)
            expect(inner_fold_ast.buf_position[1]).toBe(1)
            expect(inner_fold_ast.buf_position[2]).toBe(0)
            expect(inner_fold_ast.len).toBe(22)
            expect(inner_fold_ast.fold_open).toBeNull()
            expect(inner_fold_ast.fold).toBeNull()
            expect(inner_fold_ast.fold_close).toBeNull()
            expect(inner_fold_ast.text).toBeTruthy()
            if (inner_fold_ast.text) {
                var text_ast = inner_fold_ast.text
                expect(text_ast.type).toBe(ast.ASTType.Text)
                expect(text_ast.buf_position[0]).toBe(21)
                expect(text_ast.buf_position[1]).toBe(1)
                expect(text_ast.buf_position[2]).toBe(0)
                expect(text_ast.is_empty).toBe(false)
                expect(text_ast.len).toBe(22)
            }
        }

        expect(single_fold_ast.fold_close).toBeTruthy()
        if (single_fold_ast.fold_close) {
            var fold_close_ast = single_fold_ast.fold_close
            expect(fold_close_ast.type).toBe(ast.ASTType.FoldClose)
            expect(fold_close_ast.buf_position[0]).toBe(43)
            expect(fold_close_ast.buf_position[1]).toBe(2)
            expect(fold_close_ast.buf_position[2]).toBe(0)
            expect(fold_close_ast.len).toBe(5)
            expect(fold_close_ast.has_newline).toBe(false)
        }
    })

    test("parseFold3", () => {
        const open_fold_text = fs.readFileSync('assets/single-fold2.c', 'utf-8')
        var lex = new lexer.Lexer('c', open_fold_text)
        var par = new parser.Parser(lex)
        var single_fold_ast = par.parseFold()

        expect(single_fold_ast.type).toBe(ast.ASTType.Fold)
        expect(single_fold_ast.is_text).toBe(false)
        expect(single_fold_ast.len).toBe(95)
        expect(single_fold_ast.buf_position[0]).toBe(0)
        expect(single_fold_ast.buf_position[1]).toBe(0)
        expect(single_fold_ast.buf_position[2]).toBe(0)
        expect(single_fold_ast.is_text).toBe(false)
        expect(single_fold_ast.text).toBeNull()

        expect(single_fold_ast.fold_open).toBeDefined()
        if (single_fold_ast.fold_open) {
            var fold_open_ast = single_fold_ast.fold_open
            expect(fold_open_ast.type).toBe(ast.ASTType.FoldOpen)
            expect(fold_open_ast.buf_position[0]).toBe(0);
            expect(fold_open_ast.buf_position[1]).toBe(0);
            expect(fold_open_ast.buf_position[2]).toBe(0);
            expect(fold_open_ast.len).toBe(27)
            expect(fold_open_ast.text).toBe(' this is another fold')
        }

        expect(single_fold_ast.fold).toBeTruthy()
        if (single_fold_ast.fold) {
            var inner_fold_ast = single_fold_ast.fold
            expect(inner_fold_ast.type).toBe(ast.ASTType.Fold)
            expect(inner_fold_ast.buf_position[0]).toBe(27)
            expect(inner_fold_ast.buf_position[1]).toBe(1)
            expect(inner_fold_ast.buf_position[2]).toBe(0)
            expect(inner_fold_ast.len).toBe(63)
            expect(inner_fold_ast.fold_open).toBeNull()
            expect(inner_fold_ast.fold).toBeNull()
            expect(inner_fold_ast.fold_close).toBeNull()
            expect(inner_fold_ast.text).toBeTruthy()
            if (inner_fold_ast.text) {
                var text_ast = inner_fold_ast.text
                expect(text_ast.type).toBe(ast.ASTType.Text)
                expect(text_ast.buf_position[0]).toBe(27)
                expect(text_ast.buf_position[1]).toBe(1)
                expect(text_ast.buf_position[2]).toBe(0)
                expect(text_ast.is_empty).toBe(false)
                expect(text_ast.len).toBe(63)
            }
        }

        expect(single_fold_ast.fold_close).toBeTruthy()
        if (single_fold_ast.fold_close) {
            var fold_close_ast = single_fold_ast.fold_close
            expect(fold_close_ast.type).toBe(ast.ASTType.FoldClose)
            expect(fold_close_ast.buf_position[0]).toBe(90)
            expect(fold_close_ast.buf_position[1]).toBe(3)
            expect(fold_close_ast.buf_position[2]).toBe(0)
            expect(fold_close_ast.len).toBe(5)
            expect(fold_close_ast.has_newline).toBe(false)
        }
    })

    test("parseFold4", () => {
        const open_fold_text = fs.readFileSync('assets/single-fold3.c', 'utf-8')
        var lex = new lexer.Lexer('c', open_fold_text)
        var par = new parser.Parser(lex)
        var single_fold_ast = par.parseFold()

        expect(single_fold_ast.type).toBe(ast.ASTType.Fold)
        expect(single_fold_ast.is_text).toBe(false)
        expect(single_fold_ast.len).toBe(11)
        expect(single_fold_ast.buf_position[0]).toBe(0)
        expect(single_fold_ast.buf_position[1]).toBe(0)
        expect(single_fold_ast.buf_position[2]).toBe(0)
        expect(single_fold_ast.is_text).toBe(false)
        expect(single_fold_ast.text).toBeNull()

        expect(single_fold_ast.fold_open).toBeDefined()
        if (single_fold_ast.fold_open) {
            var fold_open_ast = single_fold_ast.fold_open
            expect(fold_open_ast.type).toBe(ast.ASTType.FoldOpen)
            expect(fold_open_ast.buf_position[0]).toBe(0);
            expect(fold_open_ast.buf_position[1]).toBe(0);
            expect(fold_open_ast.buf_position[2]).toBe(0);
            expect(fold_open_ast.len).toBe(6)
            expect(fold_open_ast.text).toBe('')
        }

        expect(single_fold_ast.fold).toBeTruthy()
        if (single_fold_ast.fold) {
            var inner_fold_ast = single_fold_ast.fold
            expect(inner_fold_ast.type).toBe(ast.ASTType.Fold)
            expect(inner_fold_ast.buf_position[0]).toBe(5)
            expect(inner_fold_ast.buf_position[1]).toBe(0)
            expect(inner_fold_ast.buf_position[2]).toBe(5)
            expect(inner_fold_ast.len).toBe(0)
            expect(inner_fold_ast.fold_open).toBeNull()
            expect(inner_fold_ast.fold).toBeNull()
            expect(inner_fold_ast.fold_close).toBeNull()
            expect(inner_fold_ast.text).toBeTruthy()
            if (inner_fold_ast.text) {
                var text_ast = inner_fold_ast.text
                expect(text_ast.type).toBe(ast.ASTType.Text)
                expect(text_ast.buf_position[0]).toBe(5)
                expect(text_ast.buf_position[1]).toBe(0)
                expect(text_ast.buf_position[2]).toBe(5)
                expect(text_ast.is_empty).toBe(true)
                expect(text_ast.len).toBe(0)
            }
        }

        expect(single_fold_ast.fold_close).toBeTruthy()
        if (single_fold_ast.fold_close) {
            var fold_close_ast = single_fold_ast.fold_close
            expect(fold_close_ast.type).toBe(ast.ASTType.FoldClose)
            expect(fold_close_ast.buf_position[0]).toBe(6)
            expect(fold_close_ast.buf_position[1]).toBe(1)
            expect(fold_close_ast.buf_position[2]).toBe(0)
            expect(fold_close_ast.len).toBe(5)
            expect(fold_close_ast.has_newline).toBe(false)
        }
    })

    test("parseFold5", () => {
        const nested_fold_text = fs.readFileSync('assets/single-fold3.c', 'utf-8')
        var lex = new lexer.Lexer('c', nested_fold_text)
        var par = new parser.Parser(lex)
        var nested_fold_ast = par.parseFold()

        expect(nested_fold_ast.type).toBe(ast.ASTType.File)
    })
})
describe("file", () => {

    test("parseFile1", () => {

        const text = fs.readFileSync('assets/textline1.c', 'utf-8')
        var lex = new lexer.Lexer('c', text)
        var par = new parser.Parser(lex)
        var file_ast = par.parseFile()

        expect(file_ast.type).toBe(ast.ASTType.File)
        expect(file_ast.buf_position[0]).toBe(0)
        expect(file_ast.buf_position[1]).toBe(0)
        expect(file_ast.buf_position[2]).toBe(0)
        expect(file_ast.len).toBe(45)
        expect(file_ast.children.length).toBe(1)

        var fold_ast: ast.FoldAST = file_ast.children[0]
        expect(fold_ast.buf_position[0]).toBe(0)
        expect(fold_ast.buf_position[1]).toBe(0)
        expect(fold_ast.buf_position[2]).toBe(0)
        expect(fold_ast.len).toBe(45)
        expect(fold_ast.fold_open).toBeNull()
        expect(fold_ast.fold).toBeNull()
        expect(fold_ast.fold_close).toBeNull()

        expect(fold_ast.is_text).toBe(true)

        if (fold_ast.text) {
            var text_ast = fold_ast.text
            expect(text_ast.type).toBe(ast.ASTType.Text)
            expect(text_ast.buf_position[0]).toBe(0)
            expect(text_ast.buf_position[1]).toBe(0)
            expect(text_ast.buf_position[2]).toBe(0)
            expect(text_ast.is_empty).toBe(false)
            expect(text_ast.len).toBe(45)
        }


    })

    test("parseFile2", () => {

        const text = fs.readFileSync('assets/textline2.c', 'utf-8')
        var lex = new lexer.Lexer('c', text)
        var par = new parser.Parser(lex)
        var file_ast = par.parseFile()

        expect(file_ast.type).toBe(ast.ASTType.File)
        expect(file_ast.buf_position[0]).toBe(0)
        expect(file_ast.buf_position[1]).toBe(0)
        expect(file_ast.buf_position[2]).toBe(0)
        expect(file_ast.len).toBe(67)
        expect(file_ast.children.length).toBe(1)

        var fold_ast: ast.FoldAST = file_ast.children[0]
        expect(fold_ast.buf_position[0]).toBe(0)
        expect(fold_ast.buf_position[1]).toBe(0)
        expect(fold_ast.buf_position[2]).toBe(0)
        expect(fold_ast.len).toBe(67)
        expect(fold_ast.fold_open).toBeNull()
        expect(fold_ast.fold).toBeNull()
        expect(fold_ast.fold_close).toBeNull()

        expect(fold_ast.is_text).toBe(true)

        if (fold_ast.text) {
            var text_ast = fold_ast.text
            expect(text_ast.type).toBe(ast.ASTType.Text)
            expect(text_ast.buf_position[0]).toBe(0)
            expect(text_ast.buf_position[1]).toBe(0)
            expect(text_ast.buf_position[2]).toBe(0)
            expect(text_ast.is_empty).toBe(false)
            expect(text_ast.len).toBe(67)
        }


    })

    test("parseFile3", () => {

        const text = fs.readFileSync('assets/textlines.c', 'utf-8')
        var lex = new lexer.Lexer('c', text)
        var par = new parser.Parser(lex)
        var file_ast = par.parseFile()

        expect(file_ast.type).toBe(ast.ASTType.File)
        expect(file_ast.buf_position[0]).toBe(0)
        expect(file_ast.buf_position[1]).toBe(0)
        expect(file_ast.buf_position[2]).toBe(0)
        expect(file_ast.len).toBe(291)
        expect(file_ast.children.length).toBe(1)

        var fold_ast: ast.FoldAST = file_ast.children[0]
        expect(fold_ast.buf_position[0]).toBe(0)
        expect(fold_ast.buf_position[1]).toBe(0)
        expect(fold_ast.buf_position[2]).toBe(0)
        expect(fold_ast.len).toBe(291)
        expect(fold_ast.fold_open).toBeNull()
        expect(fold_ast.fold).toBeNull()
        expect(fold_ast.fold_close).toBeNull()

        expect(fold_ast.is_text).toBe(true)

        if (fold_ast.text) {
            var text_ast = fold_ast.text
            expect(text_ast.type).toBe(ast.ASTType.Text)
            expect(text_ast.buf_position[0]).toBe(0)
            expect(text_ast.buf_position[1]).toBe(0)
            expect(text_ast.buf_position[2]).toBe(0)
            expect(text_ast.is_empty).toBe(false)
            expect(text_ast.len).toBe(291)
        }
    })

    test("parseFile4", () => {

        const text = fs.readFileSync('assets/single-fold1.c', 'utf-8')
        var lex = new lexer.Lexer('c', text)
        var par = new parser.Parser(lex)
        var file_ast = par.parseFile()

        expect(file_ast.type).toBe(ast.ASTType.File)
        expect(file_ast.buf_position[0]).toBe(0)
        expect(file_ast.buf_position[1]).toBe(0)
        expect(file_ast.buf_position[2]).toBe(0)
        expect(file_ast.len).toBe(48)
        expect(file_ast.children.length).toBe(1)

        var single_fold_ast = file_ast.children[0]
        expect(single_fold_ast.type).toBe(ast.ASTType.Fold)
        expect(single_fold_ast.is_text).toBe(false)
        expect(single_fold_ast.len).toBe(48)
        expect(single_fold_ast.buf_position[0]).toBe(0)
        expect(single_fold_ast.buf_position[1]).toBe(0)
        expect(single_fold_ast.buf_position[2]).toBe(0)
        expect(single_fold_ast.is_text).toBe(false)
        expect(single_fold_ast.text).toBeNull()

        expect(single_fold_ast.fold_open).toBeDefined()
        if (single_fold_ast.fold_open) {
            var fold_open_ast = single_fold_ast.fold_open
            expect(fold_open_ast.type).toBe(ast.ASTType.FoldOpen)
            expect(fold_open_ast.buf_position[0]).toBe(0);
            expect(fold_open_ast.buf_position[1]).toBe(0);
            expect(fold_open_ast.buf_position[2]).toBe(0);
            expect(fold_open_ast.len).toBe(21)
            expect(fold_open_ast.text).toBe(' This is a fold')
        }

        expect(single_fold_ast.fold).toBeTruthy()
        if (single_fold_ast.fold) {
            var inner_fold_ast = single_fold_ast.fold
            expect(inner_fold_ast.type).toBe(ast.ASTType.Fold)
            expect(inner_fold_ast.buf_position[0]).toBe(21)
            expect(inner_fold_ast.buf_position[1]).toBe(1)
            expect(inner_fold_ast.buf_position[2]).toBe(0)
            expect(inner_fold_ast.len).toBe(22)
            expect(inner_fold_ast.fold_open).toBeNull()
            expect(inner_fold_ast.fold).toBeNull()
            expect(inner_fold_ast.fold_close).toBeNull()
            expect(inner_fold_ast.text).toBeTruthy()
            if (inner_fold_ast.text) {
                var text_ast = inner_fold_ast.text
                expect(text_ast.type).toBe(ast.ASTType.Text)
                expect(text_ast.buf_position[0]).toBe(21)
                expect(text_ast.buf_position[1]).toBe(1)
                expect(text_ast.buf_position[2]).toBe(0)
                expect(text_ast.is_empty).toBe(false)
                expect(text_ast.len).toBe(22)
            }
        }

        expect(single_fold_ast.fold_close).toBeTruthy()
        if (single_fold_ast.fold_close) {
            var fold_close_ast = single_fold_ast.fold_close
            expect(fold_close_ast.type).toBe(ast.ASTType.FoldClose)
            expect(fold_close_ast.buf_position[0]).toBe(43)
            expect(fold_close_ast.buf_position[1]).toBe(2)
            expect(fold_close_ast.buf_position[2]).toBe(0)
            expect(fold_close_ast.len).toBe(5)
            expect(fold_close_ast.has_newline).toBe(false)
        }
    })

    test("parseFile5", () => {

        const text = fs.readFileSync('assets/single-fold2.c', 'utf-8')
        var lex = new lexer.Lexer('c', text)
        var par = new parser.Parser(lex)
        var file_ast = par.parseFile()

        expect(file_ast.type).toBe(ast.ASTType.File)
        expect(file_ast.buf_position[0]).toBe(0)
        expect(file_ast.buf_position[1]).toBe(0)
        expect(file_ast.buf_position[2]).toBe(0)
        expect(file_ast.len).toBe(95)
        expect(file_ast.children.length).toBe(1)

        var single_fold_ast = file_ast.children[0]
        expect(single_fold_ast.type).toBe(ast.ASTType.Fold)
        expect(single_fold_ast.is_text).toBe(false)
        expect(single_fold_ast.len).toBe(95)
        expect(single_fold_ast.buf_position[0]).toBe(0)
        expect(single_fold_ast.buf_position[1]).toBe(0)
        expect(single_fold_ast.buf_position[2]).toBe(0)
        expect(single_fold_ast.is_text).toBe(false)
        expect(single_fold_ast.text).toBeNull()

        expect(single_fold_ast.fold_open).toBeDefined()
        if (single_fold_ast.fold_open) {
            var fold_open_ast = single_fold_ast.fold_open
            expect(fold_open_ast.type).toBe(ast.ASTType.FoldOpen)
            expect(fold_open_ast.buf_position[0]).toBe(0);
            expect(fold_open_ast.buf_position[1]).toBe(0);
            expect(fold_open_ast.buf_position[2]).toBe(0);
            expect(fold_open_ast.len).toBe(27)
            expect(fold_open_ast.text).toBe(' this is another fold')
        }

        expect(single_fold_ast.fold).toBeTruthy()
        if (single_fold_ast.fold) {
            var inner_fold_ast = single_fold_ast.fold
            expect(inner_fold_ast.type).toBe(ast.ASTType.Fold)
            expect(inner_fold_ast.buf_position[0]).toBe(27)
            expect(inner_fold_ast.buf_position[1]).toBe(1)
            expect(inner_fold_ast.buf_position[2]).toBe(0)
            expect(inner_fold_ast.len).toBe(63)
            expect(inner_fold_ast.fold_open).toBeNull()
            expect(inner_fold_ast.fold).toBeNull()
            expect(inner_fold_ast.fold_close).toBeNull()
            expect(inner_fold_ast.text).toBeTruthy()
            if (inner_fold_ast.text) {
                var text_ast = inner_fold_ast.text
                expect(text_ast.type).toBe(ast.ASTType.Text)
                expect(text_ast.buf_position[0]).toBe(27)
                expect(text_ast.buf_position[1]).toBe(1)
                expect(text_ast.buf_position[2]).toBe(0)
                expect(text_ast.is_empty).toBe(false)
                expect(text_ast.len).toBe(63)
            }
        }

        expect(single_fold_ast.fold_close).toBeTruthy()
        if (single_fold_ast.fold_close) {
            var fold_close_ast = single_fold_ast.fold_close
            expect(fold_close_ast.type).toBe(ast.ASTType.FoldClose)
            expect(fold_close_ast.buf_position[0]).toBe(90)
            expect(fold_close_ast.buf_position[1]).toBe(3)
            expect(fold_close_ast.buf_position[2]).toBe(0)
            expect(fold_close_ast.len).toBe(5)
            expect(fold_close_ast.has_newline).toBe(false)
        }
    })

    test("parseFile6", () => {

        const text = fs.readFileSync('assets/single-fold3.c', 'utf-8')
        var lex = new lexer.Lexer('c', text)
        var par = new parser.Parser(lex)
        var file_ast = par.parseFile()

        expect(file_ast.type).toBe(ast.ASTType.File)
        expect(file_ast.buf_position[0]).toBe(0)
        expect(file_ast.buf_position[1]).toBe(0)
        expect(file_ast.buf_position[2]).toBe(0)
        expect(file_ast.len).toBe(11)
        expect(file_ast.children.length).toBe(1)

        var single_fold_ast = file_ast.children[0]
        expect(single_fold_ast.type).toBe(ast.ASTType.Fold)
        expect(single_fold_ast.is_text).toBe(false)
        expect(single_fold_ast.len).toBe(11)
        expect(single_fold_ast.buf_position[0]).toBe(0)
        expect(single_fold_ast.buf_position[1]).toBe(0)
        expect(single_fold_ast.buf_position[2]).toBe(0)
        expect(single_fold_ast.is_text).toBe(false)
        expect(single_fold_ast.text).toBeNull()

        expect(single_fold_ast.fold_open).toBeDefined()
        if (single_fold_ast.fold_open) {
            var fold_open_ast = single_fold_ast.fold_open
            expect(fold_open_ast.type).toBe(ast.ASTType.FoldOpen)
            expect(fold_open_ast.buf_position[0]).toBe(0);
            expect(fold_open_ast.buf_position[1]).toBe(0);
            expect(fold_open_ast.buf_position[2]).toBe(0);
            expect(fold_open_ast.len).toBe(6)
            expect(fold_open_ast.text).toBe('')
        }

        expect(single_fold_ast.fold).toBeTruthy()
        if (single_fold_ast.fold) {
            var inner_fold_ast = single_fold_ast.fold
            expect(inner_fold_ast.type).toBe(ast.ASTType.Fold)
            expect(inner_fold_ast.buf_position[0]).toBe(5)
            expect(inner_fold_ast.buf_position[1]).toBe(0)
            expect(inner_fold_ast.buf_position[2]).toBe(5)
            expect(inner_fold_ast.len).toBe(0)
            expect(inner_fold_ast.fold_open).toBeNull()
            expect(inner_fold_ast.fold).toBeNull()
            expect(inner_fold_ast.fold_close).toBeNull()
            expect(inner_fold_ast.text).toBeTruthy()
            if (inner_fold_ast.text) {
                var text_ast = inner_fold_ast.text
                expect(text_ast.type).toBe(ast.ASTType.Text)
                expect(text_ast.buf_position[0]).toBe(5)
                expect(text_ast.buf_position[1]).toBe(0)
                expect(text_ast.buf_position[2]).toBe(5)
                expect(text_ast.is_empty).toBe(true)
                expect(text_ast.len).toBe(0)
            }
        }

        expect(single_fold_ast.fold_close).toBeTruthy()
        if (single_fold_ast.fold_close) {
            var fold_close_ast = single_fold_ast.fold_close
            expect(fold_close_ast.type).toBe(ast.ASTType.FoldClose)
            expect(fold_close_ast.buf_position[0]).toBe(6)
            expect(fold_close_ast.buf_position[1]).toBe(1)
            expect(fold_close_ast.buf_position[2]).toBe(0)
            expect(fold_close_ast.len).toBe(5)
            expect(fold_close_ast.has_newline).toBe(false)
        }
    })

    test("parseFile7", () => {
        
        const text = fs.readFileSync('assets/file1.c', 'utf-8')
        var lex = new lexer.Lexer('c', text)
        var par = new parser.Parser(lex)
        var file_ast = par.parseFile()


        expect(file_ast.type).toBe(ast.ASTType.File)
        expect(file_ast.buf_position[0]).toBe(0)
        expect(file_ast.buf_position[1]).toBe(0)
        expect(file_ast.buf_position[2]).toBe(0)
        expect(file_ast.len).toBe(122)
        expect(file_ast.children.length).toBe(3)

        {
            var child0 = file_ast.children[0]
            expect(child0.type).toBe(ast.ASTType.Fold)
            expect(child0.is_text).toBe(false)
            expect(child0.len).toBe(11)
            expect(child0.buf_position[0]).toBe(0)
            expect(child0.buf_position[1]).toBe(0)
            expect(child0.buf_position[2]).toBe(0)
            expect(child0.is_text).toBe(false)
            expect(child0.text).toBeNull()

            var open_fold_ast = child0.fold_open
            expect(open_fold_ast).toBeTruthy()
            if(open_fold_ast) {
                expect(open_fold_ast.type).toBe(ast.ASTType.FoldOpen)
                expect(open_fold_ast.buf_position[0]).toBe(0)
                expect(open_fold_ast.buf_position[1]).toBe(0)
                expect(open_fold_ast.buf_position[2]).toBe(0)
                expect(open_fold_ast.len).toBe(29)
                expect(open_fold_ast.text).toBe(" This is the first fold")
            }


            var fold_ast2 = child0.fold
            expect(fold_ast2).toBeTruthy()
            if(fold_ast2) {
                expect(fold_ast2.type).toBe(ast.ASTType.Fold)
                expect(fold_ast2.buf_position[0]).toBe(29)
                expect(fold_ast2.buf_position[1]).toBe(1)
                expect(fold_ast2.buf_position[2]).toBe(0)
            }
        }
    })
})