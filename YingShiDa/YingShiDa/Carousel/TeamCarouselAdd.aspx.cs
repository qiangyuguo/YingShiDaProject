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

namespace YingShiDa.Carousel
{
    public partial class TeamCarouselAdd : PageBase
    {
        public static string PhotoPath = "TeamPage\\";
        private string photoTempPath = "TeamPage\\Temp\\";
        public string view_action;
        private string defaultPhoto = "/Photo/AddImg.png";
        /// <summary>
        /// 图片上传格式
        /// </summary>
        public static string[] limitExtension = { "jpg", "gif", "png", "bmp", "jpeg" };
        /// <summary>
        /// 保存查看名店图片集合
        /// </summary>
        public static List<string> storeImgList;
        /// <summary>
        /// 产品展示图片数量
        /// </summary>
        private int ProductShowMaxCount = 10;

        /// <summary>
        /// 上传图片限制
        /// </summary>
        public static int mumberMax = 1048567;

        /// <summary>
        /// 图片上传格式
        /// </summary>
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
            Model.InTeam cp = Factory.GetExecution().SelectByID<Model.InTeam>(requestID);
            if (view_action == "notify")
            {
                if (cp != null)
                {
                    if (cp.Language == 1)
                    {
                        Chinese.Checked = true;
                    }
                    else if (cp.Language == 2)
                    {
                        English.Checked = true;
                    }
                    else if (cp.Language == 3)
                    {
                        Traditional.Checked = true;
                    }
                    txtTitle.Text = cp.Title;
                    txtCreatePeople.Text = cp.CreatePeople;
                    txtContent1.Text = cp.Content1;
                    txtContent2.Text = cp.Content2;
                    txtContent3.Text = cp.Content3;
                    txtKeywords.Text = cp.Keywords;
                    txtDescription.Text = cp.Description;
                    //修改过
                    List<string> sp = new List<string>();
                    var photolist = cp.TeamPicname;
                    if (!string.IsNullOrEmpty(photolist))
                    {
                        for (int i = 0; i < photolist.Split(',').Length; i++)
                        {
                            sp.Add(WebSite.IMAGESERVER_WEBPATH + PhotoPath + photolist.Split(',')[i]);
                        }
                    }
                    //如果是只读状态，不需要显示默认图片
                    if (sp.Count < ProductShowMaxCount)
                    {
                        sp.Add(defaultPhoto);
                    }
                    rptShowPhotoes.DataSource = sp;
                    rptShowPhotoes.DataBind();
                }
            }
            else
            {
                List<string> showPhotos = new List<string>();
                showPhotos.Add(defaultPhoto);
                rptShowPhotoes.DataSource = showPhotos;
                rptShowPhotoes.DataBind();
            }
        }
        protected void btnSave_Click(object sender, EventArgs e)
        {
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                MoveFile();
                string code = "";
                var photo_list = UpdateLogo(out code);
                dbm.Open();
                if (view_action == "notify")
                {
                    Model.InTeam cp = Factory.GetExecution().SelectByID<Model.InTeam>(requestID);
                    if (cp != null)
                    {
                        cp.Language = Convert.ToInt32(Request.Form["language"]);
                        cp.Title = txtTitle.Text;
                        cp.CreatePeople = txtCreatePeople.Text;
                        cp.Content1= txtContent1.Text;
                        cp.Content2= txtContent2.Text;
                        cp.Content3= txtContent3.Text;
                        cp.UpdateTime = DateTime.Now;
                        cp.Keywords = txtKeywords.Text.Trim();
                        cp.Description = txtDescription.Text.Trim();
                        if (!string.IsNullOrEmpty(photo_list[0]))
                        {
                            cp.TeamPicname = photo_list[0].Trim(',');
                        }
                        bool flag = Factory.GetExecution().Update<Model.InTeam>(cp);
                        if (flag)
                        {
                            Common.MessageBox.ShowRedirect(this, "/Carousel/TeamCarousel.aspx");
                        }
                    }
                }
                else
                {
                    Model.InTeam cp = new Model.InTeam();
                    cp.Language = Convert.ToInt32(Request.Form["language"]);
                    cp.Title = txtTitle.Text;
                    cp.Content1 = txtContent1.Text;
                    cp.Content2 = txtContent2.Text;
                    cp.Content3 = txtContent3.Text;
                    cp.CreatePeople = txtCreatePeople.Text;
                    cp.UpdateTime = DateTime.Now;
                    cp.CreateTime = DateTime.Now;
                    cp.Keywords = txtKeywords.Text.Trim();
                    cp.Description = txtDescription.Text.Trim();
                    if (!string.IsNullOrEmpty(photo_list[0]))
                    {
                        cp.TeamPicname = photo_list[0].Trim(',');
                    }
                    bool flag = Factory.GetExecution().Add<Model.InTeam>(cp);
                    if (flag)
                    {
                        Common.MessageBox.ShowRedirect(this, "/Carousel/TeamCarousel.aspx");
                    }
                }
            }
            catch (Exception ex)
            {
                Common.MessageBox.ShowLayer(this, "添加失败!" + ex.Message,2);
            }
            finally
            {
                dbm.Close();
                BindData();
            }
        }

        #region 上传文件
        private string[] UpdateLogo(out string code)
        {
            code = "ok";
            try
            {
                string[] photo_list = new string[2];
                foreach (RepeaterItem item in rptShowPhotoes.Items)
                {
                    Image mImage = item.FindControl("Image1") as Image;
                    HiddenField hf = item.FindControl("HiddenField1") as HiddenField;
                    if (!string.IsNullOrEmpty(hf.Value))
                    {
                        photo_list[0] += System.IO.Path.GetFileName(hf.Value) + ",";
                        code = "ok";
                    }
                }
                return photo_list;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        #region 事件
        protected void rptShowPhotoes_ItemCommand(object source, RepeaterCommandEventArgs e)
        {
            List<string> showPhotos = getPhotoes((Repeater)source);
            string command = e.CommandName;
            FileUpload fu = e.Item.FindControl("FileUpload2") as FileUpload;
            HiddenField hf = e.Item.FindControl("HiddenField1") as HiddenField;
            Image mImage = e.Item.FindControl("Image1") as Image;
            switch (command)
            {
                case "Upload":

                    string image = upload(fu);

                    //如果返回的图片路径是空值，表示添加失败
                    if (string.IsNullOrEmpty(image))
                        return;

                    if (!string.IsNullOrEmpty(hf.Value))
                    {
                        if (System.IO.File.Exists(hf.Value))
                        {
                            System.IO.File.Delete(hf.Value);
                        }
                    }
                    if (mImage.ImageUrl == defaultPhoto)
                    {
                        showPhotos.Add(image);
                    }
                    else
                    {
                        for (int i = 0; i < showPhotos.Count; i++)
                        {
                            if (mImage.ImageUrl.EndsWith(showPhotos[i]))
                            {
                                showPhotos[i] = image;
                            }
                        }
                    }
                    //判断如果展示图片列表还是介绍图片列表
                    if (fu.ToolTip == "Show")
                    {
                        if (showPhotos.Count < ProductShowMaxCount)
                        {
                            showPhotos.Add(defaultPhoto);
                        }
                    }
                    break;
                case "Del":
                    for (int i = 0; i < showPhotos.Count; i++)
                    {
                        if (mImage.ImageUrl.EndsWith(showPhotos[i]))
                        {
                            showPhotos.RemoveAt(i);
                            i--;
                        }
                    }
                    showPhotos.Add(defaultPhoto);
                    break;
            }
            ((Repeater)source).DataSource = showPhotos;
            ((Repeater)source).DataBind();
        }

        private List<string> getPhotoes(Repeater r)
        {
            List<string> showPhotos = new List<string>();
            foreach (RepeaterItem item in r.Items)
            {
                Image m = item.FindControl("Image1") as Image;
                if (!m.ImageUrl.EndsWith(defaultPhoto))
                {
                    showPhotos.Add(m.ImageUrl);
                }
            }
            return showPhotos;
        }

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

        private string upload(FileUpload fu)
        {
            string fullFileName = fu.PostedFile.FileName;//获取文件名称
            string type = fullFileName.Substring(fullFileName.LastIndexOf(".") + 1).ToLower();//图片格式
            //验证图片格式
            if (IsImg(type))
            {

            }
            else
            {
                Common.MessageBox.ShowLayer(this, "图片类型不对！只支持以下类型： jpg、gif、png、jpeg、bmp ",2);
                return string.Empty;
            }

            if (!Directory.Exists(WebSite.IMAGESERVER_LOCALPATH + photoTempPath))
            {
                Directory.CreateDirectory(WebSite.IMAGESERVER_LOCALPATH + photoTempPath);
            }
            string fileName = Guid.NewGuid().ToString("N") +"."+ type;
            fu.SaveAs(WebSite.IMAGESERVER_LOCALPATH + photoTempPath + fileName);
            return WebSite.IMAGESERVER_WEBPATH + photoTempPath + fileName;
        }

        protected void rptShowPhotoes_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
            List<string> showPhotos = (List<string>)((Repeater)sender).DataSource;
            Control delControl = e.Item.FindControl("showdel");
            HiddenField hf = e.Item.FindControl("HiddenField1") as HiddenField;
            Image mImage = e.Item.FindControl("Image1") as Image;

            delControl.Visible = mImage.ImageUrl != defaultPhoto;

            if (delControl.Visible)
                hf.Value = mImage.ImageUrl.Replace(WebSite.IMAGESERVER_WEBPATH, WebSite.IMAGESERVER_LOCALPATH);
            else
            {
                hf.Value = "";
            }
        }

        public void MoveFile()
        {
            if (!Directory.Exists(WebSite.IMAGESERVER_LOCALPATH + PhotoPath))
            {
                Directory.CreateDirectory(WebSite.IMAGESERVER_LOCALPATH + PhotoPath);
            }

            foreach (RepeaterItem item in rptShowPhotoes.Items)
            {
                Image mImage = item.FindControl("Image1") as Image;
                HiddenField hf = item.FindControl("HiddenField1") as HiddenField;
                var filename = System.IO.Path.GetFileName(hf.Value);
                if (filename == "") continue;
                if (hf.Value != WebSite.IMAGESERVER_LOCALPATH + PhotoPath + filename)
                {
                    File.Move(WebSite.IMAGESERVER_LOCALPATH + photoTempPath + filename, WebSite.IMAGESERVER_LOCALPATH + PhotoPath + filename);
                }
            }
        }
        #endregion
        #endregion
    }
}