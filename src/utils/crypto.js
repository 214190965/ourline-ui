import CryptoJS from 'crypto-js'

const myCrypto = {
  set(word, keyStr) {
    keyStr = keyStr ? keyStr : 'ourlinePassword'; //16位的密钥，自己定义或者通过后台取，和下面的密钥要相同
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString()
  },
  //解密
  get(word, keyStr) {
    keyStr = keyStr ? keyStr : 'ourlinePassword'; //16位的密钥
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let decrypt = CryptoJS.AES.decrypt(word, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  }
};

export default myCrypto
