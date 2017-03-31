using System;
using System.Collections.Generic;
using System.Text;

namespace Method
{
    public  class Factory
    {
        static IDBHelper idb;

        private Factory()
        {
            
        }

        public static IDBHelper GetExecution()
        {
            if (idb == null)
            {
                idb = new DBHelper();
            }
            return idb;
        }
    }
}
