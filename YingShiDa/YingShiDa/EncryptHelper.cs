using System;
using System.Collections.Generic;
using System.Web;
using SecurityTools;
using System.Text;
namespace HighBusinessAreaPlat
{
    public class EncryptHelper
    {

        public static string Encrypt(string key, string src)
        {
            byte[] realKey = DataConveter.DataConveter.strToToHexByte(GeneriateKey(key));

            return DESEncrypt.DESEncoder(src, System.Text.Encoding.UTF8, realKey, null);
        }
        public static string Decrypt(string key, string src)
        {
            byte[] realKey = DataConveter.DataConveter.strToToHexByte(GeneriateKey(key));
            return DESEncrypt.DESDecoder(src, System.Text.Encoding.UTF8, realKey, null);
        }

        public static string GeneriateKey(string key)
        {
            int length = key.Length;
            if (length > 16)
            {
                key = key.Substring(length - 16, 16);
            }
            else if (length < 16)
            {
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < 16 - length; i++)
                {
                    if (i > 9)
                    {
                        sb.Append(i - 10);
                    }
                    else
                    {
                        sb.Append(i);
                    }
                }
                key = sb.Append(key).ToString(); ;
            }
            return key;

        }
    }
}