//增加用户
function AddUser() {
    var title = "新增用户";
    $("#divAddUserList").dialog({
        type: 'get',
        title: title,
        autoOpen: false,
        cache: false,
        width: 350,
        modal: true,
        buttons: {

            '保存': function () {
                if ($("#AddUseraccount").val() == '') {
                    alert("账号不能为空!");
                    return false;
                }
                else if ($("#AddPassWord").val() == '') {
                    alert("初始密码不能为空!");
                    return false;
                }
                else {
                    var UserName = encodeURIComponent($("#AddUsername").val());
                    var Useraccount = encodeURIComponent($("#AddUseraccount").val());
                    var PassWord = encodeURIComponent($("#AddPassWord").val());
                    $.ajax({
                        url: '/Action/User.ashx',
                        data: 'Action=Add&objPassWord=' + PassWord + '&objUseraccount=' + Useraccount + '&objUsername=' + UserName,
                        type: 'get',
                        asyn: true,
                        dataType: 'html',
                        cache: false,
                        timeout: 100000,
                        error: function (value) { },
                        success: function (value) {
                            if (value == 'ParamsError') {
                                alert('参数错误!');
                                $('#divAddUserList').dialog('close');
                            }
                            else if (value == 'Failed') {
                                alert('用户添加失败!');
                                $('#divAddUserList').dialog('close');
                            }
                            else if (value == 'ExistUseraccount') {
                                alert('该账号已存在!');
                                $('#divAddUserList').dialog('close');
                            }
                            else if (value == 'OK') {
                                alert('用户添加成功!');
                                $('#divAddUserList').dialog('close');
                                location.reload(true);
                            }
                        }
                    });
                }
            },
            "取消": function () {
                $(this).dialog('close');
            }
        },
        close: function () {

        }
    });
    $("#divAddUserList").dialog('open');
    return false;
}


//增加用户
function EditUser(UserAccount, UserName, Passwd) {
    var title = "修改用户";
    document.getElementById("AddUseraccount").value = UserAccount;
    document.getElementById("AddUsername").value = UserName;
    document.getElementById("AddPassWord").disabled = "disabled";
    document.getElementById("AddUseraccount").disabled = "disabled";
    $("#divAddUserList").dialog({
        type: 'get',
        title: title,
        autoOpen: false,
        cache: false,
        width: 350,
        modal: true,
        buttons: {

            '保存': function () {
                if ($("#AddUseraccount").val() == '') {
                    alert("账号不能为空!");
                    return false;
                }
                else {
                    var UserName = encodeURIComponent($("#AddUsername").val());
                    var Useraccount = encodeURIComponent($("#AddUseraccount").val());
                    $.ajax({
                        url: '/Action/User.ashx',
                        data: 'Action=Edit&objUseraccount=' + Useraccount + '&objUsername=' + UserName,
                        type: 'get',
                        asyn: true,
                        dataType: 'html',
                        cache: false,
                        timeout: 100000,
                        error: function (value) { },
                        success: function (value) {
                            if (value == 'ParamsError') {
                                alert('参数错误!');
                                $('#divAddUserList').dialog('close');
                            }
                            else if (value == 'Failed') {
                                alert('用户添加失败!');
                                $('#divAddUserList').dialog('close');
                            }
                            else if (value == 'NoExistUserAccount') {
                                alert('用户不存在!');
                                $('#divAddUserList').dialog('close');
                            }
                            else if (value == 'OK') {
                                $('#divAddUserList').dialog('close');
                                document.getElementById("btnSearch").click();
                                alert('用户修改成功!');
                            }
                        }
                    });
                }
            },
            "取消": function () {
                $(this).dialog('close');
            }
        },
        close: function () {

        }
    });
    $("#divAddUserList").dialog('open');
    return false;
}

//*********************************************************************************************************************************************//
//删除用户

function Deleteconfirm(UserID) {
    if (confirm('确定删除吗?') == true) {
        Delete(UserID);
    }
}

function Delete(UserID) {
    $.ajax({
        url: '/User/IndexPage/Delete',
        data: 'UserID=' + UserID,
        type: 'GET',
        asyn: true,
        cache: false,
        dataType: 'html',
        timeout: 100000,
        error: function (value) { },
        success: function (value) {
            if (value != '' && value != null) {
                alert('数据删除成功!');
                location.reload(true);
            }
            else {
                alert('数据删除失败!');
            }
        }
    });
}
//*********************************************************************************************************************************************//
//禁用账户

