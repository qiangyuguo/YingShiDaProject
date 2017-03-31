using System;
using System.Collections.Generic;
using System.Text;

namespace Method
{
    public interface IDBHelper
    {
        T SelectByID<T>(int ID) where T : new();

        T SelectModel<T>(T t);

        T SelectList<T>(T t);

        bool Add<T>(T t);

        bool Update<T>(T t);

        bool Delete<T>(int ID);
    }
}
