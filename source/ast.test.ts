
import * as fs from 'fs'
import * as parser from './parser'
import * as ast from './ast'


describe("Tests for querying the ast node at a given line", () => {

    test("nodeAtLine", () => {

        let text: string = fs.readFileSync('assets/file2.c', 'utf-8')
        let par = new parser.Parser('c', text)
        let ast_root: ast.FileAst = par.parseFile()
        
        { // line 0
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
        }
        { // line 
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
        }
    })
})