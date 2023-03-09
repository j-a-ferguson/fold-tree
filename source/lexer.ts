import * as def from './def'

export enum TokenType {
    Comment = "Comment", // matches "//" for c-like languages etc
    OpenBracket = "OpenBracket", // matches regex "\{\{\{"
    CloseBracket = "CloseBracket", // matches regex "\}\}\}"
    Newline = "Newline", // matches regex "\n"
    Text = "Text", // matches  regex "[^\n]" 
    EOI = "EOI",
    Unknown = "Unknown"
}

/**
 * Each token is an implementation of this interface
 * The type tells us what kind of token this is.
 * The buf_position has the following meaning: 
 * - buf_position[0] is the character offset value
 * - buf_position[1] and buf_position[2] are the equivalent line and
 *   column numbers
 * len is the 
 * 
 * @interface TokenNode
 */
export interface TokenNode<T extends TokenType> {
    type: T
    buf_position: [number, number, number]
    len: number
}

export type Token = TokenNode<TokenType.Comment> |
    TokenNode<TokenType.OpenBracket> |
    TokenNode<TokenType.CloseBracket> |
    TokenNode<TokenType.Newline> |
    TokenNode<TokenType.Text> |
    TokenNode<TokenType.EOI> |
    TokenNode<TokenType.Unknown>

/**
 * This class represents a lexer for our fold language
 */
export class Lexer {

    eoi: TokenNode<TokenType.EOI> = {
        type: TokenType.EOI,
        buf_position: [0, 0, 0],
        len: 0
    }
    unknown: TokenNode<TokenType.Unknown> = {
        type: TokenType.Unknown,
        buf_position: [0, 0, 0],
        len: 0 
    }
    private comment: string = ''
    private buffer: string = ''
    private buffer_ptr: number = 0
    private buffer_line: number = 0
    private buffer_col: number = 0

    private current_text: string = ''
    private token_stack: Array<Token> = []

    private token_queue: Array<Token> = []

    constructor(lang: string, buffer: string) {
        this.comment = def.comments[lang]
        this.buffer = buffer;

        this.token_queue.push(this.nextInternal())
        this.token_queue.push(this.nextInternal())

    }


    next() {

        var out_token = this.token_queue.shift()
        this.token_queue.push(this.nextInternal())
        if(out_token){
            return out_token
        }
        else {
            throw new Error("Queue is empty")
        }
    }

    peek() {
        var out_token = this.token_queue[1]
        if(out_token){
            return out_token
        }
        else {
            throw new Error("Queue is too short")
        }
    }

    private nextInternal() {

        var next_token: Token = this.unknown
        var tmp_token = this.token_stack.pop()

        if (tmp_token) {
            next_token = tmp_token
            this.incrementByToken(next_token)
        }
        else {
            if (!this.nextChar(1)) {
                next_token = this.eoi
            }
            else {
                var state: number = 0
                var found: boolean = false
                while (this.buffer_ptr < this.buffer.length) {
                    switch (state) {
                        case 0:
                            {
                                var next_char = this.nextChar(0);
                                switch (next_char) {
                                    case this.comment[0]:
                                        {
                                            state = 1
                                        }
                                        break;
                                    case '\{':
                                        {
                                            state = 2
                                        }
                                        break;
                                    case '\}':
                                        {
                                            state = 3
                                        }
                                        break;
                                    case '\n':
                                        {
                                            state = 4
                                        }
                                        break;
                                    default:
                                        {
                                            state = 5
                                        }
                                        break;
                                }
                            }
                            break;
                        case 1:
                            {
                                var match: boolean = true
                                for(var i = 1; i < this.comment.length; ++i){
                                    var peek = this.nextChar(i)
                                    match &&= (peek == this.comment[i])
                                }
                                if (match) {
                                    next_token = {
                                        type: TokenType.Comment,
                                        buf_position: [
                                            this.buffer_ptr,
                                            this.buffer_line,
                                            this.buffer_col
                                        ],
                                        len: this.comment.length
                                    }
                                    found = true;
                                }
                                else {
                                    this.incrementByChar()
                                    state = 0
                                }
                            }
                            break;
                        case 2:
                            {
                                var peek1 = this.nextChar(1)
                                var peek2 = this.nextChar(2)
                                if (peek1 == '\{' && peek2 == '\{') {
                                    next_token = {
                                        type: TokenType.OpenBracket,
                                        buf_position: [
                                            this.buffer_ptr,
                                            this.buffer_line,
                                            this.buffer_col
                                        ],
                                        len: 3
                                    }
                                    found = true;
                                }
                                else {
                                    this.incrementByChar()
                                    state = 0
                                }
                            }
                            break;
                        case 3:
                            {
                                var peek1 = this.nextChar(1)
                                var peek2 = this.nextChar(2)
                                if (peek1 == '\}' && peek2 == '\}') {
                                    next_token = {
                                        type: TokenType.CloseBracket,
                                        buf_position: [
                                            this.buffer_ptr,
                                            this.buffer_line,
                                            this.buffer_col
                                        ],
                                        len: 3
                                    }
                                    found = true;
                                }
                                else {
                                    this.incrementByChar()
                                    state = 0
                                }
                            }
                            break;
                        case 4:
                            {
                                next_token = {
                                    type: TokenType.Newline,
                                    buf_position: [
                                        this.buffer_ptr,
                                        this.buffer_line,
                                        this.buffer_col
                                    ],
                                    len: 1
                                }
                                found = true;
                            }
                            break;
                        case 5:
                            {

                                this.incrementByChar()
                                state = 0
                            }
                            break;

                    }

                    if (found) {

                        if (this.current_text.length > 0) {
                            this.token_stack.push(next_token)
                            next_token = {
                                type: TokenType.Text,
                                buf_position: [
                                    this.buffer_ptr - this.current_text.length,
                                    this.buffer_line,
                                    this.buffer_col - this.current_text.length
                                ],
                                len: this.current_text.length
                            }
                            this.current_text = ''
                        }
                        this.incrementByToken(next_token)
                        break;
                    }

                }
            }
        }
        return next_token
    }

    nextChar(idx: number): string | undefined {

        var next_char: string | undefined = ''
        next_char = this.buffer[this.buffer_ptr + idx];
        return next_char;
    }

    incrementByToken(token: Token) {

        if (token.type != TokenType.Text) {
            this.buffer_ptr += token.len

            if (token.type == TokenType.Newline) {
                this.buffer_line += 1;
                this.buffer_col = 0
            }
            else {
                this.buffer_col += token.len
            }
        }

    }

    incrementByChar() {
        this.current_text = this.current_text.concat(this.buffer[this.buffer_ptr])
        this.buffer_ptr += 1
        this.buffer_col += 1
    }
}