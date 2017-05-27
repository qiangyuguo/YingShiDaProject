<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Main.aspx.cs" Inherits="YingShiDa.Main" %>

<%@ Import Namespace="System.Collections.Generic" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">
<head>
    <title runat="server" id="titleInfo">英士达后台管理系统</title>
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="Content/bootStrap/Public/css/bootstrap.min.css" rel="stylesheet" />
    <link href="Content/Css/newmain.css" rel="stylesheet" />
</head>
<body class="skin-main">
    <form id="form2" runat="server">
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation" id="topNavigation">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="javascript:void(0)"></a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav navbar-right newcss">
                        <li style="display: none;">
                            <asp:LinkButton runat="server" ID="SC" OnClick="SC_Click">简体中文&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:LinkButton></li>
                        <li style="display: none;">
                            <asp:LinkButton runat="server" ID="TC" OnClick="TC_Click">繁体中文&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:LinkButton></li>
                        <li style="display: none;">
                            <asp:LinkButton runat="server" ID="EN" OnClick="EN_Click">英文&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:LinkButton></li>
                        <li><a href="javascript:void(0)"><%Model.SysUser userinfo = (Model.SysUser)Session["UserInfo"];%><%=userinfo.UserName%>  欢迎您</a></li>
                        <%--<li><a href="javascript:void(0)" onclick="javascript: $.PE_FrameTab.AddNew('SystemManage/UserEdit.aspx','修改密码')">修改密码</a></li>
                        <li>
                            <asp:LinkButton ID="lbtnLogout" runat="server" OnClick="lbtnLogout_Click" CssClass="newa30">退出</asp:LinkButton></li>--%>
                    </ul>
                </div>
            </div>
        </nav>
        <nav class="navbar-default navbar-static-side">
            <ul class="nav nav-sidebar" id="menuNavigation">
                <% 
                    List<Common.WebSite.Menu> topMenus = MenuList.FindAll(
                        delegate (Common.WebSite.Menu x)
                        {
                            return x.ParentKey == "";
                        });
                    int i = 0;
                    foreach (Common.WebSite.Menu menu in topMenus)
                    {
                %>

                <%if (i == 0)
                    { %>
                <li class="active" data-level="one">
                    <a href="javascript:void(0)" class="Aactive" data-name="<%=menu.Name%>" data-url="<%=menu.Value %>"><%=menu.Name %></a>
                    <ul class="nav nav-second-level collapse in">

                        <%
                                i++;
                            }
                            else
                            { %>
                        <li data-level="one">
                            <a href="javascript:void(0)"><%=menu.Name %></a>
                            <ul class="nav nav-second-level collapse">

                                <%} %>

                                <%
                                    System.Collections.Generic.List<Common.WebSite.Menu> subMenuList = MenuList.FindAll(delegate (Common.WebSite.Menu x) { return x.ParentKey == menu.Key; });

                                    foreach (Common.WebSite.Menu subMenu in subMenuList)
                                    {
                                %>
                                <li class="son" data-level="two">
                                    <a href="javascript:void(0)" data-name="<%=subMenu.Name%>" data-url="<%=subMenu.Value %>">
                                        <div class="sonaico"></div>
                                        <%=subMenu.Name%>
                                    </a>
                                </li>
                                <%} %>
                            </ul>
                        </li>
                        <%
                            }
                        %>
                    </ul>
        </nav>
        <div id="wrapper">
            <div id="page-wrapper" class="gray-bg dashbard-1">
                <div id="main_right_frame"></div>
            </div>
        </div>
        <div style="text-align: center; line-height: 25px; padding-left: 200px; background: #ededed;">
            <asp:Label ID="lblCopyRight" runat="server" Text=""></asp:Label>
        </div>
        <asp:HiddenField ID="hfBusinessAreaID" runat="server" />
        <%--<div id='MicrosoftTranslatorWidget' class='Dark' style='color:white;background-color:#555555'></div>
    <script type='text/javascript'>setTimeout(function () { { var s = document.createElement('script'); s.type = 'text/javascript'; s.charset = 'UTF-8'; s.src = ((location && location.href && location.href.indexOf('https') == 0) ? 'https://ssl.microsofttranslator.com' : 'http://www.microsofttranslator.com') + '/ajax/v3/WidgetV3.ashx?siteData=ueOIGRSKkd965FeEGM5JtQ**&ctf=True&ui=true&settings=Manual&from='; var p = document.getElementsByTagName('head')[0] || document.documentElement; p.insertBefore(s, p.firstChild); } }, 0);</script>--%>
    </form>
    <script type="text/javascript" src="Content/bootStrap/JS/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="Content/bootStrap/Public/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="Content/Js/main.js"></script>
    <script src="/Content/jq/jquery.treeview.min.js" type="text/javascript"></script>
    <script src="/Content/Js/FrameTab.js" type="text/javascript"></script>
</body>
</html>
