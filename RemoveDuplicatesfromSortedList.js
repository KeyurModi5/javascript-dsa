/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {

    let dummy = new ListNode(0);
    dummy.next = head;

    let previous = dummy;
    let current = head;


    while (current) {
        if (current.next && current.val === current.next.val) {
            // Move current to the last duplicate node
            while (current.next && current.val === current.next.val) {
                current = current.next;
            }
            // Remove the entire duplicate group
            previous.next = current.next;

        } else {
            previous = current
        }
        current = current.next;

    }
    return dummy.next
};