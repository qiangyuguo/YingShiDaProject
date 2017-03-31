using System;
using System.Collections.Generic;
using System.Text;

namespace DataConveter
{
    public static class DataConveter
    {
        private static Dictionary<char, byte> charKey;
        private static Dictionary<byte, char> bcdKey;
        private static object lockObj = new object();
        private static Dictionary<byte, char> GetBcdKey()
        {
            if (bcdKey == null)
            {
                lock (lockObj)
                {
                    if (bcdKey == null)
                    {
                        bcdKey = new Dictionary<byte, char>();
                        bcdKey.Add(0, '0');
                        bcdKey.Add(1, '1');
                        bcdKey.Add(2, '2');
                        bcdKey.Add(3, '3');
                        bcdKey.Add(4, '4');
                        bcdKey.Add(5, '5');
                        bcdKey.Add(6, '6');
                        bcdKey.Add(7, '7');
                        bcdKey.Add(8, '8');
                        bcdKey.Add(9, '9');
                        bcdKey.Add(10, 'A');
                        bcdKey.Add(11, 'B');
                        bcdKey.Add(12, 'C');
                        bcdKey.Add(13, 'D');
                        bcdKey.Add(14, 'E');
                        bcdKey.Add(15, 'F');
                    }
                }
            }
            return bcdKey;
        }

        private static Dictionary<char, byte> GetCharKey()
        {
            if (charKey == null)
            {
                lock (lockObj)
                {
                    if (charKey == null)
                    {
                        charKey = new Dictionary<char, byte>();
                        charKey.Add('0', 0);
                        charKey.Add('1', 1);
                        charKey.Add('2', 2);
                        charKey.Add('3', 3);
                        charKey.Add('4', 4);
                        charKey.Add('5', 5);
                        charKey.Add('6', 6);
                        charKey.Add('7', 7);
                        charKey.Add('8', 8);
                        charKey.Add('9', 9);
                        charKey.Add('A', 10);
                        charKey.Add('B', 11);
                        charKey.Add('C', 12);
                        charKey.Add('D', 13);
                        charKey.Add('E', 14);
                        charKey.Add('F', 15);
                    }
                }
            }
            return charKey;
        }

        public static int StringToBCD(byte[] buffer, int offset, string data, bool left)
        {
            try
            {
                int index = 0;
                Dictionary<char, byte> cKey = GetCharKey();
                if (left)
                {
                    int i = 0;
                    for (; i < data.Length - 1; i += 2)
                    {
                        buffer[offset + index] = (byte)(((cKey[data[i]] & 0x0F) << 4) | (cKey[data[i + 1]] & 0x0F));
                        index++;
                    }
                    if (i < data.Length)
                    {
                        buffer[offset + index] = (byte)((cKey[data[i]] & 0x0F) << 4);
                        index++;
                    }
                }
                else
                {
                    if ((data.Length & 1) > 0)//数字的二进制码最后1位是1则为奇数
                    {
                        buffer[offset] = (byte)(cKey[data[0]] & 0x0F);
                        index++;
                        for (int i = 1; i < data.Length - 1; i += 2)
                        {
                            buffer[offset + index] = (byte)(((cKey[data[i]] & 0x0F) << 4) | (cKey[data[i + 1]] & 0x0F));
                            index++;
                        }
                    }
                    else
                    {
                        for (int i = 0; i < data.Length - 1; i += 2)
                        {
                            buffer[offset + index] = (byte)(((cKey[data[i]] & 0x0F) << 4) | (cKey[data[i + 1]] & 0x0F));
                            index++;
                        }
                    }
                }
                return index;
            }
            catch (Exception ex)
            {
                throw new Exception("StringToBCD 错误 源数据：" + data + " offset:" + offset.ToString() + " buffer:" + buffer.Length.ToString());
            }
        }

