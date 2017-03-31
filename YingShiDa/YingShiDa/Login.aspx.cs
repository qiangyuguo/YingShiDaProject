using System;
using System.Collections.Generic;
using System.Configuration;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using PlatformManagment;
using System.IO;
using Common;
using System.Text;
using DBUtility;
using System.Drawing;
using System.Drawing.Imaging;
using Method;

namespace YingShiDa
{
    /// <summary>
    /// 登陆类
    /// </summary>
    public partial class Login : System.Web.UI.Page
    {
        /// <summary>
        /// 标题
        /// </summary>
        public string titleShow;
        public string bgFile;
        public string logoFile;
        public bool IsVerifyCode = true;

        #region 窗体事件

        /// <summary>
        /// 页面加载
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void Page_Load(object sender, EventArgs e)
        {
            valiCode.ImageUrl = "ValiCode.aspx";
            //string businessAreaID = Request.QueryString["CompanyID"];
            ////if (string.IsNullOrEmpty(businessAreaID))
            ////    trBAID.Visible = true;
            ////else
            ////    trBAID.Visible = false;
            //PlatSetting mPlatSetting = PlatformManagment.PlatSetting.GetPlatSetting();
            //if (mPlatSetting != null)
            //{
            //    lblCopyRight.Text = string.IsNullOrEmpty(mPlatSetting.CopyInfo) ? "" : ("©" + mPlatSetting.CopyInfo);
            //    titleShow = mPlatSetting.HighBusinessAreaName;
            //}
            //else
            //{
            //    titleShow = "";
            //    lblCopyRight.Text = "";
            //}

            //IsVerifyCode = false;
            //bgFile = GetFileName("bg.png", "HighBusinessArea", businessAreaID);
            //logoFile = GetFileName("logo.png", "HighBusinessArea", businessAreaID);
        }


