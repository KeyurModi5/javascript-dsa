# javascript-dsa

Data structures and algorithms implemented from scratch in plain JavaScript, for practice.
No dependencies, no build step — every file runs directly under Node.

## Contents

| File | What it is |
| --- | --- |
| [`singleLinkList.js`](singleLinkList.js) | Singly linked list implementation |
| [`removeDeplicateFormLinkList.js`](removeDeplicateFormLinkList.js) | Remove duplicates from a sorted list (LeetCode 83) |

## Running

Both files declare their classes/functions and print nothing on their own:

```bash
node singleLinkList.js   # runs, no output
```

To exercise them, append some calls to the bottom of the file, or paste the code
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

## Problems

### Remove duplicates from a sorted list

[`removeDeplicateFormLinkList.js`](removeDeplicateFormLinkList.js) — LeetCode 83.

```js
deleteDuplicates(head)   // ListNode | null  ->  ListNode | null
```

Takes the head of a **sorted** list and drops repeated values in place, keeping one
node per value. Returns the same `head` it was given (mutated), or `null` for an
empty list. O(n) time, O(1) space — no new nodes are allocated, only `next` pointers
are rewritten.

```
[1,1,2]           -> [1,2]
[1,1,2,3,3]       -> [1,2,3]
[1,1,1,1]         -> [1]
[-3,-3,-1,0,0,7]  -> [-3,-1,0,7]
```

It works on a `ListNode` shape (`{ val, next }`) as supplied by LeetCode, not on the
`singleLinkList` class above — the two files are independent. The `ListNode`
constructor itself only exists as a comment, so the file has to be given nodes built
elsewhere.

**Only adjacent duplicates are removed**, which is why the input must be sorted.
`[1,2,1]` comes back unchanged. Removing duplicates from an *unsorted* list needs a
different approach — a `Set` of seen values, at O(n) extra space.

#### How it works

One pointer walks the list, comparing each node to its neighbour:

- **Values match** → unlink the neighbour (`current.next = current.next.next`) and
  *stay put*, so a run of any length collapses to one node.
- **Values differ** → step forward.

Not advancing on a match is the part that matters. Advancing in both branches turns
`[1,1,1,1]` into `[1,1]`, since every second duplicate gets skipped over instead of
removed.

## Not implemented yet

`set(index, val)`, `insert(index, val)`, `remove(index)` on `singleLinkList`.
