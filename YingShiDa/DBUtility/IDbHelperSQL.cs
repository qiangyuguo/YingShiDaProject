using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace DBUtility
{
    public interface IDbHelperSQL
    {
        /// <summary>
        /// 开启数据量连接
        /// </summary>
        /// <returns></returns>
        bool Open();
        /// <summary>
        /// 提交事务
        /// </summary>
        /// <returns></returns>
        bool CommitTransaction();
        /// <summary>
        /// 提交事务
        /// </summary>
        /// <returns></returns>
        bool CommitTransaction(string name);
        /// <summary>
        /// 回滚事务
        /// </summary>
        /// <returns></returns>
        bool RollBackTransaction();
        /// <summary>
        /// 回滚事务
        /// </summary>
        /// <returns></returns>
        bool RollBackTransaction(string name);
        /// <summary>
        /// 开启事物
        /// </summary>
        /// <returns></returns>
        bool BeginTransaction(string name);
        /// <summary>
        /// 开启事物
        /// </summary>
        /// <returns></returns>
        bool BeginTransaction();
        /// <summary>
        /// 开启事物
        /// </summary>
        /// <returns></returns>
        bool BeginTransaction(IsolationLevel iso);
        /// <summary>
        /// 关闭数据库连接
        /// </summary>
        /// <returns></returns>
        bool Close();
        /// <summary>
        /// 判断是否存在某表的某个字段
        /// </summary>
        /// <param name="tableName">表名称</param>
        /// <param name="columnName">列名称</param>
        /// <returns>是否存在</returns>
        bool ColumnExists(string tableName, string columnName);
        int GetMaxID(string FieldName, string TableName);
        bool Exists(string strSql);
        /// <summary>
        /// 表是否存在
        /// </summary>
        /// <param name="TableName"></param>
        /// <returns></returns>
        bool TabExists(string TableName);
        bool Exists(string strSql, params SqlParameter[] cmdParms);
        /// <summary>
        /// 执行SQL语句，返回影响的记录数
        /// </summary>
        /// <param name="SQLString">SQL语句</param>
        /// <returns>影响的记录数</returns>
        int ExecuteSql(string SQLString);
        /// <summary>
        /// 执行SQL语句，返回影响的记录数，设置超时时间
        /// </summary>
        /// <param name="SQLString"></param>
        /// <param name="Times"></param>
        /// <returns></returns>
        int ExecuteSqlByTime(string SQLString, int Times);
        /// <summary>
        /// 执行带一个存储过程参数的的SQL语句。
        /// </summary>
        /// <param name="SQLString">SQL语句</param>
        /// <param name="content">参数内容,比如一个字段是格式复杂的文章，有特殊符号，可以通过这个方式添加</param>
        /// <returns>影响的记录数</returns>
        int ExecuteSql(string SQLString, string content);
        /// <summary>
        /// 执行带一个存储过程参数的的SQL语句。
        /// </summary>
        /// <param name="SQLString">SQL语句</param>
        /// <param name="content">参数内容,比如一个字段是格式复杂的文章，有特殊符号，可以通过这个方式添加</param>
        /// <returns>影响的记录数</returns>
        object ExecuteSqlGet(string SQLString, string content);
        /// <summary>
        /// 向数据库里插入图像格式的字段(和上面情况类似的另一种实例)
        /// </summary>
        /// <param name="strSQL">SQL语句</param>
        /// <param name="fs">图像字节,数据库的字段类型为image的情况</param>
        /// <returns>影响的记录数</returns>
        int ExecuteSqlInsertImg(string strSQL, byte[] fs);
        /// <summary>
        /// 执行一条计算查询结果语句，返回查询结果（object）。
        /// </summary>
        /// <param name="SQLString">计算查询结果语句</param>
        /// <returns>查询结果（object）</returns>
        object GetSingle(string SQLString);
        object GetSingle(string SQLString, int Times);
        /// <summary>
        /// 执行查询语句，返回SqlDataReader ( 注意：调用该方法后，一定要对SqlDataReader进行Close )
        /// </summary>
        /// <param name="strSQL">查询语句</param>
        /// <returns>SqlDataReader</returns>
        SqlDataReader ExecuteReader(string strSQL);
        /// <summary>
        /// 执行查询语句，返回DataSet
        /// </summary>
        /// <param name="SQLString">查询语句</param>
        /// <returns>DataSet</returns>
        DataSet Query(string SQLString);
        DataSet Query(string SQLString, int Times);
        /// <summary>
        /// 执行SQL语句，返回影响的记录数
        /// </summary>
        /// <param name="SQLString">SQL语句</param>
        /// <returns>影响的记录数</returns>
        int ExecuteSql(string SQLString, params SqlParameter[] cmdParms);
        /// <summary>
        /// 执行多条SQL语句，实现数据库事务。
        /// </summary>
        /// <param name="SQLStringList">SQL语句的哈希表（key为sql语句，value是该语句的SqlParameter[]）</param>
        void ExecuteSqlTran(Hashtable SQLStringList);
        /// <summary>
        /// 执行多条SQL语句，实现数据库事务。
        /// </summary>
        /// <param name="SQLStringList">SQL语句的哈希表（key为sql语句，value是该语句的SqlParameter[]）</param>
        int ExecuteSqlTran(System.Collections.Generic.List<CommandInfo> cmdList);
        /// <summary>
        /// 执行多条SQL语句，实现数据库事务。
        /// </summary>
        /// <param name="SQLStringList">SQL语句的哈希表（key为sql语句，value是该语句的SqlParameter[]）</param>
        void ExecuteSqlTranWithIndentity(System.Collections.Generic.List<CommandInfo> SQLStringList);
        /// <summary>
        /// 执行多条SQL语句，实现数据库事务。
        /// </summary>
        /// <param name="SQLStringList">SQL语句的哈希表（key为sql语句，value是该语句的SqlParameter[]）</param>
        void ExecuteSqlTranWithIndentity(Hashtable SQLStringList);
        /// <summary>
        /// 执行一条计算查询结果语句，返回查询结果（object）。
        /// </summary>
        /// <param name="SQLString">计算查询结果语句</param>
        /// <returns>查询结果（object）</returns>
        object GetSingle(string SQLString, params SqlParameter[] cmdParms);
        /// <summary>
        /// 执行查询语句，返回SqlDataReader ( 注意：调用该方法后，一定要对SqlDataReader进行Close )
        /// </summary>
        /// <param name="strSQL">查询语句</param>
        /// <returns>SqlDataReader</returns>
        SqlDataReader ExecuteReader(string SQLString, params SqlParameter[] cmdParms);
        /// <summary>
        /// 执行查询语句，返回DataSet
        /// </summary>
        /// <param name="SQLString">查询语句</param>
        /// <returns>DataSet</returns>
        DataSet Query(string SQLString, params SqlParameter[] cmdParms);
        /// <summary>
        /// 执行存储过程，返回SqlDataReader ( 注意：调用该方法后，一定要对SqlDataReader进行Close )
        /// </summary>
        /// <param name="storedProcName">存储过程名</param>
        /// <param name="parameters">存储过程参数</param>
        /// <returns>SqlDataReader</returns>
        SqlDataReader RunProcedure(string storedProcName, IDataParameter[] parameters);
        /// <summary>
        /// 执行存储过程
        /// </summary>
        /// <param name="storedProcName">存储过程名</param>
        /// <param name="parameters">存储过程参数</param>
        /// <returns></returns>
        void RunProcedureNonQuery(string storedProcName, IDataParameter[] parameters);
        /// <summary>
        /// 执行存储过程
        /// </summary>
        /// <param name="storedProcName">存储过程名</param>
        /// <param name="parameters">存储过程参数</param>
        /// <param name="tableName">DataSet结果中的表名</param>
        /// <returns>DataSet</returns>
        DataSet RunProcedure(string storedProcName, IDataParameter[] parameters, string tableName);
        DataSet RunProcedureGetDataSet(string storedProcName, IDataParameter[] parameters);
        DataSet RunProcedure(string storedProcName, IDataParameter[] parameters, string tableName, int Times);
        /// <summary>
        /// 执行存储过程，返回影响的行数		
        /// </summary>
        /// <param name="storedProcName">存储过程名</param>
        /// <param name="parameters">存储过程参数</param>
        /// <param name="rowsAffected">影响的行数</param>
        /// <returns></returns>
        int RunProcedure(string storedProcName, IDataParameter[] parameters, out int rowsAffected);
    }
}
