const CryptoJS = require('crypto-js')
const key = CryptoJS.enc.Utf8.parse('6vt$i*&q6bvlyn$1')
const iv = CryptoJS.enc.Utf8.parse('ttn#2yh!!7mxz#cj')
const Base64 = require('js-base64').Base64
const MD5 = require('js-md5')

//加密方法
export function AesEncrypt(word) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}
//解密方法
export function Decrypt(word) {
  let decrypt = CryptoJS.AES.decrypt(word, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

export function Encrypt(body) {
  var json = {
    "source": "0",
    "system_version": "10.2",
    "device_id": "00000000-0000-0000-0000-000000000000",
    "app_bundleid": "com.ouimeet.oyi",
    "version": "3.1.1",
    "language": localStorage.getItem('lang') === 'en' ? 'en' : 'zh_Hans',
    "timestamp": new Date().getTime(),
    "app_name": "OE Dating",
    "body": body
  };
  var str = JSON.stringify(json);
  str = str.replace("\r\n", "").replace("\t", "").trim();
  var jsonBase64 = Base64.encode(str);
  var sign = MD5(jsonBase64);
  var data = AesEncrypt(str);
  var obj = {
    sign: sign,
    data: data
  };
  return obj;
}