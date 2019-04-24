 import CryptoJS from 'crypto-js';

 // DES CBC模式加密
 //加密内容、秘钥、向量
 export const encryptByDES = (message, key, iv) => {

   var keyHex = CryptoJS.enc.Utf8.parse(key);
   var ivHex = CryptoJS.enc.Utf8.parse(iv);
   encrypted = CryptoJS.DES.encrypt(message, keyHex, {
     iv: ivHex,
     mode: CryptoJS.mode.CBC,
     padding: CryptoJS.pad.Pkcs7
   });
   return encrypted.ciphertext.toString();
 }

 //DES  CBC模式解密
 export const decryptByDESModeEBC = (ciphertext) => {
   //把私钥转换成UTF - 8编码的字符串
   var keyHex = CryptoJS.enc.Utf8.parse(key);
   var ivHex = CryptoJS.enc.Utf8.parse(iv);
   // direct decrypt ciphertext
   var decrypted = CryptoJS.DES.decrypt({
     ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
   }, keyHex, {
     iv: ivHex,
     mode: CryptoJS.mode.CBC,
     padding: CryptoJS.pad.Pkcs7
   });
   return decrypted.toString(CryptoJS.enc.Utf8);
 }

 // import CryptoJS from 'crypto-js';
 // //DES加密

 // export const encryptBy = (message) => {

 //   var key = 'zwzwzwzw';

 //   // var ivHex = CryptoJS.enc.Utf8.parse(IV);
 //   // encryptByDES(message, key)

 //   function encryptByDES(message, key) {


 //     var IV = CryptoJS.enc.Utf8.parse('1234567890ABCDEF')

 //     var keyHex = CryptoJS.enc.Utf8.parse(key)
 //     var option = {
 //       iv: IV,
 //       mode: CryptoJS.mode.ECB,
 //       padding: CryptoJS.pad.Pkcs7
 //     }

 //     var encrypted = CryptoJS.DES.encrypt(message, keyHex, option)

 //     return encrypted.ciphertext.toString()
 //   }
 //   return encryptByDES(message, key);
 // }
 // //DES解密
 // export const decryptBy = (message) => {
 //   var key = 'zwzwzwzw';
 //   //DES  ECB模式解密
 //   function decryptByDES(message, key) {
 //     var keyHex = CryptoJS.enc.Utf8.parse(key);

 //     var decrypted = CryptoJS.DES.decrypt({
 //       ciphertext: CryptoJS.enc.Hex.parse(message)
 //     }, keyHex, {

 //       mode: CryptoJS.mode.ECB,
 //       padding: CryptoJS.pad.Pkcs7
 //     });
 //     var result_value = decrypted.toString(CryptoJS.enc.Utf8);
 //     return result_value;
 //   }
 //   return decryptByDES(message, key);
 // }
