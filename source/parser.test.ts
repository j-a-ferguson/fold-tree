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