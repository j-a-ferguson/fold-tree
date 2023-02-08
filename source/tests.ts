import { FoldNode } from "./main";

/**
 * Tests isLeft() with Disjoint intervals
 */
test("isLeft1", ()=>{
    var node1 = new FoldNode(0, 10, 20);
    var node2 = new FoldNode(1, 0, 5);

    expect(node1.isLeft(node2)).toBe(false);
    expect(node2.isLeft(node1)).toBe(true);
})

/**
 * Tests isLeft with partial overalpping intervals
 */
test("isLeft2", ()=>{
    var node1 = new FoldNode(0, 10, 20);
    var node2 = new FoldNode(1, 5, 15);

    expect(node1.isLeft(node2)).toBe(false);
    expect(node2.isLeft(node1)).toBe(false);
})

/**
 * Tests isLeft() with interval contained in another
 */
test("isLeft3", ()=>{
    var node1 = new FoldNode(0, 10, 20);
    var node2 = new FoldNode(1, 12, 18);

    expect(node1.isLeft(node2)).toBe(false);
    expect(node2.isLeft(node1)).toBe(false);
})


/**
 * Tests isRight() with Disjoint intervals
 */
test("isRight1", ()=>{
    var node1 = new FoldNode(0, 10, 20);
    var node2 = new FoldNode(1, 0, 5);

    expect(node1.isRight(node2)).toBe(true);
    expect(node2.isRight(node1)).toBe(false);
})

/**
 * Tests isRight() with partial overalpping intervals
 */
test("isRight2", ()=>{
    var node1 = new FoldNode(0, 10, 20);
    var node2 = new FoldNode(1, 5, 15);

    expect(node1.isRight(node2)).toBe(false);
    expect(node2.isRight(node1)).toBe(false);
})

/**
 * Tests isRight() with interval contained in another
 */
test("isRight3", ()=>{
    var node1 = new FoldNode(0, 10, 20);
    var node2 = new FoldNode(1, 12, 18);

    expect(node1.isRight(node2)).toBe(false);
    expect(node2.isRight(node1)).toBe(false);
})

/**
 * Tests isInside() with Disjoint intervals
 */
test("isInside1", ()=>{
    var node1 = new FoldNode(0, 10, 20);
    var node2 = new FoldNode(1, 0, 5);

    expect(node1.isInside(node2)).toBe(false);
    expect(node2.isInside(node1)).toBe(false);
})

/**
 * Tests isInside() with partial overalpping intervals
 */
test("isInside2", ()=>{
    var node1 = new FoldNode(0, 10, 20);
    var node2 = new FoldNode(1, 5, 15);

    expect(node1.isInside(node2)).toBe(false);
    expect(node2.isInside(node1)).toBe(false);
})

/**
 * Tests isInside() with interval contained in another
 */
test("isInside3", ()=>{
    var node1 = new FoldNode(0, 10, 20);
    var node2 = new FoldNode(1, 12, 18);

    expect(node1.isInside(node2)).toBe(false);
    expect(node2.isInside(node1)).toBe(true);    
})

/**
 * Test where two nodes are overlapping
 */
test("isOverlapping1", ()=>{
    var node1 = new FoldNode(0, 10, 20);
    var node2 = new FoldNode(1, 5, 15);

    expect(node1.isOverlapping(node2)).toBe(true);
    expect(node2.isOverlapping(node1)).toBe(true);
})

/**
 * Test where nodes are not overlapping, either to left, right or inside
 */
test("isOverlapping2", ()=>{
    {
        var node1 = new FoldNode(0, 10, 20);
        var node2 = new FoldNode(1, 0, 5);
        expect(node1.isOverlapping(node2)).toBe(false);
        expect(node2.isOverlapping(node1)).toBe(false);
    }
    {
        var node1 = new FoldNode(0, 10, 20);
        var node2 = new FoldNode(1, 12, 18);
        expect(node1.isOverlapping(node2)).toBe(false);
        expect(node2.isOverlapping(node1)).toBe(false);
    }
})

/**
 * Tests addChild
 */
// test("addChild", ()=>{
//     var node1 = new FoldNode(0, 1, 2);    

//     for(var i = 1; i < 10; ++i)
//     {
//         node1.addChild(new FoldNode(i, i + 1, i+2));
//     }
    
//     node1.children.forEach((elem, i) => {
//         console.log(`uid = ${elem.uid}`)
//     });
// })
