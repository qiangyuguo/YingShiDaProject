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

namespace YingShiDa.ProductCenter
{
    public partial class ServoDriverDetailAdd : PageBase
    {
        public static string ProductFile = string.Empty;
        public string Advantage = "";
        public string TechnicalParameter = "";
        private string photoPath = "Store\\Photo\\";
        private string defaultPhoto = "/Photo/AddFile.jpg";
        public static string FilePath = "Product\\";
        private string FileTempPath = "Product\\Temp\\";
        public string view_action;
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
        public static string[] limitExtension = { ".jpg", ".gif", ".png", ".bmp", ".jpeg" };
        public static int requestID = 0;
        protected void Page_Load(object sender, EventArgs e)
        {
            view_action = Request["action"];
            if (!IsPostBack)
            {
                Int32.TryParse(Request["ID"], out requestID);
                BindProductModel();
                //UpFile();
                BindData();
            }
        }

        private void BindProductModel()
        {
            int ProductType = Convert.ToInt32(Request["ProductType"]);
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                dbm.Open();
                DataTable productModelDT = DAL.GetDataTable.GetProductModel(ProductType, dbm);
                ddlProductModel.DataTextField = "ProductModel";
                ddlProductModel.DataValueField = "ProductModelID";
                ddlProductModel.DataSource = productModelDT;
                ddlProductModel.DataBind();
            }
            catch (Exception e)
            {
                LogTool.LogWriter.WriteError("绑定门店出错", e);
            }
            finally
            {
                dbm.Close();
            }
        }

