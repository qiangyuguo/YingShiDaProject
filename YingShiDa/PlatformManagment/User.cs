using System;
using System.Collections.Generic;
using System.Text;
using System.Data.SqlClient;
using DBOperation.Operations;
using System.Data;
using DBOperation;

namespace PlatformManagment
{
    public class User
    {
        public static List<Common.WebSite.Menu> GetBusinessAreaMenu()
        {
            List<Common.WebSite.Menu> MenuList = Common.WebSite.GetBusinessAreaMenuList("Config/BusinessAreaMenu.xml");
            if (null == MenuList || MenuList.Count <= 0)
            {
                throw new Exception("菜单配置错误!");
            }
            try
            {
                if (null == MenuList || MenuList.Count <= 0)
                {
                    throw new Exception("用户未配置任何的页面!");
                }
                List<Common.WebSite.Menu> SelectMenuList = new List<Common.WebSite.Menu>();
                foreach (var item in MenuList)
                {
                    SelectMenuList.Add(item);
                }
                return SelectMenuList;
            }
            catch (Exception ex)
            {
                throw new Exception("数据库菜单获取失败!");
            }
            finally
            {
            }
        }

        public static List<Common.WebSite.Menu> GetBusinessAreaMenuTC()
        {
            List<Common.WebSite.Menu> MenuList = Common.WebSite.GetBusinessAreaMenuList("Config/BusinessAreaMenuTC.xml");
            if (null == MenuList || MenuList.Count <= 0)
            {
                throw new Exception("菜单配置错误!");
            }
            try
            {
                if (null == MenuList || MenuList.Count <= 0)
                {
                    throw new Exception("用户未配置任何的页面!");
                }
                List<Common.WebSite.Menu> SelectMenuList = new List<Common.WebSite.Menu>();
                foreach (var item in MenuList)
                {
                    SelectMenuList.Add(item);
                }
                return SelectMenuList;
            }
            catch (Exception ex)
            {
                throw new Exception("数据库菜单获取失败!");
            }
            finally
            {
            }
        }

        public static List<Common.WebSite.Menu> GetBusinessAreaMenuEN()
        {
            List<Common.WebSite.Menu> MenuList = Common.WebSite.GetBusinessAreaMenuList("Config/BusinessAreaMenuEN.xml");
            if (null == MenuList || MenuList.Count <= 0)
            {
                throw new Exception("菜单配置错误!");
            }
            try
            {
                if (null == MenuList || MenuList.Count <= 0)
                {
                    throw new Exception("用户未配置任何的页面!");
                }
                List<Common.WebSite.Menu> SelectMenuList = new List<Common.WebSite.Menu>();
                foreach (var item in MenuList)
                {
                    SelectMenuList.Add(item);
                }
                return SelectMenuList;
            }
            catch (Exception ex)
            {
                throw new Exception("数据库菜单获取失败!");
            }
            finally
            {
            }
        }
    }
}
