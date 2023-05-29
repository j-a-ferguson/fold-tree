import { SourcePos } from "./utils"

export class BaseAst {
    src_pos: SourcePos = new SourcePos("", 0, 0, 0, 0)
}

export class FileAst extends BaseAst {

    children: Array<FoldAst | TextAst> = []
} 

export class FoldAst extends BaseAst {

    header_text: string = ""
    indent: number = 0
    children: Array<FoldAst | TextAst> = []
}

export class TextAst extends BaseAst {

    is_empty: boolean = false
}

export type AnyAst = FileAst | FoldAst | TextAst