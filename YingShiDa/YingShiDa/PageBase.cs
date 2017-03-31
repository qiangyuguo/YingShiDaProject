using System;
using System.Collections.Generic;

namespace YingShiDa
{
    public class PageBase : System.Web.UI.Page
    {
        protected override void OnInitComplete(EventArgs e)
        {
            //<noscript>您的浏览器未启用JavaScript，本系统必须启用JavaScript才能正常使用。谢谢！</noscript>
            Response.Write(@"    <noscript>您的浏览器未启用JavaScript，本系统必须启用JavaScript才能正常使用。谢谢！</noscript>");
            IsLogin();
            base.OnInitComplete(e);
        }
        public void IsLogin()
        {
            if (Request.RawUrl.Contains("Main.aspx") && string.IsNullOrEmpty(UserName))
            {
                LogOut();
            }
            else if ((!Request.RawUrl.Contains("Main.aspx")) && (Request.UrlReferrer == null || string.IsNullOrEmpty(Request.UrlReferrer.ToString())))
            {
                LogOut();
            }
            else if (string.IsNullOrEmpty(UserName))
            {
                Response.Redirect("/NoPermission.aspx?ErrorType=ReLogin", true);
            }
        }
        protected virtual void LogOut()
        {
            Response.Redirect("/Login.aspx", true);
        }

        public string UserName
        {
            get
            {
                if (Session["UserInfo"] != null)
                {
                    Model.SysUser sysUser = (Model.SysUser)Session["UserInfo"];
                    return sysUser.UserName;
                }
                else
                    return "";
            }
        }
        public string UserID
        {
            get
            {
                if (Session["UserInfo"] != null)
                {
                    Model.SysUser sysUser = (Model.SysUser)Session["UserInfo"];
                    return sysUser.UserID;
                }
                else
                    return "";
            }
        }
        
        protected List<Common.WebSite.Menu> MenuList
        {
            get
            {
                if (Session["MenuList"] != null)
                {
                    return (List<Common.WebSite.Menu>)Session["MenuList"];
                }
                else
                    return null;
            }
        }

        protected void CheckPagePermissions(string pageName)
        {
            bool hasPermissions = false;
            if (MenuList == null)
            {
                Response.Redirect("/NoPermission.aspx?ErrorType=ReLogin");
                return;
            }
            if (MenuList.Count > 0)
            {
                foreach (Common.WebSite.Menu menu in MenuList)
                {
                    if (menu.Key.Trim() == pageName.Trim()) { hasPermissions = true; break; }
                }
            }
            if (!hasPermissions)
            {
                Response.Redirect("/NoPermission.aspx?ErrorType=NoPermission");
                return;
            }
        }
        protected string CheckActionPermissions(string actionValue)
        {
            return string.Empty;
        }

        protected void CheckActionPermissions(string actionValue, System.Web.UI.WebControls.Button btnTemp)
        {
            return;
        }
        protected void CheckActionPermissions1(string actionValue, System.Web.UI.WebControls.LinkButton btnTemp)
        {
            return;
        }
    }
}