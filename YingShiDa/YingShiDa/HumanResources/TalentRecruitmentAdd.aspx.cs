﻿using System;
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

namespace YingShiDa.HumanResources
{
    public partial class TalentRecruitmentAdd : PageBase
    {
        public string Responsibilities = "";
        public string JobRequirements = "";
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
                Int32.TryParse(Request["ID"], out requestID);
                BindData();
            }
        }

        public void BindData()
        {
            if (view_action == "notify")
            {
                Model.Recruitment cp = Factory.GetExecution().SelectByID<Model.Recruitment>(requestID);
                if (cp != null)
                {
                    if (cp.Language == 1)
                    {
                        Chinese.Checked = true;
                    }
                    else if (cp.Language == 3)
                    {
                        English.Checked = true;
                    }
                    else if (cp.Language == 2)
                    {
                        Traditional.Checked = true;
                    }
                    txtTitle.Text = cp.Title;
                    txtDepartment.Text = cp.Department;
                    txtNumber.Text = cp.Number.ToString();
                    Responsibilities = cp.Responsibilities;
                    JobRequirements = cp.JobRequirements;
                    txtSalary.Text = cp.Salary;
                    txtCreatePeople.Text = cp.CreatePeople;
                    HomePageUploadImg.ImageUrl = WebSite.IMAGESERVER_WEBPATH + photoPath + cp.LogoUrl;
                    HomePageUploadFileName.Text = cp.LogoUrl;
                    txtKeywords.Text = cp.Keywords;
                    txtDescription.Text = cp.Description;
                }
            }
        }
        protected void btnSave_Click(object sender, EventArgs e)
        {
            try
            {
                //Responsibilities = Request.Form["editorValue"]; //获取umeditor的值
                //JobRequirements = Request.Form["editorValue"]; //获取umeditor的值
                //Responsibilities = Server.HtmlDecode(txtResponsibilities.InnerHtml);
                //JobRequirements = Server.HtmlDecode(txtJobRequirements.InnerHtml);
                Responsibilities = hfResponsibilities.Value;
                JobRequirements = hfJobRequirements.Value;
                if (string.IsNullOrEmpty(Responsibilities))
                {
                    Common.MessageBox.ShowLayer(this, "岗位职责不能为空", 2);
                    return;
                }
                if (string.IsNullOrEmpty(JobRequirements))
                {
                    Common.MessageBox.ShowLayer(this, "岗位要求不能为空", 2);
                    return;
                }
                if (view_action == "notify")
                {
                    Model.Recruitment cp = Factory.GetExecution().SelectByID<Model.Recruitment>(requestID);
                    if (cp != null)
                    {
                        cp.Language = Convert.ToInt32(Request.Form["language"]);
                        cp.Title = txtTitle.Text;
                        cp.Department = txtDepartment.Text;
                        cp.Number = Convert.ToInt32(txtNumber.Text);
                        cp.Responsibilities = Responsibilities;
                        cp.JobRequirements = JobRequirements;
                        cp.Salary = txtSalary.Text;
                        cp.CreatePeople = txtCreatePeople.Text;
                        cp.LogoUrl = HomePageUploadFileName.Text;
                        cp.CreatePeople = txtCreatePeople.Text;
                        cp.UpdateTime = DateTime.Now;
                        cp.Keywords = txtKeywords.Text.Trim();
                        cp.Description = txtDescription.Text.Trim();
                        bool flag = Factory.GetExecution().Update<Model.Recruitment>(cp);
                        if (flag)
                        {
                            Common.MessageBox.ShowRedirect(this, "/HumanResources/TalentRecruitment.aspx");
                        }
                    }
                }
                else
                {
                    Model.Recruitment cp = new Model.Recruitment();
                    cp.Language = Convert.ToInt32(Request.Form["language"]);
                    cp.Title = txtTitle.Text;
                    cp.Department = txtDepartment.Text;
                    cp.Number = Convert.ToInt32(txtNumber.Text);
                    cp.Responsibilities = Responsibilities;
                    cp.JobRequirements = JobRequirements;
                    cp.Salary = txtSalary.Text;
                    cp.CreatePeople = txtCreatePeople.Text;
                    cp.LogoUrl = HomePageUploadFileName.Text;
                    cp.BrowseTimes = 0;
                    cp.CreatePeople = txtCreatePeople.Text;
                    cp.UpdateTime = DateTime.Now;
                    cp.CreateTime = DateTime.Now;
                    cp.Keywords = txtKeywords.Text.Trim();
                    cp.Description = txtDescription.Text.Trim();
                    bool flag = Factory.GetExecution().Add<Model.Recruitment>(cp);
                    if (flag)
                    {
                        Common.MessageBox.ShowRedirect(this, "/HumanResources/TalentRecruitment.aspx");
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
            Responsibilities = hfResponsibilities.Value;
            JobRequirements = hfJobRequirements.Value;
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
                        }
                    }
                    else
                    {
                        Common.MessageBox.ShowLayer(this, "上传文件必须小于1M ！请重新选择",2);
                        Responsibilities = hfResponsibilities.Value;
                        JobRequirements = hfJobRequirements.Value;
                        return;
                    }
                }
                else
                {
                    Common.MessageBox.ShowLayer(this, "图片类型不对！只支持以下类型： jpg、gif、png、jpeg、bmp ", 2);
                    Responsibilities = hfResponsibilities.Value;
                    JobRequirements = hfJobRequirements.Value;
                    return;
                }
            }
            else
            {
                Common.MessageBox.ShowLayer(this, "请选择需要上传的文件",2);
                Responsibilities = hfResponsibilities.Value;
                JobRequirements = hfJobRequirements.Value;
                return;
            }
        }
        #endregion

        #region 正文图片上传
        protected void TextUploadBtn_Click(object sender, EventArgs e)
        {
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
                        }
                    }
                    else
                    {
                        Common.MessageBox.ShowLayer(this, "上传文件必须小于1M ！请重新选择",2);
                        Responsibilities = Request.Form["editorValue"]; //获取umeditor的值
                        JobRequirements = Request.Form["editorValue"]; //获取umeditor的值
                        return;
                    }
                }
                else
                {
                    Common.MessageBox.ShowLayer(this, "图片类型不对！只支持以下类型： jpg、gif、png、jpeg、bmp ", 2);
                    Responsibilities = Request.Form["editorValue"]; //获取umeditor的值
                    JobRequirements = Request.Form["editorValue"]; //获取umeditor的值
                    return;
                }
            }
            else
            {
                Common.MessageBox.ShowLayer(this, "请选择需要上传的文件",2);
                Responsibilities = Request.Form["editorValue"]; //获取umeditor的值
                JobRequirements = Request.Form["editorValue"]; //获取umeditor的值
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