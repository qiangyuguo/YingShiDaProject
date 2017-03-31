using System;
using System.Collections.Generic;
using System.Text;
using DBUtility;
using System.Security.Cryptography;
using System.Data;
using System.Configuration;

namespace DBOperation
{
    public class DBOperationManagment
    {
        DbHelperSQL sqlHelper;
        private string connectString;
        //配置文件默认连接字符串
        private static string defaultConnectStr = null;


        public DBOperationManagment()
        {
            if (string.IsNullOrEmpty(defaultConnectStr))
                defaultConnectStr = PubConstant.ConnectionString();
            sqlHelper = new DbHelperSQL(defaultConnectStr);
        }

        public DBOperationManagment(string connStrong)
        {
            connectString = connStrong;
            sqlHelper = new DbHelperSQL(connectString);
        }

        public string GetConnectString()
        {
            return sqlHelper.GetConnectString;
        }

        /// <summary>
        /// 回去某表，某字段的新ID
        /// </summary>
        /// <param name="tableName"></param>
        /// <param name="fieldName"></param>
        /// <returns></returns>
        public int getNewID(string tableName, string fieldName)
        {
            return sqlHelper.GetMaxID(fieldName, tableName);
        }
        /// <summary>
        /// 开启数据库连接
        /// </summary>
        public bool Open()
        {
            return sqlHelper.Open();
        }
        /// <summary>
        /// 关闭数据库连接
        /// </summary>
        public bool Close()
        {
            return sqlHelper.Close();
        }

        /// <summary>
        /// 执行数据操作
        /// </summary>
        /// <param name="operations"></param>
        public void Execute(IDBOperation operations)
        {
            this.Open();
            try
            {
                operations.Execute(sqlHelper);
            }
            catch (Exception ex)
            {
                this.Close();
                throw new Exception(ex.Message + " Commond:" + operations.GetCommond());
            }           
        }

        /// <summary>
        /// 执行数据操作
        /// </summary>
        /// <param name="operations"></param>
        public void Execute(IDBOperation[] operations)
        {
            this.Open();
            try
            {
                foreach (IDBOperation op in operations)
                {
                    op.Execute(sqlHelper);
                }
            }
            catch (Exception ex)
            {
                this.Close();
                throw ex;
            }
            
        }

        /// <summary>
        /// 执行事务，不主动提交
        /// </summary>
        /// <param name="operations"></param>
        public bool ExecuteTranNoCommit(IDBOperation[] operations)
        {
            if (sqlHelper.BeginTransaction())
            {

                try
                {
                    foreach (IDBOperation op in operations)
                    {
                        op.Execute(sqlHelper);
                    }
                    return true;
                }
                catch (Exception)
                {
                    sqlHelper.RollBackTransaction();
                    this.Close();
                    return false;
                }
            }
            else
            {
                LogTool.LogWriter.WriteError("开启数据库事务失败。");
                throw new Exception("开启数据库事务失败。");
            }
        }

        /// <summary>
        /// 回滚事务
        /// </summary>
        public void RollBackTransaction()
        {
            try
            {
                if (!sqlHelper.RollBackTransaction())
                {
                    throw new Exception("回滚事务失败");
                }
            }
            catch (Exception ex)
            {
                LogTool.LogWriter.WriteError("回滚事务失败。", ex);
                throw new Exception("提交事务失败。");
            }
           
        }
        /// <summary>
        /// 提交事务
        /// </summary>
        public void CommitTransaction()
        {
            try
            {
                if (!sqlHelper.CommitTransaction())
                {
                    throw new Exception("提交事务失败");
                }
            }
            catch (Exception ex)
            {
                LogTool.LogWriter.WriteError("提交事务失败。", ex);
                throw new Exception("提交事务失败。");
            }
           
        }

        /// <summary>
        /// 已事务的形式执行数据库操作
        /// </summary>
        /// <param name="operations"></param>
        public void ExecuteTran(IDBOperation[] operations)
        {
            this.Open();
            string tName = GetTranName();
            string sql = "";
            if (sqlHelper.BeginTransaction(tName))
            {
                try
                {
                    foreach (IDBOperation op in operations)
                    {
                        sql = op.GetCommond();
                        op.Execute(sqlHelper);

                    }
                    if (!sqlHelper.CommitTransaction())
                    {
                        throw new Exception("提交事务失败");
                    }
                }
                catch (Exception ex)
                {
                    LogTool.LogWriter.WriteError("执行事务失败  sql  " + sql, ex);
                    sqlHelper.RollBackTransaction(tName);
                    throw ex;
                }
            }
            else
            {
                LogTool.LogWriter.WriteError("开启数据库事务失败。");
                throw new Exception("开启数据库事务失败。");
            }
        }

        /// <summary>
        /// 已事务的形式执行数据库操作
        /// </summary>
        /// <param name="operations"></param>
        public void ExecuteTran(List<IDBOperation> operations)
        {
            this.Open();
            string tName = GetTranName();
            string sql = "";
            if (sqlHelper.BeginTransaction(tName))
            {
                try
                {
                    for (int i = 0; i < operations.Count; i++)
                    {
                        sql = operations[i].GetCommond();
                        operations[i].Execute(sqlHelper);
                    }
                    if (!sqlHelper.CommitTransaction())
                    {
                        throw new Exception("提交事务失败");
                    }
                }
                catch (Exception ex)
                {
                    LogTool.LogWriter.WriteError("执行事务失败  sql:" + sql, ex);
                    sqlHelper.RollBackTransaction(tName);
                    throw ex;
                }
            }
            else
            {
                LogTool.LogWriter.WriteError("开启数据库事务失败。");
                throw new Exception("开启数据库事务失败。");
            }
        }

        private string GetTranName()
        {
            return DateTime.Now.ToString("yyMMddHHmmssSSS")+System.Threading.Thread.CurrentThread.ManagedThreadId.ToString();
        }
    }
}
