class Node {
    next?: Node;
    constructor(public readonly value: number) {}
}

const n1 = new Node(1);
const n2 = new Node(2);
const n3 = new Node(3);
const n4 = new Node(4);
const n5 = new Node(5);

n1.next = n2;
n2.next = n3;
n3.next = n4;
n4.next = n5;


function reverse(node: Node) {
    let list: Node | undefined = node;
    let prevNode: Node | undefined = undefined;
    let nextNodeToProcess: Node | undefined = undefined;

    while (list) {
        nextNodeToProcess = list.next;
        list.next = prevNode;
        prevNode = list;
        list = nextNodeToProcess;                
    }
    return prevNode; 
}

const reversedHead = reverse(n1);

let currentNodeToPrint = reversedHead;

while (currentNodeToPrint) {
    console.log(currentNodeToPrint.value);
    currentNodeToPrint = currentNodeToPrint.next;
}
