const config = require("../../config");

exports.noop = () => {};

exports.tgtRoute = (route) => (`${config.baseUrl}${route}`).replace(/\\/gmi, "/");

exports.srcRoute = (url) => (url.replace(new RegExp(`^${config.baseUrl}`), "")).replace(/\\/gmi, "/");

exports.tgtURL = (url) => {
  const tgtBase = config.env === "production"
    ? config.cdnUrl : config.baseUrl;
  return (`${tgtBase}${url.replace(/\\/gmi, "/").replace(/^\/pages/, "")}`).replace(/\\/gmi, "/");
};

exports.srcUrl = (url) => {
  const tgtBase = config.env === "production"
    ? config.cdnUrl : config.baseUrl;
  return (url.replace(new RegExp(`^${tgtBase}`), "/pages")).replace(/\\/gmi, "/");
};

exports.getExtname = (pathname) => {
  const path = require("path");
  return path.extname(pathname);
};

const calcMD5 = (str, len = 12) => {
  const crypto = require("crypto");
  const md5 = crypto.createHash("md5").update(str).digest("hex");
  return md5.substring(md5.length - len, md5.length);
};
exports.calcMD5 = calcMD5;

exports.isEmpty = (val) => typeof val === "undefined" || val === null;

exports.isEmptyObject = (obj) => {
  if (typeof obj !== "object") {
    return false;
  }

  const keys = Object.keys(obj);
  return !keys.length;
};

const mkdirs = (dirname) => {
  const fs = require("fs");
  const path = require("path");
  const dirs = dirname.split(path.sep);
  for (let i = 1, ii = dirs.length; i < ii; i += 1) {
    const tmp = dirs.slice(0, i + 1).join(path.sep);
    if (!fs.existsSync(tmp)) {
      fs.mkdirSync(tmp);
    }
  }
};
exports.mkdirs = mkdirs;

exports.writefile = (filepath, content) => {
  const fs = require("fs");
  const path = require("path");
  mkdirs(path.dirname(filepath));
  fs.writeFileSync(filepath, content);
};

exports.hashfile = (filepath) => {
  const fs = require("fs");
  const path = require("path");
  const buffer = fs.readFileSync(filepath);
  const hash = calcMD5(buffer);

  return {
    name: path.basename(filepath).replace(/\.\w+$/, ($0) => `.${hash}${$0}`),
    buffer,
  };
};

exports.cpfile = ({ from, to }) => {
  const fs = require("fs");
  const path = require("path");

  mkdirs(path.dirname(to));

  fs.writeFileSync(to, fs.readFileSync(from));
};

exports.rel2abs = (relpath) => {
  const path = require("path");
  return path.join(__dirname, `..${path.sep}${relpath}`).replace(/\//gmi, path.sep);
};

exports.abs2rel = (abspath) => {
  const path = require("path");
  const basedir = path.join(__dirname, "../..").replace(/\\/gmi, "/");
  return abspath.replace(/\\/gmi, "/").replace(new RegExp(`^${basedir}/[^/]+`), "").replace(/\//gmi, path.sep);
};

exports.abssrc = (relpath) => {
  const path = require("path");
  return path.join(__dirname, `../../src/${path.sep}${relpath}`).replace(/\//gmi, path.sep);
};

exports.absdest = (relpath) => {
  const path = require("path");
  return path.join(__dirname, `../../dist/${path.sep}${relpath}`).replace(/\//gmi, path.sep);
};

exports.abstmp = (relpath) => {
  const path = require("path");
  return path.join(__dirname, `../../.tmp/${path.sep}${relpath}`).replace(/\//gmi, path.sep);
};

const isBrowser = () => typeof window !== "undefined";
exports.isBrowser = isBrowser;

exports.isServer = () => !isBrowser();

const getData = (obj, key) => {
  if (obj === null) {
    return obj || null;
  }

  const props = key.split(".");
  const prop = props.shift();
  const tmp = ((inObj, inProp) => {
    const matches = inProp.match(/(\w*)\[(\w+)\]/);
    if (!matches) {
      return inObj[inProp];
    }

    const inTmp = matches[1]
      ? (inObj[matches[1]] || []) : inObj;

    // array, like d5[3]
    return inTmp[matches[2]];
  })(obj, prop);

  if (props.length === 0) {
    return tmp || null;
  }
  return getData(tmp || null, props.join("."));
};
exports.getData = getData;

const setData = (obj, key, value) => {
  const props = key.split(".");
  const prop = props.shift();
  if (props.length === 0) {
    obj[prop] = value;
    return obj[prop];
  }

  const tmp = ((inObj, inProp) => {
    const matches = prop.match(/(\w+)\[(\w+)\]/);
    if (!matches) {
      if (!inObj[inProp]) {
        inObj[inProp] = {};
      }
      return inObj[inProp];
    }

    const inKey = matches[1];
    const index = matches[2];
    const arr = inObj[inKey] || (inObj[inKey] = []);
    if (!arr[index]) {
      arr[index] = {};
    }
    return arr[index];
  })(obj, prop);
  return setData(tmp, props.join("."), value);
};
exports.setData = setData;

exports.radom = (m = 0, n = 100000000) => Math.floor(Math.random() * (n - m + 1)) + m;

exports.queryString = (url) => {
  const qs = {};
  const matches = url.match(/[^=?&#]+=[^=?&#]+/g);
  if (matches) {
    for (const match of matches) {
      const [k, v] = match.split("=");
      qs[k] = v;
    }
  }
  return qs;
};

exports.sleep = (delay) => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, delay);
});

exports.range = (start, end) => {
  const arr = [];
  for (let i = start; i <= end; i += 1) {
    arr.push(i);
  }
  return arr;
};

exports.getDateTime = (s) => {
  const exec = (/(\d+)-(\d+)-(\d+)\s+(\d+):(\d+):(\d+)/.exec(s));
  const year = exec[1] - 0;
  const month = exec[2] - 1;
  const date = exec[3] - 0;
  const hh = exec[4] - 0;
  const mi = exec[5] - 0;
  const ss = exec[6] - 0;
  return new Date(year, month, date, hh, mi, ss);
};

exports.getFormatDate = (date, format) => {
  const obj = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  }

  for (const key in obj) {
    if (new RegExp(`(${key})`).test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1)
        ? (obj[key]) : ((`00${obj[key]}`).substr((`${obj[key]}`).length)));
    }
  }

  return format;
};
