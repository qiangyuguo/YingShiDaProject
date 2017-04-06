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
                    case "industryinformation": GetIndustryInformation(context); break;//行业资讯

                    case "memberlist": GetMemberList(context); break;//服务理念
                    case "membertogrouplist": GetMemberToGroupList(context); break;//常见问题答疑

                    case "talentconcept": GetTalentConcept(context); break;//人才理念
                    case "talentrecruitment": GetTalentRecruitment(context); break;//人才招聘
                    case "staffstyle": GetStaffStyle(context); break;//员工风采

                    case "contactinformation": GetContactInformation(context); break;//联系方式
                    case "companylocation": GetCompanyLocation(context); break;//公司位置

                    case "homepagecarousel": GetHomePageCarousel(context); break;//首页轮播图片
                    case "teamcarousel": GetTeamCarousel(context); break;//团队轮播图片

                    case "productphoto": GetProductPhoto(context); break;//得到所有产品图片

                    case "productdetail": GetProductDetail(context); break;//得到指定产品的详情

                    case "productdetailbyid": GetProductDetailByID(context); break;//根据详情ID得到产品的详情

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
                    Model.Company_Profile cp = Factory.GetExecution().SelectTopList<Model.Company_Profile>(Language);
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
                    Model.Company_History cp = Factory.GetExecution().SelectTopList<Model.Company_History>(Language);
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
                    Model.Company_Culture cp = Factory.GetExecution().SelectTopList<Model.Company_Culture>(Language);
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
                    Model.Company_Honor cp = Factory.GetExecution().SelectTopList<Model.Company_Honor>(Language);
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
                    Model.Company_News cp = Factory.GetExecution().SelectTopList<Model.Company_News>(Language);
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
                    Model.Industry_News cp = Factory.GetExecution().SelectTopList<Model.Industry_News>(Language);
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
                    Model.Service_Concept cp = Factory.GetExecution().SelectTopList<Model.Service_Concept>(Language);
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
                    Model.CommonQuestion cp = Factory.GetExecution().SelectTopList<Model.CommonQuestion>(Language);
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
                    Model.Talent_Concept cp = Factory.GetExecution().SelectTopList<Model.Talent_Concept>(Language);
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
                    Model.Recruitment cp = Factory.GetExecution().SelectTopList<Model.Recruitment>(Language);
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
                    Model.Staff_Presence cp = Factory.GetExecution().SelectTopList<Model.Staff_Presence>(Language);
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
                    Model.Company_Location cp = Factory.GetExecution().SelectTopList<Model.Company_Location>(Language);
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
                    Model.InBanner cp = Factory.GetExecution().SelectTopList<Model.InBanner>(Language);
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
                    Model.Contact_US cp = Factory.GetExecution().SelectTopList<Model.Contact_US>(Language);
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
                    Model.InTeam cp = Factory.GetExecution().SelectTopList<Model.InTeam>(Language);
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
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    DataTable dt = DAL.GetDataTable.GetAllProduct(dbm);
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
                    Model.ProductCenterDetail cp = Factory.GetExecution().SelectByIDL<Model.ProductCenterDetail>(ID,Language);
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
            string ProductID = context.Request.Params["ProductID"];
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    DataTable dt = DAL.GetDataTable.GetProductDetailByID(ProductID,dbm);
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