// quickSort
// function qs(arr, left, right) {
//     if (left < right) {
//         let index = left + Math.floor((right - left) / 2);
//         swap(arr, index, left);
//         let l = left + 1,
//             r = right;
//         while (l <= r) {
//             while (l <= r && arr[left] >= arr[l]) l++;
//             while (r >= l && arr[left] < arr[r]) r--;
//             if (l < r) {
//                 swap(arr, l++, r--);
//             }

//         }
//         swap(arr, left, r);
//         qs(arr, left, r - 1);
//         qs(arr, r + 1, right);
//     }
// }

// function swap(item, first, second) {
//     let temp = item[first];
//     item[first] = item[second];
//     item[second] = temp;
// }

// let arr = [1, 23, 34, 5, 45, 2, 3, 65]
// qs(arr, 0, arr.length - 1);
// console.log(arr)

// var quickSort = function(arr) {
// 　　if (arr.length <= 1) { return arr; }
// 　　var pivotIndex = Math.floor(arr.length / 2);
// 　　var pivot = arr.splice(pivotIndex, 1)[0];
// 　　var left = [];
// 　　var right = [];
// 　　for (var i = 0; i < arr.length; i++){
// 　　　　if (arr[i] < pivot) {
// 　　　　　　left.push(arr[i]);
// 　　　　} else {
// 　　　　　　right.push(arr[i]);
// 　　　　}
// 　　}
// 　　return quickSort(left).concat([pivot], quickSort(right));
// };