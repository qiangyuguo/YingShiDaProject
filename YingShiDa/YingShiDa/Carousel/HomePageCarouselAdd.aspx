<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="HomePageCarouselAdd.aspx.cs" ValidateRequest="false" Inherits="YingShiDa.Carousel.HomePageCarouselAdd" %>

<%@ Register Assembly="AspNetPager" Namespace="Wuqi.Webdiyer" TagPrefix="webdiyer" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>首页轮播图添加</title>
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
    <script src="../Scripts/Calendar3.js" type="text/javascript"></script>
    <script src="../Content/bootStrap/Public/js/bootstrap-datetimepicker.js" type="text/javascript"></script>
    <script src="../Content/bootStrap/Public/js/bootstrap-datetimepicker.zh-CN.js" type="text/javascript"></script>
    <script src="../Content/bootStrap/Public/js/TimeControl.js" type="text/javascript"></script>
    <script src="../Content/bootStrap/JS/jquery.validate.js" type="text/javascript"></script>
    <link href="../Content/Skin/skin_default/theme.css" type="text/css" rel="stylesheet" />
    <script type="text/javascript">
        function checkSave() {
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
        function firstForm() {
            $.PE_FrameTab.AddNew('/Carousel/HomePageCarousel.aspx', '首页轮播图片');
        }

        function showPhotoClick(obj) {
            var id = obj.id;
            id = id.replace('Image1', 'FileUpload2');
            document.getElementById(id).click();
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
                            <li><strong>首页轮播图片</strong></li>
                            <li><strong>首页轮播图片添加</strong></li>
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
                                        <label class="control-label col-md-1 ">标题</label>
                                        <span class="red-xing">*</span>
                                        <div class="col-md-10">
                                            <asp:TextBox ID="txtTitle" MaxLength="30" onkeyup="value=value.replace(/[&*%$#]/g,'')" onkeypress="return keyPress()" runat="server" CssClass="form-control" />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="control-label col-md-1 ">创建人</label>
                                        <span class="red-xing" style="margin-left: 6.7px"></span>
                                        <div class="col-md-10">
                                            <asp:TextBox ID="txtCreatePeople" MaxLength="30" onkeyup="value=value.replace(/[&*%$#]/g,'')" onkeypress="return keyPress()" runat="server" CssClass="form-control" />
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
                                                                <asp:Repeater ID="rptShowPhotoes" runat="server" OnItemCommand="rptShowPhotoes_ItemCommand" OnItemDataBound="rptShowPhotoes_ItemDataBound">
                                                                    <ItemTemplate>

                                                                        <div class="file-preview-frame">
                                                                            <div class="kv-file-content">
                                                                                <asp:Image runat="server" ID="Image1" CssClass="kv-preview-data file-preview-image" Style="width: auto; height: 160px;" ImageUrl="<%# Container.DataItem %>" onclick="showPhotoClick(this);" />
                                                                                <asp:FileUpload runat="server" ID="FileUpload2" ToolTip="Show" CssClass="hidden" onchange="showPhotoChange(this);" />
                                                                                <asp:Button runat="server" ID="btnUploadShowPhoto1" Text="上传" CssClass="hidden" CommandName="Upload" />
                                                                                <asp:HiddenField ID="HiddenField1" runat="server" />
                                                                            </div>
                                                                            <div class="file-thumbnail-footer">
                                                                                <div class="file-actions">
                                                                                    <div class="file-footer-buttons">
                                                                                        <asp:ImageButton runat="server" ID="showdel" CommandName="Del" ImageUrl="../Content/images/HeigthDelete.jpg" />
                                                                                    </div>
                                                                                    <div class="clearfix"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </ItemTemplate>
                                                                </asp:Repeater>
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

                                    <div class="modal-footer" style="border: 0px; padding-left: 4.9%">
                                        <asp:Button ID="btnSave" runat="server" class="stati-check br4 stati-tool-item" Text="保存" OnClick="btnSave_Click" OnClientClick="return checkSave()" />
                                        <input class="stati-check br4 stati-tool-item" type="button" value="取消" onclick="return firstForm()" style="margin-left: 8px" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
