using System;
using System.Collections.Generic;
using System.Text;
using DBOperation;
using DBOperation.Operations;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using System.Text.RegularExpressions;

namespace RuleUtility
{
    /// <summary>
    /// 使用本类创建ID时，保证数据库连接是打开的
    /// </summary>
    public class IDsCreater
    {
        public enum DateType
        {
            SecondCount,
            HoursCount,
            MinuteCount,
            DayCount,
            YYMMDDHHMMSS,
            YYMMDDHHMM,
            YYMMDDHH,
            YYMMDD,
            YYMM,
            YYYY,
            NONE,
        }

        private class EntityIDManager
        {
            public string Key { get; set; }
            public string CustomStr { get; set; }
            public long MaxID { get; set; }
        }
        #region 单例
        private static IDsCreater creater;
        private static object lockObj = new object();
        public static IDsCreater GetCreater()
        {
            if (creater == null)
            {
                lock (lockObj)
                {
                    if (creater == null)
                    {
                        creater = new IDsCreater();
                    }
                }
            }
            return creater;
        }
        private IDsCreater()
        {
            maxIDs = new Dictionary<string, EntityIDManager>();
            Init2TableIDs();
        }

        /// <summary>
        /// 双表公用ID提前初始化。
        /// </summary>
        private void Init2TableIDs()
        {
            DBOperationManagment dbm = new DBOperationManagment();
            if (dbm.Open())
            {
                try
                {
                    //系统订单表和代理商结算订单表
                    string serverStr = GetNumberStr(ServerNumber, 1, 16);
                    string datestr = serverStr + GetDateStr(DateType.HoursCount, 16);
                    EntityIDManager eim = new EntityIDManager();
                    long mid1 = GetDataBaseMaxID(null, datestr, "SESNT_BP_Order", "OrderID", 16, dbm);
                    long mid2 = GetDataBaseMaxID(null, datestr, "SESNT_BP_AngencyDepositOrder", "OrderID", 16, dbm);
                    eim.MaxID = mid1 > mid2 ? mid1 : mid2;
                    mid2 = GetDataBaseMaxID(null, datestr, "SESNT_BP_AccountTransfer", "OrderID", 16, dbm);
                    eim.MaxID = eim.MaxID > mid2 ? eim.MaxID : mid2;
                    eim.Key = null;
                    eim.CustomStr = datestr;
                    maxIDs.Add("SESNT_BP_Order", eim);
                    dbm.Close();
                }
                catch (Exception)
                {

                }
                finally
                {
                    dbm.Close();
                }
            }
        }

        #endregion
        /// <summary>
        /// 服务器ID
        /// </summary>
        public static int ServerNumber;//3位
        private Dictionary<string, EntityIDManager> maxIDs;
        private static DateTime oDate = new DateTime(2010, 1, 1, 0, 0, 0);
        private static DateTime oldODate = new DateTime(2000, 1, 1, 0, 0, 0);
        private static object lockObject = new object();
        /// <summary>
        /// 返回7为36进制秒总数
        /// </summary>
        /// <returns></returns>
        private string GetDateStr(DateType dType, int tobase)
        {
            switch (dType)
            {
                case DateType.SecondCount:
                    return GetNumberStr((long)(DateTime.Now - oDate).TotalSeconds, 7, tobase);
                case DateType.HoursCount:
                    return GetNumberStr((long)(DateTime.Now - oDate).TotalHours, 5, tobase);
                case DateType.MinuteCount:
                    return GetNumberStr((long)(DateTime.Now - oDate).TotalMinutes, 6, tobase);
                case DateType.DayCount:
                    return GetNumberStr((long)(DateTime.Now - oDate).TotalDays, 4, tobase);
                case DateType.YYYY:
                    return DateTime.Now.ToString("yyyy");
                case DateType.YYMM:
                    return DateTime.Now.ToString("yyMM");
                case DateType.YYMMDD:
                    return DateTime.Now.ToString("yyMMdd");
                case DateType.YYMMDDHH:
                    return DateTime.Now.ToString("yyMMddHH");
                case DateType.YYMMDDHHMM:
                    return DateTime.Now.ToString("yyMMddHHmm");
                case DateType.YYMMDDHHMMSS:
                    return DateTime.Now.ToString("yyMMddHHmmss");
                default:
                    return "";
            }

        }