        public void BindData()
        {
            Model.ProductCenterDetail cp = Factory.GetExecution().SelectByID<Model.ProductCenterDetail>(requestID);
            if (view_action == "notify")
            {
                if (cp != null)
                {
                    txtTitle.Text = cp.Title;
                    ddlProductModel.SelectedValue = cp.ProductModelID;
                    txtSeries.Text = cp.Series;
                    txtClothAngle.Text = cp.ClothAngle;
                    Advantage = cp.Advantage;
                    TechnicalParameter = cp.TechnicalParameter;
                    txtCreatePeople.Text = cp.CreatetPeople;
                    HomePageUploadImg.ImageUrl = WebSite.IMAGESERVER_WEBPATH + photoPath + cp.LogoUrl;
                    HomePageUploadFileName.Text = cp.LogoUrl;
                    //修改过
                    List<string> sp = new List<string>();
                    var photolist = cp.FileName;
                    if (!string.IsNullOrEmpty(photolist))
                    {
                        for (int i = 0; i < photolist.Split(',').Length; i++)
                        {
                            sp.Add(WebSite.IMAGESERVER_WEBPATH + FilePath + photolist.Split(',')[i]);
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
            int ProductType = Convert.ToInt32(Request["ProductType"]);
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                MoveFile();
                string code = "";
                var photo_list = UpdateLogo(out code);
                dbm.Open();
                Advantage = hfAdvantage.Value;
                TechnicalParameter = hfTechnicalParameter.Value;
                if (string.IsNullOrEmpty(Advantage))
                {
                    Common.MessageBox.ShowLayer(this, "特点和优点不能为空", 2);
                    return;
                }
                if (string.IsNullOrEmpty(TechnicalParameter))
                {
                    Common.MessageBox.ShowLayer(this, "技术参数不能为空", 2);
                    return;
                }
                if (view_action == "notify")
                {
                    Model.ProductCenterDetail cp = Factory.GetExecution().SelectByID<Model.ProductCenterDetail>(requestID);
                    if (cp != null)
                    {
                        cp.Title = txtTitle.Text;
                        cp.ProductModelID = ddlProductModel.SelectedValue;
                        cp.Series = txtSeries.Text;
                        cp.ClothAngle = txtClothAngle.Text;
                        cp.Advantage = Advantage;
                        cp.FileName = ProductFile;
                        cp.TechnicalParameter = TechnicalParameter;
                        cp.CreatetPeople = txtCreatePeople.Text;
                        cp.LogoUrl = HomePageUploadFileName.Text;
                        cp.CreatetPeople = txtCreatePeople.Text;
                        cp.UpdateTime = DateTime.Now;
                        if (!string.IsNullOrEmpty(photo_list[0]))
                        {
                            cp.FileName = photo_list[0].Trim(',');
                        }
                        bool flag = Factory.GetExecution().Update<Model.ProductCenterDetail>(cp);
                        if (flag)
                        {
                            Common.MessageBox.ShowRedirect(this, "/ProductCenter/ServoDriver.aspx?ProductType=" + ProductType);
                        }
                    }
                }
                else
                {
                    Model.ProductCenterDetail cp = new Model.ProductCenterDetail();
                    cp.ProductDetailID = RuleUtility.IDsCreater.GetCreater().CreateProductDetailID(dbm);
                    cp.Title = txtTitle.Text;
                    cp.ProductModelID = ddlProductModel.SelectedValue;
                    cp.Series = txtSeries.Text;
                    cp.ClothAngle = txtClothAngle.Text;
                    cp.Advantage = Advantage;
                    cp.TechnicalParameter = TechnicalParameter;
                    cp.CreatetPeople = txtCreatePeople.Text;
                    cp.LogoUrl = HomePageUploadFileName.Text;
                    cp.CreatetPeople = txtCreatePeople.Text;
                    cp.UpdateTime = DateTime.Now;
                    cp.CreateTime = DateTime.Now;
                    if (!string.IsNullOrEmpty(photo_list[0]))
                    {
                        cp.FileName = photo_list[0].Trim(',');
                    }
                    bool flag = Factory.GetExecution().Add<Model.ProductCenterDetail>(cp);
                    if (flag)
                    {
                        Common.MessageBox.ShowRedirect(this, "/ProductCenter/ServoDriver.aspx?ProductType=" + ProductType);
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

        #region 首页图片上传
        protected void HomePageUploadBtn_Click(object sender, EventArgs e)
        {
            Advantage = hfAdvantage.Value;
            TechnicalParameter = hfTechnicalParameter.Value;
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
                        Advantage = hfAdvantage.Value;
                        TechnicalParameter = hfTechnicalParameter.Value;
                        return;
                    }
                }
                else
                {
                    Common.MessageBox.ShowLayer(this, "图片类型不对！只支持以下类型： jpg、gif、png、jpeg、bmp ", 2);
                    Advantage = hfAdvantage.Value;
                    TechnicalParameter = hfTechnicalParameter.Value;
                    return;
                }
            }
            else
            {
                Common.MessageBox.ShowLayer(this, "请选择需要上传的文件",2);
                Advantage = hfAdvantage.Value;
                TechnicalParameter = hfTechnicalParameter.Value;
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
                        return;
                    }
                }
                else
                {
                    Common.MessageBox.ShowLayer(this, "图片类型不对！只支持以下类型： jpg、gif、png、jpeg、bmp ", 2);
                    return;
                }
            }
            else
            {
                Common.MessageBox.ShowLayer(this, "请选择需要上传的文件",2);
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

        public void UpFile()
        {
            string webPath = WebSite.IMAGESERVER_LOCALPATH + FilePath;//文件服务路径
            if (!Directory.Exists(webPath))
            {
                Directory.CreateDirectory(webPath);
            }
            var files = Request.Files;
            if (files != null && files.Count > 0&&files.AllKeys.Length==1&&files.AllKeys[0]== "fileInput")
            {
                for (int i = 0; i < files.Count; i++)
                {
                    int startIndex = files[i].FileName.LastIndexOf('.');
                    var strs = files[i].FileName.Substring(startIndex+1, files[i].FileName.Length- startIndex-1);
                    string FileName = Guid.NewGuid().ToString("N") + "." + strs.ToLower();
                    files[i].SaveAs(webPath + FileName);
                    string pf= ProductFile;
                    if (!string.IsNullOrEmpty(pf))
                    {
                        ProductFile = pf + "," + FileName;
                    }
                    else
                    {
                        ProductFile = FileName;
                    }
                }
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
                    Advantage = hfAdvantage.Value;
                    TechnicalParameter = hfTechnicalParameter.Value;
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
                    Advantage = hfAdvantage.Value;
                    TechnicalParameter = hfTechnicalParameter.Value;
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

        private string upload(FileUpload fu)
        {
            string fullFileName = fu.PostedFile.FileName;//获取文件名称
            string type = fullFileName.Substring(fullFileName.LastIndexOf(".") + 1).ToLower();//图片格式
            if (type == "pdf" || type == "dwg" || type == "dxf")//判断是否为图片类型
            {
            }
            else
            {
                Common.MessageBox.ShowLayer(this, "上传文件类型不正确",2);
                return string.Empty;
            }
            //Stream stream = fu.PostedFile.InputStream;
            //System.Drawing.Image img = null;
            //try
            //{
            //    img = System.Drawing.Image.FromStream(stream);
            //}
            //catch (Exception e)
            //{
            //    return string.Empty;
            //}
            //if (img == null) return string.Empty;

            if (!Directory.Exists(WebSite.IMAGESERVER_LOCALPATH + FileTempPath))
            {
                Directory.CreateDirectory(WebSite.IMAGESERVER_LOCALPATH + FileTempPath);
            }
            string fileName = Guid.NewGuid().ToString("N") +"."+ type;
            fu.SaveAs(WebSite.IMAGESERVER_LOCALPATH + FileTempPath + fileName);
            return WebSite.IMAGESERVER_WEBPATH + FileTempPath + fileName;
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
            if (!Directory.Exists(WebSite.IMAGESERVER_LOCALPATH + FilePath))
            {
                Directory.CreateDirectory(WebSite.IMAGESERVER_LOCALPATH + FilePath);
            }

            foreach (RepeaterItem item in rptShowPhotoes.Items)
            {
                Image mImage = item.FindControl("Image1") as Image;
                HiddenField hf = item.FindControl("HiddenField1") as HiddenField;
                var filename = System.IO.Path.GetFileName(hf.Value);
                if (filename == "") continue;
                if (hf.Value != WebSite.IMAGESERVER_LOCALPATH + FilePath + filename)
                {
                    File.Move(WebSite.IMAGESERVER_LOCALPATH + FileTempPath + filename, WebSite.IMAGESERVER_LOCALPATH + FilePath + filename);
                }
            }
        }
        #endregion
        #endregion
    }
}