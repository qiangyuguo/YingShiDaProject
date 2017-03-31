using System;
using System.Collections.Generic;
using System.Text;
using DBUtility;
using System.Data;

namespace DBOperation.Operations
{
    /// <summary>
    /// 查询数据返回dataset
    /// </summary>
    public class QueryData:OperationBase
    {
        public DataSet ResultData { get; set; }
        public override void Execute(IDbHelperSQL sqlHelper)
        {
            ResultData = sqlHelper.Query(this.SqlCommand, this.Parameters);
        }
    }
}