        /// <summary>
        /// 返回7为36进制秒总数
        /// </summary>
        /// <returns></returns>
        private static string GetDateStr(DateType dType, int tobase, DateTime toDate)
        {
            switch (dType)
            {
                case DateType.SecondCount:
                    return GetNumberStr((long)(toDate - oDate).TotalSeconds, 7, tobase);
                case DateType.HoursCount:
                    return GetNumberStr((long)(toDate - oDate).TotalHours, 5, tobase);
                case DateType.MinuteCount:
                    return GetNumberStr((long)(toDate - oDate).TotalMinutes, 6, tobase);
                case DateType.DayCount:
                    return GetNumberStr((long)(toDate - oDate).TotalDays, 4, tobase);
                case DateType.YYMM:
                    return toDate.ToString("yyMM");
                case DateType.YYMMDD:
                    return toDate.ToString("yyMMdd");
                case DateType.YYMMDDHH:
                    return toDate.ToString("yyMMddHH");
                case DateType.YYMMDDHHMM:
                    return toDate.ToString("yyMMddHHmm");
                case DateType.YYMMDDHHMMSS:
                    return toDate.ToString("yyMMddHHmmss");
                default:
                    return "";
            }

        }

        /// <summary>
        /// 获取指定长度的36进制字符串
        /// </summary>
        /// <param name="number"></param>
        /// <param name="strLenght"></param>
        /// <returns></returns>
        public static string GetNumberStr(long number, int strLenght, int toBase)
        {
            string str = DataConveter.AnyRadixConvert.h2x(number, toBase);
            if (toBase == 10)
                str = number.ToString();
            else
                str = DataConveter.AnyRadixConvert.h2x(number, toBase);
            if (str.Length < strLenght)
            {
                int length = str.Length;
                for (int i = 0; i < strLenght - length; i++)
                {
                    str = "0" + str;
                }
            }
            else if (str.Length > strLenght)
            {
                throw new OverflowException("数据长度超过限定长度...");
            }
            return str;
        }

        //创建新ID
        public static string[] CreateIDsByDay(int toServerNumber, string key, DateTime toTime, int xCount, int idsCount, DateType dType, int toBase)
        {
            string serverStr = null;
            if (toBase == 36)
            {
                serverStr = GetNumberStr(toServerNumber, 2, toBase);
            }
            else if (toBase == 16)
            {
                serverStr = GetNumberStr(toServerNumber, 2, toBase);
            }
            else if (toBase == 10)
            {
                serverStr = GetNumberStr(toServerNumber, 2, toBase);
            }
            else
            {
                throw new Exception("只支持 10,16,36 进制");
            }
            List<string> newIDs = new List<string>();
            for (int i = 1; i <= idsCount; i++)
            {
                try
                {
                    newIDs.Add(GetNewIDByKey(key, serverStr, toTime, xCount, dType, i, toBase));
                }
                catch (Exception)
                {
                    break;
                }
            }
            return newIDs.ToArray();
        }


        //创建新ID
        private string CreateIDByKey(string key, int xCount, DateType dType,
            string tableName, string idFieldName, int toBase, DBOperationManagment dbm)
        {
            string newID = null;
            int testCount = 0;
            while (string.IsNullOrEmpty(newID) && testCount < 5)
            {
                try
                {
                    newID = GetNewIDByKey(key, xCount, dType, tableName, idFieldName, toBase, dbm);
                }
                catch (OverflowException)
                {
                    System.Threading.Thread.Sleep(100);
                    testCount++;
                }
            }
            return newID;
        }

