# javascript-dsa

Data structures and algorithms implemented from scratch in plain JavaScript, for practice.
No dependencies, no build step — every file runs directly under Node.

## Contents

| File | What it is |
| --- | --- |
| [`singleLinkList.js`](singleLinkList.js) | Singly linked list implementation |
| [`removeDuplicateFormLinkList.js`](removeDuplicateFormLinkList.js) | Remove duplicates from a sorted list — keep one of each (LeetCode 83) |
| [`RemoveDuplicatesfromSortedList.js`](RemoveDuplicatesfromSortedList.js) | Remove duplicates from a sorted list — keep only uniques (LeetCode 82) |
| [`sumOfTwoArray.js`](sumOfTwoArray.js) | Two Sum — brute force and hash map (LeetCode 1) |
| [`sumofThreeArray.js`](sumofThreeArray.js) | Three Sum — sort plus two pointers (LeetCode 15) |

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
list.set(1, "X")           // A -> X -> C
list.remove(0)             // X -> C
list.reverse()             // C -> X
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
| `set(index, val)` | the list, or `undefined` if out of range | O(n) | Overwrites the value at `index`; adds no node. |
| `remove(index)` | the list, or `undefined` if out of range | O(n) | Deletes the node at `index`; O(1) for `index === 0`. |
| `reverse()` | the list, or `undefined` if empty | O(n) | Reverses in place; `head` and `tail` swap. |

The mutators return the list itself, so calls can be chained:
`list.push(1).push(2)`, `list.set(0, "a").remove(2)`.

The index-taking methods — `get`, `set`, `remove` — are 0-based and return
`undefined` for a negative index or one at/past `length`, rather than throwing.

Because `pop()`, `shift()`, and `remove()` return the list rather than the node they
detached, the removed value has to be read *before* the call if it's needed.

Emptying the list — by `pop()`, `shift()`, or `remove()` — resets `head` and `tail`
to `null` and `length` to `0`, so it is reusable immediately. `push()` and
`unshift()` work correctly on a list that was emptied that way.

### Why `pop()` is O(n) but `shift()` is O(1)

Removing the tail means setting the new tail's `next` to `null`, and the only way to
reach the node before the tail is to walk from the head — a singly linked list has no
back pointers. Removing the head just means moving `head` to `head.next`. That
asymmetry is the main reason doubly linked lists exist.

## Problems

### Duplicates in a sorted linked list

Both take a **sorted** list and are solved in one pass, O(n) time and
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

#### Keep one of each duplicate (LeetCode 83)

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

#### Keep only the values that appear once (LeetCode 82)

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

### Two Sum (LeetCode 1)

[`sumOfTwoArray.js`](sumOfTwoArray.js)

```js
twoSum(nums, target)   // (number[], number) -> [i, j], or []
```

Given an array of integers and a target, return the indices of the two numbers that
add up to the target. The same element may not be used twice.

```
[2,7,11,15]  t=9   -> [0,1]
[3,2,4]      t=6   -> [1,2]
[3,3]        t=6   -> [0,1]
[1,2,3]      t=7   -> []
```

The file holds **three approaches** to the same problem, to compare their cost:

| Approach | Time | Space | Needs sorted input | Idea |
| --- | --- | --- | --- | --- |
| Brute force | O(n²) | O(1) | no | Test every pair, with `j` starting at `i + 1`. |
| Hash map | O(n) | O(n) | no | One pass; look for `target - nums[i]` among values already seen. |
| Two pointers | O(n) | O(1) | **yes** | Squeeze inward from both ends of the array. |

In the brute-force version, starting `j` at `i + 1` does two jobs: it never pairs an
element with itself, and it skips pairs an earlier `i` already tested.

The map version is the point of the exercise. Rather than searching the rest of the
array for a partner, it computes what the partner must be — `target - nums[i]` — and
asks whether that value has already gone by. A `Map` answers in O(1), which trades
O(n) space for dropping an entire factor of `n` off the running time.

The lookup happens *before* the current value is inserted. That ordering is what stops
an element pairing with itself when the target is exactly double it: `[3,3]` with
target `6` returns `[0,1]`, not `[0,0]`. It also means the stored index is always the
earlier half of the pair.

#### Two pointers, on a sorted array (LeetCode 167)

The third approach is not interchangeable with the other two — it is only correct when
`nums` is sorted ascending. That extra guarantee is what pays for itself: no `Map` is
needed, so it matches the hash map at O(n) time while keeping brute force's O(1) space.

Start with the widest pair — first and last — and squeeze inward. Because the array is
sorted, one comparison rules out an entire side:

- **`sum < target`** → `nums[i]` is too small to pair with *anything* still in range,
  since `nums[j]` is the largest value left. Discard it: `i++`.
- **`sum > target`** → `nums[j]` is too big for *any* remaining partner, since
  `nums[i]` is the smallest value left. Discard it: `j--`.

Each step eliminates exactly one candidate, so the pointers meet within n steps and no
valid pair is ever stepped over. The loop condition is `i < j`, not `i <= j`, because
the two pointers have to land on different elements.

LeetCode 167 expects **1-based** indices, so submitting there needs `[i + 1, j + 1]`.
The version here returns 0-based indices to stay consistent with the other two.

**Note:** all three approaches are declared as `var twoSum`, so each definition
replaces the one before it and only the last can actually be called. Rename them to
run all three side by side.

### Three Sum (LeetCode 15)

[`sumofThreeArray.js`](sumofThreeArray.js)

```js
threeSum(nums)   // number[] -> number[][], every unique triplet summing to 0
```

Find all unique triplets that add up to zero. Order inside a triplet doesn't matter,
and no triplet may appear twice.

```
[-1,0,1,2,-1,-4]  -> [[-1,-1,2], [-1,0,1]]
[-2,0,1,1,2]      -> [[-2,0,2], [-2,1,1]]
[0,0,0,0]         -> [[0,0,0]]
[0,1,1]           -> []
```

Time O(n²), space O(1) beyond the output: sorting costs O(n log n), then each of the n
outer positions drives one linear two-pointer sweep.

This is the two-pointer idea from Two Sum with one extra layer — **sort, fix one
number, then two-pointer the rest looking for `-nums[i]`**. Sorting is what makes both
the sweep and the deduplication possible.

Three details carry the weight:

- **Skip a repeated `nums[i]`** (`nums[i] === nums[i - 1]` → `continue`). The first
  time a value is fixed, the sweep already finds every triplet containing it; fixing it
  again could only reproduce them.
- **Break once `nums[i] > 0`.** In a sorted array the fixed number is the smallest of
  the three, so when it turns positive nothing after it can reach zero.
- **After recording a hit, move both pointers past their duplicates** — `left++` and
  `right--` first, then skip while the new value equals the one just consumed. This is
  what stops `[0,0,0,0]` from emitting `[0,0,0]` twice.

Without the first and third of those the algorithm still finds every triplet; it just
reports some of them more than once.

**Note:** `nums.sort(...)` sorts in place, so the caller's array comes back reordered.

## Not implemented yet

`insert(index, val)` on `singleLinkList`.
