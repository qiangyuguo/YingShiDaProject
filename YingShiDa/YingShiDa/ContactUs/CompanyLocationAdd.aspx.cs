using System;
using System.Collections.Generic;

using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using Common;
using RuleUtility;
using System.Data;
using System.Xml;
using System.Web.Services;
using System.Configuration;
using Method;

namespace YingShiDa.ContactUs
{
    public partial class CompanyLocationAdd : PageBase
    {
        public string XiangQing = "";
        private string photoPath = "Store\\Photo\\";
        public string view_action;

        /// <summary>
        /// 上传图片限制
        /// </summary>
        public static int mumberMax = 1048567;

        /// <summary>
        /// 图片上传格式
        /// </summary>
        public static string[] limitExtension = { ".jpg", ".gif", ".png", ".bmp", ".jpeg" };
        public static int requestID = 0;
        protected void Page_Load(object sender, EventArgs e)
        {
            view_action = Request["action"];
            if (!IsPostBack)
            {
                Int32.TryParse(Request["ID"],out requestID);
                BindData();
            }
        }

        public void BindData()
        {
            if (view_action == "notify")
            {
                Model.Company_Location cp = Factory.GetExecution().SelectByID<Model.Company_Location>(requestID);
                if (cp != null)
                {
                    txtTitle.Text = cp.Title;
                    XiangQing = cp.Content;
                    txtCreatePeople.Text = cp.CreatetPeople;
                    HomePageUploadImg.ImageUrl = WebSite.IMAGESERVER_WEBPATH + photoPath + cp.LogoUrl;
                    HomePageUploadFileName.Text= cp.LogoUrl;
                }
            }
        }
        protected void btnSave_Click(object sender, EventArgs e)
        {
            try
            {
                XiangQing = Request.Form["editorValue"]; //获取umeditor的值
                if(string.IsNullOrEmpty(XiangQing))
                {
                    Common.MessageBox.ShowLayer(this, "正文内容不能为空", 2);
                    return;
                }
                if (view_action == "notify")
                {
                    Model.Company_Location cp = Factory.GetExecution().SelectByID<Model.Company_Location>(requestID);
                    if (cp != null)
                    {
                        cp.Title = txtTitle.Text;
                        cp.Content=XiangQing;
                        cp.CreatetPeople=txtCreatePeople.Text;
                        cp.LogoUrl = HomePageUploadFileName.Text;
                        cp.CreatetPeople = txtCreatePeople.Text;
                        cp.UpdateTime = DateTime.Now;
                        bool flag = Factory.GetExecution().Update<Model.Company_Location>(cp);
                        if (flag)
                        {
                            Common.MessageBox.ShowRedirect(this, "/ContactUs/CompanyLocation.aspx");
                        }
                    }
                }
                else
                {
                    Model.Company_Location cp = new Model.Company_Location();
                    cp.Title = txtTitle.Text;
                    cp.Content = XiangQing;
                    cp.CreatetPeople = txtCreatePeople.Text;
                    cp.LogoUrl = HomePageUploadFileName.Text;
                    cp.CreatetPeople = txtCreatePeople.Text;
                    cp.UpdateTime = DateTime.Now;
                    cp.CreateTime = DateTime.Now;
                    bool flag = Factory.GetExecution().Add<Model.Company_Location>(cp);
                    if (flag)
                    {
                        Common.MessageBox.ShowRedirect(this, "/ContactUs/CompanyLocation.aspx");
                    }
                }
            }
            catch (Exception ex)
            {
                Common.MessageBox.ShowLayer(this, "添加失败!" + ex.Message,2);
            }
            finally
            {
                BindData();
            }
        }

