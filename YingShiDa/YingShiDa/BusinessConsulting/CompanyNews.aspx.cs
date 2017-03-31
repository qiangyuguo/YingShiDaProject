using Common;
using Method;
using System;
using System.Collections.Generic;
using System.Data;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace YingShiDa.BusinessConsulting
{
    public partial class CompanyNews : PageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                txtPurchaseStart.Value = DateTime.Now.ToString("yyyy-MM-dd");
                txtPurchaseEnd.Value = DateTime.Now.ToString("yyyy-MM-dd");
                BindData();
            }
        }

        public void BindData()
        {
            DateTime _tmpDtStart;
            DateTime _tmpDtEnd;
            if (!string.IsNullOrEmpty(txtPurchaseStart.Value) && !DateTime.TryParse(txtPurchaseStart.Value, out _tmpDtStart))
            {
                Common.MessageBox.ShowLayer(this, "请输入正确的查询开始时间！",2);
                return;
            }
            if (!string.IsNullOrEmpty(txtPurchaseEnd.Value) && !DateTime.TryParse(txtPurchaseEnd.Value, out _tmpDtEnd))
            {
                Common.MessageBox.ShowLayer(this, "请输入正确的查询结束时间！",2);
                return;
            }
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            try
            {
                if (dbm.Open())
                {
                    int pageCount;
                    int rowCount;
                    string Title = txtTitle.Text.Trim();
                    string startDate = txtPurchaseStart.Value.Trim();
                    string endDate = txtPurchaseEnd.Value.Trim();
                    if (!string.IsNullOrEmpty(endDate) && string.IsNullOrEmpty(startDate))
                        startDate = endDate;
                    if (!string.IsNullOrEmpty(startDate) && string.IsNullOrEmpty(endDate))
                        endDate = startDate;

                    //判断时间段
                    if (!string.IsNullOrEmpty(endDate) && !string.IsNullOrEmpty(startDate))
                    {
                        DateTime sDate = DateTime.Parse(startDate);
                        DateTime eDate = DateTime.Parse(endDate);

                        if (sDate > eDate)
                        {
                            Common.MessageBox.ShowLayer(this, "开始时间不能大于结束时间！",2);
                            return;
                        }
                    }
                    DataTable dt = DAL.GetDataTable.GetList<Model.Company_News>(Title, startDate, endDate, AspNetPager2.CurrentPageIndex,AspNetPager2.PageSize, out pageCount, out rowCount, dbm);
                    if (null != dt)
                    {
                        rptChannel.DataSource = dt;
                        AspNetPager2.RecordCount = rowCount;
                        rptChannel.DataBind();
                    }
                }
                else
                {
                    Common.MessageBox.ShowLayer(this, "操作失败，连接数据库失败！", 2);
                }
            }
            catch (Exception ex)
            {
                Common.MessageBox.ShowLayer(this, "操作失败，" + ex.Message, 2);
            }
            finally
            {
                dbm.Close();
            }
        }

        protected void btnSearch_Click(object sender, EventArgs e)
        {
            AspNetPager2.CurrentPageIndex = 1;
            BindData();
        }

        protected void AspNetPager2_PageChanged(object sender, EventArgs e)
        {
            BindData();
        }

        protected void rptSpec_ItemCommand(object source, RepeaterCommandEventArgs e)
        {
            DBOperation.DBOperationManagment dbm = new DBOperation.DBOperationManagment();
            string msg = string.Empty;
            try
            {
                dbm.Open();
                switch (e.CommandName)
                {
                    case "Delete":
                        try
                        {
                            string IDValue = e.CommandArgument.ToString();
                            int ID = 0;
                            if (Int32.TryParse(IDValue, out ID))
                            {
                                if (Factory.GetExecution().Delete<Model.Company_News>(ID))
                                {
                                    Common.MessageBox.ShowLayer(this, "删除成功！", 1);
                                    BindData();
                                }
                                else
                                {
                                    Common.MessageBox.ShowLayer(this, "删除失败！", 2);
                                }
                            }
                            else
                            {
                                Common.MessageBox.ShowLayer(this, "请求参数错误！", 2);
                            }
                        }
                        catch
                        {
                            Common.MessageBox.ShowLayer(this, "删除失败！", 2);
                        }
                        finally
                        {
                            dbm.Close();
                        }
                        break;
                }
            }
            catch (Exception ex)
            {
                Common.MessageBox.ShowLayer(this, "数据处理失败！"+ex.ToString(), 2);
            }
            finally
            {
                dbm.Close();
            }
        }
    }
}
