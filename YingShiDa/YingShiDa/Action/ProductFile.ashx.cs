using Common;
using Method;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;

namespace YingShiDa.Action
{
    /// <summary>
    /// ProductFile 的摘要说明
    /// </summary>
    public class ProductFile : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Buffer = true;
            context.Response.ExpiresAbsolute = DateTime.Now.AddDays(-1);
            context.Response.AddHeader("pragma", "no-cache");
            context.Response.AddHeader("cache-control", "");
            context.Response.CacheControl = "no-cache";
            context.Response.ContentEncoding = System.Text.Encoding.UTF8;
            // 指定允许其他域名访问
            context.Response.AddHeader("Access-Control-Allow-Origin", "*");
            // 响应类型
            context.Response.AddHeader("Access-Control-Allow-Methods", "POST");
            // 响应头设置
            context.Response.AddHeader("Access-Control-Allow-Headers", "x-requested-with,content-type");
            string action = context.Request.Params["Action"];
            HttpPostedFile _file = context.Request.Files["file_data"];
            if (string.IsNullOrEmpty(action))
            {
                context.Response.Write("ParamsError!");
                return;
            }
            try
            {
                switch (action.ToLower())
                {
                    case "companyprofile": GetComPanyProfile(context); break;//公司简介
                    case "developmenthistory": GetDevelopmentHistory(context); break;//发展历程
                    case "corporateculture": GetCorporateCulture(context); break;//企业文化
                    case "enterprisehonor": GetEnterpriseHonor(context); break;//企业荣誉

                    case "companynews": GetCompanyNews(context); break;//公司新闻
                    case "companynewsdetail": GetCompanyNewsDetail(context); break;//公司新闻详情
                    case "industryinformation": GetIndustryInformation(context); break;//行业资讯
                    case "industryinformationdetail": GetIndustryInformationDetail(context); break;//行业资讯详情

                    case "memberlist": GetMemberList(context); break;//服务理念
                    case "membertogrouplist": GetMemberToGroupList(context); break;//常见问题答疑

                    case "talentconcept": GetTalentConcept(context); break;//人才理念
                    case "talentrecruitment": GetTalentRecruitment(context); break;//人才招聘
                    case "staffstyle": GetStaffStyle(context); break;//员工风采

                    case "contactinformation": GetContactInformation(context); break;//联系方式
                    case "companylocation": GetCompanyLocation(context); break;//公司位置

                    case "homepagecarousel": GetHomePageCarousel(context); break;//首页轮播图片
                    case "teamcarousel": GetTeamCarousel(context); break;//团队轮播图片

                    case "productphoto": GetProductPhoto(context); break;//得到所有产品列表

                    case "productdetail": GetProductDetail(context); break;//根据ID字段得到产品详情

                    case "productdetailbyid": GetProductDetailByID(context); break;//根据ProductID得到产品分类的产品详情

                    case "productdetailbyptype": GetProductDetailByPType(context); break;//根据ProductType得到产品分类的产品详情

                    case "productmodelandname": GetProductModelAndName(context); break;//根据产品型号和产品名称得到产品列表

                    case "productrelation": GetProductRelation(context); break;//根据产品详情ID得到关联的产品

                }

            }
            catch (Exception ex)
            {
                context.Response.Write("Failed");
                LogTool.LogWriter.WriteError(string.Format("Message:{0},StackTrace:{1}", ex.Message, ex.StackTrace));
            }
            finally
            {
                context.Response.End();
            }
        }


        public string GetComPanyProfile(HttpContext context)
        {
            string jsonStr = string.Empty;
            int Language = Convert.ToInt32(context.Request.Params["lang"]);
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    List<Model.Company_Profile> cp = Factory.GetExecution().GetByWhereSqlList<Model.Company_Profile>(" and Language="+ Language, " UpdateTime desc");
                    jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(cp);
                    context.Response.Write(jsonStr);
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
            finally
            {
                dbm.Close();
            }
            return jsonStr;
        }

        public string GetDevelopmentHistory(HttpContext context)
        {
            string jsonStr = string.Empty;
            int Language = Convert.ToInt32(context.Request.Params["lang"]);
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    List<Model.Company_History> cp = Factory.GetExecution().GetByWhereSqlList<Model.Company_History>(" and Language=" + Language, " UpdateTime desc");
                    jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(cp);
                    context.Response.Write(jsonStr);
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
            finally
            {
                dbm.Close();
            }
            return jsonStr;
        }

        public string GetCorporateCulture(HttpContext context)
        {
            string jsonStr = string.Empty;
            int Language = Convert.ToInt32(context.Request.Params["lang"]);
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    List<Model.Company_Culture> cp = Factory.GetExecution().GetByWhereSqlList<Model.Company_Culture>(" and Language=" + Language, " UpdateTime desc");
                    jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(cp);
                    context.Response.Write(jsonStr);
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
            finally
            {
                dbm.Close();
            }
            return jsonStr;
        }

        public string GetEnterpriseHonor(HttpContext context)
        {
            string jsonStr = string.Empty;
            int Language = Convert.ToInt32(context.Request.Params["lang"]);
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    List<Model.Company_Honor> cp = Factory.GetExecution().GetByWhereSqlList<Model.Company_Honor>(" and Language=" + Language, " UpdateTime desc");
                    jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(cp);
                    context.Response.Write(jsonStr);
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
            finally
            {
                dbm.Close();
            }
            return jsonStr;
        }

        public string GetCompanyNews(HttpContext context)
        {
            string jsonStr = string.Empty;
            int Language = Convert.ToInt32(context.Request.Params["lang"]);
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    List<Model.Company_News> cp = Factory.GetExecution().GetByWhereSqlList<Model.Company_News>(" and Language=" + Language, " UpdateTime desc", " ID,Title,UpdateTime ");
                    jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(cp);
                    context.Response.Write(jsonStr);
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
            finally
            {
                dbm.Close();
            }
            return jsonStr;
        }

        public string GetCompanyNewsDetail(HttpContext context)
        {
            string jsonStr = string.Empty;
            int ID = Convert.ToInt32(context.Request.Params["ID"]);
            int Language = Convert.ToInt32(context.Request.Params["lang"]);
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    Model.Company_News cn = Factory.GetExecution().SelectByID<Model.Company_News>(ID);
                    cn.BrowseTimes += 1;
                    bool flag = Factory.GetExecution().Update<Model.Company_News>(cn);
                    List<Model.Company_News> cp = Factory.GetExecution().GetByWhereSqlList<Model.Company_News>(" and ID="+ ID + " and Language=" + Language, " UpdateTime desc");
                    jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(cp);
                    context.Response.Write(jsonStr);
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
            finally
            {
                dbm.Close();
            }
            return jsonStr;
        }

        public string GetIndustryInformation(HttpContext context)
        {
            string jsonStr = string.Empty;
            int Language = Convert.ToInt32(context.Request.Params["lang"]);
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    List<Model.Industry_News> cp = Factory.GetExecution().GetByWhereSqlList<Model.Industry_News>(" and Language=" + Language, " UpdateTime desc", " ID,Title,UpdateTime ");
                    jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(cp);
                    context.Response.Write(jsonStr);
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
            finally
            {
                dbm.Close();
            }
            return jsonStr;
        }

        public string GetIndustryInformationDetail(HttpContext context)
        {
            string jsonStr = string.Empty;
            int ID = Convert.ToInt32(context.Request.Params["ID"]);
            int Language = Convert.ToInt32(context.Request.Params["lang"]);
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    Model.Industry_News iNew = Factory.GetExecution().SelectByID<Model.Industry_News>(ID);
                    iNew.BrowseTimes += 1;
                    bool flag = Factory.GetExecution().Update<Model.Industry_News>(iNew);
                    List<Model.Industry_News> cp = Factory.GetExecution().GetByWhereSqlList<Model.Industry_News>(" and ID=" + ID + " and Language=" + Language, " UpdateTime desc");
                    jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(cp);
                    context.Response.Write(jsonStr);
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
            finally
            {
                dbm.Close();
            }
            return jsonStr;
        }

        public string GetMemberList(HttpContext context)
        {
            string jsonStr = string.Empty;
            int Language = Convert.ToInt32(context.Request.Params["lang"]);
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    List<Model.Service_Concept> cp = Factory.GetExecution().GetByWhereSqlList<Model.Service_Concept>(" and Language=" + Language, " UpdateTime desc");
                    jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(cp);
                    context.Response.Write(jsonStr);
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
            finally
            {
                dbm.Close();
            }
            return jsonStr;
        }

        public string GetMemberToGroupList(HttpContext context)
        {
            string jsonStr = string.Empty;
            int Language = Convert.ToInt32(context.Request.Params["lang"]);
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    List<Model.CommonQuestion> cp = Factory.GetExecution().GetByWhereSqlList<Model.CommonQuestion>(" and Language=" + Language, " UpdateTime desc");
                    jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(cp);
                    context.Response.Write(jsonStr);
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
            finally
            {
                dbm.Close();
            }
            return jsonStr;
        }

        public string GetTalentConcept(HttpContext context)
        {
            string jsonStr = string.Empty;
            int Language = Convert.ToInt32(context.Request.Params["lang"]);
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    List<Model.Talent_Concept> cp = Factory.GetExecution().GetByWhereSqlList<Model.Talent_Concept>(" and Language=" + Language, " UpdateTime desc");
                    jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(cp);
                    context.Response.Write(jsonStr);
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
            finally
            {
                dbm.Close();
            }
            return jsonStr;
        }

        public string GetTalentRecruitment(HttpContext context)
        {
            string jsonStr = string.Empty;
            int Language = Convert.ToInt32(context.Request.Params["lang"]);
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    List<Model.Recruitment> cp = Factory.GetExecution().GetByWhereSqlList<Model.Recruitment>(" and Language=" + Language, " UpdateTime desc");
                    jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(cp);
                    context.Response.Write(jsonStr);
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
            finally
            {
                dbm.Close();
            }
            return jsonStr;
        }

        public string GetStaffStyle(HttpContext context)
        {
            string jsonStr = string.Empty;
            int Language = Convert.ToInt32(context.Request.Params["lang"]);
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    List<Model.Staff_Presence> cp = Factory.GetExecution().GetByWhereSqlList<Model.Staff_Presence>(" and Language=" + Language, " UpdateTime desc");
                    jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(cp);
                    context.Response.Write(jsonStr);
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
            finally
            {
                dbm.Close();
            }
            return jsonStr;
        }

        public string GetCompanyLocation(HttpContext context)
        {
            string jsonStr = string.Empty;
            int Language = Convert.ToInt32(context.Request.Params["lang"]);
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    List<Model.Company_Location> cp = Factory.GetExecution().GetByWhereSqlList<Model.Company_Location>(" and Language=" + Language, " UpdateTime desc");
                    jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(cp);
                    context.Response.Write(jsonStr);
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
            finally
            {
                dbm.Close();
            }
            return jsonStr;
        }

        public string GetHomePageCarousel(HttpContext context)
        {
            string jsonStr = string.Empty;
            int Language = Convert.ToInt32(context.Request.Params["lang"]);
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    List<Model.InBanner> cp = Factory.GetExecution().GetByWhereSqlList<Model.InBanner>(" and Language=" + Language, " UpdateTime desc");
                    jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(cp);
                    context.Response.Write(jsonStr);
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
            finally
            {
                dbm.Close();
            }
            return jsonStr;
        }

        public string GetContactInformation(HttpContext context)
        {
            string jsonStr = string.Empty;
            int Language = Convert.ToInt32(context.Request.Params["lang"]);
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    List<Model.Contact_US> cp = Factory.GetExecution().GetByWhereSqlList<Model.Contact_US>(" and Language=" + Language, " UpdateTime desc");
                    jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(cp);
                    context.Response.Write(jsonStr);
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
            finally
            {
                dbm.Close();
            }
            return jsonStr;
        }

        public string GetTeamCarousel(HttpContext context)
        {
            string jsonStr = string.Empty;
            int Language = Convert.ToInt32(context.Request.Params["lang"]);
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    List<Model.InTeam> cp = Factory.GetExecution().GetByWhereSqlList<Model.InTeam>(" and Language=" + Language, " UpdateTime desc");
                    jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(cp);
                    context.Response.Write(jsonStr);
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
            finally
            {
                dbm.Close();
            }
            return jsonStr;
        }

        public string GetProductPhoto(HttpContext context)
        {
            string jsonStr = string.Empty;
            int Language = Convert.ToInt32(context.Request.Params["lang"]);
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    DataTable dt = DAL.GetDataTable.GetAllProduct(Language,dbm);
                    jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(dt);
                    context.Response.Write(jsonStr);
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
            finally
            {
                dbm.Close();
            }
            return jsonStr;
        }

        public string GetProductDetail(HttpContext context)
        {
            string jsonStr = string.Empty;
            int ID =Convert.ToInt32(context.Request.Params["ID"]);
            int Language = Convert.ToInt32(context.Request.Params["lang"]);
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    List<Model.ProductCenterDetail> cp = Factory.GetExecution().GetByWhereSqlList<Model.ProductCenterDetail>(" and Language=" + Language+" and ID="+ID, " UpdateTime desc");
                    jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(cp);
                    context.Response.Write(jsonStr);
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
            finally
            {
                dbm.Close();
            }
            return jsonStr;
        }

        public string GetProductDetailByID(HttpContext context)
        {
            string jsonStr = string.Empty;
            int Language = Convert.ToInt32(context.Request.Params["lang"]);
            string ProductID = context.Request.Params["ProductID"];
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    DataTable dt = DAL.GetDataTable.GetProductDetailByID(Language,ProductID, dbm);
                    jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(dt);
                    context.Response.Write(jsonStr);
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
            finally
            {
                dbm.Close();
            }
            return jsonStr;
        }

        public string GetProductDetailByPType(HttpContext context)
        {
            string jsonStr = string.Empty;
            int Language = Convert.ToInt32(context.Request.Params["lang"]);
            string ProductType = context.Request.Params["ProductType"];
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    DataTable dt = DAL.GetDataTable.GetProductDetailByPType(Language, ProductType, dbm);
                    jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(dt);
                    context.Response.Write(jsonStr);
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
            finally
            {
                dbm.Close();
            }
            return jsonStr;
        }

        public string GetProductModelAndName(HttpContext context)
        {
            string jsonStr = string.Empty;
            int Language = Convert.ToInt32(context.Request.Params["lang"]);
            string ProductModel = context.Request.Params["ProductModel"];
            string ProductTitle = context.Request.Params["ProductTitle"];
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    DataTable dt = DAL.GetDataTable.GetProductModelAndName(Language, ProductModel, ProductTitle, dbm);
                    jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(dt);
                    context.Response.Write(jsonStr);
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
            finally
            {
                dbm.Close();
            }
            return jsonStr;
        }

        public string GetProductRelation(HttpContext context)
        {
            string jsonStr = string.Empty;
            string ProductDetailID = context.Request.Params["ProductDetailID"];
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    DataTable dt = DAL.GetDataTable.GetProductRelation(ProductDetailID, dbm);
                    jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(dt);
                    context.Response.Write(jsonStr);
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
            finally
            {
                dbm.Close();
            }
            return jsonStr;
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}