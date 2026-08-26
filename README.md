# javascript-dsa

Data structures and algorithms implemented from scratch in plain JavaScript, for practice.
No dependencies, no build step — every file runs directly under Node.

## Contents

| File | Structure |
| --- | --- |
| [`singleLinkList.js`](singleLinkList.js) | Singly linked list |

## Running

The file declares `Node` and `singleLinkList` and prints nothing on its own:

```bash
node singleLinkList.js   # runs, no output
```

To exercise it, append some calls to the bottom of the file, or paste the classes
into a `node` REPL.

## Singly linked list

A list of `Node`s where each node holds a value and a single `next` pointer.
The list tracks `head`, `tail`, and `length`.

```js
const list = new singleLinkList()
list.push("B").push("C")   // B -> C
list.unshift("A")          // A -> B -> C
list.get(1).val            // 'B'
list.shift()               // B -> C
list.reverse()             // C -> B
list.length                // 2
```

### API

| Method | Returns | Time | Notes |
| --- | --- | --- | --- |
| `push(val)` | the list | O(1) | Appends to the end. |
| `unshift(val)` | the list | O(1) | Prepends to the front. |
| `shift()` | the list, or `undefined` if empty | O(1) | Removes the first node. |
| `pop()` | the list, or `undefined` if empty | O(n) | Removes the last node. |
| `get(index)` | the node, or `undefined` if out of range | O(n) | 0-based; returns the node, so read `.val`. |
| `reverse()` | the list, or `undefined` if empty | O(n) | Reverses in place; `head` and `tail` swap. |

The mutators return the list itself, so calls can be chained:
`list.push(1).push(2)`, `list.reverse().push(0)`.

Because `pop()` and `shift()` return the list rather than the node they detached, the
removed value has to be read *before* the call if it's needed.

Emptying the list — by `pop()` or `shift()` — resets `head` and `tail` to `null` and
`length` to `0`, so it is reusable immediately.

### Why `pop()` is O(n) but `shift()` is O(1)

Removing the tail means setting the new tail's `next` to `null`, and the only way to
reach the node before the tail is to walk from the head — a singly linked list has no
back pointers. Removing the head just means moving `head` to `head.next`. That
asymmetry is the main reason doubly linked lists exist.

## Not implemented yet

`set(index, val)`, `insert(index, val)`, `remove(index)`.
