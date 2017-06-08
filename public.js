//forEach没有返回值
// var ary = [1,2,3,4];
// ary.forEach(function (item,index,arr) {
//     // function是回调函数
//     arr[index] = 10;
// //通过数组的索引来更改原来数组
// })
// console.log(ary);
//forEach和map使用大致相同，但map回调函数是支持返回值的，返回什么就修改成什么，原来数组不变

// var ary = [1,2,3,4];
// var res = ary.map(function (item,index,arr) { 
//     return item * 10;
//  })
//  console.log(ary);
//  console.log(res);

// var ary = [1,2,3,4];
// ary.forEach(function (item,index,arr) {
//     console.log(this);
// })

Array.prototype.myforEach = function myforEach(callBack, context) {
    // 实现forEach方法
    context = context || window;
    if ("forEach" in Array.prototype) {
        this.forEach.call(callBack, context);
        return;
    }
    //IE6~8自己编写方法来处理
    for (var i = 0; i < this.length; i++) {
        //改变this，传递参数
        var element = this[i];
        callBack && callBack.call(context, element, i, this);
    }
}

Array.prototype.mymap = function mymap(callBack, context) {
    // 实现map方法
    context = context || window;
    if ("forEach" in Array.prototype) {
        return this.forEach.call(callBack, context);
    }
    //IE6~8自己编写方法来处理
    var newAry = [];
    for (var i = 0; i < this.length; i++) {
        //改变this，传递参数,别忘了map是有返回值的
        if (typeof callBack === "function") {
            var element = this[i];
            var val = callBack.call(context, element, i, this);
            newAry[newAry.length] = val;
        }
    }
    return newAry;
}


Function.prototype.mybind = function mybind(context) {
    //兼容（标准浏览器）
    var _this = this;
    var outerArg = Array.prototype.slice.call(arguments, 1);
    // 实现bind方法
    if ("bind" in Function.prototype) {
        //要传数组，又要用到apply，apply又会改变this
        return this.bind.apply(this, [context].concat(outerArg));
    }
    //不兼容，IE6~8
    return function () {
        // 事件对象会自动作为参数,但是事件对象也要处理兼容

        var innerArg = Array.prototype.slice.call(arguments, 0);
        innerArg.length === 0 ? innerArg[innerArg.length] = window.event : null;
        var arg = outerArg.concat(innerArg);
        _this.apply(context, arg);
    }
}