        private string GetFileName(string file, string platName, string businessAreaID)
        {
            string TemplateDir;
            if (string.IsNullOrEmpty(businessAreaID))
            {
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
        /// 登录
        /// </summary>
        /// <param name="sender"></param> 
        /// <param name="e"></param>
        protected void btnLogin_Click(object sender, EventArgs e)
        {
            if (!string.IsNullOrEmpty(txtValiteCode.Text))
            {
                if (Request.Cookies["valicode"] != null)
                {
                    if (!txtValiteCode.Text.Trim().ToUpper().Equals(Request.Cookies["valicode"].Value.Trim().ToUpper()))
                    {
                        Common.MessageBox.ShowLayer(this, "输入验证码不一致！请重新输入", 5);
                        return;
                    }
                }
                else
                {
                    Common.MessageBox.ShowLayer(this, "验证码过期，请重新输入", 5);
                    return;
                }
            }
            else
            {
                Common.MessageBox.ShowLayer(this, "请输入验证码", 5);
                return;
            }
            string password = txtPassword.Text.Trim();
            try
            {
                Model.SysUser sysUser = new Model.SysUser();
                sysUser.UserName = txtMobilePhone.Text.Trim();
                sysUser = Factory.GetExecution().SelectModel<Model.SysUser>(sysUser);
                if (sysUser != null && sysUser.PassWord == password)
                {
                    Session["UserInfo"] = sysUser;
                    Session["MenuList"] = PlatformManagment.User.GetBusinessAreaMenu();
                    Response.AddHeader("P3P", "CP=CAO PSA OUR");
                    Response.Redirect("Main.aspx");
                }
            }
            catch (Exception ex)
            {
                if ("用户未配置任何的页面权限".Equals(ex.Message))
                {
                    Common.MessageBox.ShowLayer(this, "登录失败,没有任何页面权限！",2);
                }
                else
                {
                    Common.MessageBox.ShowLayer(this, "登录失败，请稍后重试！",2);
                }
                LogTool.LogWriter.WriteError("登录失败：" + ex);
            }
        }

        #endregion

        public static System.Drawing.Image BytToImg(byte[] byt)
        {
            try
            {
                MemoryStream ms = new MemoryStream(byt);
                System.Drawing.Image img = System.Drawing.Image.FromStream(ms);
                return img;
            }
            catch (Exception ex)
            {
                throw ex;
                return null;
            }
        }


        /// <summary>
        ///保存验证码
        /// </summary>
        /// <param name="code"></param>
        public static void SetValiCode(string code)
        {
            if (!string.IsNullOrEmpty(code))
            {
                System.Web.HttpContext.Current.Session["LoginValiCode"] = code;
            }
        }


        public static byte[] CreateValidateGraphic(out String Code, int CodeLength, int Width, int Height, int FontSize)
        {
            String sCode = String.Empty;
            //顏色列表，用於驗證碼、噪線、噪點
            Color[] oColors ={
             System.Drawing.Color.Black,
             System.Drawing.Color.Red,
             System.Drawing.Color.Blue,
             System.Drawing.Color.Green,
             System.Drawing.Color.Orange,
             System.Drawing.Color.Brown,
             System.Drawing.Color.Brown,
             System.Drawing.Color.DarkBlue
            };
            //字體列表，用於驗證碼
            string[] oFontNames = { "Times New Roman", "MS Mincho", "Book Antiqua", "Gungsuh", "PMingLiU", "Impact" };
            //驗證碼的字元集，去掉了一些容易混淆的字元
            char[] oCharacter = {'1',
       '2','3','4','5','6','8','9',
       'A','B','C','D','E','F','G','H','J','K', 'L','M','N','P','R','S','T','W','X','Y'
      };
            Random oRnd = new Random();
            Bitmap oBmp = null;
            Graphics oGraphics = null;
            int N1 = 0;
            System.Drawing.Point oPoint1 = default(System.Drawing.Point);
            System.Drawing.Point oPoint2 = default(System.Drawing.Point);
            string sFontName = null;
            Font oFont = null;
            Color oColor = default(Color);

            //生成驗證碼字串
            for (N1 = 0; N1 <= CodeLength - 1; N1++)
            {
                sCode += oCharacter[oRnd.Next(oCharacter.Length)];
            }

            oBmp = new Bitmap(Width, Height);
            oGraphics = Graphics.FromImage(oBmp);
            oGraphics.Clear(System.Drawing.Color.White);
            try
            {
                for (N1 = 0; N1 <= 4; N1++)
                {
                    //畫噪線
                    oPoint1.X = oRnd.Next(Width);
                    oPoint1.Y = oRnd.Next(Height);
                    oPoint2.X = oRnd.Next(Width);
                    oPoint2.Y = oRnd.Next(Height);
                    oColor = oColors[oRnd.Next(oColors.Length)];
                    oGraphics.DrawLine(new Pen(oColor), oPoint1, oPoint2);
                }

                float spaceWith = 0, dotX = 0, dotY = 0;
                if (CodeLength != 0)
                {
                    spaceWith = (Width - FontSize * CodeLength - 10) / CodeLength;
                }

                for (N1 = 0; N1 <= sCode.Length - 1; N1++)
                {
                    //畫驗證碼字串
                    sFontName = oFontNames[oRnd.Next(oFontNames.Length)];
                    oFont = new Font(sFontName, FontSize, FontStyle.Italic);
                    oColor = oColors[oRnd.Next(oColors.Length)];

                    dotY = (Height - oFont.Height) / 2 + 2;//中心下移2像素
                    dotX = Convert.ToSingle(N1) * FontSize + (N1 + 1) * spaceWith;

                    oGraphics.DrawString(sCode[N1].ToString(), oFont, new SolidBrush(oColor), dotX, dotY);
                }

                for (int i = 0; i <= 30; i++)
                {
                    //畫噪點
                    int x = oRnd.Next(oBmp.Width);
                    int y = oRnd.Next(oBmp.Height);
                    Color clr = oColors[oRnd.Next(oColors.Length)];
                    oBmp.SetPixel(x, y, clr);
                }

                Code = sCode;
                //保存图片数据
                MemoryStream stream = new MemoryStream();
                oBmp.Save(stream, ImageFormat.Jpeg);
                SetValiCode(Code);
                //输出图片流
                return stream.ToArray();
            }
            finally
            {
                oGraphics.Dispose();
            }
        }



        public void SendImg()
        {
            int width = 100;
            int height = 40;
            int fontsize = 20;
            string code = string.Empty;
            byte[] bytes = CreateValidateGraphic(out code, 4, width, height, fontsize);
            Response.ContentType = "image/Jpeg ";
            Response.Write(bytes);
            Response.End();
        }







    }
}


//<Menu name="临时(要删除)" key="ls" value="">
//  <Menu name="商圈信息" key="ZHXX" value="/AccountManage/AccountInfo.aspx" />
//  <Menu name="账户列表" key="ZHGL_ZHLB" value="/AccountManage/AccountList.aspx" />       
//  <Menu name="代理商新增" key="DLSXZ" value="/AngencyManage/AngencyDetail.aspx" />
//  <Menu name="代理商列表" key="DLSLB" value="/AngencyManage/AngencyList.aspx" />
//  <Menu name="商户列表" key="SHLB" value="/CustomerManage/Customer.aspx" />
//  <Menu name="增加POS请求" key="SCGL_POSRequest" value="/MemberConfig/RequestPosAdd.aspx" />
//  <Menu name="加盟商户列表" key="JMSHLB" value="/JOINCustomConfig/JOINCustomList.aspx" />
//  <Menu name="全局费率设置" key="QUANJUFLXZ" value="/ProductConfig/RateSetting.aspx"/>
//  <Menu name="门店设置商户" key="MDGL_SZSH" value="/JOINCustomConfig/Store2CustomerDataSet.aspx"/>
//  <Menu name="注册会员列表" key="ZCHYLB" value="/JOINCustomConfig/RegisterMemberList.aspx" />
//  <Menu name="内部转账订单列表" key="AccountTranList" value="/TradeManage/AccountTranList.aspx" />
//  <Menu name="商户订单列表" key="SHDDLB" value="/TradeManage/OrderList.aspx"/>
//</Menu>