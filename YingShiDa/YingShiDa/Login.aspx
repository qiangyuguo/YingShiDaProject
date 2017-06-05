<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="YingShiDa.Login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title runat="server" id="titleInfo"></title>
    <link href="/Content/Skin/style_login.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../Content/bootStrap/JS/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="../Content/bootStrap/JS/layer-v2.1/layer/layer.js"></script>
    <script src="/Content/jq/jquery-ui-1.8.1.custom.min.js" type="text/javascript"></script>
    <script src="/Content/Js/jquery.validate.min.js" type="text/javascript"></script>
    <script src="Content/Js/LoginPage.js" type="text/javascript"></script>
    <script src="JS/jquery.cookie.js" type="text/javascript"></script>
    <style type="text/css">
        .logo-img {
            width: 170px;
            height: 45px;
        }

        .loginSet {
            bottom: 5%;
        }

        input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 1000px #646361 inset;
            border: none;
            color: white;
            -webkit-appearance: none; /*for chrome*/
        }

        input[type=text]:focus, input[type=password]:focus, textarea:focus, select:focus, input[type=button] {
            -webkit-box-shadow: 0 0 0 1000px #646361 inset;
            border: none;
            color: white;
            -webkit-appearance: none; /*for chrome*/
        }
    </style>
    <script type="text/javascript">
        function check() {
            var reg = /(^1\d{10}$)/;
            var account = $("#txtMobilePhone").val().replace(/(^\s*)|(\s*$)/g, ""); //清除空格
            var pwd = $("#txtPassword").val();
            var valicode = $("#txtValiteCode");
            if (account == "" || account == "请输入账号") {
                layer.alert("请输入账号", {
                    icon: 5,
                    offset: '10%'
                });
                return false;
            }
            if (pwd == "") {
                layer.alert("请输入登录密码", {
                    icon: 5,
                    offset: '10%'
                });
                return false;
            }
            if (valicode.val() == "") {
                layer.alert("请输入验证码", {
                    icon: 5,
                    offset: '10%'
                });
                return false;
            }
            return true;
        }
        $(function () {
            var realHeight = $(window).height();
            $(window).resize(function () {
                modifyBg();
                modifyLogin();
                var bodyheight = $("body").height();
                if (realHeight > bodyheight) {
                    $(".login").addClass("loginSet");
                }
                else {
                    $(".login").remove("loginSet");
                }
            });
            $(".login .ipt-t:text,.login .ipt-t:password,.login .ipt-t:button,.login select").focus(function () {
                //让当前得到焦点的文本框改变其背景色
                $(this).css({
                    "background": "#646361"
                });
            });

            $("#form1").validate();
        });
    </script>

    <script type="text/javascript">
        function changeCode() {
            document.getElementById('valiCode').src = 'ValiCode.aspx?random=i_' + encodeURI(Math.random());

        }
    </script>
</head>
<body style="overflow-x: hidden; overflow-y: hidden; width: 100%; height: 100%;">
    <img src="PlatFormTemplates//Default/bg.jpg" alt="" class="beijing" style="width: 100%; height: 100%;" />
    <form id="form1" runat="server" defaultbutton="btnLogin">
        <div class="page" id="divPage">
            <div class="inner">
                <div class="div1">
                   
                </div>
                <div class="header">
                    <div class="logo" id="PreferencesLogo">
                        <%--<h1>
                        <img style="width: 170px; height: 45px" src='<%=logoFile %>' alt="" />
                    </h1>--%>
                    </div>
                    <div class="toplink">
                        <%--<a href="#" target="_blank">帮助</a> | <a href="#" target="_blank">意见反馈</a>--%>
                    </div>
                </div>
                <div class="content">
                    <div class="main" <%-- style="background-image: url(<%=bgFile %>)"--%>>
                        <div class="login" style="top: 9%">
                            <table cellpadding="0" cellspacing="0" width="100%" <%-- style="margin-top: 10px"--%>>
                                <tr>
                                    <td>
                                        <span style="color:#2d2d2d;font-size:24px;">管理员登录</span>
                                    </td>
                                </tr>

                                <%--<tr class="login_tr" id="trBAID" runat="server">
                                    <td>
                                        <div>
                                            <asp:Image ID="Image2" runat="server" ImageUrl="/Content/Skin/skin_default/img/zhanghu.png" />
                                        </div>
                                        <asp:TextBox ID="txtBAID" runat="server" class="ipt-t" Text="请输入商圈ID" onfocus="cleartxt(this.id)" onblur="resettxt(this.id,'请输入商圈ID')"></asp:TextBox>
                                    </td>
                                </tr>--%>

                                <tr class="login_tr">
                                    <td>
                                        <div>
                                            <asp:Image ID="Image1" runat="server" ImageUrl="/Content/Skin/skin_default/img/zhanghu.png" />
                                        </div>
                                        <asp:TextBox ID="txtMobilePhone" runat="server" class="ipt-t" onfocus="cleartxt(this.id)" placeholder="用户名" Style="width: 250px"></asp:TextBox>
                                    </td>
                                </tr>

                                <%--<tr class="login_tr">
                                    <td>
                                        <div>
                                            <asp:Image ID="Image6" runat="server" ImageUrl="/Content/Skin/skin_default/img/zhanghu.png" />
                                        </div>
                                        <asp:HiddenField ID="customerHDF" runat="server" Value="0" />
                                        <asp:HiddenField ID="customerHDFs" runat="server" Value="0" />
                                        <select id="ddlCustomer" runat="server" style="width: 178px; height: 35.5px; float: left" class="ipt-t">
                                            <option value='0'>请输入账号...</option>
                                        </select>
                                        <input id="btnRefursh" name="btnRefursh" type="button" value="获取会员" class="ipt-t" onclick="GetBuiness();" style="width: 80px; height: 35.5px; cursor: pointer;" />
                                    </td>
                                </tr>--%>

                                <tr class="login_tr">
                                    <td>
                                        <div>
                                            <asp:Image ID="Image3" runat="server" ImageUrl="/Content/Skin/skin_default/img/mima.png" />
                                        </div>
                                        <asp:TextBox runat="server" ID="txtPassword" TextMode="Password" class="ipt-t ipt-t-pwd" Style="width: 250px" placeholder="密码"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <asp:TextBox ID="txtValiteCode" Width="100px" Height="20px" runat="server" class="ipt-t" Style="margin-top: 0px; margin-bottom: 10px" MaxLength="4"></asp:TextBox>
                                            <a style="margin-left: 12px; text-decoration: underline; font-size: 14px; position: absolute; margin-top: 8px; text-decoration:none;"
                                                href="javascript:changeCode()" id="btnRegister">换一换</a>
                                            <a href="javascript:changeCode()" style="position: absolute; margin-left: 88px;">
                                                <asp:Image ID="valiCode" runat="server" Width="99px" Height="30px" /></a>
                                        </div>
                                    </td>
                                </tr>

                                <tr style="height: 40px">
                                    <td>
                                        <asp:Button ID="btnLogin" runat="server" Text=" " class="btn btn-login" onmouseover="this.className+=' btn-login-hover'"
                                            onmouseout="this.className='btn btn-login'" OnClick="btnLogin_Click" OnClientClick="return check()" Style="margin-top: 0px;" />
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="create">
                            <a href="#" class="btn btn-create"></a>
                        </div>
                        <asp:HiddenField ID="hfBusinessAreaID" runat="server" />
                    </div>
                </div>
                <div class="footer">
                    <p>
                        <asp:Label ID="lblCopyRight" runat="server"></asp:Label>
                        &nbsp;
                    </p>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
