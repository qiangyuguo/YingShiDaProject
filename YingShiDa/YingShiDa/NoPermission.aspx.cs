using System;
using System.Collections.Generic;

using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace YingShiDa
{
    /// <summary>
    /// Session过时时跳转的页面
    /// </summary>
    public partial class NoPermission : System.Web.UI.Page
    {
        /// <summary>
        /// 过时
        /// </summary>
        public string ErrorType = string.Empty;
        /// <summary>
        /// 页面加载
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void Page_Load(object sender, EventArgs e)
        {
            //ErrorType = CnTools.URLOperate.GetStringUrl("ErrorType");
        }
    }
}