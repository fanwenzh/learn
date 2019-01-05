// Array
arr.concat(value) // _.concat(array, [value])
arr.slice(n) //start, end // _.drop(arr, [n = 1]) 
arr.slice(0, arr.length - n) // _.dropRight(arr, [n = 1])
arr.fill(value, start, and) // _.fill(arr, val, [start=0], [end=arr.length])
arr.find(function(val, index) {}) // _.find
arr.findIndex(function(val) {}) // _.findIndex
arr[0] // _.first
arr[arr.length - 1] //_.last
arr.join() //_.join
arr.slice(0, arr.length - 2) // _.initial
arr.lastIndexOf() // _.lastIndexOf()
arr[n] // _.nth(n)
arr = arr.filter(v => v < 3) // _.remove(arr, fun)
arr = arr.reverse() // _.reverse(arr)
arr.slice(start, end) // _.slice(arr, start, end)
arr.slice(0, n) // _.take(array, [n = 1])