<template>
  <div>
    <button @click="DESTEST">点击加密</button>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
// import { encryptBy, decryptBy } from "../config/DES.JS";
import { Encrypt, Decrypt } from "../config/MYAES2.JS";
// import { encryptByDES, decryptByDESModeEBC } from "../config/DES.JS";

export default {
  data() {
    return {};
  },
  methods: {
    encryptDES(encryptString, encryptKey) {
      zeroIv = new IvParameterSpec(new Array[8]());
      key = new SecretKeySpec(encryptKey.getBytes(), "DES");

      cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
      cipher.init(Cipher.ENCRYPT_MODE, key, zeroIv);
      encryptedData = cipher.doFinal(encryptString.getBytes());

      return new BASE64Encoder().encode(encryptedData);
    },
    // DES CBC模式加密
    //加密内容、秘钥、向量
    encryptByDES(message, key, iv) {
      var keyHex = CryptoJS.enc.Utf8.parse(key);
      var ivHex = CryptoJS.enc.Utf8.parse(iv);
      let encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.ciphertext.toString();
    },

    //DES  CBC模式解密
    decryptByDESModeEBC(ciphertext) {
      //把私钥转换成UTF - 8编码的字符串
      var keyHex = CryptoJS.enc.Utf8.parse(key);
      var ivHex = CryptoJS.enc.Utf8.parse(iv);
      // direct decrypt ciphertext
      var decrypted = CryptoJS.DES.decrypt(
        {
          ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
        },
        keyHex,
        {
          iv: ivHex,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        }
      );
      return decrypted.toString(CryptoJS.enc.Utf8);
    },
    //十六进制字符串转为base64
    sha1_to_base64(sha1) {
      var digits =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var base64_rep = "";
      var cnt = 0;
      var bit_arr = 0;
      var bit_num = 0;
      var ascv;
      for (var n = 0; n < sha1.length; ++n) {
        if (sha1[n] >= "A" && sha1[n] <= "Z") {
          ascv = sha1.charCodeAt(n) - 55;
        } else if (sha1[n] >= "a" && sha1[n] <= "z") {
          ascv = sha1.charCodeAt(n) - 87;
        } else {
          ascv = sha1.charCodeAt(n) - 48;
        }
        bit_arr = (bit_arr << 4) | ascv;
        bit_num += 4;
        if (bit_num >= 6) {
          bit_num -= 6;
          base64_rep += digits[bit_arr >>> bit_num];
          bit_arr &= ~(-1 << bit_num);
        }
      }
      if (bit_num > 0) {
        bit_arr <<= 6 - bit_num;
        base64_rep += digits[bit_arr];
      }
      var padding = base64_rep.length % 4;
      if (padding > 0) {
        for (var n = 0; n < 4 - padding; ++n) {
          base64_rep += "=";
        }
      }
      return base64_rep;
    },
    DESTEST() {
      var key = "zwzwzwzw";
      var iv = [0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef];
      var msg = "10023";
      console.log(this.sha1_to_base64(msg));
      console.log(this.encryptByDES(this.sha1_to_base64(msg), key, iv));
      // let message = "123456"; //加密数据
      // let message = "10023";
      // let key = "zwzwzwzw";
      //加密

      // console.log(this.encryptDES("123456", "zwzwzwzw"));
      // console.log(Encrypt(message));
      // console.log(Decrypt("77549CF8983DB661ADAEB15200AFC251"));

      // let msg = "123456";
      // console.log(encryptBy(msg));

      // console.log(this.$encryptPsd("10023"));
      // console.log(
      //   this.$encryptPsd("U2FsdGVkX1+JVEJg+W7vVIXOhDuRIkU1W1uskhYaZxs=")
      // );

      //使用

      // let name = "10023";

      // // 加密
      // let encryptName = Encrypt(name);

      // console.log(encryptName);

      // // 解密
      // let encryptName2 = Decrypt("CA105E50F8AD1B48148051A491AAC938");

      // console.log(encryptName2);
    }
  }
};
</script>

<style scoped>
</style>
