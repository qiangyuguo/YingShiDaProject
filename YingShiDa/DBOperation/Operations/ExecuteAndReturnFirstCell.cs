using System;
using System.Collections.Generic;
using System.Text;
using DBUtility;

namespace DBOperation.Operations
{
    /// <summary>
    /// 返回第一个对象
    /// </summary>
    public class ExecuteAndReturnFirstCell:OperationBase
    {
        /// <summary>
        /// 返回的对象
        /// </summary>
        public object ResultObj { get; set; }
        public override void Execute(IDbHelperSQL sqlHelper)
        {
            ResultObj = sqlHelper.GetSingle(this.SqlCommand, this.Parameters);
        }
    }
}