        private long GetDataBaseMaxID(string key, string dateStr, string tableName,
            string idFieldName, int toBase, DBOperationManagment dbm)
        {
            if (dbm == null) return 0;
            ExecuteAndReturnFirstCell cell = new ExecuteAndReturnFirstCell();
            if (!string.IsNullOrEmpty(key))
                cell.SqlCommand = "select Max(" + idFieldName + ") from [" + tableName + "] where " + idFieldName + " like '" + key + dateStr + "%'";
            else
                cell.SqlCommand = "select Max(" + idFieldName + ") from [" + tableName + "] where " + idFieldName + " like '" + dateStr + "%'";
            cell.Parameters = null;
            dbm.Execute(cell);
            if (cell.ResultObj != null && cell.ResultObj != DBNull.Value)
            {
                int start = 0;
                if (!string.IsNullOrEmpty(key))
                    start = key.Length;
                string dbValue = cell.ResultObj.ToString();
                try
                {
                    switch (toBase)
                    {
                        case 36:
                            return DataConveter.AnyRadixConvert.x2h(dbValue.Substring(dateStr.Length + start), 36);
                        case 16:
                            return DataConveter.AnyRadixConvert.x2h(dbValue.Substring(dateStr.Length + start), 16);
                        default:
                            return int.Parse(dbValue.Substring(dateStr.Length + start));
                    }
                }
                catch (Exception)
                {
                    return 0;
                }
            }
            else
            {
                return 0;
            }
        }

        //创建新ID
        private static string GetNewIDByKey(string key, string serverStr, DateTime toTime, int xCount, DateType dType, long maxid, int toBase)
        {
            string ccoID = "";
            string datestr = serverStr + GetDateStr(dType, toBase, toTime);
            if (!string.IsNullOrEmpty(key))
                ccoID = key + datestr + GetNumberStr(maxid, xCount, toBase);
            else
                ccoID = datestr + GetNumberStr(maxid, xCount, toBase);
            return ccoID;
        }

        //创建新ID
        private string GetNewIDByKey(string key, int xCount, DateType dType,
            string tableName, string idFieldName, int toBase, DBOperationManagment dbm)
        {
            string ccoID = "";
            string serverStr = null;
            if (toBase == 36)
            {
                serverStr = GetNumberStr(ServerNumber, 2, toBase);
            }
            else if (toBase == 16)
            {
                serverStr = GetNumberStr(ServerNumber, 2, toBase);
            }
            else if (toBase == 10)
            {
                serverStr = GetNumberStr(ServerNumber, 2, toBase);
            }
            else
            {
                throw new Exception("只支持 10,16,36 进制");
            }
            string datestr = serverStr + GetDateStr(dType, toBase);
            EntityIDManager eim;
            lock (maxIDs)
            {
                if (!maxIDs.ContainsKey(tableName + idFieldName))
                {
                    eim = new EntityIDManager();
                    eim.MaxID = GetDataBaseMaxID(key, datestr, tableName, idFieldName, toBase, dbm);
                    eim.Key = key;
                    eim.CustomStr = datestr;
                    maxIDs.Add(tableName + idFieldName, eim);
                }
                else
                {
                    eim = maxIDs[tableName + idFieldName];
                }
            }
            long maxid = 0;
            lock (eim)
            {
                if (eim.CustomStr == datestr)
                {
                    eim.MaxID++;
                }
                else
                {
                    eim.MaxID = 1;
                    eim.CustomStr = datestr;
                }
                maxid = eim.MaxID;
            }
            if (!string.IsNullOrEmpty(key))
                ccoID = key + datestr + GetNumberStr(maxid, xCount, toBase);
            else
                ccoID = datestr + GetNumberStr(maxid, xCount, toBase);
            return ccoID;
        }


        #region GQY 产品ID
        public string CreateProductID(DBOperationManagment dbm)
        {
            return CreateIDByKey("PC", 5, DateType.YYMMDD, "ProductCenter", "ProductID", 10, dbm);
        }
        #endregion

        #region GQY 产品型号ID
        public string CreateProductModelID(DBOperationManagment dbm)
        {
            return CreateIDByKey("PM", 5, DateType.YYMMDD, "ProductCenterModel", "ProductModelID", 10, dbm);
        }
        #endregion

        #region GQY 产品详情型号ID
        public string CreateProductDetailID(DBOperationManagment dbm)
        {
            return CreateIDByKey("PD", 5, DateType.YYMMDD, "ProductCenterDetail", "ProductDetailID", 10, dbm);
        }
        #endregion
    }
}