        public static string BCDToString(byte[] buffer, int offset, int lenght, out int bufferLenght, bool left)
        {
            Dictionary<byte, char> bKey = GetBcdKey();
            StringBuilder sb = new StringBuilder();
            bufferLenght = lenght / 2;
            if (left)
            {
                int i = 0;
                for (; i < bufferLenght; i++)
                {
                    sb.Append(bKey[(byte)(buffer[i + offset] >> 4)]);
                    sb.Append(bKey[(byte)(buffer[i + offset] & 0x0F)]);
                }
                if ((lenght & 1) > 0)
                {
                    sb.Append(bKey[(byte)(buffer[i + offset] >> 4)]);
                    bufferLenght += 1;
                }
            }
            else
            {
                if ((lenght & 1) > 0)
                {
                    sb.Append(bKey[(byte)(buffer[offset] & 0x0F)]);
                    bufferLenght += 1;
                }
                else
                {
                    sb.Append(bKey[(byte)(buffer[offset] >> 4)]);
                    sb.Append(bKey[(byte)(buffer[offset] & 0x0F)]);
                }
                int i = 1;
                for (; i < bufferLenght; i++)
                {
                    sb.Append(bKey[(byte)(buffer[i + offset] >> 4)]);
                    sb.Append(bKey[(byte)(buffer[i + offset] & 0x0F)]);
                }
            }
            return sb.ToString();
        }

        /// <summary> 
        /// 字节数组转16进制字符串 
        /// </summary> 
        /// <param name="bytes"></param> 
        /// <returns></returns> 
        public static string byteToHexLogStr(byte[] bytes, int offset, int lenght)
        {
            string returnStr = "";
            if (bytes != null)
            {
                for (int i = offset; i < offset + lenght; i++)
                {
                    returnStr += bytes[i].ToString("X2") + " ";
                }
            }
            return returnStr;
        }

        /// <summary> 
        /// 字节数组转16进制字符串 
        /// </summary> 
        /// <param name="bytes"></param> 
        /// <returns></returns> 
        public static string byteToHexLogStr16Line(byte[] bytes, int offset, int lenght)
        {
            string returnStr = "";
            if (bytes != null)
            {
                for (int i = offset; i < offset + lenght; i++)
                {
                    returnStr += bytes[i].ToString("X2") + " ";
                    if ((i - offset) % 16 == 0)
                    {
                        returnStr += "\r\n";
                    }
                    else if ((i - offset) % 8 == 0)
                    {
                        returnStr += " ";
                    }
                }
            }
            return returnStr;
        }

        /// <summary> 
        /// 字节数组转16进制字符串 
        /// </summary> 
        /// <param name="bytes"></param> 
        /// <returns></returns> 
        public static string byteToHexStr(byte[] bytes, int offset, int lenght)
        {
            string returnStr = "";
            if (bytes != null)
            {
                for (int i = offset; i < offset + lenght; i++)
                {
                    returnStr += bytes[i].ToString("X2");
                }
            }
            return returnStr;
        }

        /// <summary> 
        /// 字节数组转16进制字符串 
        /// </summary> 
        /// <param name="bytes"></param> 
        /// <returns></returns> 
        public static string byteToHexStr(byte[] bytes)
        {
            string returnStr = "";
            if (bytes != null)
            {
                for (int i = 0; i < bytes.Length; i++)
                {
                    returnStr += bytes[i].ToString("X2");
                }
            }
            return returnStr;
        }

        /// <summary> 
        /// 字符串转16进制字节数组 等长 
        /// </summary> 
        /// <param name="hexString"></param> 
        /// <returns></returns> 
        public static byte[] HexStrToByte1In1(string hexString)
        {
            hexString = hexString.Replace(" ", "");
            byte[] returnBytes = new byte[hexString.Length];
            for (int i = 0; i < returnBytes.Length; i++)
                returnBytes[i] = Convert.ToByte(hexString[i].ToString(), 16);
            return returnBytes;
        }

        /// <summary> 
        /// 字符串转16进制字节数组 长度减一半 奇数尾部补0
        /// </summary> 
        /// <param name="hexString"></param> 
        /// <returns></returns> 
        public static byte[] HexStrToByte2In1(string hexString)
        {
            hexString = hexString.Replace(" ", "");
            if ((hexString.Length % 2) != 0)
                hexString += "0";
            byte[] returnBytes = new byte[hexString.Length / 2];
            for (int i = 0; i < returnBytes.Length; i++)
                returnBytes[i] = Convert.ToByte(hexString.Substring(i * 2, 2), 16);
            return returnBytes;
        }


