using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Linq;
using System.Reflection;

namespace Method
{
    public class DBHelper : IDBHelper
    {
        private static string connString = ConfigurationManager.AppSettings["ConnectionString"];
        #region 根据ID查询某一张表的数据
        public T SelectByID<T>(int ID) where T : new()
        {
            PropertyInfo[] propertyInfos = typeof(T).GetProperties();
            T model = new T();//返回的结果集
            string sql = string.Format("   Select {0}   From   {1} Where ID = @ID   "
                , string.Join(",", propertyInfos.Select(x => " [" + x.Name + "] "))
                , model.GetType().Name
                );

            using (SqlConnection conn = new SqlConnection(connString))
            {
                conn.Open();
                using (SqlCommand comm = new SqlCommand(sql.ToString(), conn))
                {
                    comm.Parameters.Add(new SqlParameter("@ID", ID));
                    using (SqlDataReader read = comm.ExecuteReader())
                    {
                        while (read.Read())//如果有数据
                        {
                            foreach (PropertyInfo item in propertyInfos)
                            {
                                if (!(read[item.Name] is DBNull))//加上是不是DBNull的判断
                                    item.SetValue(model, read[item.Name]);
                            }
                        }
                    }
                }
            }
            return model;
            //try
            //{
            //    T t = new T();
            //    string strSql = "select * from [" + t.GetType().Name + "] where ID=@ID";
            //    SqlParameter[] sqlParameter = {
            //        new SqlParameter("@ID",SqlDbType.Int,4) {Value=ID }
            //    };
            //    SqlDataReader reader = ExecutionMethod.ExecuteReader(strSql, sqlParameter);
            //    Type type = typeof(T);
            //    object obj = Activator.CreateInstance(type);
            //    while (reader.Read())
            //    {
            //        foreach (var item in type.GetProperties())
            //        {
            //            item.SetValue(obj, reader[item.Name], null);
            //        }
            //    }
            //    return (T)obj;
            //}
            //catch (Exception ex)
            //{
            //    LogTool.LogWriter.WriteError("查询失败：" + ex.ToString());
            //}
            //return default(T);
        }
        #endregion

        #region 查询登录名是否匹配
        public T SelectModel<T>(string UserName) where T :new()
        {
            PropertyInfo[] propertyInfos = typeof(T).GetProperties();
            T model = new T();//返回的结果集
            string sql = string.Format("   Select {0}   From   {1} Where UserName = @UserName   "
                , string.Join(",", propertyInfos.Select(x => " [" + x.Name + "] "))
                , model.GetType().Name
                );

            using (SqlConnection conn = new SqlConnection(connString))
            {
                conn.Open();
                using (SqlCommand comm = new SqlCommand(sql.ToString(), conn))
                {
                    comm.Parameters.Add(new SqlParameter("@UserName", UserName));
                    using (SqlDataReader read = comm.ExecuteReader())
                    {
                        while (read.Read())//如果有数据
                        {
                            foreach (PropertyInfo item in propertyInfos)
                            {
                                if (!(read[item.Name] is DBNull))//加上是不是DBNull的判断
                                    item.SetValue(model, read[item.Name]);
                            }
                        }
                    }
                }
            }
            return model;
            //try
            //{
            //    string strSql = "select * from [" + t.GetType().Name + "] where UserName=@UserName";
            //    object val = t.GetType().GetProperties().Where(x => x.Name == "UserName").First().GetValue(t, null);
            //    SqlParameter[] sqlParameter = {
            //    new SqlParameter("@UserName",SqlDbType.NVarChar,30) { Value=(string)val }
            //};
            //    SqlDataReader reader = ExecutionMethod.ExecuteReader(strSql, sqlParameter);
            //    Type type = typeof(T);
            //    object obj = Activator.CreateInstance(type);
            //    while (reader.Read())
            //    {
            //        foreach (var item in type.GetProperties())
            //        {
            //            object o = reader[item.Name];
            //            if (o is DBNull)
            //            {
            //                item.SetValue(obj, null);
            //            }
            //            else
            //            {
            //                item.SetValue(obj, o);
            //            }
            //        }
            //    }
            //    return (T)obj;
            //}
            //catch (Exception ex)
            //{
            //    LogTool.LogWriter.WriteError("查询失败：" + ex.ToString());
            //}
            //return default(T);
        }
        #endregion

