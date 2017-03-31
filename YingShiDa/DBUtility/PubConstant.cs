using System;
using System.Configuration;
using System.Security.Cryptography;

namespace DBUtility
{

    public class PubConstant
    {
        public static string ConStr = null;
        static byte[] MAINKEY = new byte[] { 0x75, 0xD8, 0x4F, 0x44, 0x0A, 0x97, 0xD4, 0x7D, 0x7A, 0xA3, 0x05, 0x13, 0xD6, 0x71, 0x30, 0xC9, 0xB2, 0x30, 0xF0, 0x25, 0xEC, 0xF7, 0x3F, 0x2B };
        /// <summary>
        /// 获取连接字符串
        /// </summary>
        public static string ConnectionString(string strKey, string isEncKey)
        {
            string _connectionString = ConfigurationManager.AppSettings[strKey];
            string ConStringEncrypt = ConfigurationManager.AppSettings[isEncKey];
            if (!string.IsNullOrEmpty(_connectionString))
            {
                try
                {
                    if (!string.IsNullOrEmpty(ConStringEncrypt) && ConStringEncrypt.ToLower() == "true")
                    {
                        byte[] strData = HexStrToByte2In1(_connectionString);
                        _connectionString = System.Text.Encoding.UTF8.GetString(Decrypt3DES(strData, MAINKEY));
                    }
                    ConStr = _connectionString;
                    return ConStr;
                }
                catch (Exception)
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        public static string ConnectionString2()
        {
            try
            {
                string _connectionString = ConfigurationManager.AppSettings["ConnectionString2"];
                string ConStringEncrypt = ConfigurationManager.AppSettings["ConStringEncrypt"];
                if (ConStringEncrypt.ToLower() == "true")
                {
                    try
                    {
                        byte[] strData = HexStrToByte2In1(_connectionString);
                        _connectionString = System.Text.Encoding.UTF8.GetString(Decrypt3DES(strData, MAINKEY));
                    }
                    catch (Exception)
                    {
                        return null;
                    }
                }
                return _connectionString;
            }
            catch (Exception)
            {
                return null;
            }
        }


        public static string ConnectionString3()
        {
            try
            {
                string _connectionString = ConfigurationManager.AppSettings["ConnectionString3"];
                string ConStringEncrypt = ConfigurationManager.AppSettings["ConStringEncrypt"];
                if (ConStringEncrypt.ToLower() == "true")
                {
                    try
                    {
                        byte[] strData = HexStrToByte2In1(_connectionString);
                        _connectionString = System.Text.Encoding.UTF8.GetString(Decrypt3DES(strData, MAINKEY));
                    }
                    catch (Exception)
                    {
                        return null;
                    }
                }
                return _connectionString;
            }
            catch (Exception)
            {
                return null;
            }
        }



        /// <summary>
        /// 获取连接字符串
        /// </summary>
        public static string ConnectionString()
        {
            try
            {
                string _connectionString = ConfigurationManager.AppSettings["ConnectionString"];
                string ConStringEncrypt = ConfigurationManager.AppSettings["ConStringEncrypt"];
                if (ConStringEncrypt.ToLower() == "true")
                {
                    try
                    {
                        byte[] strData = HexStrToByte2In1(_connectionString);
                        _connectionString = System.Text.Encoding.UTF8.GetString(Decrypt3DES(strData, MAINKEY));
                    }
                    catch (Exception)
                    {
                        return null;
                    }
                }
                return _connectionString;
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary> 
        /// 字符串转16进制字节数组 长度减一半 奇数尾部补0
        /// </summary> 
        /// <param name="hexString"></param> 
        /// <returns></returns> 
        private static byte[] HexStrToByte2In1(string hexString)
        {
            hexString = hexString.Replace(" ", "");
            if ((hexString.Length % 2) != 0)
                hexString += "0";
            byte[] returnBytes = new byte[hexString.Length / 2];
            for (int i = 0; i < returnBytes.Length; i++)
                returnBytes[i] = Convert.ToByte(hexString.Substring(i * 2, 2), 16);
            return returnBytes;
        }

        private static byte[] Decrypt3DES(byte[] srcData, byte[] a_strKey)
        {
            TripleDESCryptoServiceProvider DES = new TripleDESCryptoServiceProvider();
            DES.Mode = CipherMode.ECB;
            DES.Padding = System.Security.Cryptography.PaddingMode.Zeros;
            DES.Key = a_strKey;
            //DES.IV = a_strKey;
            ICryptoTransform DESDecrypt = DES.CreateDecryptor();

            try
            {
                return DESDecrypt.TransformFinalBlock(srcData, 0, srcData.Length);
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// 得到web.config里配置项的数据库连接字符串。
        /// </summary>
        /// <param name="configName"></param>
        /// <returns></returns>
        public static string GetConnectionString(string configName)
        {
            string connectionString = ConfigurationManager.AppSettings[configName];
            string ConStringEncrypt = ConfigurationManager.AppSettings["ConStringEncrypt"];
            if (ConStringEncrypt.ToLower() == "true")
            {
                try
                {
                    byte[] strData = HexStrToByte2In1(connectionString);
                    connectionString = System.Text.Encoding.UTF8.GetString(Decrypt3DES(strData, MAINKEY));
                }
                catch (Exception)
                {
                    return null;
                }
            }
            return connectionString;
        }

        /// <summary>
        /// 获取餐饮对接数据库连接字符串
        /// </summary>
        public static string ConnectionStringTran()
        {
            try
            {
                string _connectionString = ConfigurationManager.AppSettings["ConnectionStringTran"];
                string ConStringEncrypt = ConfigurationManager.AppSettings["ConStringTranEncrypt"];
                if (ConStringEncrypt.ToLower() == "true")
                {
                    try
                    {
                        byte[] strData = HexStrToByte2In1(_connectionString);
                        _connectionString = System.Text.Encoding.UTF8.GetString(Decrypt3DES(strData, MAINKEY));
                    }
                    catch (Exception)
                    {
                        return null;
                    }
                }
                return _connectionString;
            }
            catch (Exception ex)
            {
                return null;
            }
        }


    }
}
