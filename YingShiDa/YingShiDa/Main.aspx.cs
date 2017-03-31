using System;
using System.Collections.Generic;

using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using Common;
using PlatformManagment;

namespace YingShiDa
{
    /// <summary>
    /// 主窗体
    /// </summary>
    public partial class Main : PageBase
    {
        /// <summary>
        /// 页面加载
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                //logoFile = GetFileName("logo.png", "BusinessArea", hfBusinessAreaID.Value);
            }
        }


        private string GetFileName(string file, string platName, string businessAreaID)
        {
            string TemplateDir;
            if (string.IsNullOrEmpty(businessAreaID))
            {
                TemplateDir = WebSite.TEMPLATES_WEB_PATH + "Self/" + platName + "/";
                if (!File.Exists(WebSite.TEMPLATES_LOCAL_PATH + "Self\\BusinessArea\\" + platName + "\\" + file))
                {
                    TemplateDir = WebSite.TEMPLATES_WEB_PATH + "Default/" + platName + "/" + file;
                }
                else
                {
                    TemplateDir = WebSite.TEMPLATES_WEB_PATH + "Self/BusinessArea/" + platName + "/" + file;
                }
            }
            else
            {
                if (!File.Exists(WebSite.TEMPLATES_LOCAL_PATH + "Self\\BusinessArea\\" + businessAreaID + "\\" + platName + "\\" + file))
                {
                    if (!File.Exists(WebSite.TEMPLATES_LOCAL_PATH + "Self\\BusinessArea\\" + platName + "\\" + file))
                    {
                        if (!File.Exists(WebSite.TEMPLATES_LOCAL_PATH + "Self\\" + platName + "\\" + file))
                        {
                            TemplateDir = WebSite.TEMPLATES_WEB_PATH + "Default/" + platName + "/" + file;
                        }
                        else
                        {
                            TemplateDir = WebSite.TEMPLATES_WEB_PATH + "Self/" + platName + "/" + file;
                        }
                    }
                    else
                    {
                        TemplateDir = WebSite.TEMPLATES_WEB_PATH + "Self/BusinessArea/" + platName + "/" + file;
                    }
                }
                else
                {
                    TemplateDir = WebSite.TEMPLATES_WEB_PATH + "Self/BusinessArea/" + businessAreaID + "/" + platName + "/" + file;
                }
            }
            return TemplateDir;
        }
        /// <summary>
        /// 退出
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        //protected void lbtnLogout_Click(object sender, EventArgs e)
        //{
        //    //PlatformManagment.sys_Log.WriteInfo(string.Format("{0}退出成功！", UserAccount));
        //    PlatformManagment.sys_Log.NewLogAdd("【商圈平台】", "退出", "", "", "", UserName, "");
        //    //获取用户的角色，菜单，权限
        //    Session["MenuList"] = null;
        //    LogOut();
        //}
    }
}