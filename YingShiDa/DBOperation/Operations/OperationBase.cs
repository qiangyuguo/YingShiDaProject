using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using DBOperation;
using DBUtility;

namespace DBOperation.Operations
{
    public abstract class OperationBase:IDBOperation
    {
        public object Tag { get; set; }
        /// <summary>
        /// 数据库sql语句
        /// </summary>
        public string SqlCommand { get; set; }
        /// <summary>
        /// 数据库操作参数
        /// </summary>
        public SqlParameter[] Parameters { get; set; }

        #region IDBOperation 成员

        public abstract void Execute(IDbHelperSQL sqlHelper);

        public object GetTag()
        {
            return Tag;
        }

        #endregion


        public string GetCommond()
        {
            return SqlCommand;
        }
    }
}
