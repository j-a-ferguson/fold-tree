import { SourcePos } from "./utils"

const COMMENTS: Record<string, string> = { c: "//", cpp: "//", python: "#", rust: "//" }
export const OPEN_FOLD_MARKER: string = "\{\{\{"
export const CLOSE_FOLD_MARKER: string = "\}\}\}"

export let global_comment = ''

export enum TokenType {
    OpenBracket = "OpenBracket", // matches open bracket regex"
    CloseBracket = "CloseBracket", // matches close bracket regex"
    Textline = "Textline", // matches a non bracket line of text
    EOI = "EOI",
    Unknown = "Unknown"
}

export class Token {

    constructor(public type: TokenType = TokenType.Unknown,
        public src_pos: SourcePos) { }

    errorString(): string {
        return `Unexpected token: ${this.type} at line ${this.src_pos.line}`
    }
    isOfType(...types: TokenType[]): boolean {

        let is_of_type = false
        for (let type of types) {
            is_of_type = is_of_type || (this.type == type)
            if (is_of_type) break;
        }
        return is_of_type
    }

    indent(): number {
        return this.src_pos.indent(this.src_pos.line)
    }
}


export class Lexer {

    private open_bracket_regex: string = ""
    private close_bracket_regex: string = ""

    private buffer: Array<string> = []

    private tokens: Array<Token> = []
    private cur_tok_idx: number = 0

    constructor(lang: string, buffer: Array<string>) {
        let comment = COMMENTS[lang]
        global_comment = comment
        this.open_bracket_regex = `^\\s*${comment}${OPEN_FOLD_MARKER}.*\n?$`
        this.close_bracket_regex = `^\\s*${comment}${CLOSE_FOLD_MARKER}\n?$`
        this.buffer = buffer
        this.performLexing()
    }

    next(): Token {
        let next_tok = this.tokens[this.cur_tok_idx]
        ++this.cur_tok_idx
        return next_tok
    }

    prev(): Token {
        --this.cur_tok_idx
        let prev_tok = this.tokens[this.cur_tok_idx]
        return prev_tok
    }

    peek(jump: number = 1): Token {
        return this.tokens[this.cur_tok_idx + jump]
    }

    private performLexing() {

        let ob_regex = new RegExp(this.open_bracket_regex)
        let cb_regex = new RegExp(this.close_bracket_regex)


        let buffer_ptr = 0

        for (const [idx, line] of this.buffer.entries()) {
            let src_pos = new SourcePos(this.buffer, idx, 1)

            let match1 = ob_regex.test(line)
            let match2 = cb_regex.test(line)

            if (match1) {
                // if the line matches the open bracket regex
                let new_token = new Token(TokenType.OpenBracket, src_pos)
                this.tokens.push(new_token)
            }
            else if (match2) {
                // if the line matches the close bracket regex
                let new_token = new Token(TokenType.CloseBracket, src_pos)
                this.tokens.push(new_token)
            }
            else {
                // if the line matches neither bracker regex
                let new_token = new Token(TokenType.Textline, src_pos)
                this.tokens.push(new_token)
            }
        }

        let src_pos = new SourcePos(this.buffer, this.buffer.length, 0)
        this.tokens.push(new Token(TokenType.EOI, src_pos))
    }
}