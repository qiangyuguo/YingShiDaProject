using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Reflection;

namespace Method
{
    /// <summary>

    /// 基于MySQL的数据层基类

    /// </summary>

    /// <remarks>

    /// 参考于MS Petshop 4.0

    /// </remarks>

    public abstract class SqlHelper
    {

        #region 数据库连接字符串
        //要插入的实体库地址
        public static readonly string DBConnection = ConfigurationManager.AppSettings["ConnectionString"].ToString();
       #endregion

        #region PrepareCommand

        /// <summary>

        /// Command预处理

        /// </summary>

        /// <param name="conn">SqlConnection对象</param>

        /// <param name="trans">SqlTransaction对象，可为null</param>

        /// <param name="cmd">SqlCommand对象</param>

        /// <param name="cmdType">CommandType，存储过程或命令行</param>

        /// <param name="cmdText">SQL语句或存储过程名</param>

        /// <param name="cmdParms">SqlCommand参数数组，可为null</param>

        private static void PrepareCommand(SqlConnection conn, SqlTransaction trans, SqlCommand cmd, CommandType cmdType, string cmdText, SqlParameter[] cmdParms)
        {

            if (conn.State != ConnectionState.Open)

                conn.Open();

            cmd.Connection = conn;

            cmd.CommandText = cmdText;

            if (trans != null)

                cmd.Transaction = trans;

            cmd.CommandType = cmdType;
            cmd.CommandTimeout = 240;

            if (cmdParms != null)
            {

                foreach (SqlParameter parm in cmdParms)

                    cmd.Parameters.Add(parm);

            }

        }
        #endregion

        #region ExecuteNonQuery

        /// <summary>

        /// 执行命令

        /// </summary>

        /// <param name="connectionString">数据库连接字符串</param>

        /// <param name="cmdType">命令类型（存储过程或SQL语句）</param>

        /// <param name="cmdText">SQL语句或存储过程名</param>

        /// <param name="cmdParms">SqlCommand参数数组</param>

        /// <returns>返回受引响的记录行数</returns>

        public static int ExecuteNonQuery(string connectionString, CommandType cmdType, string cmdText, params SqlParameter[] cmdParms)
        {

            SqlCommand cmd = new SqlCommand();

            using (SqlConnection conn = new SqlConnection(connectionString))
            {

                PrepareCommand(conn, null, cmd, cmdType, cmdText, cmdParms);

                int val = cmd.ExecuteNonQuery();

                cmd.Parameters.Clear();

                return val;

            }

        }





        /// <summary>

        /// 执行命令

        /// </summary>

        /// <param name="conn">Connection对象</param>

        /// <param name="cmdType">命令类型（存储过程或SQL语句）</param>

        /// <param name="cmdText">SQL语句或存储过程名</param>

        /// <param name="cmdParms">SqlCommand参数数组</param>

        /// <returns>返回受引响的记录行数</returns>

        public static int ExecuteNonQuery(SqlConnection conn, CommandType cmdType, string cmdText, params SqlParameter[] cmdParms)
        {

            SqlCommand cmd = new SqlCommand();

            PrepareCommand(conn, null, cmd, cmdType, cmdText, cmdParms);

            int val = cmd.ExecuteNonQuery();

            cmd.Parameters.Clear();

            return val;

        }

        /// <summary>

        /// 执行事务

        /// </summary>

        /// <param name="trans">SqlTransaction对象</param>

        /// <param name="cmdType">命令类型（存储过程或SQL语句）</param>

        /// <param name="cmdText">SQL语句或存储过程名</param>

        /// <param name="cmdParms">SqlCommand参数数组</param>

        /// <returns>返回受引响的记录行数</returns>

        public static int ExecuteNonQuery(SqlTransaction trans, CommandType cmdType, string cmdText, params SqlParameter[] cmdParms)
        {

            SqlCommand cmd = new SqlCommand();

            PrepareCommand(trans.Connection, trans, cmd, cmdType, cmdText, cmdParms);

            int val = cmd.ExecuteNonQuery();

            cmd.Parameters.Clear();

            return val;

        }

