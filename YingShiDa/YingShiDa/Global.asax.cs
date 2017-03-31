using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;

namespace YingShiDa
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {

        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            //string keyWords = null;
            //foreach (string i in this.Request.Form)
            //{
            //    if (i == null || i.IndexOf("_") == 0) continue;
            //    if (SqlFilter2(this.Request.Form[i].ToString(), out keyWords))
            //    {
            //        Response.Write("<script type='text/javascript'>alert('包含非法字符 " + keyWords + "！');window.location='" + Request.RawUrl + "';</script>");
            //        Response.End();
            //        return;
            //    }
            //}
            ////遍历Get参数。
            //foreach (string i in this.Request.QueryString)
            //{
            //    if (i == null || i.IndexOf("_") == 0) continue;
            //    if (SqlFilter2(this.Request.QueryString[i].ToString(), out keyWords))
            //    {
            //        Response.Write("<script type='text/javascript'>alert('包含非法字符 " + keyWords + "！');window.location='" + Request.RawUrl + "';</script>");
            //        Response.End();
            //        return;
            //    }
            //}
        }
        static string[] KeyWorks = new string[] { "and", "exec", "insert", "select", "delete", "update", "chr", "mid", "master", "or", "truncate", "char", "declare", "join", "<", ">", "'", "%" };
        public static bool SqlFilter2(string InText, out string keyWord)
        {
            keyWord = "";
            if (InText == null)
                return false;
            foreach (string i in KeyWorks)
            {
                if ((InText.ToLower().IndexOf(i + " ") > -1) || (InText.ToLower().IndexOf(" " + i) > -1))
                {
                    keyWord = i;
                    return true;
                }
            }
            return false;
        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {
            Exception objErr = Server.GetLastError().GetBaseException();
            string error = string.Empty;
            error += "发生异常页: " + Request.Url.ToString() + "\n";
            error += "异常信息: " + objErr.Message + "\n";
            error = "错误源:" + objErr.Source + "\n";
            error = "堆栈信息:" + objErr.StackTrace + "\n";
            Server.ClearError();
            LogTool.LogWriter.WriteError(error, objErr);
        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}