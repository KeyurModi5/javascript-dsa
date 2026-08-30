/**
 * LeetCode 1 — Two Sum
 *
 * Given an array of integers and a target, return the indices of the two
 * numbers that add up to the target. Each input has exactly one solution and
 * the same element may not be used twice.
 *
 * Three approaches below: brute force, a hash map, and — for a sorted array
 * only — two pointers.
 *
 * NOTE: all three are declared as `var twoSum`, so each definition replaces
 * the one before it and only the last actually runs. Rename them to try them
 * side by side.
 */

/**
 * Approach 1 — brute force: check every pair.
 *
 * Time  O(n^2)  — roughly n*(n-1)/2 pairs in the worst case
 * Space O(1)    — nothing stored beyond the loop counters
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    for (let i = 0; i < nums.length; i++) {
        // j starts at i + 1, which does two jobs: it never pairs an element
        // with itself, and it skips pairs already tested in earlier passes.
        for (let j = i + 1; j < nums.length; j++) {

            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }

    // No pair adds up to the target.
    return [];

};

/**
 * Approach 2 — hash map: remember what we have already seen.
 *
 * Instead of searching the rest of the array for a partner, work out what the
 * partner must be (target - current) and check whether it has already gone by.
 * A Map turns that search into an O(1) lookup, trading space for time.
 *
 * Time  O(n)  — one pass, constant-time lookups
 * Space O(n)  — the map can hold every element
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    // value -> index of that value
    let map = new Map()
    for (let i = 0; i < nums.length; i++) {
        // The number this one needs in order to reach the target.
        let complement = target - nums[i]

        // Check BEFORE inserting the current value. That ordering is what
        // stops an element pairing with itself when target === nums[i] * 2,
        // and it means the stored index is always the earlier of the pair.
        if (map.has(complement)) {
            return [map.get(complement), i];

        }
        map.set(nums[i], i);
    }
    // Nothing matched. Duplicate values overwrite each other in the map, which
    // is harmless here: any earlier index would have matched already.
    return []

};

/**
 * Approach 3 — two pointers, for a SORTED array (LeetCode 167, "Two Sum II").
 *
 * This one is not interchangeable with the two above: it is only correct when
 * `nums` is sorted ascending. That extra guarantee is what buys the speed —
 * it needs no Map, so it is O(n) time like approach 2 but O(1) space like
 * approach 1, the best of both.
 *
 * Start with the widest possible pair (first and last) and squeeze inward.
 * Because the array is sorted, each comparison rules out a whole side:
 *
 *   sum < target  ->  nums[i] is too small to pair with ANYTHING still in
 *                     range, since nums[j] is the largest left. Drop it: i++
 *   sum > target  ->  nums[j] is too big for ANY remaining partner, since
 *                     nums[i] is the smallest left. Drop it: j--
 *
 * Every step discards exactly one candidate, so the pointers meet after at
 * most n steps and no valid pair is ever skipped.
 *
 * Time  O(n)  — i and j together cross the array once
 * Space O(1)  — two indices, nothing else
 *
 * @param {number[]} nums   sorted ascending
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    let i = 0
    let j = nums.length - 1

    // i < j, never i <= j: the two pointers must land on different elements.
    while (i < j) {
        let sum = nums[i] + nums[j];
        if (sum === target) {
            return [i, j];
        } else if (sum < target) {
            i++
        } else {
            j--
        }
    }

    return []
};
