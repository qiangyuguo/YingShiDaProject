<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ServoDriverDetailAdd.aspx.cs" ValidateRequest="false" Inherits="YingShiDa.ProductCenter.ServoDriverDetailAdd" %>

<%@ Register Assembly="AspNetPager" Namespace="Wuqi.Webdiyer" TagPrefix="webdiyer" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>伺服驱动器详情新增</title>
    <%--<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../Content/bootStrap/CSS/lato-font.css" media="all" rel="stylesheet" type="text/css">
    <link type="text/css" href="../Content/jq/themes/ui-bulestart/jquery-ui-1.8.7.custom.css" rel="stylesheet" />
    <link href="../Content/bootStrap/Public/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../Content/bootStrap/Public/css/font-awesome.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/service.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/jquery.gritter.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/animate.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/style.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/datatables.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/datepicker.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/datepic ker(1).css" rel="stylesheet" />
    <link href="../Content/bootStrap/Public/css/bootstrap-datetimepicker.min.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/alertDialog_button.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/trade.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/new_mall.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/operating_statistics.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/common.css" rel="stylesheet" />
    <link type="text/css" href="../Content/jq/themes/ui-bulestart/jquery-ui-1.8.7.custom.css" rel="stylesheet" />
    <link href="../Content/umeditor1_2_2-utf8-net/themes/default/css/umeditor.css" type="text/css" rel="stylesheet" />

    <!--<![upload]-->
    <link href="../Content/Css/Upload/bootstrap.css" type="text/css" rel="stylesheet" />
    <link href="../Content/Css/Upload/fileinput.css" type="text/css" rel="stylesheet" />
    <link href="../Content/Css/Upload/fileupload.css" type="text/css" rel="stylesheet" />
    <!--<![upload]-->
    <script type="text/javascript" src="../Content/umeditor1_2_2-utf8-net/third-party/jquery.min.js"></script>
    <script type="text/javascript" charset="utf-8" src="../Content/umeditor1_2_2-utf8-net/umeditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="../Content/umeditor1_2_2-utf8-net/umeditor.min.js"></script>
    <script type="text/javascript" src="../Content/umeditor1_2_2-utf8-net/lang/zh-cn/zh-cn.js"></script>

    <script type="text/javascript" src="../Content/bootStrap/JS/jquery-1.8.3.min.js"></script>
    <!--<![endif]-->
    <script type="text/javascript" src="../Content/bootStrap/Public/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Content/bootStrap/JS/layer-v2.1/layer/layer.js"></script>
    <!--<![endif]-->
    <script type="text/javascript" src="../Content/bootStrap/JS/alertDialog.js"></script>
    <script type="text/javascript" src="../Content/bootStrap/JS/datepicker.js"></script>
    <script type="text/javascript" src="../Content/bootStrap/JS/extend-datepicker.js"></script>
    <script src="../Content/js/popup.js" type="text/javascript"></script>
    <script src="../Content/bootStrap/Public/js/bootstrap-datetimepicker.js" type="text/javascript"></script>
    <script src="../Content/bootStrap/Public/js/bootstrap-datetimepicker.zh-CN.js" type="text/javascript"></script>
    <link href="../Content/Skin/skin_default/theme.css" type="text/css" rel="stylesheet" />--%>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../Content/bootStrap/CSS/lato-font.css" media="all" rel="stylesheet" type="text/css">
    <link type="text/css" href="../Content/jq/themes/ui-bulestart/jquery-ui-1.8.7.custom.css" rel="stylesheet" />
    <link href="../Content/bootStrap/Public/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../Content/bootStrap/Public/css/font-awesome.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/service.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/jquery.gritter.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/animate.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/style.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/datatables.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/datepicker.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/datepic ker(1).css" rel="stylesheet" />
    <link href="../Content/bootStrap/Public/css/bootstrap-datetimepicker.min.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/alertDialog_button.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/trade.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/new_mall.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/operating_statistics.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/common.css" rel="stylesheet" />
    <link href="../Content/bootStrap/CSS/fileinput.css" rel="stylesheet" />
    <link type="text/css" href="../Content/jq/themes/ui-bulestart/jquery-ui-1.8.7.custom.css" rel="stylesheet" />
    <link href="../Content/umeditor1_2_2-utf8-net/themes/default/css/umeditor.css" type="text/css" rel="stylesheet" />
    <script type="text/javascript" src="../Content/umeditor1_2_2-utf8-net/third-party/jquery.min.js"></script>
    <script type="text/javascript" charset="utf-8" src="../Content/umeditor1_2_2-utf8-net/umeditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="../Content/umeditor1_2_2-utf8-net/umeditor.min.js"></script>
    <script type="text/javascript" src="../Content/umeditor1_2_2-utf8-net/lang/zh-cn/zh-cn.js"></script>

    <script type="text/javascript" src="../Content/bootStrap/JS/jquery-1.8.3.min.js"></script>
    <!--<![endif]-->
    <script type="text/javascript" src="../Content/bootStrap/Public/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Content/bootStrap/JS/layer-v2.1/layer/layer.js"></script>
    <!--<![endif]-->
    <script type="text/javascript" src="../Content/bootStrap/JS/alertDialog.js"></script>
    <script type="text/javascript" src="../Content/bootStrap/JS/datepicker.js"></script>
    <script type="text/javascript" src="../Content/bootStrap/JS/extend-datepicker.js"></script>
    <script src="../Content/js/popup.js" type="text/javascript"></script>
    <script src="../Content/bootStrap/Public/js/bootstrap-datetimepicker.js" type="text/javascript"></script>
    <script src="../Content/bootStrap/Public/js/bootstrap-datetimepicker.zh-CN.js" type="text/javascript"></script>
    <script src="../Content/bootStrap/Public/js/TimeControl.js" type="text/javascript"></script>
    <script src="../Content/bootStrap/JS/jquery.validate.js" type="text/javascript"></script>
    <link href="../Content/Skin/skin_default/theme.css" type="text/css" rel="stylesheet" />
    <script type="text/javascript">
        $(function () {
            var HomePageUploadImg, TextUploadImg = "/Photo/AddImg.png"; //默认上传图片地址

            //首页图片上传
            $('#HomePageUploadImg').click(function () {
                $("#hfAdvantage").val(um1.getContent());
                $("#hfTechnicalParameter").val(um2.getContent());
                $('#HomePageUpload').click();
            });

            //正文图片上传
            $('#TextUploadImg').click(function () {
                $('#TextUpload').click();
            });

            // 移除图片
            $("img[src='/Photo/AddImg.png']").parent().next().find("input[type='image']").remove();
        });

        function checkSave() {
            $("#hfAdvantage").val(um1.getContent());
            $("#hfTechnicalParameter").val(um2.getContent());
            var text = $.trim($("#txtTitle").val());
            if (text == "") {
                layer.alert("标题不能为空", {
                    icon: 5,
                    offset: '10%'
                });
                return false;
            }
            if (!window.confirm("确认提交信息？")) return false;
        }
        window.onresize = function () {
            getWidth();
        }
        $(document).ready(function () {
            getWidth();
        })
        function getWidth() {
            var cl10Width = $(".col-md-10").width() - 110;
            var hpWidth = $("#HomePageUploadImg").width();
            var tuWidth = $("#TextUploadImg").width();
            if (hpWidth > cl10Width) {
                $("#HomePageUploadImg").css({
                    width: cl10Width
                });
            }
            if (tuWidth > cl10Width) {
                $("#TextUploadImg").css({
                    width: cl10Width
                });
            }

            $(".edui-container").css({
                width: $(".col-md-10").width()
            });
        }
        //获取url中的参数
        function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }
        function firstForm() {
            var ProductType = getUrlParam("ProductType");
            $.PE_FrameTab.AddNew('/ProductCenter/ServoDriver.aspx?ProductType=' + ProductType, '伺服驱动器详情列表');
        }

        function showPhotoClick(obj) {
            $("#hfAdvantage").val(um1.getContent());
            $("#hfTechnicalParameter").val(um2.getContent());
            var id = obj.id;
            id = id.replace('Image1', 'FileUpload2');
            document.getElementById(id).click();
        }

        function AddRelation()
        {
            $("#hfAdvantage").val(um1.getContent());
            $("#hfTechnicalParameter").val(um2.getContent());
        }

        function DeleteRelation() {
            $("#hfAdvantage").val(um1.getContent());
            $("#hfTechnicalParameter").val(um2.getContent());
        }

        function showPhotoChange(obj) {
            var id = obj.id;
            id = id.replace('FileUpload2', 'btnUploadShowPhoto1');
            document.getElementById(id).click();
        }
    </script>
    <style type="text/css">
        .cssHide {
            display: none;
        }

        .red-xing {
            margin-left: 0px;
            float: left;
        }

        .tit_openCloseTime {
            color: Gray;
            position: absolute;
            margin: 6px 0px 0px 5px;
        }

        .HomePageUploadImg, .TextUploadImg {
            width: 100px;
            height: 100px;
            border-width: 0px;
            cursor: pointer;
            margin: 0px 0px 10px 0px;
        }

        .display {
            display: none;
        }

        .dvtCellInfo .imgAllList {
            width: auto;
            height: 100px;
            overflow: hidden;
            position: relative;
        }

        .imgAllList .itemAllI {
            width: 100px;
            height: 100px;
            position: relative;
            overflow: hidden;
            float: left;
            margin-right: 5px;
        }

        .storeImgDelBtn {
            position: absolute;
            width: 100px;
            height: 20px;
            top: -20px;
            text-align: right;
            background-color: #000000;
            opacity: 0.6;
        }

        .storeImgDelBtnShow {
            display: block;
        }

        .itemAllI input[type=image] {
            width: 10px;
            height: 10px;
            margin-right: 5px;
            margin-top: 5px;
            position: relative;
        }

        .c-item-con label {
            width: auto;
        }

        .win_dialog_Customer {
            width: 1000px;
            height: 500px;
            position: fixed;
            border: 5px solid #ccc;
            z-index: 100000;
            margin: auto 0px;
            /*display: none;*/
        }

            .win_dialog_Customer .back {
                width: 100%;
                height: 100%;
                position: absolute;
                opacity: 0.4;
                background-color: #000000;
            }

            .win_dialog_Customer .content .c-dia-con {
                height: 460px;
            }

            .win_dialog_Customer .content .c-dia-Page {
                height: 40px;
            }

            .win_dialog_Customer .win_dialog_con {
                width: 100%;
                height: 100%;
                z-index: 10002;
                position: absolute;
            }

        .win_dialog_con .c-item-container {
            width: 100%;
            margin: 0;
            height: 100%;
            border-bottom: 1px solid #ccc;
        }

        .layui-layer-btn {
            border-top: 0px solid #769ACD;
        }

        .layui-layer-lan .layui-layer-btn a {
            background: #769ACD;
        }

        .layui-layer-lan .layui-layer-title {
            background: #769ACD;
        }

        .layui-layer-lan .layui-layer-btn .layui-layer-btn1 {
            background: #769ACD;
            color: white;
        }

        .c-map-ico {
            float: left;
            margin-top: -38px;
            margin-left: 15px;
        }

        #AspNetPager1 {
            margin: 0;
        }


        .c-itemImg {
            height: auto;
        }

        .BMap_bubble_content table td {
            border: none;
        }

        ::-webkit-scrollbar {
            width: 3px;
        }
    </style>
