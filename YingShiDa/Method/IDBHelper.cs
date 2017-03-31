using System;
using System.Collections.Generic;
using System.Text;

namespace Method
{
    public interface IDBHelper
    {
        T SelectByID<T>(int ID) where T : new();

        T SelectModel<T>(string UserName) where T : new();//查询登录名是否匹配

        T SelectList<T>() where T :new();//查询所有的

        T SelectTopList<T>() where T : new();//查询最新的一条

        bool Add<T>(T t) where T : new();

        bool Update<T>(T t) where T : new();

        bool Delete<T>(int ID) where T : new();
    }
}
