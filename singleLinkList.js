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

        let current = this.head
        let newTail = current
        while (current.next) {
            newTail = current
            current = current.next
        }
        if (this.head === current) {
            this.head = null
            this.tail = null
        } else {
            this.tail = newTail
            this.tail.next = null
        }
        this.length--
        return this

    }

    shift() {
        if (!this.head) return undefined
        let currenthead = this.head
        this.head = currenthead.next
        this.length--
        if (this.length === 0) {
            this.head = null
            this.tail = null
        }
        return this
    }

    unshift(val) {
        const newNode = new Node(val)
        if (!this.head) {
            this.head = newNode
            this.tail = newNode
        } else {
            newNode.next = this.head
            this.head = newNode
        }

        this.length++
        return this
    }

    get(index) {
        if (index >= this.length || index < 0) return undefined

        let counter = 0
        let nodeval = this.head
        while (counter !== index) {
            nodeval = nodeval.next
            counter++
        }

        return nodeval
    }

    reverse() {
        if (!this.head) return undefined
        let current = this.head
        let previous = null
        let next
        this.tail = current
        while (current) {
            next = current.next
            current.next = previous
            previous = current
            current = next

        }
        this.head = previous
        return this
    }

    set(index, val) {
        if (index >= this.length || index < 0) return undefined

        let counter = 0
        let nodeval = this.head
        while (counter !== index) {
            nodeval = nodeval.next
            counter++
        }

        nodeval.val = val

        return this

    }
    remove(index) {
        if (index < 0 || index >= this.length) return undefined;

        if (index === 0) {
            this.head = this.head.next;
            this.length--;

            if (this.length === 0) {
                this.tail = null;
            }

            return this;
        }

        let current = this.head;

        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }

        if (index === this.length - 1) {
            this.tail = current;
        }

        current.next = current.next.next;
        this.length--;

        return this;
    }
}