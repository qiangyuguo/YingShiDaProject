using System;
using System.Collections.Generic;
using System.Text;

namespace DBOperation
{
    public static class SQLCommontTool
    {
        public static string CreateWhereStrKeyParse(string ColumnName,string keys)
        {
            if (string.IsNullOrEmpty(keys))
                return "";
            StringBuilder sb = new StringBuilder();
            if (keys.IndexOf('&') > 0)
            {
                string[] pds = keys.Split('&');
                foreach (string pdStr in pds)
                {
                    if (!string.IsNullOrEmpty(pdStr))
                    {
                        if (sb.Length == 0)
                            sb.Append(ColumnName + " like '%" + pdStr + "%'");
                        else
                            sb.Append(" and "+ ColumnName + " like '%" + pdStr + "%'");
                    }
                }
                if (sb.Length>0)
                {
                    return "(" + sb.ToString() + ")";
                }
            }
            else if (keys.IndexOf('|') > 0)
            {
                string[] pds = keys.Split('|');
                foreach (string pdStr in pds)
                {
                    if (!string.IsNullOrEmpty(pdStr))
                    {
                        if (sb.Length == 0)
                            sb.Append(ColumnName + " like '%" + pdStr + "%'");
                        else
                            sb.Append(" or " + ColumnName + " like '%" + pdStr + "%'");
                    }
                }
                if (sb.Length > 0)
                {
                    return "(" + sb.ToString() + ")";
                }
            }
            else
            {
                return ColumnName + " like '%" + keys + "%'";
            }
            return "";
        }
    }
}
