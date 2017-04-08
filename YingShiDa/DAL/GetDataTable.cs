using DBOperation;
using DBOperation.Operations;
using Method;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public static class GetDataTable
    {
        #region 单表datatable
        public static DataTable GetList<T>(string Title,string startDate, string endDate, int pageNumber, int pageSize, out int pageCount, out int rowCount, DBOperationManagment dbm)
        {
            Type type = typeof(T);
            object obj = Activator.CreateInstance(type);
            string tableName = obj.GetType().Name;
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"select * from "+ tableName + " t1 where 1=1 ");

            if (!string.IsNullOrEmpty(Title))
            {
                strSql.AppendFormat(" AND t1.Title like '%{0}%' ", Title);
            }
            if (!string.IsNullOrEmpty(startDate) && !string.IsNullOrEmpty(endDate))
            {
                strSql.AppendFormat(" AND t1.UpdateTime between '{0} 00:00:00' and '{1} 23:59:59' ", startDate, endDate);
            }
            strSql.Append(" ORDER BY t1.UpdateTime DESC ");

            SqlParameter[] parameters = {
                        new SqlParameter("@sql", SqlDbType.VarChar,3000) ,
                         new SqlParameter("@page", SqlDbType.Int,4) ,
                          new SqlParameter("@pageSize", SqlDbType.Int,4) ,
                           new SqlParameter("@pageCount", SqlDbType.Int,4) ,
                            new SqlParameter("@recordCount", SqlDbType.Int,4) ,
                       };

            ExecProcedure ep = new ExecProcedure();
            ep.SqlCommand = "Common_FastPageList";
            parameters[0].Value = strSql.ToString();
            parameters[1].Value = pageNumber;
            parameters[2].Value = pageSize;
            parameters[3].Direction = ParameterDirection.Output;
            parameters[4].Direction = ParameterDirection.Output;
            ep.Parameters = parameters;
            dbm.Execute(ep);
            pageCount = (int)parameters[3].Value;
            rowCount = (int)parameters[4].Value;
            if (ep.ResultData != null && ep.ResultData.Tables != null && ep.ResultData.Tables.Count > 1)
            {
                return ep.ResultData.Tables[1];
            }
            else
            {
                return null;
            }
        }
        #endregion

        #region 得到产品中心列表
        public static DataTable GetProductList(string Title,int ProductType, string startDate, string endDate, int pageNumber, int pageSize, out int pageCount, out int rowCount, DBOperationManagment dbm)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@" select distinct pc.*,stuff((select ','+pcm.ProductModel from 
ProductCenterModel pcm where pc.ProductID=pcm.ProductID for xml path('')),1,1,'') ProductModel
from ProductCenter pc
inner join ProductCenterModel pcm on pc.ProductID=pcm.ProductID where 1=1 ");

            if (ProductType != 0)
            {
                strSql.AppendFormat(" AND pc.ProductType = '{0}' ", ProductType);
            }
            if (!string.IsNullOrEmpty(Title))
            {
                strSql.AppendFormat(" AND pc.ProductTitle like '%{0}%' ", Title);
            }
            if (!string.IsNullOrEmpty(startDate) && !string.IsNullOrEmpty(endDate))
            {
                strSql.AppendFormat(" AND pc.UpdateTime between '{0} 00:00:00' and '{1} 23:59:59' ", startDate, endDate);
            }
            strSql.Append(" ORDER BY pc.UpdateTime DESC ");

            SqlParameter[] parameters = {
                        new SqlParameter("@sql", SqlDbType.VarChar,3000) ,
                         new SqlParameter("@page", SqlDbType.Int,4) ,
                          new SqlParameter("@pageSize", SqlDbType.Int,4) ,
                           new SqlParameter("@pageCount", SqlDbType.Int,4) ,
                            new SqlParameter("@recordCount", SqlDbType.Int,4) ,
                       };

            ExecProcedure ep = new ExecProcedure();
            ep.SqlCommand = "Common_FastPageList";
            parameters[0].Value = strSql.ToString();
            parameters[1].Value = pageNumber;
            parameters[2].Value = pageSize;
            parameters[3].Direction = ParameterDirection.Output;
            parameters[4].Direction = ParameterDirection.Output;
            ep.Parameters = parameters;
            dbm.Execute(ep);
            pageCount = (int)parameters[3].Value;
            rowCount = (int)parameters[4].Value;
            if (ep.ResultData != null && ep.ResultData.Tables != null && ep.ResultData.Tables.Count > 1)
            {
                return ep.ResultData.Tables[1];
            }
            else
            {
                return null;
            }
        }
        #endregion

        #region 得到所有产品
        public static DataTable GetAllProduct(int Language, DBOperationManagment dbm)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@" select distinct pc.*,stuff((select distinct ','+pcm.ProductModel from 