</head>
<body>
    <div class="pace  pace-inactive">
        <div class="pace-progress" data-progress-text="100%" data-progress="99" style="width: 100%;">
            <div class="pace-progress-inner"></div>
        </div>
        <div class="pace-activity"></div>
    </div>
    <div id="wrapper">
        <div id="page-wrapper" class="gray-bg dashbard-1">
            <div id="body-content" class="clearfix">
                <div class="row wrapper border-bottom white-bg page-heading">
                    <div class="col-lg-12">
                        <ol class="breadcrumb">
                            <li><strong>产品中心</strong></li>
                            <li><strong>编辑伺服驱动器详情</strong></li>
                        </ol>
                    </div>
                </div>
                <div class="row wrapper wrapper-content animated fadeIn">
                    <div class="col-lg-12">
                        <div class="panel white-bg">
                            <div class="panel-heading" style="border-bottom: 1px solid #e5e5e5">
                                <div class="panel-options">
                                    <h6 class="modal-title"></h6>
                                </div>
                            </div>
                            <div class="panel-body">
                                <form runat="server" id="form1" class="form-horizontal" method="post" enctype="multipart/form-data" novalidate="novalidate">
                                    <div class="form-group">
                                        <label class="control-label col-md-1 ">语言</label>
                                        <span class="red-xing">*</span>
                                        <div class="col-md-10">
                                            <asp:RadioButton runat="server" ID="Chinese" GroupName="language" value="1" Checked="true" OnCheckedChanged="Chinese_CheckedChanged" AutoPostBack="true" /><em class="tit">中文</em>
                                            <asp:RadioButton ID="English" runat="server" GroupName="language" value="2" OnCheckedChanged="English_CheckedChanged" AutoPostBack="true" /><em class="tit">英文</em>
                                            <asp:RadioButton ID="Traditional" runat="server" GroupName="language" value="3" OnCheckedChanged="Traditional_CheckedChanged" AutoPostBack="true" /><em class="tit">繁体</em>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="control-label col-md-1 ">标题</label>
                                        <span class="red-xing">*</span>
                                        <div class="col-md-10">
                                            <asp:TextBox ID="txtTitle" MaxLength="30" onkeyup="value=value.replace(/[&*%$#]/g,'')" onkeypress="return keyPress()" runat="server" CssClass="form-control" />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="control-label col-md-1 ">产品型号</label>
                                        <span class="red-xing">*</span>
                                        <div class="col-md-10">
                                            <asp:DropDownList runat="server" ID="ddlProductModel" CssClass="form-control"></asp:DropDownList>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="control-label col-md-1 ">系列</label>
                                        <span class="red-xing">*</span>
                                        <div class="col-md-10">
                                            <asp:TextBox ID="txtSeries" MaxLength="30" onkeyup="value=value.replace(/[&*%$#]/g,'')" onkeypress="return keyPress()" runat="server" CssClass="form-control" />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="control-label col-md-1 ">步距角</label>
                                        <span class="red-xing">*</span>
                                        <div class="col-md-10">
                                            <asp:TextBox ID="txtClothAngle" MaxLength="30" onkeyup="value=value.replace(/[&*%$#]/g,'')" onkeypress="return keyPress()" runat="server" CssClass="form-control" />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="control-label col-md-1 ">特点和优点</label>
                                        <span class="red-xing">*</span>
                                        <div class="col-md-10">
                                            <script type="text/plain" id="txtAdvantage" placeholder="请输入100-500个字符以内" style="width: 100%; height: 180px;"></script>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="control-label col-md-1 ">技术参数</label>
                                        <span class="red-xing">*</span>
                                        <div class="col-md-10">
                                            <script type="text/plain" id="txtTechnicalParameter" placeholder="请输入100-500个字符以内" style="width: 100%; height: 180px;"></script>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="control-label col-md-1 ">创建人</label>
                                        <span class="red-xing" style="margin-left: 6.7px"></span>
                                        <div class="col-md-10">
                                            <asp:TextBox ID="txtCreatePeople" MaxLength="15" onkeyup="value=value.replace(/[&*%$#]/g,'')" onkeypress="return keyPress()" runat="server" CssClass="form-control" />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="control-label col-md-1">关联产品</label>
                                        <span class="red-xing">*</span>
                                        <div class="col-md-6">
                                            <asp:DropDownList ID="ddlProductRelation" runat="server" CssClass="form-control"></asp:DropDownList>
                                        </div>
                                        <div class="col-md-4">
                                            <asp:Button ID="btnAddProductRelation" runat="server" CssClass="stati-derived br4 stati-tool-item dc-btn" Style="width: 100px; margin-bottom: 0px; margin-left: 10px;" Text="添加关联产品" OnClick="btnAddProductRelation_Click" OnClientClick="AddRelation()" />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="control-label col-md-1">已选关联产品</label>
                                        <span class="red-xing">*</span>
                                        <div class="col-md-6">
                                            <asp:ListBox ID="lbMemberGroupID" runat="server" CssClass="form-control"></asp:ListBox>
                                        </div>
                                        <div class="col-md-4">
                                            <asp:Button ID="btnDelete" runat="server" CssClass="stati-derived br4 stati-tool-item dc-btn" Style="margin-bottom: 0px; margin-left: 10px;" Text="删除" OnClick="btnDelete_Click" OnClientClick="DeleteRelation()" />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="control-label col-md-1 ">图片列表</label>
                                        <span class="red-xing">*</span>
                                        <div class="col-md-10">
                                            <div class="file-input">
                                                <div class="file-preview">
                                                    <div class=" file-drop-zone">
                                                        <div class="file-preview-thumbnails">
                                                            <div class="file-live-thumbs">
                                                                <div class="file-preview-frame">
                                                                    <div class="kv-file-content">
                                                                        <asp:Image ID="HomePageUploadImg" runat="server" class="kv-preview-data file-preview-image" Style="width: auto; height: 160px;" ImageUrl="../Photo/AddImg.png" />
                                                                        <asp:FileUpload ID="HomePageUpload" CssClass="hidden" onchange="javascript:__doPostBack('HomePageUploadBtn','')" runat="server" />
                                                                        <asp:LinkButton Text="" runat="server" CssClass="hidden" ID="HomePageUploadBtn" OnClick="HomePageUploadBtn_Click" />
                                                                        <asp:Label Text="" CssClass="hidden" runat="server" ID="HomePageUploadFileName" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="clearfix"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="control-label col-md-1 ">附件列表</label>
                                        <span class="red-xing">*</span>
                                        <div class="col-md-10">
                                            <div class="file-input">
                                                <div class="file-preview">
                                                    <div class=" file-drop-zone">
                                                        <div class="file-preview-thumbnails">
                                                            <div class="file-live-thumbs">
                                                                <%
                                                                    if (view_action == "view")
                                                                    {
                                                                %>
                                                                <%
                                                                    foreach (string item in storeImgList)
                                                                    {
                                                                %>
                                                                <div class="file-preview-frame">
                                                                    <div class="kv-file-content">
                                                                        <img src="<%=item %>" class="" alt="">
                                                                    </div>
                                                                </div>
                                                                <%
                                                                    }
                                                                %>
                                                                <%
                                                                    }
                                                                    else
                                                                    {
                                                                %>
                                                                <asp:Repeater ID="rptShowPhotoes" runat="server" OnItemCommand="rptShowPhotoes_ItemCommand" OnItemDataBound="rptShowPhotoes_ItemDataBound">
                                                                    <ItemTemplate>

                                                                        <div class="file-preview-frame">
                                                                            <div class="kv-file-content">
                                                                                <asp:Image runat="server" ID="Image2" CssClass="kv-preview-data file-preview-image" Style="width: auto; height: 160px;" ImageUrl="../Photo/UploadFile.png" />
                                                                                <asp:Image runat="server" ID="Image1" CssClass="kv-preview-data file-preview-image" Style="width: auto; height: 160px; position: absolute; top: 0px; left: 0px; opacity: -0.5;" ImageUrl="<%# Container.DataItem %>" onclick="showPhotoClick(this);" />
                                                                                <asp:FileUpload runat="server" ID="FileUpload2" ToolTip="Show" CssClass="hidden" onchange="showPhotoChange(this);" />
                                                                                <asp:Button runat="server" ID="btnUploadShowPhoto1" Text="上传" CssClass="hidden" CommandName="Upload" />
                                                                                <asp:HiddenField ID="HiddenField1" runat="server" />
                                                                            </div>
                                                                            <div class="file-thumbnail-footer">
                                                                                <div class="file-actions">
                                                                                    <div class="file-footer-buttons">
                                                                                        <asp:ImageButton runat="server" ID="showdel" CommandName="Del" ImageUrl="../Content/images/HeigthDelete.jpg" />
                                                                                        <%--<button type="button" class="kv-file-remove btn btn-xs btn-default" title="删除文件">
                                                                                            <i class="glyphicon glyphicon-trash text-danger"></i>
                                                                                        </button>--%>
                                                                                    </div>
                                                                                    <div class="clearfix"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </ItemTemplate>
                                                                </asp:Repeater>
                                                                <%
                                                                    }
                                                                %>
                                                            </div>
                                                        </div>
                                                        <div class="clearfix"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="c-itemImg">
                                            </div>
                                        </div>
                                    </div>

                                    <%--<div class="form-group">
                                        <label class="control-label col-md-1 ">上传附件</label>
                                        <span class="red-xing">*</span>
                                        <div class="col-md-10">
                                            <input id="fileInput" runat="server" name="file" type="file" multiple="multiple" data-upload-url="#" />
                                        </div>
                                    </div>--%>

                                    <div class="form-group" style="display: none;">
                                        <label class="control-label col-md-1 ">正文图片</label>
                                        <span class="red-xing">*</span>
                                        <div class="col-md-10">
                                            <div class="file-input">
                                                <div class="file-preview">
                                                    <div class=" file-drop-zone">
                                                        <div class="file-preview-thumbnails">
                                                            <div class="file-live-thumbs">
                                                                <div class="file-preview-frame">
                                                                    <div class="kv-file-content">
                                                                        <asp:Image ID="TextUploadImg" runat="server" class="kv-preview-data file-preview-image" Style="width: auto; height: 160px;" ImageUrl="../Photo/AddImg.png" />
                                                                        <asp:FileUpload ID="TextUpload" CssClass="hidden" onchange="javascript:__doPostBack('TextUploadBtn','')" runat="server" />
                                                                        <asp:LinkButton Text="" runat="server" CssClass="hidden" ID="TextUploadBtn" OnClick="TextUploadBtn_Click" />
                                                                        <asp:Label Text="" CssClass="hidden" runat="server" ID="TextUploadFileName" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="clearfix"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="modal-footer" style="border: 0px; padding-left: 4.9%">
                                        <asp:Button ID="btnSave" runat="server" class="stati-check br4 stati-tool-item" Text="保存" OnClick="btnSave_Click" OnClientClick="return checkSave()" />
                                        <input class="stati-check br4 stati-tool-item" type="button" value="取消" onclick="return firstForm()" style="margin-left: 8px" />
                                    </div>
                                    <asp:HiddenField runat="server" ID="hfAdvantage" />
                                    <asp:HiddenField runat="server" ID="hfTechnicalParameter" />
                                </form>
                                <script type="text/javascript" src="../Content/Js/Upload/bootstrap.js"></script>
                                <script type="text/javascript" src="../Content/Js/Upload/fileinput.js"></script>
                                <script type="text/javascript" src="../Content/Js/Upload/fileinput_locale_zh.js"></script>
                                <script type="text/javascript" src="../Content/Js/Upload/respond.js"></script>
                                <script type="text/javascript">
                                    //实例化编辑器
                                    var um1 = UM.getEditor('txtAdvantage');
                                    var um2 = UM.getEditor('txtTechnicalParameter');
                                    window.UMEDITOR_HOME_URL = "/umeditor1_2_2-utf8-net/";
                                    var strData = '<%=Advantage %>';
                                    var strData1 = '<%=TechnicalParameter %>';
                                    um1.setContent(strData);
                                    um2.setContent(strData1);

                                    //#region 上传附件
                                    //ImageFileInput('fileInput');
                                    //function ImageFileInput(str) {
                                    //    $("#" + str).fileinput({
                                    //        uploadUrl: 'http://' + window.location.host + '/Action/ProductFile.ashx',
                                    //        language: 'zh', //设置语言
                                    //        allowedFileExtensions: ['xlsx'],//接收的文件后缀
                                    //        maxFileCount: 3,
                                    //        maxFileSize: 1024, //最大文件大小
                                    //        enctype: 'multipart/form-data',
                                    //        showUpload: false, //是否显示上传按钮
                                    //        showCaption: false,//是否显示标题
                                    //        browseClass: "btn btn-primary", //按钮样式             
                                    //        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
                                    //        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
                                    //        slugCallback: function (filename) {
                                    //            return filename.replace('(', '_').replace(')', '_').replace(']', '_').replace('[', '_');
                                    //        },
                                    //        uploadExtraData: function () {
                                    //            return { "Action": "AddFile" };
                                    //        }
                                    //    }).on({
                                    //        fileerror: function (event, data, msg) {
                                    //            // 错误处理
                                    //        },
                                    //        fileuploaded: function (event, data, previewId, index) {
                                    //            if (data.response) {
                                    //                alert(JSON.stringify(data));
                                    //                List.push({ FileName: data });
                                    //                alert('处理成功');
                                    //            }
                                    //        },
                                    //        filebatchselected: function (event, files) {
                                    //            //$(this).fileinput("upload");
                                    //        },
                                    //        filesuccessremove: function (event, files) {

                                    //        }
                                    //    });
                                    //}
                                    //#endregion

                                    //var List = new Array();//定义一个全局变量去接受文件名和id
                                    //$("#fileInput").fileinput({
                                    //    //uploadUrl: 'http://' + window.location.host + '/Action/ProductFile.ashx?Action=AddFile',
                                    //    language: 'zh', //设置语言
                                    //    allowedFileExtensions: ['xlsx','xls'],//接收的文件后缀
                                    //    maxFileCount: 3,
                                    //    maxFileSize: 1024, //最大文件大小
                                    //    enctype: 'multipart/form-data',
                                    //    showUpload: false, //是否显示上传按钮
                                    //    showCaption: false,//是否显示标题
                                    //    browseClass: "btn btn-primary", //按钮样式             
                                    //    previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
                                    //    msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
                                    //}).on("filebatchselected", function (event, files) {
                                    //    $(this).fileinput("upload");
                                    //    //$("#btnUploadFile").click();
                                    //}).on("fileuploaded", function (event, data) {
                                    //    if (data.response) {
                                    //        alert(2);
                                    //        //alert(JSON.stringify(data));
                                    //        //List.push({ FileName: data });
                                    //        //alert('处理成功');
                                    //    }
                                    //}).on("filesuccessremove", function (event, data) {
                                    //    if (data.response) {
                                    //        alert(1);
                                    //        //for (var i = 0; i < List.length; i++) {
                                    //        //    if (List[i] == data) {
                                    //        //        delete List[i];
                                    //        //    }
                                    //        //}
                                    //        alert('处理成功');
                                    //    }
                                    //});
                                </script>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
