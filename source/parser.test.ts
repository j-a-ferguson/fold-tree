import * as fs from 'fs'
import * as lexer from './lexer'
import * as parser from './parser'
import * as ast from './ast'


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


test("parseOpenFold2", ()=> {
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
        var lex = new lexer.Lexer('c', open_fold_text )
        var par = new parser.Parser(lex)
        expect(() => par.parseFoldOpen()).toThrow()
    }
    {
        const open_fold_text = fs.readFileSync('assets/close-fold1.c', 'utf8')
        var lex = new lexer.Lexer('c', open_fold_text )
        var par = new parser.Parser(lex)
        expect(() => par.parseFoldOpen()).toThrow()
    }
})


test("parseSingleFold1", () => {

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
    if(fold_ast.text)
    {
        var text_ast = fold_ast.text
        expect(text_ast.type).toBe(ast.ASTType.Text)
        expect(text_ast.buf_position[0]).toBe(0)
        expect(text_ast.buf_position[1]).toBe(0)
        expect(text_ast.buf_position[2]).toBe(0)
        expect(text_ast.is_empty).toBe(false)
        expect(text_ast.len).toBe(291)
    }
})

test("parseSingleFold2", () => {
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
    expect(single_fold_ast.text).toBeNull()

    expect(single_fold_ast.fold_open).toBeDefined()
    if(single_fold_ast.fold_open)
    {
        var fold_open_ast = single_fold_ast.fold_open
        expect(fold_open_ast.type).toBe(ast.ASTType.FoldOpen)
        expect(fold_open_ast.buf_position[0]).toBe(0);
        expect(fold_open_ast.buf_position[1]).toBe(0);
        expect(fold_open_ast.buf_position[2]).toBe(0);
        expect(fold_open_ast.len).toBe(21)
        expect(fold_open_ast.text).toBe(' This is a fold')
    }

    expect(single_fold_ast.fold).toBeDefined()
    if(single_fold_ast.fold)
    {
        var inner_fold_ast = single_fold_ast.fold
        expect(inner_fold_ast.type).toBe(ast.ASTType.Fold)
        expect(inner_fold_ast.buf_position[0]).toBe(0)
        expect(inner_fold_ast.buf_position[1]).toBe(0)
        expect(inner_fold_ast.buf_position[2]).toBe(0)
        expect(inner_fold_ast.len).toBe(291)
        expect(inner_fold_ast.fold_open).toBeNull()
        expect(inner_fold_ast.fold).toBeNull()
        expect(inner_fold_ast.fold_close).toBeNull()
        expect(inner_fold_ast.text).toBeTruthy()
        if(inner_fold_ast.text)
        {
            var text_ast = inner_fold_ast.text
            expect(text_ast.type).toBe(ast.ASTType.Text)
            expect(text_ast.buf_position[0]).toBe(0)
            expect(text_ast.buf_position[1]).toBe(0)
            expect(text_ast.buf_position[2]).toBe(0)
            expect(text_ast.is_empty).toBe(false)
            expect(text_ast.len).toBe(291)
        }

    }
})