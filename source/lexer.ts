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

type Token = TokenNode<TokenType.Comment> |
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
    comment: string = ''
    buffer: string = ''
    buffer_ptr: number = 0
    buffer_line: number = 0
    buffer_col: number = 0

    constructor(lang: string, buffer: string) {
        this.comment = def.comments[lang]
        this.buffer = buffer;        
    }


    next() {

        var next_token: Token = { type: TokenType.Unknown, 
                                  buf_position: [0, 0, 0], 
                                  len: 0 };

        if (!this.nextChar(0)) {
            next_token = this.eoi
        }
        else 
        {
            var state: number = 0
            var found: boolean  = false
            while(true)
            {
                switch(state)
                {
                    case 0:
                    {
                        var next_char = this.nextChar(0);
                        switch(next_char)
                        {
                            case '/': 
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
                        var peek = this.nextChar(1)
                        if(peek == '/')
                        {
                            next_token = {
                                type: TokenType.Comment, 
                                buf_position: [
                                    this.buffer_ptr,
                                    this.buffer_line, 
                                    this.buffer_col
                                ],
                                len: 2
                            }                            
                            found = true;                            
                        }
                        else 
                        {
                            this.buffer_ptr += 1;
                            state = 0
                        }
                    }
                    break;
                    case 2: 
                    {
                        var peek1 = this.nextChar(1)
                        var peek2 = this.nextChar(2)
                        if(peek1 == '\{' && peek2 == '\{')
                        {
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
                        else 
                        {
                            this.buffer_ptr += 1;
                            state = 0
                        }
                    }
                    break;
                    case 3: 
                    {
                        var peek1 = this.nextChar(1)
                        var peek2 = this.nextChar(2)
                        if(peek1 == '\}' && peek2 == '\}')
                        {
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
                        else 
                        {
                            this.buffer_ptr += 1;
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
                    case 5:
                    {                           
                        this.incrementByChar()
                        state = 0
                    }
                    
                }
                if(found) 
                {
                    this.incrementByToken(next_token)
                    break;
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
        this.buffer_ptr += token.len
        if(token.type == TokenType.Newline) 
        {
            this.buffer_line += 1;
            this.buffer_col = 0
        }
        else 
        {
            this.buffer_col += token.len
        }
        
        
        
    }
    
    incrementByChar() {
        this.buffer_ptr += 1
        this.buffer_col += 1
    }
}