// get 取JSON資料用
export const getData = (val, key = [], empty = "") => {
  let getData = val;
  const valChecked = typeof val !== undefined;
  const keyChecked = Array.isArray(key) && key.length > 0;
  if (valChecked && keyChecked) {
    for (let i = 0; i < key.length; i++) {
      if (getData[key[i]] !== undefined) {
        getData = getData[key[i]];
      } else {
        getData = empty;
      }
    }
    return getData;
  } else {
    return empty;
  }
};
// last 取最後一個值
export const getLast = (val = []) => {
  return val[val.length - 1];
};
// take 取得前幾筆
export const takeData = (val = [], num = 0) => {
  if (num === 0) return val;
  return val.filter((value, key) => key < num);
};
// 更新指定陣列位置
export const updateArrayIndex = (index = 0, array = [], updateData = {}) => {
  const updateArray = [];
  array.map((v, k) => {
    if (index === k) {
      return updateArray.push(updateData);
    } else return updateArray.push(v);
  });
  return updateArray;
};
// res 資料處理專用 如果api錯誤回傳空物件轉換成空陣列
export const detectEmptyObjectReturnArray = (data = []) => {
  const emptyArray = [];
  if (data === undefined || data === null) {
    return emptyArray;
  }
  if (typeof data === "object" && Object.keys(data || []).length === 0) {
    return emptyArray;
  }
  return data;
};