ProductCenterModel pcm
where pc.ProductID=pcm.ProductID for xml path('')),1,1,'') ProductModel
from ProductCenter pc
inner join ProductCenterModel pcm on pc.ProductID=pcm.ProductID
where 1=1 ");
            if (Language != 0)
            {
                strSql.AppendFormat(" AND pc.Language = '{0}' ", Language);
            }
            QueryData exec = new QueryData();
            exec.SqlCommand = strSql.ToString();
            exec.Parameters = null;

            dbm.Execute(exec);
            if (exec.ResultData != null && exec.ResultData.Tables != null && exec.ResultData.Tables.Count > 0)
            {
                return exec.ResultData.Tables[0];
            }
            else
            {
                return null;
            }
        }
        #endregion

        #region 根据产品ID得到产品详情
        public static DataTable GetProductDetailByID(int Language, string ProductID, DBOperationManagment dbm)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@" select pcm.ProductModel,pcD.*
from ProductCenter pc
inner join ProductCenterModel pcm on pc.ProductID=pcm.ProductID
inner join ProductCenterDetail pcd on pcm.ProductModelID=pcd.ProductModelID
where 1=1 ");

            if (!string.IsNullOrEmpty(ProductID))
            {
                strSql.AppendFormat(" AND pc.ProductID = '{0}' ", ProductID);
            }
            if (Language != 0)
            {
                strSql.AppendFormat(" AND pc.Language = '{0}' ", Language);
            }
            QueryData exec = new QueryData();
            exec.SqlCommand = strSql.ToString();
            exec.Parameters = null;

            dbm.Execute(exec);
            if (exec.ResultData != null && exec.ResultData.Tables != null && exec.ResultData.Tables.Count > 0)
            {
                return exec.ResultData.Tables[0];
            }
            else
            {
                return null;
            }
        }
        #endregion

        #region 根据产品名称和型号得到产品列表
        public static DataTable GetProductModelAndName(int Language, string ProductModel,string ProductTitle, DBOperationManagment dbm)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@" select pcm.ProductModel,pcD.*,pc.ProductTitle
from ProductCenter pc
inner join ProductCenterModel pcm on pc.ProductID=pcm.ProductID
inner join ProductCenterDetail pcd on pcm.ProductModelID=pcd.ProductModelID
where 1=1 ");
            if (Language != 0)
            {
                strSql.AppendFormat(" AND pc.Language = '{0}' ", Language);
            }
            if (!string.IsNullOrEmpty(ProductModel))
            {
                strSql.AppendFormat(" AND pcm.ProductModel like '%{0}%' ", ProductModel);
            }
            if (!string.IsNullOrEmpty(ProductTitle))
            {
                strSql.AppendFormat(" AND pc.ProductTitle like '%{0}%' ", ProductTitle);
            }

            QueryData exec = new QueryData();
            exec.SqlCommand = strSql.ToString();
            exec.Parameters = null;

            dbm.Execute(exec);
            if (exec.ResultData != null && exec.ResultData.Tables != null && exec.ResultData.Tables.Count > 0)
            {
                return exec.ResultData.Tables[0];
            }
            else
            {
                return null;
            }
        }
        #endregion

        #region 得到产品详情列表
        public static DataTable GetProductDetailList(string Title, int ProductType, string startDate, string endDate, int pageNumber, int pageSize, out int pageCount, out int rowCount, DBOperationManagment dbm)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@" select pcd.*,pcm.ProductModel from ProductCenterDetail pcd
inner join ProductCenterModel pcm on pcd.ProductModelID=pcm.ProductModelID
inner join ProductCenter pc on pcm.ProductID=pc.ProductID where 1=1 ");

            if (ProductType != 0)
            {
                strSql.AppendFormat(" AND pc.ProductType = '{0}' ", ProductType);
            }
            if (!string.IsNullOrEmpty(Title))
            {
                strSql.AppendFormat(" AND pcd.Title like '%{0}%' ", Title);
            }
            if (!string.IsNullOrEmpty(startDate) && !string.IsNullOrEmpty(endDate))
            {
                strSql.AppendFormat(" AND pcd.UpdateTime between '{0} 00:00:00' and '{1} 23:59:59' ", startDate, endDate);
            }
            strSql.Append(" ORDER BY pcd.UpdateTime DESC ");

            SqlParameter[] parameters = {
                        new SqlParameter("@sql", SqlDbType.VarChar,3000) ,
                         new SqlParameter("@page", SqlDbType.Int,4) ,
                          new SqlParameter("@pageSize", SqlDbType.Int,4) ,
                           new SqlParameter("@pageCount", SqlDbType.Int,4) ,
                            new SqlParameter("@recordCount", SqlDbType.Int,4) ,
                       };

            ExecProcedure ep = new ExecProcedure();
            ep.SqlCommand = "Common_FastPageList";
            parameters[0].Value = strSql.ToString();
            parameters[1].Value = pageNumber;
            parameters[2].Value = pageSize;
            parameters[3].Direction = ParameterDirection.Output;
            parameters[4].Direction = ParameterDirection.Output;
            ep.Parameters = parameters;
            dbm.Execute(ep);
            pageCount = (int)parameters[3].Value;
            rowCount = (int)parameters[4].Value;
            if (ep.ResultData != null && ep.ResultData.Tables != null && ep.ResultData.Tables.Count > 1)
            {
                return ep.ResultData.Tables[1];
            }
            else
            {
                return null;
            }
        }
        #endregion

        #region 得到指定产品的产品型号
        public static DataTable GetProductModel(int ProductType, DBOperationManagment dbm)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"select MAX(pc.UpdateTime),pcm.ProductModelID,pcm.ProductModel from ProductCenter pc