        #endregion

        #region ExecuteScalar

        /// <summary>

        /// 执行命令，返回第一行第一列的值

        /// </summary>

        /// <param name="connectionString">数据库连接字符串</param>

        /// <param name="cmdType">命令类型（存储过程或SQL语句）</param>

        /// <param name="cmdText">SQL语句或存储过程名</param>

        /// <param name="cmdParms">SqlCommand参数数组</param>

        /// <returns>返回Object对象</returns>

        public static object ExecuteScalar(string connectionString, CommandType cmdType, string cmdText, params SqlParameter[] cmdParms)
        {

            SqlCommand cmd = new SqlCommand();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {

                PrepareCommand(connection, null, cmd, cmdType, cmdText, cmdParms);

                object val = cmd.ExecuteScalar();

                cmd.Parameters.Clear();

                return val;

            }

        }

        /// <summary>

        /// 执行命令，返回第一行第一列的值

        /// </summary>

        /// <param name="connectionString">数据库连接字符串</param>

        /// <param name="cmdType">命令类型（存储过程或SQL语句）</param>

        /// <param name="cmdText">SQL语句或存储过程名</param>

        /// <param name="cmdParms">SqlCommand参数数组</param>

        /// <returns>返回Object对象</returns>

        public static object ExecuteScalar(SqlConnection conn, CommandType cmdType, string cmdText, params SqlParameter[] cmdParms)
        {

            SqlCommand cmd = new SqlCommand();

            PrepareCommand(conn, null, cmd, cmdType, cmdText, cmdParms);

            object val = cmd.ExecuteScalar();

            cmd.Parameters.Clear();

            return val;

        }

        #endregion

        #region ExecuteReader

        /// <summary>

        /// 执行命令或存储过程，返回SqlDataReader对象

        /// 注意SqlDataReader对象使用完后必须Close以释放SqlConnection资源

        /// </summary>

        /// <param name="connectionString">数据库连接字符串</param>

        /// <param name="cmdType">命令类型（存储过程或SQL语句）</param>

        /// <param name="cmdText">SQL语句或存储过程名</param>

        /// <param name="cmdParms">SqlCommand参数数组</param>

        /// <returns></returns>

        public static SqlDataReader ExecuteReader(string connectionString, CommandType cmdType, string cmdText, params SqlParameter[] cmdParms)
        {

            SqlCommand cmd = new SqlCommand();

            SqlConnection conn = new SqlConnection(connectionString);

            try
            {

                PrepareCommand(conn, null, cmd, cmdType, cmdText, cmdParms);

                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                cmd.Parameters.Clear();

                return dr;

            }

            catch
            {

                conn.Close();

                throw;

            }

        }

        #endregion

        #region ExecuteDataSet

        /// <summary>

        /// 执行命令或存储过程，返回DataSet对象

        /// </summary>

        /// <param name="connectionString">数据库连接字符串</param>

        /// <param name="cmdType">命令类型(存储过程或SQL语句)</param>

        /// <param name="cmdText">SQL语句或存储过程名</param>

        /// <param name="cmdParms">SqlCommand参数数组(可为null值)</param>

        /// <returns></returns>

        public static DataSet ExecuteDataSet(string connectionString, CommandType cmdType, string cmdText, params SqlParameter[] cmdParms)
        {

            SqlCommand cmd = new SqlCommand();

            using (SqlConnection conn = new SqlConnection(connectionString))
            {

                PrepareCommand(conn, null, cmd, cmdType, cmdText, cmdParms);

                SqlDataAdapter da = new SqlDataAdapter(cmd);

                DataSet ds = new DataSet();

                da.Fill(ds);

                conn.Close();

                cmd.Parameters.Clear();

                return ds;

            }

        }

        #endregion

        #region ExecuteDataTable

        /// <summary>

        /// 执行命令或存储过程，返回DataTable对象

        /// </summary>

        /// <param name="connectionString">数据库连接字符串</param>

