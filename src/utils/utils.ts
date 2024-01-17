import { isNumber, isArray } from './is';

type toastIcon = 'success' | 'loading' | 'error' | 'none' | 'fail' | 'exception';
type uniType = 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab' | 'navigateBack';

/**
 * 提示方法
 * @param {String} title 提示文字
 * @param {String}  icon icon图片
 * @param {Number}  duration 提示时间
 */
export function toast(title: string, icon: toastIcon = 'none', duration = 1500) {
  if (title) {
    uni.showToast({
      title,
      icon,
      duration,
    });
  }
}

/**
 * 设置缓存
 * @param {String} key 键名
 * @param {String} data 值
 */
export function setStorageSync(key: string, data: any) {
  uni.setStorageSync(key, data);
}

/**
 * 获取缓存
 * @param {String} key 键名
 */
export function getStorageSync(key: string) {
  return uni.getStorageSync(key);
}

/**
 * 删除缓存
 * @param {String} key 键名
 */
export function removeStorageSync(key: string) {
  return uni.removeStorageSync(key);
}

/**
 * 清空缓存
 * @param {String} key 键名
 */
export function clearStorageSync() {
  return uni.clearStorageSync();
}

/**
 * 页面跳转
 * @param {string | number } url  转跳路径
 * @param {String} params 跳转时携带的参数
 * @param {'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab' | 'navigateBack'} type 转跳方式
 **/
export function useRouter(
  url: any,
  type: uniType = 'navigateTo',
  params: any = {},
  callback?: Function,
) {
  try {
    if (Object.keys(params).length)
      url = `${url}?data=${encodeURIComponent(JSON.stringify(params))}`;
    if (type === 'navigateTo') {
      const goType = getCurrentPages().length >= 10 ? 'redirectTo' : 'navigateTo';
      // @ts-ignore
      uni[goType]({
        url,
        success: () => {
          callback && callback();
        },
      });
    }
    if (type === 'navigateBack') {
      uni[type]({
        delta: url,
        success: () => {
          callback && callback();
        },
      });
    } else {
      // @ts-ignore
      uni[type]({
        url,
        success: () => {
          callback && callback();
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * 预览图片
 * @param {Array} urls 图片链接
 */
export function previewImage(urls: string[], itemList = ['发送给朋友', '保存图片', '收藏']) {
  uni.previewImage({
    urls,
    longPressActions: {
      itemList,
      fail: function (error) {
        console.error(error, '===previewImage');
      },
    },
  });
}

/**
 * 保存图片到本地
 * @param {String} filePath 图片临时路径
 **/
export function saveImage(filePath: string) {
  if (!filePath) return false;
  uni.saveImageToPhotosAlbum({
    filePath,
    success: () => {
      toast('图片保存成功', 'success');
    },
    fail: (err) => {
      if (
        err.errMsg === 'saveImageToPhotosAlbum:fail:auth denied' ||
        err.errMsg === 'saveImageToPhotosAlbum:fail auth deny'
      ) {
        uni.showModal({
          title: '提示',
          content: '需要您授权保存相册',
          showCancel: false,
          success: () => {
            uni.openSetting({
              success(settingdata) {
                if (settingdata.authSetting['scope.writePhotosAlbum']) {
                  uni.showModal({
                    title: '提示',
                    content: '获取权限成功,再次点击图片即可保存',
                    showCancel: false,
                  });
                } else {
                  uni.showModal({
                    title: '提示',
                    content: '获取权限失败，将无法保存到相册哦~',
                    showCancel: false,
                  });
                }
              },
              fail(failData) {
                console.log('failData', failData);
              },
            });
          },
        });
      }
    },
  });
}

/**
 * 深拷贝
 * @param {Object} data
 **/
export const clone = (data: any) => JSON.parse(JSON.stringify(data));

/* @name: 实现对数字保留两位小数时 不足两位 自动补0
 * @param {string | number} num
 * @return {*}
 */
export const returnFloat = (num: any) => {
  let newNum: string = isNumber(num) ? num.toString() : num;
  if (newNum.indexOf('.') !== -1) {
    const integerPart = newNum.split('.')[0];
    let decimalPart = newNum.split('.')[1];

    if (decimalPart.length > 2) {
      decimalPart = decimalPart.substring(0, 2);
    } else if (decimalPart.length === 1) {
      decimalPart += '0';
    }

    newNum = `${integerPart}.${decimalPart}`;
  } else {
    newNum += '.00';
  }

  return newNum;
};

/**
 * @name: 手机号做脱敏处理
 * @param {string} phone
 * @return {*}
 */
export const phoneHide = (phone: string) => {
  const reg = /^(1[3-9][0-9])\d{4}(\d{4}$)/; // 定义手机号正则表达式
  phone = phone.replace(reg, '$1****$2');
  return phone; // 185****6696
};

/**
 * @name: 身份证号脱敏
 * @param {string} card
 * @return {*}
 */
export const cardHide = (card: string) => {
  const reg = /^(.{6})(?:\d+)(.{4})$/; // 匹配身份证号前6位和后4位的正则表达式
  const maskedIdCard = card.replace(reg, '$1******$2'); // 身份证号脱敏，将中间8位替换为“*”
  return maskedIdCard; // 输出：371782******5896
};

/**
 * @name: 姓名脱敏
 * @param {string} name
 * @return {*}
 */
export const nameHide = (name: string) => {
  if (name.length == 2) {
    name = name.substring(0, 1) + '*'; // 截取name 字符串截取第一个字符，
    return name; // 张三显示为张*
  } else if (name.length == 3) {
    name = name.substring(0, 1) + '*' + name.substring(2, 3); // 截取第一个和第三个字符
    return name; // 李思思显示为李*思
  } else if (name.length > 3) {
    name = name.substring(0, 1) + '*' + '*' + name.substring(3, name.length); // 截取第一个和大于第4个字符
    return name; // 王五哈哈显示为王**哈
  }
};

/**
 * @name: 拼接请求参数
 * @param {any} info
 * @return {*}
 */
export const exportWithParams = (info: any) => {
  let params = '';
  const keys = Object.keys(info);
  for (let i = 0; i < keys.length; i++) {
    if (i === 0) {
      params += `${keys[i]}=${info[keys[i]]}`;
    } else {
      params += `&${keys[i]}=${info[keys[i]]}`;
    }
  }
  return params;
};

/**
 * @name: 前端分页
 * @param {Array} array
 * @param {number} size
 * @return {*}
 */
export const getNeedArr = (array: Array<any>, size: number = 20) => {
  // 判断不是数组就返回空数组
  if (!isArray(array)) return [];
  // 获取所需指定长度分割的数组;参数1为用于分割的总数组,参数2为分割数组后每个小数组的长度
  const length = array.length;
  // 核心部分
  let index = 0; //用来表示切割元素的范围start
  let resIndex = 0; //用来递增表示输出数组的下标

  //根据length和size算出输出数组的长度，并且创建它。
  const result = new Array(Math.ceil(length / size));
  //进行循环
  while (index < length) {
    // 循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
    result[resIndex++] = array.slice(index, (index += size));
  }
  // 输出新数组
  return result;
};