        /// <summary> 
        /// 字符串转16进制字节数组 长度减一半 奇数尾部补0
        /// </summary> 
        /// <param name="hexString"></param> 
        /// <returns></returns> 
        public static byte[] HexStrToByte2In1(string hexString, int index, int length)
        {
            byte[] returnBytes = new byte[length / 2];
            for (int i = 0; i < (length / 2); i++)
            {
                while (hexString[i + index] == ' ')
                    i += 1;
                returnBytes[i] = Convert.ToByte(hexString.Substring(index + (i * 2), 2), 16);
            }
            return returnBytes;
        }

        public static string TrackToCardNumber(string t2, string t3)
        {
            string cardNumber = null;
            if (!string.IsNullOrEmpty(t2))
            {
                cardNumber = t2.Substring(0, t2.IndexOf('='));
            }
            else if (!string.IsNullOrEmpty(t3))
            {
                cardNumber = t3.Substring(2, t3.IndexOf('=') - 2);
            }
            return cardNumber;
        }

        public static string TrackToPan(string t2, string t3)
        {
            string cardNumber = TrackToCardNumber(t2, t3);
            if (string.IsNullOrEmpty(cardNumber) || cardNumber.Length < 12) return null;
            string pan = cardNumber.Substring(cardNumber.Length - 13, 12);
            return pan;
        }

        /// <summary>
        /// 8583协议余额转为正常字符串
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string ISO8583BalanceToString(string str)
        {
            int index = 0;
            string back = "";
            while (index < str.Length)
            {
                string accountType = str.Substring(index, 2);
                string rAccountType = "";
                //if (accountType == "10")
                //    rAccountType = "储蓄账户 ";
                //else if (accountType == "20")
                //    rAccountType = "支票账户 ";
                //else if (accountType == "30")
                //    rAccountType = "信用卡账户 ";
                //else if (accountType == "90")
                //    rAccountType = "积分账户 ";
                string amountCountType = str.Substring(index + 2, 2);
                string rAmountCountType = "余额";
                if (amountCountType == "01")
                    rAmountCountType = "帐户金额";
                else if (amountCountType == "02")
                    rAmountCountType = "可用金额";
                else if (amountCountType == "03")
                    rAmountCountType = "拥有金额";
                else if (amountCountType == "04")
                    rAmountCountType = "应付金额";
                else if (amountCountType == "04")
                    rAmountCountType = "应付金额";
                else if (amountCountType == "40")
                    rAmountCountType = "可用取款限额";
                else if (amountCountType == "56")
                    rAmountCountType = "可用转帐限额";
                string moneyType = str.Substring(index + 4, 3);
                string amountCountsign = str.Substring(index + 7, 1);
                string amountCount = str.Substring(index + 8, 12);
                decimal money = decimal.Parse(amountCount) / 100;
                if (amountCountsign == "C")
                {
                    back += rAccountType + rAmountCountType + "：" + money.ToString("F2") + "\n";
                }
                else if (amountCountsign == "D")
                {
                    if (money != 0)
                    {
                        back += rAccountType + rAmountCountType + "：-" + money.ToString("F2") + "\n";
                    }
                    else
                    {
                        back += rAccountType + rAmountCountType + "：" + money.ToString("F2") + "\n";
                    }
                }
                else
                {
                    back += rAccountType + rAmountCountType + "：" + money.ToString("F2") + "\n";
                }
                index += 20;
            }
            return back;
        }
        ///<summary>
        ///字符串转16进制字节数组
        ///</summary>
        ///<param name="hexString"></param>
        ///<returns></returns>
        public static byte[] strToToHexByte(string hexString)
        {
            if (string.IsNullOrEmpty(hexString))
                return null;
            hexString = hexString.Replace(" ", "");
            if ((hexString.Length % 2) != 0)
                hexString += "0";
            byte[] returnBytes = new byte[hexString.Length / 2];
            for (int i = 0; i < returnBytes.Length; i++)

                returnBytes[i] = Convert.ToByte(hexString.Substring(i * 2, 2), 16);
            return returnBytes;
        }

