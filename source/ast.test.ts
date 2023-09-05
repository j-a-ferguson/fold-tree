
import * as fs from 'fs'
import {readFile} from './utils'
import * as parser from './parser'
import * as ast from './ast'


describe("Tests for querying the ast node at a given line", () => {

    test("nodeAtLine0", () => {

        let text = readFile('assets/file2.c')
        let par = new parser.Parser('c', text)
        let ast_root: ast.FileAst = par.parseFile()

        let ast_node = ast_root.nodeAtLine(0)
        let correct_ast_node = Object.assign(new ast.TextAst(),
            {
                "type": "Text",
                "src_pos": {
                    "buffer": "\n// single fold\n//{{{ fold with comment\nHello this is some text\n//}}}\n\n// This is a \n// text node\n// here\n// nested folds\n//{{{ col: collection 1 \n\n\n    //{{{ col: collection 2\n        \n    //}}}\n\n    //{{{ col: collection 3\n\n        //{{{ col: collection 4\n\n        //}}}\n\n    //}}}\n\n//}}}\n\nint fcn(double val)\n{\n    int a = 1;\n    int b = 2;\n    {\n        double d = 1.0;\n    }\n\n\n    if(a == 1)\n    {\n        int c = 4;\n    }\n    \n    return a;\n}",
                    "offset": 0,
                    "len": 16,
                    "line": 0,
                    "col": 0
                },
                "is_empty": false
            })

        expect(ast_node).toEqual(correct_ast_node)
    })


    test("nodeAtLine10", () => {
        let text = readFile('assets/file2.c')
        let par = new parser.Parser('c', text)
        let ast_root: ast.FileAst = par.parseFile()
        let ast_node = ast_root.nodeAtLine(10)
        let correct_ast_node = Object.assign(new ast.FoldAst(),
            {
                "type": "Fold",
                "src_pos": {
                    "buffer": "\n// single fold\n//{{{ fold with comment\nHello this is some text\n//}}}\n\n// This is a \n// text node\n// here\n// nested folds\n//{{{ col: collection 1 \n\n\n    //{{{ col: collection 2\n        \n    //}}}\n\n    //{{{ col: collection 3\n\n        //{{{ col: collection 4\n\n        //}}}\n\n    //}}}\n\n//}}}\n\nint fcn(double val)\n{\n    int a = 1;\n    int b = 2;\n    {\n        double d = 1.0;\n    }\n\n\n    if(a == 1)\n    {\n        int c = 4;\n    }\n    \n    return a;\n}",
                    "offset": 122,
                    "len": 169,
                    "line": 10,
                    "col": 0
                },
                "header_text": " col: collection 1 ",
                "indent": 0,
                "children": [
                    {
                        "type": "Text",
                        "src_pos": {
                            "buffer": "\n// single fold\n//{{{ fold with comment\nHello this is some text\n//}}}\n\n// This is a \n// text node\n// here\n// nested folds\n//{{{ col: collection 1 \n\n\n    //{{{ col: collection 2\n        \n    //}}}\n\n    //{{{ col: collection 3\n\n        //{{{ col: collection 4\n\n        //}}}\n\n    //}}}\n\n//}}}\n\nint fcn(double val)\n{\n    int a = 1;\n    int b = 2;\n    {\n        double d = 1.0;\n    }\n\n\n    if(a == 1)\n    {\n        int c = 4;\n    }\n    \n    return a;\n}",
                            "offset": 147,
                            "len": 2,
                            "line": 11,
                            "col": 0
                        },
                        "is_empty": false
                    },
                    {
                        "type": "Fold",
                        "src_pos": {
                            "buffer": "\n// single fold\n//{{{ fold with comment\nHello this is some text\n//}}}\n\n// This is a \n// text node\n// here\n// nested folds\n//{{{ col: collection 1 \n\n\n    //{{{ col: collection 2\n        \n    //}}}\n\n    //{{{ col: collection 3\n\n        //{{{ col: collection 4\n\n        //}}}\n\n    //}}}\n\n//}}}\n\nint fcn(double val)\n{\n    int a = 1;\n    int b = 2;\n    {\n        double d = 1.0;\n    }\n\n\n    if(a == 1)\n    {\n        int c = 4;\n    }\n    \n    return a;\n}",
                            "offset": 149,
                            "len": 47,
                            "line": 13,
                            "col": 0
                        },
                        "header_text": " col: collection 2",
                        "indent": 0,
                        "children": [
                            {
                                "type": "Text",
                                "src_pos": {
                                    "buffer": "\n// single fold\n//{{{ fold with comment\nHello this is some text\n//}}}\n\n// This is a \n// text node\n// here\n// nested folds\n//{{{ col: collection 1 \n\n\n    //{{{ col: collection 2\n        \n    //}}}\n\n    //{{{ col: collection 3\n\n        //{{{ col: collection 4\n\n        //}}}\n\n    //}}}\n\n//}}}\n\nint fcn(double val)\n{\n    int a = 1;\n    int b = 2;\n    {\n        double d = 1.0;\n    }\n\n\n    if(a == 1)\n    {\n        int c = 4;\n    }\n    \n    return a;\n}",
                                    "offset": 177,
                                    "len": 9,
                                    "line": 14,
                                    "col": 0
                                },
                                "is_empty": false
                            }
                        ]
                    },
                    {
                        "type": "Text",
                        "src_pos": {
                            "buffer": "\n// single fold\n//{{{ fold with comment\nHello this is some text\n//}}}\n\n// This is a \n// text node\n// here\n// nested folds\n//{{{ col: collection 1 \n\n\n    //{{{ col: collection 2\n        \n    //}}}\n\n    //{{{ col: collection 3\n\n        //{{{ col: collection 4\n\n        //}}}\n\n    //}}}\n\n//}}}\n\nint fcn(double val)\n{\n    int a = 1;\n    int b = 2;\n    {\n        double d = 1.0;\n    }\n\n\n    if(a == 1)\n    {\n        int c = 4;\n    }\n    \n    return a;\n}",
                            "offset": 196,
                            "len": 1,
                            "line": 16,
                            "col": 0
                        },
                        "is_empty": false
                    },
                    {
                        "type": "Fold",
                        "src_pos": {
                            "buffer": "\n// single fold\n//{{{ fold with comment\nHello this is some text\n//}}}\n\n// This is a \n// text node\n// here\n// nested folds\n//{{{ col: collection 1 \n\n\n    //{{{ col: collection 2\n        \n    //}}}\n\n    //{{{ col: collection 3\n\n        //{{{ col: collection 4\n\n        //}}}\n\n    //}}}\n\n//}}}\n\nint fcn(double val)\n{\n    int a = 1;\n    int b = 2;\n    {\n        double d = 1.0;\n    }\n\n\n    if(a == 1)\n    {\n        int c = 4;\n    }\n    \n    return a;\n}",
                            "offset": 197,
                            "len": 87,
                            "line": 17,
                            "col": 0
                        },
                        "header_text": " col: collection 3",
                        "indent": 0,
                        "children": [
                            {
                                "type": "Text",
                                "src_pos": {
                                    "buffer": "\n// single fold\n//{{{ fold with comment\nHello this is some text\n//}}}\n\n// This is a \n// text node\n// here\n// nested folds\n//{{{ col: collection 1 \n\n\n    //{{{ col: collection 2\n        \n    //}}}\n\n    //{{{ col: collection 3\n\n        //{{{ col: collection 4\n\n        //}}}\n\n    //}}}\n\n//}}}\n\nint fcn(double val)\n{\n    int a = 1;\n    int b = 2;\n    {\n        double d = 1.0;\n    }\n\n\n    if(a == 1)\n    {\n        int c = 4;\n    }\n    \n    return a;\n}",
                                    "offset": 225,
                                    "len": 1,
                                    "line": 18,
                                    "col": 0
                                },
                                "is_empty": false
                            },
                            {
                                "type": "Fold",
                                "src_pos": {
                                    "buffer": "\n// single fold\n//{{{ fold with comment\nHello this is some text\n//}}}\n\n// This is a \n// text node\n// here\n// nested folds\n//{{{ col: collection 1 \n\n\n    //{{{ col: collection 2\n        \n    //}}}\n\n    //{{{ col: collection 3\n\n        //{{{ col: collection 4\n\n        //}}}\n\n    //}}}\n\n//}}}\n\nint fcn(double val)\n{\n    int a = 1;\n    int b = 2;\n    {\n        double d = 1.0;\n    }\n\n\n    if(a == 1)\n    {\n        int c = 4;\n    }\n    \n    return a;\n}",
                                    "offset": 226,
                                    "len": 47,
                                    "line": 19,
                                    "col": 0
                                },
                                "header_text": " col: collection 4",
                                "indent": 0,
                                "children": [
                                    {
                                        "type": "Text",
                                        "src_pos": {
                                            "buffer": "\n// single fold\n//{{{ fold with comment\nHello this is some text\n//}}}\n\n// This is a \n// text node\n// here\n// nested folds\n//{{{ col: collection 1 \n\n\n    //{{{ col: collection 2\n        \n    //}}}\n\n    //{{{ col: collection 3\n\n        //{{{ col: collection 4\n\n        //}}}\n\n    //}}}\n\n//}}}\n\nint fcn(double val)\n{\n    int a = 1;\n    int b = 2;\n    {\n        double d = 1.0;\n    }\n\n\n    if(a == 1)\n    {\n        int c = 4;\n    }\n    \n    return a;\n}",
                                            "offset": 258,
                                            "len": 1,
                                            "line": 20,
                                            "col": 0
                                        },
                                        "is_empty": false
                                    }
                                ]
                            },
                            {
                                "type": "Text",
                                "src_pos": {
                                    "buffer": "\n// single fold\n//{{{ fold with comment\nHello this is some text\n//}}}\n\n// This is a \n// text node\n// here\n// nested folds\n//{{{ col: collection 1 \n\n\n    //{{{ col: collection 2\n        \n    //}}}\n\n    //{{{ col: collection 3\n\n        //{{{ col: collection 4\n\n        //}}}\n\n    //}}}\n\n//}}}\n\nint fcn(double val)\n{\n    int a = 1;\n    int b = 2;\n    {\n        double d = 1.0;\n    }\n\n\n    if(a == 1)\n    {\n        int c = 4;\n    }\n    \n    return a;\n}",
                                    "offset": 273,
                                    "len": 1,
                                    "line": 22,
                                    "col": 0
                                },
                                "is_empty": false
                            }
                        ]
                    },
                    {
                        "type": "Text",
                        "src_pos": {
                            "buffer": "\n// single fold\n//{{{ fold with comment\nHello this is some text\n//}}}\n\n// This is a \n// text node\n// here\n// nested folds\n//{{{ col: collection 1 \n\n\n    //{{{ col: collection 2\n        \n    //}}}\n\n    //{{{ col: collection 3\n\n        //{{{ col: collection 4\n\n        //}}}\n\n    //}}}\n\n//}}}\n\nint fcn(double val)\n{\n    int a = 1;\n    int b = 2;\n    {\n        double d = 1.0;\n    }\n\n\n    if(a == 1)\n    {\n        int c = 4;\n    }\n    \n    return a;\n}",
                            "offset": 284,
                            "len": 1,
                            "line": 24,
                            "col": 0
                        },
                        "is_empty": false
                    }
                ]
            })
        expect(ast_node).toEqual(correct_ast_node)
    })
})