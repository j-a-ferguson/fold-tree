import {readFileSync} from 'fs'

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

    get text(): string {

        let out_text = ""
        if (this.buffer) {
            for(let i = this.line; i < this.line + this.len; ++i) {
                out_text = out_text + this.buffer[i]
            }
        }
        return out_text
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