        #region 首页图片上传
        protected void HomePageUploadBtn_Click(object sender, EventArgs e)
        {
            XiangQing = Request.Form["editorValue"]; //获取umeditor的值
            if (HomePageUpload.HasFile)
            {
                //获取文件扩展名，并转换成小写
                string fileExtension = Path.GetExtension(HomePageUpload.FileName).ToLower();

                //验证图片格式
                if (IsImg(fileExtension))
                {
                    if (HomePageUpload.PostedFile.ContentLength <= mumberMax)
                    {
                        try
                        {
                            // 文件服务路径
                            string webPath = WebSite.IMAGESERVER_LOCALPATH + photoPath;
                            if (!Directory.Exists(webPath))
                            {
                                Directory.CreateDirectory(webPath);
                            }
                            // 文件名
                            string imgName = fileName();
                            string storeIcoImgName = imgName + fileExtension;
                            // 服务器上的虚拟路径
                            string serverPath = webPath + storeIcoImgName;
                            // 保存图片
                            HomePageUpload.PostedFile.SaveAs(serverPath);
                            //获取图片
                            HomePageUploadImg.ImageUrl = WebSite.IMAGESERVER_WEBPATH + photoPath + storeIcoImgName;
                            HomePageUploadFileName.Text = storeIcoImgName;
                        }
                        catch (Exception ex)
                        {
                            LogTool.LogWriter.WriteError("首页图片上传失败！", ex);
                            XiangQing = Request.Form["editorValue"]; //获取umeditor的值
                        }
                    }
                    else
                    {
                        Common.MessageBox.ShowLayer(this, "上传文件必须小于1M ！请重新选择",2);
                        XiangQing = Request.Form["editorValue"]; //获取umeditor的值
                        return;
                    }
                }
                else
                {
                    Common.MessageBox.ShowLayer(this, "图片类型不对！只支持以下类型： jpg、gif、png、jpeg、bmp ", 2);
                    XiangQing = Request.Form["editorValue"]; //获取umeditor的值
                    return;
                }
            }
            else
            {
                Common.MessageBox.ShowLayer(this, "请选择需要上传的文件",2);
                XiangQing = Request.Form["editorValue"]; //获取umeditor的值
                return;
            }
        }
        #endregion

        #region 正文图片上传
        protected void TextUploadBtn_Click(object sender, EventArgs e)
        {
            XiangQing = Request.Form["editorValue"]; //获取umeditor的值
            if (TextUpload.HasFile)
            {
                //获取文件扩展名，并转换成小写
                string fileExtension = Path.GetExtension(TextUpload.FileName).ToLower();

                //验证图片格式
                if (IsImg(fileExtension))
                {
                    if (TextUpload.PostedFile.ContentLength <= mumberMax)
                    {
                        try
                        {
                            // 文件服务路径
                            string webPath = WebSite.IMAGESERVER_LOCALPATH + photoPath;
                            if (!Directory.Exists(webPath))
                            {
                                Directory.CreateDirectory(webPath);
                            }

                            // 文件名
                            string imgName = fileName();

                            string storeIcoImgName = imgName + fileExtension;
                            // 服务器上的虚拟路径
                            string serverPath = webPath + storeIcoImgName;

                            // 保存图片
                            TextUpload.PostedFile.SaveAs(serverPath);

                            //获取图片
                            TextUploadImg.ImageUrl = WebSite.IMAGESERVER_WEBPATH + photoPath + storeIcoImgName;
                            TextUploadFileName.Text = storeIcoImgName;
                        }
                        catch (Exception ex)
                        {
                            LogTool.LogWriter.WriteError("正文图片上传失败！", ex);
                            XiangQing = Request.Form["editorValue"]; //获取umeditor的值
                        }
                    }
                    else
                    {
                        Common.MessageBox.ShowLayer(this, "上传文件必须小于1M ！请重新选择",2);
                        XiangQing = Request.Form["editorValue"]; //获取umeditor的值
                        return;
                    }
                }
                else
                {
                    Common.MessageBox.ShowLayer(this, "图片类型不对！只支持以下类型： jpg、gif、png、jpeg、bmp ", 2);
                    XiangQing = Request.Form["editorValue"]; //获取umeditor的值
                    return;
                }
            }
            else
            {
                Common.MessageBox.ShowLayer(this, "请选择需要上传的文件",2);
                XiangQing = Request.Form["editorValue"]; //获取umeditor的值
                return;
            }
        }
        #endregion

        #region 上传图片方法
        /// <summary>
        /// 验证图片格式
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public bool IsImg(string str)
        {
            bool isImages = false;

            //将字符串格式全部转换为小写
            string thestr = str.ToLower();

            //循环图片格式
            for (int i = 0, j = limitExtension.Length; i < j; i++)
            {
                if (thestr == limitExtension[i])
                {

                    isImages = true;
                    break;
                }
            }
            return isImages;
        }

        /// <summary>
        /// 文件名称
        /// </summary>
        /// <returns></returns>
        public string fileName()
        {
            return Guid.NewGuid().ToString("N").Replace("-", "");
        }
        #endregion
    }
}