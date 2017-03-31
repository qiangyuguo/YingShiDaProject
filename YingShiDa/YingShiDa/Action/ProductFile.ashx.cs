using Common;
using System;
using System.Collections.Generic;
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
                    case "addfile": AddFile(context, _file); break;
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

        public void AddFile(HttpContext context, HttpPostedFile _file)
        {
            string jsonStr = string.Empty;
            List<string> r1 = new List<string>();
            try
            {
                string webPath = WebSite.IMAGESERVER_LOCALPATH + "//Product//";//文件服务路径
                if (!Directory.Exists(webPath))
                {
                    Directory.CreateDirectory(webPath);
                }
                var strs = _file.FileName.Split('.');
                string FileName =Guid.NewGuid().ToString("N") + "." + strs[1].ToLower();
                _file.SaveAs(webPath + FileName);
                r1.Add(FileName);
                jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(r1);
                context.Response.Write(jsonStr);
            }
            catch (Exception ex)
            {
                context.Response.Write("FAIL|无法获取驳回原因");
            }
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