function Editconfirm(UserID, AccountState) {
    if (AccountState == '0') {
        if (confirm('确定禁用此用户吗?') == true) {
            SetUserState(UserID, AccountState);
        }
    }
    else {
        SetUserState(UserID, AccountState);
    }
}

function SetUserState(UserID, AccountState) {
    $.ajax({
        url: '/User/IndexPage/EditAccountState',
        data: 'UserID=' + UserID + '&AccountState=' + AccountState,
        type: 'GET',
        asyn: true,
        cache: false,
        dataType: 'html',
        timeout: 100000,
        error: function (value) { },
        success: function (value) {
            location.reload(true);
        }
    });
}


//*********************************************************************************************************************************************//

//获得用户信息，以便于修改
function GetUser(UserID, UserName, Sex, Email, Mobile, Useraccount) {
    $("#UserID").val(UserID);
    $("#UserName").val(UserName);
    if (Sex == '1') {
        document.getElementById('Sexman').checked = true;
    }
    else {
        document.getElementById('Sexwoman').checked = true;
    }
    $("#Email").val(Email);
    $("#Mobile").val(Mobile);
    $("#Useraccount").val(Useraccount);
    Edit(UserID);
}

//编辑用户
function Edit(UserID) {
    $("#divUpdateUserList").dialog({
        autoOpen: false,
        width: 350,
        modal: true,
        buttons:
                 {
                     '保存': function () {
                         var objSex = document.getElementById('Sexman').checked == true ? '1' : '0';
                         var objUserName = encodeURIComponent(document.getElementById('UserName').value);
                         var objUseraccount = encodeURIComponent(document.getElementById('Useraccount').value);
                         var objEmail = encodeURIComponent(document.getElementById('Email').value);
                         var objMobile = encodeURIComponent(document.getElementById('Mobile').value);
                         var objPassWord = encodeURIComponent(document.getElementById('PassWord').value);

                         if ($("#UserName").val() == '') {
                             alert("用户名不能为空!");
                             return false;
                         }
                         else if ($("#Useraccount").val() == '') {
                             alert("账号不能为空!");
                             return false;
                         }
                         else {
                             $.ajax({
                                 url: '/User/IndexPage/Edit/',
                                 data: 'UserID=' + encodeURIComponent(UserID) + '&UserName=' + objUserName + '&Sex=' + objSex + '&Email=' + objEmail + '&objMobile=' + objMobile + '&PassWord=' + objPassWord + '&Useraccount=' + objUseraccount,
                                 type: 'GET',
                                 asyn: true,
                                 cache: false,
                                 dataType: 'html',
                                 timeout: 100000,
                                 error: function (value) { },
                                 success: function (value) {
                                     if (value != '' && value != null) {
                                         switch (value) {
                                             case "ExistUser":
                                                 alert('修改失败：用户名已存在!');
                                                 break;
                                             case "ExistUseraccount":
                                                 alert('修改失败：账号已存在!');
                                                 break;
                                             case "UserInfoIsNull":
                                                 alert('删除失败：用户未找到!');
                                                 break;
                                             case "Failed":
                                                 alert('用户信息修改失败!');
                                                 break;
                                             default:
                                                 alert('用户信息修改成功!');
                                                 $('#divUpdateUserList').dialog('close');
                                                 location.reload(true);
                                         }
                                     }
                                     else {
                                         alert('用户信息修改失败!');
                                     }
                                 }
                             });
                         }
                     },
                     "取消": function () {
                         $(this).dialog('close');
                     }
                 },
        close: function () {

        }
    });
    $("#divUpdateUserList").dialog('open');
}



//*****************************************************************************************************************************************************//
var treeGroupNodes;
function SetGroup(UserID) {
    $.ajax({
        url: '/User/IndexPage/GetGroupList',
        data: 'objUserID=' + UserID,
        type: 'POST',
        asyn: true,
        cache: false,
        dataType: 'html',
        timeout: 100000,
        error: function (value) { },
        success: function (value) {

            treeGroupNodes = eval(value);

            GetGroupTreeNodes(UserID);

            initGroupTree();

            SetCheckedGroup();
        }
    });
}

//创建部门树
function createGrouptree(d) {
    var list = '';
    $.each(d, function (i, n) {
        var cls = 'folder';
        if (n.children.length == 0)
            cls = 'file';

        list += '<li><span class="' + cls + '" ref="' + n.id + '"  pid="' + n.parentid + '" id="' + n.id + '" ><input type="checkbox" id="cheGroup" name="cheGroup" value="' + n.id + '" title="' + n.ischeck + '" /><A href="#">' + n.text + '</A></span>';
        if (n.children.length > 0) {
            list += "<ul>";
            list += createGrouptree(n.children);
            list += "</ul>"
        }

        list += "</li>";
    });
    return list;
}

