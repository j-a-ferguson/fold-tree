
import * as fs from 'fs'


export class FoldNode {

    parent: FoldNode | null = null;
    children : Array<FoldNode> = [];
    uid: number = 0; 
    start_line: number = 0;
    end_line: number = 0;    


    constructor(uid: number, start_line: number, end_line: number) {
        this.uid = uid;
        this.start_line = start_line;
        this.end_line = end_line;
    }

    isMember(val: number): boolean {
        return (val >= this.start_line) && (val<= this.end_line);
    }

    isLeft(node: FoldNode): boolean {
        var is_left = this.end_line < node.start_line;
        return is_left;
    }

    isInside(node: FoldNode): boolean {
        var start_gt = this.start_line > node.start_line;
        var end_gt = this.end_line < node.end_line;
        var inside = start_gt && end_gt;
        return inside;
    }

    isRight(node: FoldNode): boolean {
        var is_right = this.start_line > node.end_line;
        return is_right;
    }

    isOverlapping(node: FoldNode): boolean {
        var is_left = (this.start_line < node.start_line) && node.isMember(this.end_line);
        var is_right = (this.end_line > node.end_line) && node.isMember(this.start_line);
        return (is_left || is_right);
    }

    addChild(node: FoldNode): boolean {
        var node_added = false;
                
        if(!node_added && this.children.length == 0) {
            this.children.push(node);
            node_added = true;
            console.log("here 1")
        }

        if(!node_added && this.children.at(-1)?.isRight(node)) {
            this.children.push(node);    
            node_added = true;
            console.log("here 2")
        }

        if( !node_added ) {
            this.children.every((elem, i) => {    
                if( elem.isLeft(node) ) {
                    console.log(`here 3\ni = ${i}`)
                    this.children.splice(i, 0, node);
                    node_added = true;
                    
                    return false;                    
                }
                else 
                {
                    return true;
                }
            });               
        }
        
        return node_added;
    }

    print(): void {
        console.log(JSON.stringify(this))
    }

}

export class FoldTree {
    
    next_uid: number = 0;
    num_nodes: number = 0;
    root: FoldNode | null = null;

    constructor() {}


    insertNode(start_line: number, end_line: number): void {

    }
}



function main()
{
    var node1 = new FoldNode(0, 1, 2);    

    for(var i = 1; i < 10; ++i)
    {
        node1.addChild(new FoldNode(i, 2*i + 1, 2*i + 2));
    }
    
    node1.children.forEach((elem, i) => {
        console.log(`uid = ${elem.uid} start = ${elem.start_line} end = ${elem.end_line}`)
    });
}

main()

