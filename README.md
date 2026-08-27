# javascript-dsa

Data structures and algorithms implemented from scratch in plain JavaScript, for practice.
No dependencies, no build step — every file runs directly under Node.

## Contents

| File | What it is |
| --- | --- |
| [`singleLinkList.js`](singleLinkList.js) | Singly linked list implementation |
| [`removeDuplicateFormLinkList.js`](removeDuplicateFormLinkList.js) | Remove duplicates from a sorted list — keep one of each (LeetCode 83) |
| [`RemoveDuplicatesfromSortedList.js`](RemoveDuplicatesfromSortedList.js) | Remove duplicates from a sorted list — keep only uniques (LeetCode 82) |

## Running

Every file declares its classes/functions and prints nothing on its own:

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

Both problems below take a **sorted** list and are solved in one pass, O(n) time and
O(1) space, by rewriting `next` pointers in place. They differ only in what a
duplicate deserves:

| Input | LeetCode 83 — keep one | LeetCode 82 — keep uniques |
| --- | --- | --- |
| `[1,1,2,3,3]` | `[1,2,3]` | `[2]` |
| `[1,1]` | `[1]` | `[]` |

Both files operate on LeetCode's `ListNode` shape (`{ val, next }`), not on the
`singleLinkList` class above — the two problems and the data structure are
independent of each other. Both also declare the same function name,
`deleteDuplicates`, so they cannot be loaded into one scope without one shadowing
the other.

### Keep one of each duplicate (LeetCode 83)

[`removeDuplicateFormLinkList.js`](removeDuplicateFormLinkList.js)

```js
deleteDuplicates(head)   // ListNode | null  ->  ListNode | null
```

Collapses each run of equal values to a single node. Returns the same `head` it was
given (mutated), or `null` for an empty list.

```
[1,1,2]           -> [1,2]
[1,1,2,3,3]       -> [1,2,3]
[1,1,1,1]         -> [1]
[-3,-3,-1,0,0,7]  -> [-3,-1,0,7]
```

One pointer walks the list, comparing each node to its neighbour:

- **Values match** → unlink the neighbour (`current.next = current.next.next`) and
  *stay put*, so a run of any length collapses to one node.
- **Values differ** → step forward.

Not advancing on a match is the part that matters. Advancing in both branches turns
`[1,1,1,1]` into `[1,1]`, since every second duplicate gets skipped over instead of
removed.

The head can never be deleted here — one copy of every value survives — so no dummy
node is needed and `head` is safe to return.

### Keep only the values that appear once (LeetCode 82)

[`RemoveDuplicatesfromSortedList.js`](RemoveDuplicatesfromSortedList.js)

```js
deleteDuplicates(head)   // ListNode | null  ->  ListNode | null
```

Deletes every node that has a duplicate, keeping only values that appear exactly
once. Returns the new head, which may be `null` if nothing was unique.

```
[1,2,3,3,4,4,5]   -> [1,2,5]
[1,1,1,2,3]       -> [2,3]
[1,1,2,2]         -> []
[-2,-2,-1,1,1,2]  -> [-1,2]
```

Two pointers plus a dummy node: `current` scans, `previous` stays on the last node
known to be kept.

- **`current` starts a duplicate group** → an inner loop runs `current` to the *last*
  node of the group, then `previous.next = current.next` unlinks the whole group at
  once.
- **Otherwise** → `previous` advances to `current`, since that node survives.

The dummy node matters here because, unlike LeetCode 83, the head itself can be
deleted — `[1,1,2]` must return `[2]`. `previous` needs somewhere to stand before the
first real node, and returning `dummy.next` instead of `head` is what lets the answer
start at a different node, or be empty.

**Note:** this file calls `new ListNode(0)` for the dummy, but `ListNode` only exists
as a comment. LeetCode supplies it; running the file locally throws
`ReferenceError: ListNode is not defined` until you define the constructor yourself.

## Not implemented yet

`set(index, val)`, `insert(index, val)`, `remove(index)` on `singleLinkList`.
