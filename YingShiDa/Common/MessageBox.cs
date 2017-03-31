using System;
using System.Text;
namespace Common
{
    /// <summary>
    /// 显示消息提示对话框。
    /// Copyright (C) Maticsoft
    /// </summary>
    public class MessageBox
    {
        private MessageBox()
        {
        }

        /// <summary>
        /// 显示消息提示对话框
        /// </summary>
        /// <param name="page">当前页面指针，一般为this</param>
        /// <param name="msg">提示信息</param>
        public static void Show(System.Web.UI.Page page, string msg)
        {
            page.ClientScript.RegisterStartupScript(page.GetType(), "message", "<script language='javascript' defer>alert('" + msg.Replace("'", " ").Replace("\n", "\\n").Replace("\r", "\\r") + "');</script>");
        }

        /// <summary>
        /// 控件点击 消息确认提示框
        /// </summary>
        /// <param name="page">当前页面指针，一般为this</param>
        /// <param name="msg">提示信息</param>
        public static void ShowConfirm(System.Web.UI.WebControls.WebControl Control, string msg)
        {
            //Control.Attributes.Add("onClick","if (!window.confirm('"+msg+"')){return false;}");
            Control.Attributes.Add("onclick", "return confirm('" + msg + "');");
        }

        /// <summary>
        /// 显示消息提示对话框，并进行页面跳转
        /// </summary>
        /// <param name="page">当前页面指针，一般为this</param>
        /// <param name="msg">提示信息</param>
        /// <param name="url">跳转的目标URL</param>
        public static void ShowAndRedirect(System.Web.UI.Page page, string msg, string url)
        {
            //Response.Write("<script>alert('帐户审核通过！现在去为企业充值。');window.location=\"" + pageurl + "\"</script>");
            page.ClientScript.RegisterStartupScript(page.GetType(), "message", "<script language='javascript' defer>alert('" + msg + "');window.location=\"" + url + "\"</script>");


        }
        /// <summary>
        /// 显示消息提示对话框，并进行页面跳转
        /// </summary>
        /// <param name="page">当前页面指针，一般为this</param>
        /// <param name="msg">提示信息</param>
        /// <param name="url">跳转的目标URL</param>
        public static void ShowAndRedirects(System.Web.UI.Page page, string msg, string url)
        {
            StringBuilder Builder = new StringBuilder();
            Builder.Append("<script language='javascript' defer>");
            Builder.AppendFormat("alert('{0}');", msg);
            Builder.AppendFormat("top.location.href='{0}'", url);
            Builder.Append("</script>");
            page.ClientScript.RegisterStartupScript(page.GetType(), "message", Builder.ToString());

        }

        /// <summary>
        /// 输出自定义脚本信息
        /// </summary>
        /// <param name="page">当前页面指针，一般为this</param>
        /// <param name="script">输出脚本</param>
        public static void ResponseScript(System.Web.UI.Page page, string script)
        {
            page.ClientScript.RegisterStartupScript(page.GetType(), "message", "<script language='javascript' defer>" + script + "</script>");

        }

        #region 2016-12-12 郑开金添加，避免客户端禁用Alert 弹出窗体

        /// <summary>
        /// 显示消息提示对话框
        /// 弹出框的页面必须包含 lato-font.css 并且包含Jquery 1.8.3 以上版本 及 layer.js
        /// </summary>
        /// <param name="page">当前页面指针一般为this</param>
        /// <param name="msg">提示信息</param>
        /// <param name="type"> 
        /// -1：没有提示图标
        /// 1： √ 正确的
        /// 2： × 错误的
        /// 3： ？ 疑问的
        /// 4： 锁 
        /// 5： 不高兴图标
        /// 6： 高兴图标
        /// 7： ！感叹号图标  大于等于 7 或者 小于 -1  的都为感叹号
        /// </param>
        public static void ShowLayer(System.Web.UI.Page page, string msg, int type)
        {
            page.ClientScript.RegisterStartupScript(page.GetType(), "message", Layer(msg, type));
        }
        public static void ShowLayerOffset(System.Web.UI.Page page, string msg, int type)
        {
            page.ClientScript.RegisterStartupScript(page.GetType(), "message", LayerOffset(msg, type));
        }

