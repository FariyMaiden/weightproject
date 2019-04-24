// public static String encryptDES(String encryptString, String encryptKey) throws Exception {
//   IvParameterSpec zeroIv = new IvParameterSpec(new byte[8]);
//   SecretKeySpec key = new SecretKeySpec(encryptKey.getBytes(), "DES");
//   Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
//   cipher.init(Cipher.ENCRYPT_MODE, key, zeroIv);
//   byte[] encryptedData = cipher.doFinal(encryptString.getBytes());

//   return new BASE64Encoder().encode(encryptedData);
// }
// 根据密钥解密字符串

// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// public static String decryptDES(String decryptString, String decryptKey) throws Exception {
//   byte[] byteMi = new BASE64Decoder().decodeBuffer(decryptString);
//   IvParameterSpec zeroIv = new IvParameterSpec(new byte[8]);
//   SecretKeySpec key = new SecretKeySpec(decryptKey.getBytes(), "DES");
//   Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
//   cipher.init(Cipher.DECRYPT_MODE, key, zeroIv);
//   byte decryptedData[] = cipher.doFinal(byteMi);

//   return new String(decryptedData);
// }

function encryptDES(encryptString, encryptKey) {
  zeroIv = new IvParameterSpec(new Array[8]);
  key = new SecretKeySpec(encryptKey.getBytes(), "DES");
  cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
  cipher.init(Cipher.ENCRYPT_MODE, key, zeroIv);
  encryptedData = cipher.doFinal(encryptString.getBytes());

  return new BASE64Encoder().encode(encryptedData);
}
// 根据密钥解密字符串

// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// public static String decryptDES(String decryptString, String decryptKey) throws Exception {
//   byte[] byteMi = new BASE64Decoder().decodeBuffer(decryptString);
//   IvParameterSpec zeroIv = new IvParameterSpec(new byte[8]);
//   SecretKeySpec key = new SecretKeySpec(decryptKey.getBytes(), "DES");
//   Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
//   cipher.init(Cipher.DECRYPT_MODE, key, zeroIv);
//   byte decryptedData[] = cipher.doFinal(byteMi);

//   return new String(decryptedData);
// }
