<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="NoPermission.aspx.cs" Inherits="YingShiDa.NoPermission" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>系统提示</title>
</head>
<body>
    <form id="form1" runat="server">
    <%if (ErrorType == "ReLogin")
      { %>
    <span class='label label-warning'>您长时间没有操作，身份验证已经失效，请重新登录！</span>
    <%} %>
    <% else if (ErrorType == "NoPermission")
        { %>
    <span class='label label-warning'>您没有权限访问该页面！</span>
    <%} %>
    </form>
</body>
</html>