        public static string ByteToHexLogString(byte[] bytes, int offset, int lenght)
        {
            string str = string.Empty;
            if (bytes != null)
            {
                for (int i = offset; i < lenght; i++)
                {
                    str += bytes[i].ToString("X2") + " ";
                }
            }
            return str;
        }

        public static string ByteToASCIILogString(byte[] bytes, int offset, int lenght)
        {
            if (lenght + offset < bytes.Length)
                return Encoding.ASCII.GetString(bytes, offset, lenght);
            else
                return Encoding.ASCII.GetString(bytes, offset, bytes.Length - offset);
        }

        public static string ByteToHexString(byte[] bytes)
        {
            string str = string.Empty;
            if (bytes != null)
            {
                for (int i = 0; i < bytes.Length; i++)
                {
                    str += bytes[i].ToString("X2") + " ";
                }
            }
            return str;
        }

        public static string ByteToHexStrNoSpcase(byte[] bytes)
        {
            string str = string.Empty;
            if (bytes != null)
            {
                for (int i = 0; i < bytes.Length; i++)
                {
                    str += bytes[i].ToString("X2");
                }
            }
            return str;
        }

        public static string ByteToHexStrNoSpcase(byte[] bytes, int offset, int len)
        {

            string str = string.Empty;
            if (bytes != null)
            {
                if (offset + len > bytes.Length )
                {
                    throw new IndexOutOfRangeException();
                }
                for (int i = offset; i <offset + len; i++)
                {
                    str += bytes[i].ToString("X2");
                }
            }
            return str;
        }

        public static string HexStrToString(string hexString)
        {
            string str = string.Empty;
            if (hexString.Length % 2 != 0)
            {
                return str;
            }
            byte[] datas = HexStrToByte2In1(hexString);

            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < datas.Length && i < 6; i++)
            {
                sb.Append(datas[i].ToString("X"));
            }
            str = sb.ToString();
            return str;
        }
        /// <summary>
        /// 按照参数名称的ASCII码进行排序
        /// 数组格式为string[] args = { param1=value1,param2=value2,... };
        /// </summary>
        /// <param name="args"></param>
        public static void AsciiSort(List<string> args)
        {
            for (var i = 1; i < args.Count; i++)
            {
                for (var j = 0; j < args.Count - i; j++)
                {
                    var k = 0;
                    while (true)
                    {
                        if (args[j][k].CompareTo(args[j + 1][k]) == 0)
                        {
                            k++;
                            continue;
                        }
                        break;
                    }
                    if (args[j][k].CompareTo(args[j + 1][k]) <= 0) continue;

                    var tmp3 = args[j];
                    args[j] = args[j + 1];
                    args[j + 1] = tmp3;
                }
            }
        }

        /// <summary>
        /// 按照参数名称的ASCII码进行排序
        /// 数组格式为string[] args = { param1=value1,param2=value2,... };
        /// </summary>
        /// <param name="args"></param>
        public static void AsciiSort(string[] args)
        {
            for (var i = 1; i < args.Length; i++)
            {
                for (var j = 0; j < args.Length - i; j++)
                {
                    var k = 0;
                    while (true)
                    {
                        if (args[j][k].CompareTo(args[j + 1][k]) == 0)
                        {
                            k++;
                            continue;
                        }
                        break;
                    }
                    if (args[j][k].CompareTo(args[j + 1][k]) <= 0) continue;

                    var tmp3 = args[j];
                    args[j] = args[j + 1];
                    args[j + 1] = tmp3;
                }
            }
        }


        public static byte[] XOR(byte[] data1, byte[] data2)
        {

            byte[] result = new byte[data1.Length];
            byte d2 = (byte)0;
            for (int i = 0; i < data1.Length; i++)
            {
                if (i < data2.Length) d2 = data2[i];
                result[i] = (byte)(data1[i] ^ d2);
            }
            return result;
        }
    }
}
