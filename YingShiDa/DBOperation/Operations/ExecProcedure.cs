using System;
using System.Collections.Generic;
using System.Text;
using DBUtility;
using System.Data;

namespace DBOperation.Operations
{
    public class ExecProcedure : OperationBase
    {
        public DataSet ResultData { get; set; }
        public override void Execute(DBUtility.IDbHelperSQL sqlHelper)
        {
            ResultData = sqlHelper.RunProcedureGetDataSet(SqlCommand, Parameters);
        }
    }

    public class ExecProcedureNoData : OperationBase
    {
        public override void Execute(DBUtility.IDbHelperSQL sqlHelper)
        {
           sqlHelper.RunProcedureNonQuery(SqlCommand, Parameters);
        }
    }
}