        /// <param name="cmdType">命令类型(存储过程或SQL语句)</param>

        /// <param name="cmdText">SQL语句或存储过程名</param>

        /// <param name="cmdParms">SqlCommand参数数组(可为null值)</param>

        /// <returns></returns>

        public static DataTable ExecuteDataTable(string connectionString, CommandType cmdType, string cmdText, params SqlParameter[] cmdParms)
        {
            DataSet dataset = ExecuteDataSet(connectionString, cmdType, cmdText, cmdParms);
            if (dataset != null && dataset.Tables.Count > 0)
                return dataset.Tables[0];
            else
                return null;
        }

        #endregion

        #region ExecuteList

        /// <summary>

        /// 执行命令或存储过程，返回ExecuteList对象

        /// </summary>

        /// <param name="connectionString">数据库连接字符串</param>

        /// <param name="cmdType">命令类型(存储过程或SQL语句)</param>

        /// <param name="cmdText">SQL语句或存储过程名</param>

        /// <param name="cmdParms">SqlCommand参数数组(可为null值)</param>

        /// <returns></returns>

        public static List<T> ExecuteList<T>(string connectionString, CommandType cmdType, string cmdText, 
            params SqlParameter[] cmdParms) where T : new()
        {
            DataTable table = ExecuteDataTable(connectionString, cmdType, cmdText, cmdParms);
            if (table != null && table.Rows.Count > 0)
                return ToList<T>(table);
            else
                return null;
        }

        #endregion

        #region ExecuteList

        /// <summary>

        /// 执行命令或存储过程，返回ExecuteList对象

        /// </summary>

        /// <param name="connectionString">数据库连接字符串</param>

        /// <param name="cmdType">命令类型(存储过程或SQL语句)</param>

        /// <param name="cmdText">SQL语句或存储过程名</param>

        /// <param name="cmdParms">SqlCommand参数数组(可为null值)</param>

        /// <returns></returns>

        public static T ExecuteModel<T>(string connectionString, CommandType cmdType, string cmdText,
            params SqlParameter[] cmdParms) where T : new()
        {
            List<T> list = ExecuteList<T>(connectionString, cmdType, cmdText, cmdParms);
            if (list != null && list.Count > 0)
                return list[0];
            else
                return default(T);
        }

        #endregion

        public static List<T> ToList<T>(DataTable dt) where T : new()
        {
            // 定义集合
            List<T> ts = new List<T>();

            // 获得此模型的类型
            Type type = typeof(T);

            string tempName = "";

            foreach (DataRow dr in dt.Rows)
            {
                T t = new T();

                // 获得此模型的公共属性
                PropertyInfo[] propertys = t.GetType().GetProperties();

                foreach (PropertyInfo p in propertys)
                {
                    tempName = p.Name;

                    // 检查DataTable是否包含此列
                    if (dt.Columns.Contains(tempName))
                    {
                        // 判断此属性是否有Setter
                        if (!p.CanWrite) continue;

                        object value = dr[tempName];
                        if (value != DBNull.Value)
                        {

                            if (p.PropertyType == typeof(string))
                            {
                                p.SetValue(t, value, null);
                            }
                            else if (p.PropertyType == typeof(int) || p.PropertyType == typeof(Nullable<int>))
                            {
                                p.SetValue(t, int.Parse(value.ToString()), null);
                            }
                            else if (p.PropertyType == typeof(DateTime) || p.PropertyType == typeof(Nullable<DateTime>))
                            {
                                p.SetValue(t, Convert.ToDateTime(value.ToString()), null);
                            }
                            else if (p.PropertyType == typeof(float) || p.PropertyType == typeof(Nullable<float>))
                            {
                                p.SetValue(t, float.Parse(value.ToString()), null);
                            }
                            else if (p.PropertyType == typeof(double) || p.PropertyType == typeof(Nullable<double>))
                            {
                                p.SetValue(t, double.Parse(value.ToString()), null);
                            }
                        }
                    }
                }

                ts.Add(t);
            }

            return ts;

        }
    }
}
