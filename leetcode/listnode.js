function ListNode(val) {
    this.val = val;
    this.next = null;
}
var addTwoNumbers = function (l1, l2) {
    var p = l1, q = l2, more = 0;
    var result = new ListNode(), t = result;
    var sum, p_, q_;
    while (p || q) {
        p_ = p ? p.val : 0;
        q_ = q ? q.val : 0;
        sum = p_ + q_ + more;
        more = Math.floor(sum / 10);
        t.next = new ListNode(sum % 10);
        t = t.next;
        p = p.next;
        q = q.next;
    }
    if (more > 0)
        t.next = new ListNode(more);
    return result.next
};
let l1 = new ListNode(2);
l1.next = new ListNode(4)
let l2 = new ListNode(5)
l2.next = new ListNode(5)
console.log(addTwoNumbers(l1, l2))