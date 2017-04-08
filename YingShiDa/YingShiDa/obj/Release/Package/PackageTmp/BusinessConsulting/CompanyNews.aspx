<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CompanyNews.aspx.cs" Inherits="YingShiDa.BusinessConsulting.CompanyNews" %>

<%@ Register Assembly="AspNetPager" Namespace="Wuqi.Webdiyer" TagPrefix="webdiyer" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>公司新闻</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../Content/bootStrap/CSS/../Content/bootStrap/CSS/lato-font.css" media="all" rel="stylesheet" />
    <link href="../Content/bootStrap/Public/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../Content/bootStrap/Public/css/font-awesome.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/service.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/jquery.gritter.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/animate.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/style.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="../Content/bootStrap/CSS/datatables.css">
    <link rel="stylesheet" type="text/css" href="../Content/bootStrap/CSS/datepicker.css">
    <link href="../Content/bootStrap/CSS/datepicker(1).css" rel="stylesheet" />
    <link href="../Content/bootStrap/Public/css/bootstrap-datetimepicker.min.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/alertDialog_button.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/trade.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/layer.css" rel="stylesheet" />
    <script type="text/javascript" src="../Content/bootStrap/JS/jquery-1.8.3.min.js"></script>
    <!--<![endif]-->
    <script type="text/javascript" src="../Content/bootStrap/Public/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Content/bootStrap/JS/layer-v2.1/layer/layer.js"></script>
    <!--<![endif]-->
    <script type="text/javascript" src="../Content/bootStrap/JS/alertDialog.js"></script>
    <script type="text/javascript" src="../Content/bootStrap/JS/datepicker.js"></script>
    <script type="text/javascript" src="../Content/bootStrap/JS/extend-datepicker.js"></script>
    <script src="../Content/js/popup.js" type="text/javascript"></script>
    <script src="../Scripts/Calendar3.js" type="text/javascript"></script>
    <script src="../Content/bootStrap/Public/js/bootstrap-datetimepicker.js" type="text/javascript"></script>
    <script src="../Content/bootStrap/Public/js/bootstrap-datetimepicker.zh-CN.js" type="text/javascript"></script>
    <script src="../Content/bootStrap/Public/js/TimeControl.js" type="text/javascript"></script>
    <link href="../Content/bootStrap/CSS/common.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/operating_statistics.css" rel="stylesheet" />
    <script type="text/javascript">
        $(document).ready(function () {
            TimeControl(txtPurchaseStart, txtPurchaseEnd);
        });
        function check() {
            if (!ComParisonTime("#txtPurchaseStart", "#txtPurchaseEnd")) {
                return false;
            }
            var txtPurchaseStart = $.trim($("#txtPurchaseStart").val());
            var txtPurchaseEnd = $.trim($("#txtPurchaseEnd").val());
            if (txtPurchaseStart != "" && txtPurchaseEnd != "") {
                var day = Math.floor((new Date(txtPurchaseEnd.replace(/-/g, "/")).getTime() - new Date(txtPurchaseStart.replace(/-/g, "/")).getTime()) / (24 * 3600 * 1000));
                if (day > 30) {
                    layer.msg("只允许查询31天内的数据", {
                        time: 2000,
                        icon: 5,
                        offset: '20%'
                    });
                    return false;
                }
            }
            var timeStart = new Date($("#txtPurchaseStart").val()).format("yyyy-MM-dd");
            var timeTo = new Date($("#txtPurchaseEnd").val()).format("yyyy-MM-dd");
            if (timeStart > timeTo) {
                layer.msg("开始时间不能大于结束时间", {
                    time: 2000,
                    icon: 5,
                    offset: '20%'
                });
                return false;
            }
            document.getElementById('btnSearch').style.display = "none";
            document.getElementById('loadingImage').style.display = "";
            return true;
        }

        function Edit(ID) {
            $.PE_FrameTab.AddNew('/BusinessConsulting/CompanyNewsAdd.aspx?action=notify&ID=' + ID, "修改");
        }

        function Add() {
            $.PE_FrameTab.AddNew('/BusinessConsulting/CompanyNewsAdd.aspx', '添加');
        }
    </script>
    <style type="text/css">
        .fancybox-margin {
            margin-right: 0px;
        }

        .stati-time input {
            background: none;
            cursor: default;
        }

        .col-md-1 {
            width: 9.5%;
        }

        .stati-time label {
            width: 60px;
        }
        /* Begin */
        .stati-tool-item {
            margin: 0 0 10px 0;
        }

        .table > thead > tr > th {
            font-family: "微软雅黑","Microsoft Yahei";
            font-size: 16px;
            font-weight: bold;
        }

        .stati-check, .br4, .stati-tool-item {
            border-radius: 2px !important;
        }
        /* End */
    </style>


