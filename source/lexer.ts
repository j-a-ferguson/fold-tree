import { SourcePos } from "./utils"

const COMMENTS: Record<string, string> = { c: "//", cpp: "//", python: "#", rust: "//" }
const OPEN_FOLD_MARKER: string = "\{\{\{"
const CLOSE_FOLD_MARKER: string = "\}\}\}"

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
}


export class Lexer {

    private open_bracket_regex: string = ""
    private close_bracket_regex: string = ""

    private buffer: string = ""
    private buffer_ptr: number = 0
    private buffer_line: number = 0
    private line_len: number = 0

    private tokens: Array<Token> = []
    private cur_tok_idx: number = 0

    constructor(lang: string, buffer: string) {
        let comment = COMMENTS[lang]
        this.open_bracket_regex = `^\\s*${comment}${OPEN_FOLD_MARKER}.*$`
        this.close_bracket_regex = `^\\s*${comment}${CLOSE_FOLD_MARKER}$`
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
        for (let line of this.buffer.split('\n')) {
            
            this.line_len = line.length
            let src_pos = this.getSourcePos()

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
                src_pos.len += 1
                let new_token = new Token(TokenType.Textline, src_pos)
                this.tokens.push(new_token)
            }

            ++this.buffer_line
            // the plus one is for the newline character
            this.buffer_ptr += (this.line_len + 1)
        }

        let src_pos = this.getSourcePos()
        this.tokens.push(new Token(TokenType.EOI, src_pos))
    }

    private getSourcePos(): SourcePos {
        let src_pos = new SourcePos(this.buffer,
            this.buffer_ptr,
            this.line_len,
            this.buffer_line, 
            0)
        return src_pos
    }
}