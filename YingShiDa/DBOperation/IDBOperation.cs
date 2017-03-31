using System;
using System.Collections.Generic;
using System.Text;
using DBUtility;

namespace DBOperation
{
    public interface IDBOperation
    {
        void Execute(IDbHelperSQL sqlHelper);
        object GetTag();
        string GetCommond();
    }
}
