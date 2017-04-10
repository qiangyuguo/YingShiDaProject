<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EnterpriseHonorAdd.aspx.cs" ValidateRequest="false" Inherits="YingShiDa.AboutUs.EnterpriseHonorAdd" %>

<%@ Register Assembly="AspNetPager" Namespace="Wuqi.Webdiyer" TagPrefix="webdiyer" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>企业荣誉新增</title>
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
    <link href="../Content/Skin/skin_default/theme.css" type="text/css" rel="stylesheet" />

    <script type="text/javascript">
        function firstForm() {
            $.PE_FrameTab.AddNew('/AboutUs/EnterpriseHonor.aspx', '企业荣誉列表');
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

        .HomePageUploadImg,.TextUploadImg {
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
                            <li><strong>企业荣誉</strong></li>
                            <li><strong>编辑企业荣誉</strong></li>
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
                                            <asp:RadioButton runat="server" ID="Chinese" GroupName="language" value="1" Checked="true" /><em class="tit">中文</em>
                                            <asp:RadioButton ID="English" runat="server" GroupName="language" value="2" /><em class="tit">英文</em>
                                            <asp:RadioButton ID="Traditional" runat="server" GroupName="language" value="3"/><em class="tit">繁体</em>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="control-label col-md-1 ">标题</label>
                                        <span class="red-xing">*</span>
                                        <div class="col-md-10">
                                            <asp:TextBox ID="txtTitle" MaxLength="15" onkeyup="value=value.replace(/[&*%$#]/g,'')" onkeypress="return keyPress()" runat="server" CssClass="form-control" />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="control-label col-md-1 ">正文内容</label>
                                        <span class="red-xing">*</span>
                                        <div class="col-md-10">
                                            <script type="text/plain" id="myEditor" placeholder="请输入100-500个字符以内" style="width: 100%; height: 180px;"></script>
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
                                        <label class="control-label col-md-1 ">首页图片</label>
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

                                    <div class="form-group" style="display:none;">
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
                                </form>
                                <script type="text/javascript">
                                    //实例化编辑器
                                    var um = UM.getEditor('myEditor');
                                    window.UMEDITOR_HOME_URL = "/umeditor1_2_2-utf8-net/";
                                    var strData = '<%=XiangQing %>';
                                    UM.getEditor('myEditor').setContent(strData);
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
