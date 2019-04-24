import CryptoJS from 'crypto-js';

// 默认的 KEY 与 iv 如果没有给
//  const KEY = CryptoJS.enc.Utf8.parse('F697467B14B076F2')
//  const IV = CryptoJS.enc.Utf8.parse('0102030405060708')
const KEY = CryptoJS.enc.Utf8.parse('zwzwzwzw')
//const IV = CryptoJS.enc.Utf8.parse([0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF])
const IV = CryptoJS.enc.Utf8.parse("1234567890ABCDEF")



/**
 * AES加密 ：字符串 key iv  返回base64
 */
export function Encrypt(word, keyStr, ivStr) {
  let key = KEY
  let iv = IV

  if (keyStr) {

    key = CryptoJS.enc.Utf8.parse(keyStr);
    iv = CryptoJS.enc.Utf8.parse(ivStr);
  }

  let srcs = CryptoJS.enc.Utf8.parse(word);
  // let encrypted = CryptoJS.AES.encrypt(srcs, key, {
  //   iv: iv,
  //   mode: CryptoJS.mode.CBC,
  //   padding: CryptoJS.pad.Pkcs7
  // });
  let encrypted = CryptoJS.DES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  let hexStr = encrypted.ciphertext.toString().toUpperCase();
  return hexStr
}

/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 */
// export function Decrypt(word, keyStr, ivStr) {
//   let key = KEY
//   let iv = IV

//   if (keyStr) {
//     key = CryptoJS.enc.Utf8.parse(keyStr);
//     iv = CryptoJS.enc.Utf8.parse(ivStr);
//   }

//   let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
//   let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
//   let decrypt = CryptoJS.AES.decrypt(srcs, key, {
//     iv: iv,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7
//   });
//   let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
//   return decryptedStr.toString();
// }
