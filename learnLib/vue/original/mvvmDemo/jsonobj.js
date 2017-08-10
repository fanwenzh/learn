const OAM = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
const OP = Object.prototype
const def = Object.defineProperty
class JsonObj {
    constructor(obj, callback) {
            if (OP.toString.call(obj) !== '[object Object]') {
                console.log('This parameter must be an object: ', obj)
            }
            this.$callback = callback
            this.observe(obj)
        }
        // 设置观察obj属性, 增加path实现模版数据的修改
    observe(obj, path) {
            // 如果监听对象为数组时，调用overrideArrayProto方法
            if (Array.isArray(obj)) {
                this.overrideArrayProto(obj, path);
            }
            // arr.forEach(function callback(currentValue, index, array) {}[, thisArg]);
            // thisArg: 绑定父级的this
            Object.keys(obj).forEach(function(key, index, keyArray) {
                var oldVal = obj[key];
                // path 为true为path.slice(0), false为path
                var pathArray = path && path.slice(0);
                if (pathArray) {
                    pathArray.push(key);
                } else {
                    pathArray = [key]
                }
                def(obj, key, {
                    get: function() {
                        return oldVal
                    },
                    // 设置属性的值时，调用回调函数
                    set: (function(newVal) {
                        if (oldVal !== newVal) {
                            // 设置data.el = obj时
                            if (OP.toString.call(obj[key]) === '[object Object]' || Array.isArray(obj[key])) {
                                this.observe(obj[key], pathArray) // path
                            }
                            this.$callback(newVal, oldVal, pathArray)
                            oldVal = newVal
                        }
                    }).bind(this)
                });
                if (OP.toString.call(obj[key]) === '[object Object]' || Array.isArray(obj[key])) {
                    this.observe(obj[key], pathArray)
                }
            }, this);
        }
        //  设置观察Array属性，并监听push, unshift, pop, shift, sort, reverse方法
    overrideArrayProto(arr, path) {
        var originalProto = Array.prototype,
            // Vue中全局创建原型overrideProto
            overrideProto = Object.create(originalProto),
            self = this,
            result;
        // 重写数组方法
        Object.keys(OAM).forEach(function(key, index, array) {
                var method = OAM[index],
                    oldArray = []
                    // this -> jsonobj
                def(overrideProto, method, {
                    value: function() {
                        oldArray = this.slice(0);
                        var arg = [].slice.apply(arguments);
                        result = originalProto[method].apply(this, arg);
                        // 对新数组进行检测
                        self.observe(this, path);
                        // self JsonObj, this: newArray -> 定义在原型上，this为调用该方法的数组
                        self.$callback(this, oldArray, path);
                        return result;
                    },
                    writable: true,
                    enumerable: false,
                    configurable: true
                });
            }, this)
            //  最后 让该数组实例的 __proto__ 属性指向 假的原型 overrideProto
        arr.__proto__ = overrideProto;
    }
}
// module.exports = JsonObj;