inner join ProductCenterModel pcm on pc.ProductID=pcm.ProductID
where 1=1  ");
            if (ProductType!=0)
            {
                strSql.Append(" and pc.ProductType ="+ ProductType);
            }
            strSql.Append(" group by pcm.ProductModelID,pcm.ProductModel ");
            QueryData exec = new QueryData();
            exec.SqlCommand = strSql.ToString();
            exec.Parameters = null;

            dbm.Execute(exec);
            if (exec.ResultData != null && exec.ResultData.Tables != null && exec.ResultData.Tables.Count > 0)
            {
                return exec.ResultData.Tables[0];
            }
            else
            {
                return null;
            }
        }
        #endregion

        #region 返回产品型号列表
        public static Model.ProductCenterModel[] GetProductModel(string ProductID, DBOperation.DBOperationManagment dbm)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select * from ProductCenterModel ");
            strSql.Append(" where ProductID=@ProductID");
            SqlParameter[] parameters = {
                    new SqlParameter("@ProductID", SqlDbType.NVarChar,50)};
            parameters[0].Value = ProductID;
            QueryData exec = new QueryData();
            exec.SqlCommand = strSql.ToString();
            exec.Parameters = parameters;
            dbm.Execute(exec);
            if (exec.ResultData != null && exec.ResultData.Tables != null && exec.ResultData.Tables.Count > 0)
            {
                return DataSetToModel(exec.ResultData.Tables[0]);
            }
            else
            {
                return null;
            }
        }
        #region 返回产品型号列表方法
        public static Model.ProductCenterModel[] DataSetToModel(DataTable dt)
        {
            Model.ProductCenterModel[] models = new Model.ProductCenterModel[dt.Rows.Count];
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                models[i] = DataRowToModel(dt.Rows[i]);
            }
            return models;
        }

        public static Model.ProductCenterModel DataRowToModel(DataRow row)
        {
            if (row != null)
            {
                DataTable dt = row.Table;
                Model.ProductCenterModel model = new Model.ProductCenterModel();

                if (dt.Columns.Contains("ProductModelID") && row["ProductModelID"] != DBNull.Value)
                {
                    model.ProductModelID = row["ProductModelID"].ToString();
                }
                if (dt.Columns.Contains("ProductID") && row["ProductID"] != DBNull.Value)
                {
                    model.ProductID = row["ProductID"].ToString();
                }
                if (dt.Columns.Contains("ProductModel") && row["ProductModel"] != DBNull.Value)
                {
                    model.ProductModel = row["ProductModel"].ToString();
                }
                if (dt.Columns.Contains("CreateTime") && row["CreateTime"] != DBNull.Value && !string.IsNullOrEmpty(row["CreateTime"].ToString()))
                {
                    model.CreateTime = DateTime.Parse(row["CreateTime"].ToString());
                }
                if (dt.Columns.Contains("UpdateTime") && row["UpdateTime"] != DBNull.Value && !string.IsNullOrEmpty(row["UpdateTime"].ToString()))
                {
                    model.UpdateTime = DateTime.Parse(row["UpdateTime"].ToString());
                }
                return model;
            }
            else
            {
                return null;
            }
        }
        #endregion
        #endregion

        #region 根据产品ID删除产品型号
        public static bool Delete<T>(string ProductID)
        {
            try
            {
                // 插入到数据库中
                Type type = typeof(T);
                object obj = Activator.CreateInstance(type);
                StringBuilder strSql = new StringBuilder();
                strSql.Append("delete from [" + obj.GetType().Name + "] where ProductID=@ProductID");
                SqlParameter[] sqlParameter = {
                new SqlParameter("@ProductID",SqlDbType.NVarChar,30) {Value=ProductID }
            };
                int val = ExecutionMethod.ExecuteNonQuery(strSql.ToString(), sqlParameter);
                if (val > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                LogTool.LogWriter.WriteError("查询失败：" + ex.ToString());
            }
            return true;
        }
        #endregion
    }
}
