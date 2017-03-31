using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Linq;

namespace Method
{
    public class DBHelper : IDBHelper
    {
        #region 根据ID查询某一张表的数据
        public T SelectByID<T>(int ID) where T : new()
        {
            try
            {
                T t = new T();
                string strSql = "select * from [" + t.GetType().Name + "] where ID=@ID";
                SqlParameter[] sqlParameter = {
                    new SqlParameter("@ID",SqlDbType.Int,4) {Value=ID }
                };
                SqlDataReader reader = ExecutionMethod.ExecuteReader(strSql, sqlParameter);
                Type type = typeof(T);
                object obj = Activator.CreateInstance(type);
                while (reader.Read())
                {
                    foreach (var item in type.GetProperties())
                    {
                        item.SetValue(obj, reader[item.Name], null);
                    }
                }
                return (T)obj;
            }
            catch (Exception ex)
            {
                LogTool.LogWriter.WriteError("查询失败：" + ex.ToString());
            }
            return default(T);
        }
        #endregion

        #region 根据实体查询某一张表的数据
        public T SelectModel<T>(T t)
        {
            try
            {
                string strSql = "select * from [" + t.GetType().Name + "] where UserName=@UserName";
                object val = t.GetType().GetProperties().Where(x => x.Name == "UserName").First().GetValue(t, null);
                SqlParameter[] sqlParameter = {
                new SqlParameter("@UserName",SqlDbType.NVarChar,30) { Value=(string)val }
            };
                SqlDataReader reader = ExecutionMethod.ExecuteReader(strSql, sqlParameter);
                Type type = typeof(T);
                object obj = Activator.CreateInstance(type);
                while (reader.Read())
                {
                    foreach (var item in type.GetProperties())
                    {
                        object o = reader[item.Name];
                        if (o is DBNull)
                        {
                            item.SetValue(obj, null);
                        }
                        else
                        {
                            item.SetValue(obj, o);
                        }
                    }
                }
                return (T)obj;
            }
            catch (Exception ex)
            {
                LogTool.LogWriter.WriteError("查询失败：" + ex.ToString());
            }
            return default(T);
        }
        #endregion

        public List<SqlParameter> getPara<T>()
        {
            Type type = typeof(T);
            return type.GetProperties().Select(x =>
            {
                var name = x.Name;
                return new SqlParameter(string.Format("@{0}", x.Name), x.GetValue(type));


            }).ToList();
        }

        #region 查询某一张表的数据
        public T SelectList<T>()
        {
            try
            {
                Type type = typeof(T);
                object objUser = Activator.CreateInstance(type);
                string strSql = "select * from [" + objUser.GetType().Name + "]";
                try
                {
                    SqlDataReader reader = ExecutionMethod.ExecuteReader(strSql, null);
                    
                    while (reader.Read())
                    {
                        foreach (var item in type.GetProperties())
                        {
                            object o = reader[item.Name];
                            if (o is DBNull)
                            {
                                item.SetValue(objUser, null);
                            }
                            else
                            {
                                item.SetValue(objUser, o);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                }
                return (T)objUser;
            }
            catch (Exception ex)
            {
                LogTool.LogWriter.WriteError("查询失败：" + ex.ToString());
            }
            return default(T);
        }
        #endregion

        #region 查询某一张表最新的数据
        public T SelectTopList<T>()
        {
            try
            {
                Type type = typeof(T);
                object objUser = Activator.CreateInstance(type);
                string strSql = "select top 1 * from [" + objUser.GetType().Name + "] order by UpdateTime desc";
                try
                {
                    SqlDataReader reader = ExecutionMethod.ExecuteReader(strSql, null);

                    while (reader.Read())
                    {
                        foreach (var item in type.GetProperties())
                        {
                            object o = reader[item.Name];
                            if (o is DBNull)
                            {
                                item.SetValue(objUser, null);
                            }
                            else
                            {
                                item.SetValue(objUser, o);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                }
                return (T)objUser;
            }
            catch (Exception ex)
            {
                LogTool.LogWriter.WriteError("查询失败：" + ex.ToString());
            }
            return default(T);
        }
        #endregion

        #region 增加一个实体
        public bool Add<T>(T t)
        {
            try
            {
                // 插入到数据库中
                Type type = typeof(T);
                object obj = Activator.CreateInstance(type);
                StringBuilder strSql = new StringBuilder();
                string fields = "";
                string values = "";
                strSql.Append("insert into [" + t.GetType().Name + "] (");
                foreach (var item in type.GetProperties())
                {
                    if (!item.Name.Equals("ID"))
                    {
                        fields += item.Name.ToString() + ",";
                        values += "'" + (t.GetType().GetProperties().Where(x => x.Name == item.Name).First().GetValue(t)).ToString().Replace("'", "''") + "',";
                    }
                }
                fields = fields.TrimEnd(',');
                values = values.TrimEnd(',');
                strSql.Append(fields + ")");
                strSql.Append(" values(" + values + ")");
                strSql.Append(";select @@IDENTITY");
                int val = ExecutionMethod.ExecuteNonQuery(strSql.ToString(), null);
                if (val > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                LogTool.LogWriter.WriteError("查询失败：" + ex.ToString());
            }
            return false;
        }
        #endregion

        #region 更新一个实体
        public bool Update<T>(T t)
        {
            try
            {
                //更新数据库
                Type type = typeof(T);
                object obj = Activator.CreateInstance(type);
                string str = "";//拼接更新字符
                string idField = "";//ID字段
                string idValue = "";//ID值
                StringBuilder strSql = new StringBuilder();
                strSql.Append("update [" + t.GetType().Name + "] set ");
                foreach (var item in type.GetProperties())
                {
                    string Fidld= item.Name.ToString();
                    string Value= (t.GetType().GetProperties().Where(x => x.Name == item.Name).First().GetValue(t)).ToString().Replace("'", "''");
                    if (item.Name.Equals("ID"))
                    {
                        idField = Fidld;
                        idValue = Value;
                    }
                    else
                    {
                        str += Fidld + "=" + "'" + Value + "',";
                    }
                }
                str = str.TrimEnd(',');
                strSql.Append(str);
                strSql.Append(" where " + idField + "=" + idValue);
                int val = ExecutionMethod.ExecuteNonQuery(strSql.ToString(), null);
                if (val > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                LogTool.LogWriter.WriteError("查询失败：" + ex.ToString());
            }
            return true;
        }
        #endregion

        #region 删除一个实体
        public bool Delete<T>(int ID)
        {
            try
            {
                // 插入到数据库中
                Type type = typeof(T);
                object obj = Activator.CreateInstance(type);
                StringBuilder strSql = new StringBuilder();
                strSql.Append("delete from [" + obj.GetType().Name + "] where ID=@ID");
                SqlParameter[] sqlParameter = {
                new SqlParameter("@ID",SqlDbType.Int,4) {Value=ID }
            };
                int val = ExecutionMethod.ExecuteNonQuery(strSql.ToString(), sqlParameter);
                if (val > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                LogTool.LogWriter.WriteError("查询失败：" + ex.ToString());
            }
            return true;
        }
        #endregion
    }
}
