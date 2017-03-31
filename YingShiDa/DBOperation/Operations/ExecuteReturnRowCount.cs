using System;
using System.Collections.Generic;
using System.Text;
using DBUtility;

namespace DBOperation.Operations
{
    /// <summary>
    /// 返回操作影响的行数
    /// </summary>
    public class ExecuteReturnRowCount : OperationBase
    {
        /// <summary>
        /// 操作影响的行数
        /// </summary>
        public int Rows { get; set; }
        public override void Execute(IDbHelperSQL sqlHelper)
        {
            this.Rows = sqlHelper.ExecuteSql(this.SqlCommand, this.Parameters);
        }
    }
}
