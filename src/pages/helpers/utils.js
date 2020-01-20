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

export const downloadFile = (blob, options) => {
  if (!document || !window || !window.Blob) {
    throw new Error("当前浏览器不支持下载该文件");
  }
  const { filename, type } = options;
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, `${filename}.${type}`);
  } else {
    const linkElem = document.createElement("a");
    linkElem.target = "_blank";
    linkElem.download = `${filename}.${type}`;
    linkElem.href = URL.createObjectURL(blob);
    document.body.appendChild(linkElem);
    linkElem.click();
    document.body.removeChild(linkElem);
  }
};
