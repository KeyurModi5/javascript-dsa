/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    const result = [];

    nums.sort((a, b) => a - b);

    for (let i = 0; i < nums.length - 2; i++) {

        // Skip duplicate first numbers
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        // Since array is sorted, no possible triplet
        // if the smallest number is already > 0
        if (nums[i] > 0) {
            break;
        }

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([
                    nums[i],
                    nums[left],
                    nums[right]
                ]);

                left++;
                right--;

                // Skip duplicate left values
                while (
                    left < right &&
                    nums[left] === nums[left - 1]
                ) {
                    left++;
                }

                // Skip duplicate right values
                while (
                    left < right &&
                    nums[right] === nums[right + 1]
                ) {
                    right--;
                }

            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
};