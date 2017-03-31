using System;
using System.Collections.Generic;
using System.Text;
using System.Security.Cryptography;
using System.Web;

namespace Common.DEncrypt
{
    public static class MD5DEncrypt
    {
        public static string getMD5(string str)
        {
            MD5 md5 = new MD5CryptoServiceProvider();
            string t2 =
                 BitConverter.ToString(md5.ComputeHash(
                 UTF8Encoding.UTF8.GetBytes(str)));
            t2 = t2.Replace("-", "");

            return t2.ToUpper();
        }

        public static string getMD5(string str, Encoding enc)
        {
            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            string t2 = BitConverter.ToString(md5.ComputeHash(enc.GetBytes(str)));
            t2 = t2.Replace("-", "");

            return t2.ToUpper();
        }

        public static string getMD5(HttpPostedFile path)
        {

            try
            {

                MD5CryptoServiceProvider get_md5 = new MD5CryptoServiceProvider();

                byte[] hash_byte = get_md5.ComputeHash(path.InputStream);

                string resule = System.BitConverter.ToString(hash_byte);

                resule = resule.Replace("-", "");

                return resule;

            }

            catch (Exception e)
            {
                return e.ToString();

            }
        }


























        /// <summary>
        /// 加密
        /// </summary>
        /// <param name="toEncrypt">要加密的字符串，即明文</param>
        /// <param name="key">公共密钥</param>
        /// <param name="useHashing">是否使用MD5生成机密秘钥</param>
        /// <returns>加密后的字符串，即密文</returns>
        public static string Encrypt(string toEncrypt, string key, bool useHashing)
        {
            try
            {
                byte[] keyArray;
                byte[] toEncryptArray = UTF8Encoding.UTF8.GetBytes(toEncrypt);

                if (useHashing)
                {
                    MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();
                    keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));
                }
                else
                    keyArray = UTF8Encoding.UTF8.GetBytes(key);

                TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();

                tdes.Key = keyArray;
                tdes.Mode = CipherMode.ECB;
                tdes.Padding = PaddingMode.PKCS7;

                ICryptoTransform cTransform = tdes.CreateEncryptor();
                byte[] resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);

                return Convert.ToBase64String(resultArray, 0, resultArray.Length);
            }
            catch
            {

            }
            return string.Empty;
        }

        /// <summary>
        /// 解密
        /// </summary>
        /// <param name="toDecrypt">要解密的字符串，即密文</param>
        /// <param name="key">公共密钥</param>
        /// <param name="useHashing">是否使用MD5生成机密密钥</param>
        /// <returns>解密后的字符串，即明文</returns>
        public static string Decrypt(string toDecrypt, string key, bool useHashing)
        {
            try
            {
                byte[] keyArray;
                byte[] toEncryptArray = Convert.FromBase64String(toDecrypt);

                if (useHashing)
                {
                    MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();
                    keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));
                }
                else
                    keyArray = UTF8Encoding.UTF8.GetBytes(key);

                TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();
                tdes.Key = keyArray;
                tdes.Mode = CipherMode.ECB;
                tdes.Padding = PaddingMode.PKCS7;

                ICryptoTransform cTransform = tdes.CreateDecryptor();
                byte[] resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);

                return UTF8Encoding.UTF8.GetString(resultArray);

            }
            catch
            {

            }
            return string.Empty;

        }




    }
}
