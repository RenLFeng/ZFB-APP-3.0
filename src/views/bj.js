import React, { useState, useEffect } from 'react'
import style from './own/css.module.scss'
import { Franchise, Gifts } from './own/constant'
import { FetchPartnerInfo } from '../../public/api'
import { post } from '../../public/call'
import Empty from '../../components/Empty/index'
import Toast from '../../components/_toast/index'
import Header from '../../components/Header/index'
export default function bj() {
    const [packageInfo, setPackageInfo] = useState({})
    const [meallist, setmeallist] = useState([])
    const [showDevice, setShowDevice] = useState(false)

/*ES6:
    Arr:
        arr.includes() ****查找一个值在不在数组里，若在，则返回true，反之返回false
            indexOf()  ****查找一个值在不在数组里，若在，则返回索引，反之返回-1
    
        Symbol():私有化属性
        解构赋值：
        arr:
            let [name1, name2, name3] = arr;
            console.log(name1, name2, name3);
            扩展数组：
            let result = [...arr1, ...arr2];
        json:
            let [name1, name2, name3] = json;
            console.log(name1, name2, name3);
            扩展json:
            let result = {...arr1, ...arr2};

        find()    函数用来查找目标元素，找到就返回该元素，找不到返回undefined。

        findIndex()   函数也是查找目标元素，找到就返回元素的位置，找不到就返回-1。

    string:

        'Vue'.padStart(10, '_*')           //'_*_*_*_Vue'  |
                                                       |字符串填充：padStart和padEnd
        'Vue'.padEnd(10, '_*')           //'Vue_*_*_*_'    |
        
        startsWith()   判断字符串是否以 XX 开头
            let url = 'http://www.itlike.com';
            console.log(url.startsWith('http'));  // true
        endWith()   判断字符串是否以 XX 结尾
            let url = 'http://www.itlike.com';
            console.log(url.startsWith('com'));  // true          

    模板字符串:    ``
        let result = `我叫 ${name} , 我是 ${sex} 的`;
        console.log(result); 




    Object.entries({ one: 1, two: 2 })    //[['one', 1], ['two', 2]] 
    Object.entries([1, 2])                //[['0', 1], ['1', 2]]         ****如果一个对象是具有键值对的数据结构，
                                                                        则每一个键值对都将会编译成一个具有两个元素的数组，
                                                                        这些数组最终会放到一个数组中
    Object.values({ one: 1, two: 2 })            //[1, 2]
    Object.values({ 3: 'a', 4: 'b', 1: 'c' })    //['c', 'a', 'b']



 */


/*ES7:
    
*/

/*ES8:
     （1）async  await：
        ====》基本使用
        async function asyncFunc(params) {
            const result1 = await this.login()
            const result2 = await this.getInfo()
        }
        console.log(result1, result2);
       ====>错误处理
        async function asyncFunc() {
            try {
                await otherAsyncFunc();
            } catch (err) {
                console.error(err);
            }
        }

     
 */


    const numFilter = (value) => {
        let tempVal = parseFloat(value).toFixed(3)
        let realVal = tempVal.substring(0, tempVal.length - 1)
        return realVal
    }
    const filter = (num) => {
        if (num) {
            num = num.toString().replace(/\$|\,/g, '');

            if ('' == num || isNaN(num)) { return 'Not a Number ! '; }

            var sign = num.indexOf("-") > 0 ? '-' : '';

            var cents = num.indexOf(".") > 0 ? num.substr(num.indexOf(".")) : '';
            cents = cents.length > 1 ? cents : '';

            num = num.indexOf(".") > 0 ? num.substring(0, (num.indexOf("."))) : num;

            if ('' == cents) { if (num.length > 1 && '0' == num.substr(0, 1)) { return 'Not a Number ! '; } }

            else { if (num.length > 1 && '0' == num.substr(0, 1)) { return 'Not a Number ! '; } }

            for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
                num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
            }

            return (sign + num + cents);
        }
    }
    //   useEffect(() => {
    //     fetch();
    //   }, [])
    return (
        <div className={style.layout}>

        </div>
    )
}