        #region 查询某一张表的数据
        public T SelectList<T>() where T :new()
        {
            PropertyInfo[] propertyInfos = typeof(T).GetProperties();
            T model = new T();//返回的结果集
            string sql = string.Format("   Select {0}   From   {1} "
                , string.Join(",", propertyInfos.Select(x => " [" + x.Name + "] "))
                , model.GetType().Name
                );

            using (SqlConnection conn = new SqlConnection(connString))
            {
                conn.Open();
                using (SqlCommand comm = new SqlCommand(sql.ToString(), conn))
                {
                    using (SqlDataReader read = comm.ExecuteReader())
                    {
                        while (read.Read())//如果有数据
                        {
                            foreach (PropertyInfo item in propertyInfos)
                            {
                                if (!(read[item.Name] is DBNull))//加上是不是DBNull的判断
                                    item.SetValue(model, read[item.Name]);
                            }
                        }
                    }
                }
            }
            return model;
            //try
            //{
            //    Type type = typeof(T);
            //    object objUser = Activator.CreateInstance(type);
            //    string strSql = "select * from [" + objUser.GetType().Name + "]";
            //    try
            //    {
            //        SqlDataReader reader = ExecutionMethod.ExecuteReader(strSql, null);

            //        while (reader.Read())
            //        {
            //            foreach (var item in type.GetProperties())
            //            {
            //                object o = reader[item.Name];
            //                if (o is DBNull)
            //                {
            //                    item.SetValue(objUser, null);
            //                }
            //                else
            //                {
            //                    item.SetValue(objUser, o);
            //                }
            //            }
            //        }
            //    }
            //    catch (Exception ex)
            //    {
            //    }
            //    return (T)objUser;
            //}
            //catch (Exception ex)
            //{
            //    LogTool.LogWriter.WriteError("查询失败：" + ex.ToString());
            //}
            //return default(T);
        }
        #endregion

        #region 查询某一张表最新的数据
        public T SelectTopList<T>() where T :new()
        {
            PropertyInfo[] propertyInfos = typeof(T).GetProperties();
            T model = new T();//返回的结果集
            string sql = string.Format("   Select {0}   From   {1}  order by UpdateTime desc "
                , string.Join(",", propertyInfos.Select(x => " [" + x.Name + "] "))
                , model.GetType().Name
                );

            using (SqlConnection conn = new SqlConnection(connString))
            {
                conn.Open();
                using (SqlCommand comm = new SqlCommand(sql.ToString(), conn))
                {
                    using (SqlDataReader read = comm.ExecuteReader())
                    {
                        while (read.Read())//如果有数据
                        {
                            foreach (PropertyInfo item in propertyInfos)
                            {
                                if (!(read[item.Name] is DBNull))//加上是不是DBNull的判断
                                    item.SetValue(model, read[item.Name]);
                            }
                        }
                    }
                }
            }
            return model;
            //try
            //{
            //    Type type = typeof(T);
            //    object objUser = Activator.CreateInstance(type);
            //    string strSql = "select top 1 * from [" + objUser.GetType().Name + "] order by UpdateTime desc";
            //    try
            //    {
            //        SqlDataReader reader = ExecutionMethod.ExecuteReader(strSql, null);

            //        while (reader.Read())
            //        {
            //            foreach (var item in type.GetProperties())
            //            {
            //                object o = reader[item.Name];
            //                if (o is DBNull)
            //                {
            //                    item.SetValue(objUser, null);
            //                }
            //                else
            //                {
            //                    item.SetValue(objUser, o);
            //                }
            //            }
            //        }
            //    }
            //    catch (Exception ex)
            //    {
            //    }
            //    return (T)objUser;
            //}
            //catch (Exception ex)
            //{
            //    LogTool.LogWriter.WriteError("查询失败：" + ex.ToString());
            //}
            //return default(T);
        }
        #endregion

        #region 增加一个实体
        public bool Add<T>(T t) where T :new()
        {
            int result = 0;
            PropertyInfo[] propertyInfos = typeof(T).GetProperties();
            string sql = string.Format("   insert into {0}({1}) values({2})      "
                , t.GetType().Name
                , string.Join(",", propertyInfos.Where(x => x.Name.ToUpper() != "ID").Select(x => "[" + x.Name + "]"))
                , string.Join(",", propertyInfos.Where(x => x.Name.ToUpper() != "ID").Select(x => "@" + x.Name)));

            using (SqlConnection conn = new SqlConnection(connString))
            {
                conn.Open();
                using (SqlCommand comm = new SqlCommand(sql.ToString(), conn))
                {
                    comm.Parameters.AddRange(propertyInfos
                        .Where(x => x.Name.ToUpper() != "ID")
                        .Select(x => new SqlParameter(string.Format("@{0}", x.Name), x.GetValue(t) ?? DBNull.Value)).ToArray()
                        );
                    result = comm.ExecuteNonQuery();
                }
            }
            return result>0;
            //try
            //{
            //    // 插入到数据库中
            //    Type type = typeof(T);
            //    object obj = Activator.CreateInstance(type);
            //    StringBuilder strSql = new StringBuilder();
            //    string fields = "";
            //    string values = "";
            //    strSql.Append("insert into [" + t.GetType().Name + "] (");
            //    foreach (var item in type.GetProperties())
            //    {
            //        if (!item.Name.Equals("ID"))
            //        {
            //            fields += item.Name.ToString() + ",";
            //            values += "'" + (t.GetType().GetProperties().Where(x => x.Name == item.Name).First().GetValue(t)).ToString().Replace("'", "''") + "',";
            //        }
            //    }
            //    fields = fields.TrimEnd(',');
            //    values = values.TrimEnd(',');
            //    strSql.Append(fields + ")");
            //    strSql.Append(" values(" + values + ")");
            //    strSql.Append(";select @@IDENTITY");
            //    int val = ExecutionMethod.ExecuteNonQuery(strSql.ToString(), null);
            //    if (val > 0)
            //    {
            //        return true;
            //    }
            //    else
            //    {
            //        return false;
            //    }
            //}
            //catch (Exception ex)
            //{
            //    LogTool.LogWriter.WriteError("查询失败：" + ex.ToString());
            //}
            //return false;
        }
        #endregion

