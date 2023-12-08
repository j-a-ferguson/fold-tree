import {readFileSync} from 'fs'


export function assert(condition: boolean, message: string)
{
    if(!condition) throw new Error(message)
}

/**
 * This utility class represents a subview of a set of textlines.
 */
export class SourcePos {

    public buffer: Array<string> = []
    public line: number = 0
    public len: number = 0

    /**
     * 
     * @param buffer Array of lines in file
     * @param line Starting line 
     * @param len 
     */
    constructor(buffer: Array<string>, line: number, len: number) {
        this.buffer = buffer
        this.line = line
        this.len = len
    }

    get end(): number {
        return this.line + this.len -1
    }

    get text(): string {

        let out_text = ""
        if (this.buffer) {
            for(let i = this.line; i < this.line + this.len; ++i) {
                out_text = out_text + this.buffer[i]
            }
        }
        return out_text
    }

    addText(line: number, text: string): number {

        assert(line >= this.line && line < this.line + this.len, 
            "line out of bounds");

        let text_arr = text.split('\n')
        this.buffer.splice(line, 0, ...text_arr)
        return text_arr.length
    }

    indent(line: number): number {

        assert(line >= this.line && line < this.line + this.len, 
            "line out of bounds");

        let line_str = this.buffer[line] 
        let match  = line_str.match(/^\s*/)
        return match ? match[0].length : 0
    }
}

/**
 * Small utiltiy for reading files, splitting into lines and preserving the 
 * newline characters at the end of each element, except the last.
 * 
 * @param filename Name of file to read
 * @returns Array where each element is a line of the input file. 
 *          All elements except the last will still have the newline 
 *          character at the end.
 */
export function readFile(filename: string): Array<string> {
    let text = readFileSync(filename, 'utf-8')
    let textlines = text.split('\n')
    for(let i = 0; i < textlines.length -1; ++i) {
        textlines[i] = textlines[i] + "\n"
    }
    return textlines
}