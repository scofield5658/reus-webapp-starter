export const isAndroid = () => /android/i.test(navigator.userAgent);

export const isIPhone = () => /iphone/i.test(navigator.userAgent);

export const isMobile = () => isAndroid() || isIPhone();

export const qs = {
  stringify(obj = {}) {
    const arr = [];
    for (const key of Object.keys(obj)) {
      arr.push(`${key}=${obj[key]}`);
    }
    return arr.join("&");
  },
  parse(str = "") {
    const obj = {};
    const arr = str.split("&");
    for (const item of arr) {
      const [k, v] = item.split("=");
      obj[k] = v;
    }
    return obj;
  },
};