        #region 更新一个实体
        public bool Update<T>(T t) where T : new()
        {
            int result = 0;
            PropertyInfo[] propertyInfos = typeof(T).GetProperties();
            string sql = string.Format(" Update {0} set {1}  Where  ID=@ID ", t.GetType().Name
               , string.Join(",", propertyInfos.Where(x => x.Name.ToUpper() != "ID").Select(x => "[" + x.Name + "]=@" + x.Name))
               );

            using (SqlConnection conn = new SqlConnection(connString))
            {
                conn.Open();
                using (SqlCommand comm = new SqlCommand(sql.ToString(), conn))
                {
                    comm.Parameters.AddRange(propertyInfos
                       .Select(x => new SqlParameter(string.Format("@{0}", x.Name), x.GetValue(t) ?? DBNull.Value)).ToArray()
                       );
                    result = comm.ExecuteNonQuery();
                }
            }
            return result>0;
            //try
            //{
            //    //更新数据库
            //    Type type = typeof(T);
            //    object obj = Activator.CreateInstance(type);
            //    string str = "";//拼接更新字符
            //    string idField = "";//ID字段
            //    string idValue = "";//ID值
            //    StringBuilder strSql = new StringBuilder();
            //    strSql.Append("update [" + t.GetType().Name + "] set ");
            //    foreach (var item in type.GetProperties())
            //    {
            //        string Fidld= item.Name.ToString();
            //        string Value= (t.GetType().GetProperties().Where(x => x.Name == item.Name).First().GetValue(t)).ToString().Replace("'", "''");
            //        if (item.Name.Equals("ID"))
            //        {
            //            idField = Fidld;
            //            idValue = Value;
            //        }
            //        else
            //        {
            //            str += Fidld + "=" + "'" + Value + "',";
            //        }
            //    }
            //    str = str.TrimEnd(',');
            //    strSql.Append(str);
            //    strSql.Append(" where " + idField + "=" + idValue);
            //    int val = ExecutionMethod.ExecuteNonQuery(strSql.ToString(), null);
            //    if (val > 0)
            //    {
            //        return true;
            //    }
            //    else
            //    {
            //        return false;
            //    }
            //}
            //catch (Exception ex)
            //{
            //    LogTool.LogWriter.WriteError("查询失败：" + ex.ToString());
            //}
            //return true;
        }
        #endregion

        #region 删除一个实体
        public bool Delete<T>(int ID) where T:new()
        {
            Type type = typeof(T);
            object obj = Activator.CreateInstance(type);
            StringBuilder sql = new StringBuilder();
            int result = 0;
            sql.Append(" Delete " + obj.GetType().Name + "   ");
            sql.Append(" Where ID=@ID  ");
            using (SqlConnection conn = new SqlConnection(connString))
            {
                conn.Open();
                using (SqlCommand comm = new SqlCommand(sql.ToString(), conn))
                {
                    comm.Parameters.Add(new SqlParameter("@ID", ID));
                    result = comm.ExecuteNonQuery();
                }
            }
            return result>0;


            //try
            //{
            //    // 插入到数据库中
            //    Type type = typeof(T);
            //    object obj = Activator.CreateInstance(type);
            //    StringBuilder strSql = new StringBuilder();
            //    strSql.Append("delete from [" + obj.GetType().Name + "] where ID=@ID");
            //    SqlParameter[] sqlParameter = {
            //    new SqlParameter("@ID",SqlDbType.Int,4) {Value=ID }
            //};
            //int val = ExecutionMethod.ExecuteNonQuery(strSql.ToString(), sqlParameter);
            //    if (val > 0)
            //    {
            //        return true;
            //    }
            //    else
            //    {
            //        return false;
            //    }
            //}
            //catch (Exception ex)
            //{
            //    LogTool.LogWriter.WriteError("查询失败：" + ex.ToString());
            //}
            //return true;
        }
        #endregion
    }
}
