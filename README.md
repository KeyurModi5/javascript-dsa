# javascript-dsa

Data structures and algorithms implemented from scratch in plain JavaScript, for practice.
No dependencies, no build step — every file runs directly under Node.

## Contents

| File | Structure |
| --- | --- |
| [`singleLinkList.js`](singleLinkList.js) | Singly linked list |

## Running

Each file has a set of runnable examples at the bottom, so executing it prints a
walkthrough of every method:

```bash
node singleLinkList.js
```

## Singly linked list

A list of `Node`s where each node holds a value and a single `next` pointer.
The list tracks `head`, `tail`, and `length`.

```js
const list = new singleLinkList()
list.push("A").push("B").push("C")

list.toArray()   // [ 'A', 'B', 'C' ]
list.pop().val   // 'C'
list.shift().val // 'A'
list.length      // 1
```

### API

| Method | Returns | Time | Notes |
| --- | --- | --- | --- |
| `push(val)` | the list | O(1) | Appends to the end. Chainable. |
| `pop()` | removed node, or `undefined` | O(n) | Must walk the whole list to find the node before the tail — a singly linked list has no back pointers. |
| `shift()` | removed node, or `undefined` | O(1) | Removes from the front. |
| `toArray()` | array of values | O(n) | Helper for printing/inspecting. |

`pop()` and `shift()` return the **removed node** (not the list), so the value is
available as `.val`. Both return `undefined` on an empty list rather than throwing.
When the last node is removed, `head` and `tail` are both reset to `null` and
`length` is `0`.

`push()` returns the list itself so calls can be chained.

### Why `pop()` is O(n)

Removing the tail means the new tail's `next` has to be set to `null`, and the only
way to reach that node is from the head. `pop()` therefore walks the list with two
pointers — `last` and a `prev` trailing one step behind — and uses `prev === null`
to detect the single-node case. A doubly linked list makes this O(1); that's the
main reason it exists.

### Not implemented yet

`unshift`, `get(index)`, `set(index, val)`, `insert(index, val)`, `remove(index)`,
`reverse`.