//设置当前用户所属部门
function SetCheckedGroup() {
    $("input[type='checkbox']").each(function () {
        if ($(this).attr("title") == '1') {
            $(this).attr("checked", true);
        }
    });
}

//部门中复选框
function checkGroupall() {
    var Group = "";

    $("input[type='checkbox']").each(function () {
        if ($(this).attr("checked") == true) {
            Group += $(this).val() + ",";
        }
    });
    return Group;
}
//获取选中的部门名称
function getGroupNames() {
    var GroupNames = "";
    $("input[type='checkbox']").each(function () {
        if ($(this).attr("checked") == true) {
            GroupNames += $(this).parent().find('a').text() + ",";
        }
    });
    return GroupNames;
}


//初始化部门树
function initGroupTree() {
    $('#Group_product_tree').empty().append(createGrouptree(treeGroupNodes));
    $('body').data('ptree', treeGroupNodes);
    $('#Group_product_tree .file').click(function () {
        var id = $(this).attr("ref");
        var txt = $(this).text();

        $('#Group_product_tree span>a').removeClass('current');

        $(this).children('a').addClass('current');

        $('form').data("treeid", { "id": id, "txt": txt });
    });

    $('#Group_product_tree').treeview({
        animated: "fast",
        collapsed: false,
        control: "#mm1"
    });
}

//部门树弹出层
function GetGroupTreeNodes(UserID) {
    var GroupID = "";
    var Groupview = "";
    var title = "设置部门";

    //表单开始
    Groupview += "<form name='SetGroupList' id='SetGroupList' action='/User/IndexPage/SetGroup/objUserID=" + UserID + "&objGroupID=" + GroupID + "' method='POST'>";
    Groupview += "<body>";
    Groupview += "<ul id='Group_product_tree' class='filetree'></ul>";
    Groupview += "<script language='javascript' type='text/javascript'>";
    Groupview += "initGroupTree();";
    Groupview += "<\/script>";
    Groupview += "</body>";
    Groupview += "</form>";
    //表单结束

    document.getElementById("divSetGroup").innerHTML = Groupview;
    Groupview = "";
    $("#divSetGroup").dialog({
        title: title,
        autoOpen: false,
        width: 600,
        modal: true,
        buttons:
                 {
                     '保存': function () {
                         GroupID = checkGroupall();
                         GroupNames = getGroupNames();
                         $.ajax({
                             url: '/User/IndexPage/SetGroup/',
                             data: 'objUserID=' + encodeURIComponent(UserID) + '&objGroupID=' + encodeURIComponent(GroupID) + '&objGroupNames=' + encodeURIComponent(GroupNames),
                             type: 'GET',
                             asyn: true,
                             cache: false,
                             dataType: 'html',
                             timeout: 100000,
                             error: function (value) { },
                             success: function (value) {
                                 if (value != '' && value != null) {
                                     alert('部门设置成功!');
                                     $('#divSetGroup').dialog('close');
                                 }
                                 else {
                                     alert('部门设置失败!');
                                 }
                             }
                         });
                     },
                     "取消": function () {
                         $(this).dialog('close');
                     }
                 },
        close: function () {

        }
    });
    $("#divSetGroup").dialog('open');
}


//*******************************************************************************************************************************************//
//分页
$(function () {
    var i = parseInt($("#pageid").val());
    var pagecount = parseInt($(".count").attr('title'));
    $(".btp").click(function (ev) {
        switch ($(ev.target).attr('id')) {
            case 'First':
                $("#pageid").val(1);
                break
            case 'Previous':
                $("#pageid").val((i - 1) > 1 ? (i - 1) : 1);
                break
            case 'Next':
                $("#pageid").val((i + 1) > pagecount ? pagecount : (i + 1));
                break
            case 'Last':
                $("#pageid").val(pagecount);
                break
            default:
                alert("分页异常，请刷新后重试！");
        }
        $('form:first').submit();
    });
    $("#pageid").keydown(function (ev) {
        if (ev.keyCode == 13) {
            if (parseInt($("#pageid").val()) > 0 && parseInt($("#pageid").val()) <= pagecount) {
                $('form:first').submit();
            }
        }
    });
    $("input[name='btnsubmit']").click(function () {
        $("#pageid").val("1");
        $('form:first').submit();
    });
});