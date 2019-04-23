var threeSum = function (nums) {
    let sum, result = [];
    let test = {}
    for (let i = 0; i < nums.length; i++)
        for (let j = i + 1; j < nums.length; j++) {
            sum = 0 - nums[i] - nums[j];
            if (test[`${nums[i]},${nums[j]}`]) continue;
            if (nums.slice(j + 1).includes(sum) ||
                nums.slice(0, i).includes(sum) || nums.slice(i + 1, j).includes(sum)) {
                test[`${nums[i]},${nums[j]}`] = true;
                test[`${nums[i]},${sum}`] = true;
                test[`${nums[j]},${nums[i]}`] = true;
                test[`${nums[j]},${sum}`] = true;
                test[`${sum},${nums[j]}`] = true;
                test[`${sum},${nums[i]}`] = true;
                result.push([nums[i], nums[j], sum])
            }
        }
    return result;
};

var mergeTwoLists = function (l1, l2) {
    const arr = [];
    let p = l1, q = l2;
    while (p) {
        arr.push({ val: p.val, point: p })
        p = p.next;
    }
    while (q) {
        arr.push({ val: q.val, point: q })
        q = q.next;
    }
    arr.sort((a, b) => a.val > b.val)
    let t;
    for (let i = 0; i < arr.length; i++){
        t = arr[i].point;
        t = p.next;
    }
    t = null;
    return arr[0].point;
};
console.log(isValid('{[]}'))