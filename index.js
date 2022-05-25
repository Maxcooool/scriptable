// const res = {
//   msg: "通信成功！",
//   code: 10000,
//   data: {
//     JXJJ_ZDWJ2: "主动稳健1号基金,12%,备注,https://www.baidu.com",
//     JXJJ_ZDJJ2: "主动积极2号基金,35%,,https://www.baidu.com",
//     JXJJ_ZDJJ1: "主动积极1号基金,30%,备注,https://www.baidu.com",
//     JXJJ_HYBJ1: "行业布局1号基金,40%,,https://www.baidu.com",
//     JXJJ_ZDWJ1: "主动稳健1号基金,10%,,https://www.baidu.com",
//     JXJJ_HYBJ2: "行业布局2号基金,45%,,https://www.baidu.com",
//     JXJJ_ZDJJ: "主动积极2号基金,35%,,https://www.baidu.com",
//     JXJJ_KJZQ2: "宽基增强2号基金,18%,,https://www.baidu.com",
//     JXJJ_KJZQ1: "宽基增强1号基金,20%,,https://www.baidu.com",
//   },
// };

// console.log(res);

// const filterData = [];

// for (const [key, value] of Object.entries(res.data)) {
//   //   console.log(`${key}: ${value}`);
//   const _valueList = value.split(",");
//   const _tempObj = {
//     foudKey: key,
//     type: _valueList[0].slice(0, 4),
//     fundName: _valueList[0].slice(4),
//     rise: _valueList[1],
//     remark: _valueList[2],
//     link: _valueList[3],
//   };
//   filterData.push(_tempObj);
// }

// console.log(filterData);

// const enhencedData  = Object.values(res.data).map(item=> {
//     const tempList = item.split(',')
//     return {
//         type: tempList[0].slice(0,4),
//         fundName: tempList[0].slice(4),
//         rise: tempList[1],
//         remark: tempList[2],
//         link: tempList[3],
//     }
// })

// const enhencedData  = Object.values(res.data).map(item=> {
//     const tempList = item.split(',')
//     return {
//         type: tempList[0].slice(0,4),
//         fundName: tempList[0].slice(4),
//         rise: tempList[1],
//         remark: tempList[2],
//         link: tempList[3],
//     }
// })

// console.log(enhencedData,'xxxx');

// const obj = {
//     name: 'xiaoming',
// }
// const obj2 = {
//     name: 'pp',
// }
// const obj3 = {
//     name: 'zzz',
// }

// // console.log(Object.getOwnPropertyDescriptors(obj));

// const z = {
//     set name(val) {
//         console.log('name', val);
//     }
// }

// Object.assign(z, obj, obj2, obj3)

// function getV(x, ...arguments) {
//     console.log(x);
//     console.log(arguments);
// }

// getV(1,3,4,5,7)

// console.log(Object.is(true, 1));
// console.log(Object.is(1, 1));
// console.log(Object.is(NaN, 1));
// console.log(Object.is(NaN, NaN));

// let token = 0;

// function getKey(key) {
//   return `${key}_${token++}`;
// }

// const obj = {};

// for (let i = 0; i < 10; i++) {
//   Object.assign(obj, {
//     [`token_${i}`]: 1,
//   });
// }

// Object.assign(obj, {
//   [getKey("name")]: "xxx",
//   [getKey("job")]: "xxx",
// });

// console.log(obj);
