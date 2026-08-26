class Node {
    constructor(val) {
        this.val = val
        this.next = null
    }
}

class singleLinkList {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }

    push(val) {
        const newNode = new Node(val)
        if (!this.head) {
            this.head = newNode
            this.tail = newNode
        } else {
            this.tail.next = newNode
            this.tail = newNode
        }
        this.length++
        return this
    }

    pop() {
        if (!this.head) return undefined

        // walk to the last node, keeping prev one step behind it
        let prev = null
        let last = this.head
        while (last.next) {
            prev = last
            last = last.next
        }

        // prev === null means `last` was the only node
        if (prev) {
            prev.next = null
        } else {
            this.head = null
        }
        this.tail = prev
        this.length--
        return last
    }

    shift() {
        if (!this.head) return undefined

        const oldHead = this.head
        this.head = oldHead.next
        this.length--
        if (this.length === 0) {
            this.head = null
            this.tail = null
        }
        oldHead.next = null
        return oldHead
    }

    // small helper so the examples below can print the list
    toArray() {
        const arr = []
        let current = this.head
        while (current) {
            arr.push(current.val)
            current = current.next
        }
        return arr
    }
}

// ------------------------- EXAMPLES -------------------------

const list = new singleLinkList()

// push(val) -> adds to the end, returns the list so it can be chained
list.push("A")
list.push("B")
list.push("C").push("D")
console.log("after push       :", list.toArray())                                 // [ 'A', 'B', 'C', 'D' ]
console.log("head/tail/length :", list.head.val, list.tail.val, list.length)      // A D 4

// pop() -> removes the LAST node, returns the removed node
const popped = list.pop()
console.log("popped           :", popped.val)                                     // D
console.log("after pop        :", list.toArray(), "length:", list.length)          // [ 'A', 'B', 'C' ] length: 3
console.log("new tail         :", list.tail.val, "tail.next:", list.tail.next)     // C tail.next: null

// shift() -> removes the FIRST node, returns the removed node
const shifted = list.shift()
console.log("shifted          :", shifted.val)                                    // A
console.log("after shift      :", list.toArray(), "length:", list.length)          // [ 'B', 'C' ] length: 2
console.log("new head         :", list.head.val)                                  // B

// drain it completely -> head and tail go back to null
list.shift()
list.shift()
console.log("emptied          :", list.toArray(), list.length, list.head, list.tail) // [] 0 null null

// pop() / shift() on an empty list -> undefined (no crash)
console.log("pop on empty     :", list.pop())                                     // undefined
console.log("shift on empty   :", list.shift())                                   // undefined

// single-node edge case
const one = new singleLinkList()
one.push(42)
console.log("pop only node    :", one.pop().val, "| length:", one.length, "| head:", one.head, "| tail:", one.tail) // 42 | length: 0 | head: null | tail: null

one.push(99)
console.log("shift only node  :", one.shift().val, "| length:", one.length, "| head:", one.head, "| tail:", one.tail) // 99 | length: 0 | head: null | tail: null
