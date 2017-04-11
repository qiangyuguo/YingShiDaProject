using System;
using System.Collections.Generic;
using System.Text;

namespace Method
{
    public interface IDBHelper
    {
        T SelectByID<T>(int ID) where T : new();

        T SelectByIDL<T>(int ID, int Language) where T : new();

        T SelectModel<T>(string UserName) where T : new();//查询登录名是否匹配

        T SelectList<T>() where T : new();//查询所有的

        T SelectTopList<T>(int Language) where T : new();//查询最新的一条

        bool Add<T>(T t) where T : new();

        bool Update<T>(T t) where T : new();

        bool Delete<T>(int ID) where T : new();

        #region 根据条件查询单表或视图多条记录
        /// <summary>
        /// 根据条件查询单表或视图多条记录
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="dictionary">要筛选的条件</param>
        /// <param name="orderSql">要进行排序的条件，如( name desc,id)</param>
        /// <returns>返回实体对象集</returns>
        List<T> GetByWhereSqlList<T>(string whereSql, string orderSql) where T : class, new();
            #endregion
    }
}
