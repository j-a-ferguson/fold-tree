
export class SourcePos {

    constructor(public buffer: string,
        public offset: number = 0,
        public len: number = 0,
        public line: number = 0,
        public col: number = 0) { }

    text() {
        return this.buffer?.substring(this.offset, this.offset + this.len);
    }

    get end() : number {
        return this.offset + this.len
    }
}



export function numLines(text: string): number {
    let matches = text.match(/n/g)
    return matches ? matches.length + 1 : 1
}