</head>
<body class="pace-done">
    <form id="form" runat="server">
        <div id="wrapper">
            <div id="page-wrapper" class="gray-bg dashbard-1">
                <div id="body-content" class="clearfix">
                    <div class="row wrapper border-bottom white-bg page-heading">
                        <div class="col-lg-12">
                            <ol class="breadcrumb">
                                <li><strong>企业咨询</strong></li>
                                <li><strong>公司新闻</strong></li>
                            </ol>
                        </div>
                    </div>
                    <div class="statistics trade">
                        <ul class="nav nav-tabs">
                            <li class="active"><a href="#jilu1" data-toggle="tab">公司新闻</a></li>
                        </ul>
                        <div class="stati-content tab-pane active" id="jilu1">
                            <div class="stati-tool clearfix">
                                <div class="stati-time">
                                    <asp:TextBox ID="txtTitle" type="text" placeholder="标题" runat="server" class="stati-maker stati-tool-item br4" value=""></asp:TextBox>
                                </div>
                                <div class="stati-time">
                                    <label class="com-label">更新时间</label>
                                    <input runat="server" id="txtPurchaseStart" type="text" class="stati-maker stati-tool-item br4 date" readonly="readonly" />
                                    <span class="tip">至</span>
                                    <input runat="server" id="txtPurchaseEnd" type="text" class="stati-maker stati-tool-item br4 date" readonly="readonly" />
                                </div>
                                <asp:Button ID="btnSearch" runat="server" class="stati-check br4 stati-tool-item" Text="查询" OnClick="btnSearch_Click" Style="margin-right: 30px;" OnClientClick="return check();" />
                                <asp:Image ID="loadingImage" runat="server" ImageUrl="../Content/images/ajax-loader.gif" Style="width: 25px; height: 25px; display: none" />
                            </div>
                            <div class="stati-content">
                                <button class="stati-check br4 stati-tool-item" onclick="return Add()" style="width: 90px;">
                                    <i class="glyphicon glyphicon-plus"></i>
                                    新建
                                </button>
                            </div>
                            <div class="table-two">
                                <div class="table-container">
                                    <table class="table table-bordered table-hover">
                                        <tbody>
                                            <asp:Repeater ID="rptChannel" runat="server" OnItemCommand="rptSpec_ItemCommand">
                                                <HeaderTemplate>
                                                    <thead>
                                                        <tr>
                                                            <th style="min-width: 80px; width: auto">序号</th>
                                                            <th style="min-width: 80px; width: auto">标题</th>
                                                            <th style="min-width: 80px; width: auto">创建公司</th>
                                                            <th style="min-width: 80px; width: auto">正文</th>
                                                            <th style="min-width: 80px; width: auto">更新时间</th>
                                                            <th style="min-width: 80px; width: auto">操作</th>
                                                        </tr>
                                                    </thead>
                                                </HeaderTemplate>
                                                <ItemTemplate>
                                                    <tr>
                                                        <td>
                                                            <asp:Literal ID="Literal7" runat="server" Text='<%#Eval("ID")%>'></asp:Literal>&nbsp;
                                                        </td>
                                                        <td>
                                                            <asp:Literal ID="Literal1" runat="server" Text='<%#Eval("Title")%>'></asp:Literal>&nbsp;
                                                        </td>
                                                        <td>
                                                            <asp:Literal ID="Literal3" runat="server" Text='<%#Eval("CreateCompany")%>'></asp:Literal>&nbsp;
                                                        </td>
                                                        <td>
                                                            <asp:Literal ID="Literal2" runat="server" Text='<%#Eval("Content")%>'></asp:Literal>&nbsp;
                                                        </td>
                                                        <td>
                                                            <asp:Literal ID="Literal6" runat="server" Text='<%#String.Format("{0:yyyy-MM-dd HH:mm:ss}",Eval("UpdateTime"))%>'></asp:Literal>&nbsp;
                                                        </td>
                                                        <td>
                                                            <asp:LinkButton Text="删除" ID="btnDelete" runat="server" class="color-light-blue" OnClientClick="javascript:return confirm('确定删除?');" CommandName="Delete" CommandArgument='<%#Eval("ID")%>' />
                                                            <asp:LinkButton Text="修改" ID="btnEdit" runat="server" class="color-light-blue" OnClientClick='<%#"return Edit(\""+ Eval("ID") +"\")"%>' />
                                                        </td>
                                                    </tr>
                                                </ItemTemplate>
                                            </asp:Repeater>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div>
                                <webdiyer:AspNetPager ID="AspNetPager2" runat="server" HorizontalAlign="Right" PagingButtonType="Image"
                                    ImagePath="/Images/NetPager/" ButtonImageNameExtension="n" ButtonImageExtension=".gif"
                                    DisabledButtonImageNameExtension="g" CpiButtonImageNameExtension="r" ShowDisabledButtons="false"
                                    EnableUrlRewriting="false" ShowFirstLast="false" PagingButtonSpacing="10px" ButtonImageAlign="left"
                                    ShowPageIndexBox="Never" PageSize="15" ShowCustomInfoSection="Left" OnPageChanged="AspNetPager2_PageChanged">
                                </webdiyer:AspNetPager>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