        /// <summary>
        /// 页面输入Layer 简单的提示框
        /// </summary>
        /// <param name="msg">提示信息</param>
        /// <param name="type"> 
        /// -1：提示图标 没有提示图标
        /// 1：提示图标 √ 正确的
        /// 2：提示图标 × 错误的
        /// 3：提示图标 ？ 疑问的
        /// 4：提示图标 锁 
        /// 5：提示图标 不高兴图标
        /// 6：提示图标 高兴图标
        /// 7：提示土包 ！感叹号图标  大于等于 7 或者 小于 -1  的都为感叹号
        /// </param>
        /// <returns></returns>
        private static string Layer(string msg, int type)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("<script language='javascript' defer>");
            sb.AppendFormat("layer.alert('{0}',", msg);
            sb.Append("{");
            sb.AppendFormat("icon:{0},", type);
            sb.AppendFormat("offset:'10%'");
            sb.Append("})");
            sb.Append("</script>");
            return sb.ToString();
        }
        private static string LayerOffset(string msg, int type)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("<script language='javascript' defer>");
            sb.AppendFormat("layer.alert('{0}',", msg);
            sb.Append("{");
            sb.AppendFormat("icon:{0},", type);
            sb.AppendFormat("offset:'20%'");
            sb.Append("})");
            sb.Append("</script>");
            return sb.ToString();
        }

        /// <summary>
        ///  显示消息提示对话框
        ///  弹出框的页面必须包含 lato-font.css 并且包含Jquery 1.8.3 以上版本 及 layer.js
        /// </summary>
        /// <param name="page">当前页面指针一般为this</param>
        /// <param name="msg">提示信息</param>
        /// <param name="btn1Name">第一个按钮的名称，空字符串默认确定</param>
        /// <param name="btn2Name">第二个按钮的名称，空字符串默认取消</param>
        /// <param name="btn1Content">第一个按钮点击后需要执行的代码，可不填</param>
        /// <param name="btn2Content">第二个按钮点击后需要执行的代码，可不填</param>
        public static void LayerConfirm(System.Web.UI.Page page, string msg, string btn1Name, string btn2Name, string btn1Content, string btn2Content)
        {
            page.ClientScript.RegisterStartupScript(page.GetType(), "message", LayerConfirm(msg, btn1Name, btn2Name, btn1Content, btn2Content));
        }

        /// <summary>
        /// 页面输入LayerConfirm
        /// </summary>
        /// <param name="msg">提示信息</param>
        /// <param name="btn1Name">第一个按钮的名称，空字符串默认确定</param>
        /// <param name="btn2Name">第二个按钮的名称，空字符串默认取消</param>
        /// <param name="btn1Content">第一个按钮点击后需要执行的代码，可不填</param>
        /// <param name="btn2Content">第二个按钮点击后需要执行的代码，可不填</param>
        /// <returns></returns>
        private static string LayerConfirm(string msg, string btn1Name, string btn2Name, string btn1Content, string btn2Content)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("<script language='javascript' defer>");
            sb.AppendFormat("layer.confirm('{0}',", msg);
            sb.Append("{");
            sb.AppendFormat("btn: ['{0}', '{1}']", string.IsNullOrEmpty(btn1Name) ? "确定" : btn1Name, string.IsNullOrEmpty(btn2Name) ? "取消" : btn2Name);
            sb.Append("},function(){");
            sb.AppendFormat("{0}", btn1Content);
            sb.Append("},function(){");
            sb.AppendFormat("{0}", btn2Content);
            sb.Append("})");
            sb.Append("</script>");
            return sb.ToString();
        }

        #endregion

        #region GQY 2016-12-13 弹出并重定向
        public static void ShowRedirect(System.Web.UI.Page page,string url)
        {
            page.ClientScript.RegisterStartupScript(page.GetType(), "message",Redirect(url));
        }

        private static string Redirect(string url)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("<script language='javascript' defer>");
            sb.Append("window.location =\"" + url + "\";");
            sb.Append("</script>");
            return sb.ToString();
        }
        #endregion

    }
}
