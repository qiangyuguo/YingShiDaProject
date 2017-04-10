//创建角色树
function createtree(d) {
    var list = '';
    $.each(d, function (i, n) {
        var cls = 'folder';
        if (n.children.length == 0)
            cls = 'file';

        list += '<li><span class="' + cls + '" ref="' + n.id + '"  pid="' + n.parentid + '" id="' + n.id + '" ><A href="#">' + n.text + '</A></span>';
        if (n.children.length > 0) {
            list += "<ul>";
            list += createtree(n.children);
            list += "</ul>"
        }
        list += "</li>";
    });
    return list;
}

//初始化角色树
function initTree(treeNodes) {
    $('#product_tree').empty().append(createtree(treeNodes));
    $('body').data('ptree', treeNodes);
    $('#product_tree .file').click(function () {
        var id = $(this).attr("ref");
        var txt = $(this).text();

        $('#product_tree span>a').removeClass('current');

        $(this).children('a').addClass('current');

        $('form').data("treeid", { "id": id, "txt": txt });
    });


    $('#product_tree span').contextMenu('myMenu', {
        bindings: {
            'add': function (t) {
                var id = $(t).attr('id');
                var pid = $(t).attr('pid');
                var txt = $(t).children('a').text();
                AddRole(id);
            },
            'edit': function (t) {
                var id = $(t).attr('id');
                var pid = $(t).attr('pid');
                var txt = $(t).children('a').text();
                GetRole(id, pid, txt);
            },
            'delete': function (t) {
                var id = $(t).attr('id');
                var pid = $(t).attr('pid');
                var txt = $(t).children('a').text();
                DelelteRole(id, pid);
            },
            'setuser': function (t) {
                var id = $(t).attr('id');
                var pid = $(t).attr('pid');
                var txt = $(t).children('a').text();
                GetUser(id, 1);
                UsersID = "";
            },
            'setprofile': function (t) {
                var id = $(t).attr('id');
                var pid = $(t).attr('pid');
                var txt = $(t).children('a').text();
                GetProfile(id, 1);
                ProfilesID = "";
            }
        }
    });

    $('#product_tree').treeview({
        animated: "fast",
        collapsed: false,
        control: "#mm1"
    });
}



//添加角色
function AddRole(RoleID) {
    var title = "新增角色";
    $("#divAddRoleList").dialog({
        type: 'get',
        title: title,
        autoOpen: false,
        width: 350,
        modal: true,
        buttons: {
            '保存': function () {
                if ($("#txtRoleName").val() == '') {
                    alert("角色名称不能为空");
                    return false;
                }
                else {
                    $.ajax({
                        url: '/Role/IndexPage/Create/',
                        data: 'objRoleName=' + encodeURIComponent(document.getElementById('txtRoleName').value) + '&objRoleID=' + encodeURIComponent(RoleID),
                        type: 'get',
                        asyn: true,
                        cache:false,
                        dataType: 'html',
                        timeout: 100000,
                        error: function (value) { },
                        success: function (value) {
                            if (value != null && value != '') {
                                switch (value) {
                                    case "ExistRole":
                                        alert('角色添加失败:角色名已存在!');
                                        $('#divAddRoleList').dialog('close');
                                    case "RoleNameIsNull":
                                        alert('角色添加失败：角色名为空!');
                                        $('#divAddRoleList').dialog('close');
                                    case "Failed":
                                        alert('角色添加失败：未找到该角色!');
                                        $('#divAddRoleList').dialog('close');
                                    default:
                                        alert('角色添加成功!');
                                        $('#divAddRoleList').dialog('close');
                                        treeNodes = eval(value);
                                        initTree(treeNodes);
                                        break;
                                }
                            }
                            else {
                                alert('角色添加失败!');
                                $('#divAddRoleList').dialog('close');
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
    $("#divAddRoleList").dialog('open');
    return false;
}

//删除角色提示
function DelelteRole(RoleId, ParentId) {
    if (confirm('确定删除吗?') == true) {
        asynDelete(RoleId, ParentId);
    }
}

//真正删除角色操作
function asynDelete(RoleId, ParentId) {
    $.ajax({
        url: '/Role/IndexPage/Delete',
        data: 'objRoleId=' + encodeURIComponent(RoleId) + '&objParentId=' + encodeURIComponent(ParentId),
        type: 'GET',
        asyn: true,
        dataType: 'html',
        timeout: 100000,
        error: function (value) { },
        success: function (value) {
            if (value != '' && value != null) {
                switch (value) {
                    case "Failed":
                        alert('角色删除失败!');
                        break;
                    case "RoleNameIsNull":
                        alert('删除失败：角色名未找到!');
                        break;
                    case "ExistChild":
                        alert('删除失败：该角色包含子节点，不能删除!');
                        break;
                    default:
                        alert('角色删除成功!');
                        treeNodes = eval(value);
                        initTree(treeNodes);
                        break;
                }
            }
            else {
                alert('角色删除失败!');
            }
        }
    });
}

//获得角色名称，并放入文本框,以便于修改
function GetRole(RoleId, ParentId, RoleName) {
    $.ajax({
        url: '/Role/IndexPage/Edit' + RoleName,
        data: 'objRoleId=' + encodeURIComponent(RoleId) + '&objParentId=' + encodeURIComponent(ParentId) + '&objRoleName=' + encodeURIComponent(RoleName),
        type: 'GET',
        asyn: true,
        dataType: 'html',
        timeout: 100000,
        error: function (value) { },
        success: function (value) {
            $("#txtReRoleName").val(RoleName);
            Edit(RoleId, ParentId, RoleName);
        }
    });
}

//修改角色
function Edit(RoleId, ParentId, RoleName) {
    $("#divUpdateRoleList").dialog({
        autoOpen: false,
        width: 350,
        modal: true,
        buttons:
                 {
                     '保存': function () {
                         if ($("#txtReRoleName").val() == '') {
                             alert("角色名称不能为空!");
                             return false;
                         }
                         else ($("#txtReRoleName").val() != '')
                         {
                             $.ajax({
                                 url: '/Role/IndexPage/Edit/',
                                 data: 'objRoleId=' + encodeURIComponent(RoleId) + '&objParentId=' + encodeURIComponent(ParentId) + '&objRoleName=' + encodeURIComponent(document.getElementById('txtReRoleName').value),
                                 type: 'GET',
                                 asyn: true,
                                 cache:false,
                                 dataType: 'html',
                                 timeout: 100000,
                                 error: function (value) { },
                                 success: function (value) {
                                     if (value != '' && value != null) {
                                         switch (value) {
                                             case "ExistRole":
                                                 alert('修改失败：角色名已存在!');
                                                 break;
                                             case "RoleNameIsNull":
                                                 alert('删除失败：角色名未找到!');
                                                 break;
                                             case "Failed":
                                                 alert('角色修改失败!');
                                                 break;
                                             default:
                                                 alert('角色修改成功!');
                                                 treeNodes = eval(value);
                                                 initTree(treeNodes);
                                                 $('#divUpdateRoleList').dialog('close');
                                         }
                                     }
                                     else {
                                         alert('角色修改失败!');
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
    $("#divUpdateRoleList").dialog('open');
}

//取得所有权限列表，以便于设置权限
function GetProfile(RoleId, PageIndex) {
    $.ajax({
        url: '/Role/IndexPage/GetProfileList',
        data: 'objRoleId=' + encodeURIComponent(RoleId) + '&objPageId=' + encodeURIComponent(PageIndex),
        type: 'Post',
        asyn: true,
        dataType: 'html',
        timeout: 100000,
        error: function (value) { },
        success: function (value) 
        {
            SetProfileDetails(value, RoleId, PageIndex);
            ProfilePageBind(RoleId, PageIndex);
            remmeberProfileID();
            SetProfileChecked();
        }
    });
}

//权限弹出层分页控件绑定
function ProfilePageBind(roleId, pageIndex) {
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
        remmeberProfileID();
        GetProfile(roleId, $("#pageid").val());
    });
    $("#pageid").keydown(function (ev) {
        if (ev.keyCode == 13) {
            if (parseInt($("#pageid").val()) > 0 && parseInt($("#pageid").val()) <= pagecount) {
                remmeberProfileID();
                GetProfile(roleId, $("#pageid").val());
            }
        }
    });
    $("input[name='btnsubmit']").click(function () {
        $("#pageid").val("1");
        remmeberProfileID();
        GetProfile(roleId, $("#pageid").val());
    });
}

//真正取得权限列表，并将点击的角色下的权限勾选住
function SetProfileDetails($profileList, RoleId, PageIndex) {
    var profileview = "";
    var title = "设置权限";

    //表单开始
    profileview += "<form name='SetProfile' id='SetProfile' action='/Role/IndexPage/GetProfileList?objRoleId=" + RoleId + "&objPageId=" + PageIndex + "' method='POST'>";
    profileview += "<style type='text/css'>.user{white-space: nowrap;}.Userstyle{width: 3em; margin-right: 0.7em;}.Userpage{padding: 5px;}";
    profileview += "</style>";
    profileview += "<table width='100%' cellspacing='0' cellpadding='5' border='0' class='small'>";
    profileview += "<tr ><td  class='dvtCellInfo' colspan='5'></td>";
    profileview += "</tr>";
    profileview += "<tr>";
    profileview += "<td class='dvtCellInfo' align='center' colspan='4'><b>权限名：</b><input type='text' id='txtProfileName' name='txtProfileName'></input>&nbsp;";
    profileview += "<input type='button' id='btnProfileSelect' name='btnProfileSelect' class='crmbutton  edit' value='查询'></input></td>";
    profileview += "</tr>";
    profileview += "<tr>";
    profileview += "<td class='dvtCellInfo' align='center'><input type='checkbox' id='chkProfile' name='chkProfile' onclick='CheckAllProfile()'>全选</input></td>";
    profileview += "<td class='dvtCellInfo' align='center'><b>权限编号</b></td>";
    profileview += "<td class='dvtCellInfo' align='center'><b>权限组名</b></td>";
    profileview += "<td class='dvtCellInfo' align='center'><b>权限组描述</b></td>";
    profileview += "</tr>";

    var jobj = eval($profileList);
    //数据开始
    for (var index = 0; index < jQuery(jobj)[0].AllProfile.length; index++) 
    {
        profileview += "<tr>";
        profileview += "<td class='dvtCellInfo' align='center'><input type='checkbox' id='chkProfileList'";         

        if (jQuery(jobj)[0].AllProfile[index].IsCheck == '1')        //IsCheck等于1的用户是属于当前角色的权限
        { 
            profileview += " checked='true' ";
        }
        profileview += "name='chkProfileList' value='" + jQuery(jobj)[0].AllProfile[index].ProfileID + "' onclick='CheckOrUnCheckProfile()'></input></td>";
        profileview += "<td class='dvtCellInfo' align='center'>" + jQuery(jobj)[0].AllProfile[index].ProfileID + "</td>";
        profileview += "<td class='dvtCellInfo' align='center'>" + jQuery(jobj)[0].AllProfile[index].Name + "</td>";
        profileview += "<td class='dvtCellInfo' align='center'>" + jQuery(jobj)[0].AllProfile[index].Description + "</td>";
        profileview += "</tr>";
    }

    profileview += "</table>";      

    var newPagination = jQuery(jobj)[0].Pagination[0].Page;
    newPagination = newPagination.replace(/\"/ig, "\'");       //用正则表达式将HTML中双引号替换成单引号

    //分页开始
    profileview += "<table width='100%' border='0' cellspacing='0' cellpadding='2'>";
    profileview += "<tbody>";
    profileview += "<tr>";
    profileview += "<td width='100%' align='center'>";
    profileview += "<table class='small' border='0' cellspacing='0' cellpadding='0'>";
    profileview += "<tbody>";
    profileview += "<tr>";
    profileview += "<td align='right' style='padding-bottom: 5px; padding-left: 5px; padding-right: 5px;padding-top: 5px;'>";

    profileview += "" + newPagination + "";   //分页控件HTML

    profileview += "</td>";
    profileview += "<td align='right' width='40%'>";
    profileview += "</td>";
    profileview += "</tr>";
    profileview += "</tbody>";
    profileview += "</table>";
    profileview += "</td>";
    profileview += "</tr>";
    profileview += "</tbody>";
    profileview += "</table>";
    //分页结束

    profileview += "</form>";
    //表单结束

    document.getElementById("divSetProfile").innerHTML = profileview;
    profileview = "";

    //查询按钮Ajax事件，返回Json字符串
    $("input#btnProfileSelect").click(function () 
    {        
        var strProfileName = $("#txtProfileName ").val();
        $.ajax({
            url: '/Role/IndexPage/SelectProfileList/',
            data: 'objRoleId=' + encodeURIComponent(RoleId) + '&objPageId=' + encodeURIComponent(PageIndex) + '&ProfileName=' + strProfileName,
            type: 'POST',
            asyn: true,
            cache: false,
            dataType: 'html',
            timeout: 100000,
            error: function (value) { },
            success: function (value) 
            {
                if (value != '') 
                {
                    SetProfileDetails(value, RoleId, PageIndex);
                    ProfilePageBind(RoleId, PageIndex);
                    remmeberProfileID();
                    SetProfileChecked();
                }
                else {
                    alert('数据查询失败!');
                }
            }
        });
    });

    var ProfileID = "";
    $("#divSetProfile").dialog({
        title: title,
        autoOpen: false,
        width: 600,
        modal: true,
        buttons:
                 {
                     '保存': function () {
                         $.ajax({
                             url: '/Role/IndexPage/SetProfile/',
                             data: 'objRoleId=' + encodeURIComponent(RoleId) + '&objProfileID=' + encodeURIComponent(ProfilesID),
                             type: 'GET',
                             asyn: true,
                             cache:false,
                             dataType: 'html',
                             timeout: 100000,
                             error: function (value) { },
                             success: function (value) {
                                 if (value != '' && value != null) {
                                     alert('权限设置成功!');
                                     $('#divSetProfile').dialog('close');
                                 }
                                 else {
                                     alert('数据保存失败!');
                                 }
                             }
                         });
                     },
                     "取消": function () 
                     {
                         $(this).dialog('close');
                     }
                 },
        close: function () {

        }
    });
    $("#divSetProfile").dialog('open');    
}

//****************************************************************************************************************************************************************************//
//获取查询按钮查询出来的结果集
function SelectGetUser(RoleId, PageIndex, UserName, DeptName) 
{
    $.ajax({
        url: '/Role/IndexPage/SelectUserList/',
        data: 'objRoleId=' + encodeURIComponent(RoleId) + '&objPageId=' + encodeURIComponent(PageIndex) + '&UserName=' + UserName + '&DeptName=' + DeptName,
        type: 'POST',
        asyn: true,
        cache: false,
        dataType: 'html',
        timeout: 100000,
        error: function (value) { },
        success: function (value) 
        {
            if (value != '') 
            {
                SetUserDetails(value, RoleId, PageIndex);
                SelectRolePageBind(RoleId, PageIndex, UserName, DeptName);
                remmeberUserID();
                SetUserChecked();
            }
            else 
            {
                alert('数据查询失败!');
            }
        }
    });
}


//取得所有用户列表，以便于设置用户
function GetUser(RoleId, PageIndex) 
{
    $.ajax({
        url: '/Role/IndexPage/GetUserList',
        data: 'objRoleId=' + encodeURIComponent(RoleId) + '&objPageId=' + encodeURIComponent(PageIndex),
        type: 'POST',
        asyn: true,
        cache: false,
        dataType: 'html',
        timeout: 100000,
        error: function (value) { },
        success: function (value) 
        {
            SetUserDetails(value, RoleId, PageIndex);
            RolePageBind(RoleId, PageIndex);
            remmeberUserID();
            SetUserChecked();
        }
    });
}

//查询出来的数据集分页绑定
function SelectRolePageBind(roleId, pageIndex, userName, deptName) 
{
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
        remmeberUserID();
        SelectGetUser(roleId, $("#pageid").val(), userName, deptName);

    });
    $("#pageid").keydown(function (ev) {
        if (ev.keyCode == 13) {
            if (parseInt($("#pageid").val()) > 0 && parseInt($("#pageid").val()) <= pagecount) {
                remmeberUserID();
                SelectGetUser(roleId, $("#pageid").val(), userName, deptName);
            }
        }
    });
    $("input[name='btnsubmit']").click(function () {
        $("#pageid").val("1");
        remmeberUserID();
        SelectGetUser(roleId, $("#pageid").val(), userName, deptName);
    });
}

//角色弹出层分页控件绑定
function RolePageBind(roleId, pageIndex) 
{
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
        remmeberUserID();
        GetUser(roleId, $("#pageid").val());
        
    });
    $("#pageid").keydown(function (ev) {
        if (ev.keyCode == 13) {
            if (parseInt($("#pageid").val()) > 0 && parseInt($("#pageid").val()) <= pagecount) {
                remmeberUserID();
                GetUser(roleId, $("#pageid").val());                
            }
        }
    });
    $("input[name='btnsubmit']").click(function () 
    {
        $("#pageid").val("1");
        remmeberUserID();
        GetUser(roleId, $("#pageid").val());        
    });
}


//真正取得用户列表，并将点击的角色下的用户勾选住
function SetUserDetails($userList, RoleId, PageIndex) 
{    
    var userView = "";
    var title = "设置用户";

    //表单开始
    userView += "<form name='SetUserList' id='SetUserList' action='/Role/IndexPage/GetUserList?objRoleId=" + RoleId + "&objPageId=" + PageIndex + "' method='POST'>";
    userView += "<script src='/Content/Js/jquery.autocomplete.js' type='text/javascript'></script>";
    userView += "<style type='text/css'>.user{white-space: nowrap;}.Userstyle{width: 3em; margin-right: 0.7em;}.Userpage{padding: 5px;}";
    userView += "</style>";
    userView += "<table width='100%' cellspacing='0' cellpadding='5' border='0' class='small' id='idData'>";
    userView += "<tr ><td  class='dvtCellInfo' colspan='5'></td>";
    userView += "</tr>";
    userView += "<tr>";
    userView += "<td class='dvtCellInfo' align='center' colspan='3'><b>用户名：</b>";
    userView += "<input type='text' id='txtUserName' name='txtUserName'></input>&nbsp;&nbsp;"; 

    userView += "<b>部门：</b><input type='text' id='txtDeptName' name='txtDeptName'></input>&nbsp;";

    userView += "<input type='button' id='btnSelect' name='btnSelect' class='crmbutton  edit' value='查询'></input></td>";
    
    userView += "</tr>";
    userView += "<tr>";
    userView += "<td class='dvtCellInfo' align='center'><input type='checkbox' id='chkUser' value='全选' onclick='CheckAllUser()' name='chkUser'>全选</input></td>";
    userView += "<td class='dvtCellInfo' align='center'><b>用户编号</b></td>";
    userView += "<td class='dvtCellInfo' align='center'><b>用户名</b></td>";
    userView += "</tr>";

    var jobj = eval($userList);

    //数据开始
    for (var index = 0; index < jQuery(jobj)[0].AllUser.length; index++)           //所有用户
    {
        userView += "<tr>";
        userView += "<td class='dvtCellInfo' align='center'><input type='checkbox' id='chkUserList'";
        
        if (jQuery(jobj)[0].AllUser[index].IsCheck == '1')        //IsCheck等于1的用户是属于当前角色的用户
        {            
            userView += " checked='true' ";
        }
        userView += "name='chkUserList' value='" + jQuery(jobj)[0].AllUser[index].UserID + "' onclick='CheckOrUnCheckUser()'></input></td>";
        userView += "<td class='dvtCellInfo' align='center'>" + jQuery(jobj)[0].AllUser[index].UserID + "</td>";
        userView += "<td class='dvtCellInfo' align='center'>" + jQuery(jobj)[0].AllUser[index].UserAccount + "</td>";
        userView += "</tr>";
    }
    userView += "</table>";
    //数据结束

    var newPagination = jQuery(jobj)[0].Pagination[0].Page;
    newPagination = newPagination.replace(/\"/ig, "\'");       //用正则表达式将HTML中双引号替换成单引号

    //分页开始
    userView += "<table width='100%' border='0' cellspacing='0' cellpadding='2'>";
    userView += "<tbody>";
    userView += "<tr>";
    userView += "<td width='100%' align='center'>";
    userView += "<table class='small' border='0' cellspacing='0' cellpadding='0'>";
    userView += "<tbody>";
    userView += "<tr>";
    userView += "<td align='right' style='padding-bottom: 5px; padding-left: 5px; padding-right: 5px;padding-top: 5px;'>";

    userView += "" + newPagination + "";   //分页控件HTML

    userView += "</td>";
    userView += "<td align='right' width='40%'>";
    userView += "</td>";
    userView += "</tr>";
    userView += "</tbody>";
    userView += "</table>";
    userView += "</td>";
    userView += "</tr>";
    userView += "</tbody>";
    userView += "</table>";
    //分页结束 


    userView += "</form>";
    //表单结束

    document.getElementById("divSetUser").innerHTML = userView;
    userView = "";

    var UserID = "";

    $("input#txtUserName").autocomplete("/Global/GetEntitys?type=1", sParams).result(function (event, data, formatted) { ; $("#txtUserName").val(data.Name) });

    $("input#txtDeptName").autocomplete("/Global/GetEntitys?type=0", sParams).result(function (event, data, formatted) { ; $("#txtDeptName").val(data.Name) });

    //查询按钮Ajax事件，返回Json字符串
    $("input#btnSelect").click(function () {
        var strDeptName = $("#txtDeptName ").val();
        var strUserName = $("#txtUserName ").val();
        $.ajax({
            url: '/Role/IndexPage/SelectUserList/',
            data: 'objRoleId=' + encodeURIComponent(RoleId) + '&objPageId=' + encodeURIComponent(PageIndex) + '&UserName=' + strUserName + '&DeptName=' + strDeptName,
            type: 'POST',
            asyn: true,
            cache: false,
            dataType: 'html',
            timeout: 100000,
            error: function (value) { },
            success: function (value) 
            { 
                if (value != '') 
                {
                    SetUserDetails(value, RoleId, PageIndex); 
                    SelectRolePageBind(RoleId, PageIndex, strUserName,strDeptName);     //查询按钮的分页
                    remmeberUserID();
                    SetUserChecked();
                }
                else 
                {
                    alert('数据查询失败!');
                }
            }
        });
    });

    $("#divSetUser").dialog({
        title: title,
        autoOpen: false,
        width: 600,
        modal: true,
        buttons:
                 {
                     '保存': function () 
                     {                         
                         $.ajax({
                             url: '/Role/IndexPage/SetUser/',
                             data: 'objRoleId=' + encodeURIComponent(RoleId) + '&objUserID=' + encodeURIComponent(UsersID),
                             type: 'GET',
                             asyn: true,
                             cache: false,
                             dataType: 'html',
                             timeout: 100000,
                             error: function (value) { },
                             success: function (value) 
                             {
                                 if (value != '') 
                                 {
                                     alert('用户设置成功!');
                                     $('#divSetUser').dialog('close');
                                 }
                                 else 
                                 {
                                     alert('数据保存失败!');
                                 }
                             }
                         });
                     },
                     "取消": function () 
                     {
                         $(this).dialog('close');
                     }                    
                 },
        close: function () {

        }
    });
    $("#divSetUser").dialog('open');    
}

//删除
function DelAction() 
{
    if (confirm("确定删除吗？") == true) 
    {
        var objIDs = "";

        $("input[name='chkUserList']").each(function () 
        {
            if ($(this).attr("checked") == true) 
            {
                objIDs += $(this).val() + ",";
            }
        });
        if (objIDs == "") 
        {
            alert("请选择要删除的用户!");
            return false;
        }
    }
    else 
    {
        return false;
    }
}


var ProfilesID = "";
var UsersID = "";


//角色权限：全选的脚本
function CheckAllProfile() 
{
    $("input[name=chkProfile]").click(function () 
    {
        if ($(this).attr("checked") == true) 
        {
            $("input[name='chkProfileList']").each(function () 
            {
                if (!$(this).attr('disabled')) 
                {
                    $(this).attr("checked", true);
                }
            });

            $("input[name='chkProfileList']").each(function ()        //翻页时记录当前页所勾选住的权限ID
            {
                if ($(this).attr("checked") == true) 
                {
                    if (ProfilesID.length > 1) 
                    {
                        if (IndexOfProfileID($(this).val(), ProfilesID) == 'NoExsits')  //如果IndexOf函数返回1说明ProfilesID字符串中没有当前ID,则加上当前ID
                        {
                            ProfilesID += $(this).val() + ",";
                        }
                    }
                    else 
                    {
                        ProfilesID += $(this).val() + ",";
                    }
                }
            });
        }
        else {
            $("input[name='chkProfileList']").each(function () 
            {
                $(this).attr("checked", false);
            });

            $("input[name='chkProfileList']").each(function ()        //翻页时记录当前页所勾选住的ProfileID
            {
                if ($(this).attr("checked") == false) 
                {
                    if (ProfilesID.length > 1) 
                    {
                        remmeberProfileID();
                        RepalceOfProfileID($(this).val(), ProfilesID)     //如果当前的ID被取消勾选并且在ProfilesID字符数组中能找到则删除掉该ID
                    }
                }
            });
        }
    }); 
}

//用户角色：全选的脚本
function CheckAllUser()
{
    $("input[name=chkUser]").click(function ()
    {
        if ($(this).attr("checked") == true) 
        {
            $("input[name='chkUserList']").each(function () 
            {
                if (!$(this).attr('disabled')) 
                {
                    $(this).attr("checked", true);
                }
            });

            $("input[name='chkUserList']").each(function ()        //翻页时记录当前页所勾选住的用户ID
            {
                if ($(this).attr("checked") == true) 
                {
                    if (UsersID.length > 1) {
                        if (IndexOfUserID($(this).val(), UsersID) == 'NoExsits')  //如果IndexOf函数返回NoExsits说明UsersID字符串中没有当前ID,则加上当前ID
                        {
                            UsersID += $(this).val() + ",";
                        }
                    }
                    else 
                    {
                        UsersID += $(this).val() + ",";
                    }
                }
            });
        }
        else 
        {
            $("input[name='chkUserList']").each(function () 
            {
                $(this).attr("checked", false);
            });

            $("input[name='chkUserList']").each(function ()        //翻页时记录当前页所勾选住的用户ID
            {
                if ($(this).attr("checked") == false)
                {
                    if (UsersID.length > 1) 
                    {
                        remmeberUserID();
                        RepalceOfUserID($(this).val(), UsersID)     //如果当前的ID被取消勾选并且在UsersID字符数组中能找到则删除掉该ID
                    }
                }
            });
        }
    });
}

//勾选或去掉勾选时，将增加或减少一个权限ID
function CheckOrUnCheckProfile() 
{
    $("input[name='chkProfileList']").click(function () 
    {
        if ($(this).attr("checked") == true) 
        {
            if (IndexOfProfileID($(this).val(), ProfilesID) == 'NoExsits')  //如果IndexOf函数返回-1说明UsersID字符串中没有当前ID,则加上当前ID
            {
                ProfilesID += $(this).val() + ",";
            }
        }
        else 
        {
            remmeberProfileID();
            RepalceOfProfileID($(this).val(), ProfilesID);    //如果当前的ID被取消勾选并且在UsersID字符数组中能找到则删除掉该ID
        }
    }); 
}

//勾选或去掉勾选时，将增加或减少一个用户ID
function CheckOrUnCheckUser() 
{ 
    $("input[name='chkUserList']").click(function () 
    {
        if ($(this).attr("checked") == true) 
        {
            if (IndexOfUserID($(this).val(), UsersID) == 'NoExsits')  //如果IndexOf函数返回NoExsits说明UsersID字符串中没有当前ID,则加上当前ID
            {
                UsersID += $(this).val() + ",";
            }
        }
        else 
        {
            remmeberUserID();
            RepalceOfUserID($(this).val(), UsersID);    //如果当前的ID被取消勾选并且在UsersID字符数组中能找到则删除掉该ID
        }
    }); 
}

//翻页时记录当前页所勾选住的用户ID,同时之前勾选住的，也要将其设置成勾选住的状态
function remmeberUserID()
{ 
    $("input[name='chkUserList']").each(function ()        //翻页时记录当前页所勾选住的用户ID
    {
        if ($(this).attr("checked") == true)
        {
            if (UsersID.length > 1) 
            {
                if (IndexOfUserID($(this).val(), UsersID) == 'NoExsits')  //如果IndexOf函数返回NoExsits说明UsersID字符串中没有当前ID,则加上当前ID
                {
                    UsersID += $(this).val() + ",";
                }
            }
            else 
            {
                UsersID += $(this).val() + ",";
            }
        }
    });
}

//翻页时记录当前页所勾选住的权限ID,同时之前勾选住的，也要将其设置成勾选住的状态
function remmeberProfileID() 
{    
    $("input[name='chkProfileList']").each(function ()        //翻页时记录当前页所勾选住的用户ID
    {
        if ($(this).attr("checked") == true) 
        {
            if (ProfilesID.length > 1) 
            {
                if (IndexOfProfileID($(this).val(), ProfilesID) == 'NoExsits')  //如果IndexOf函数返回1说明UsersID字符串中没有当前ID,则加上当前ID
                {
                    ProfilesID += $(this).val() + ",";
                }
            }
            else 
            {
                ProfilesID += $(this).val() + ",";
            }
        }
    });
}

//查找findString字符在AllUserID字符串中是否存在，存在返回Exsits，否则返回NoExsits
function IndexOfUserID(findString, AllUserID) 
{ 
    var userResult = 'NoExsits';
    var userarrayObj = new Array();
    userarrayObj = AllUserID.split(',');
    for (var index = 0; index < userarrayObj.length; index++)
    {
        if (findString == userarrayObj[index])
        {
            userResult='Exsits';
        }
    }
    return userResult;
}

//查找findString字符在AllProfileID字符串中是否存在，存在返回Exsits，否则返回NoExsits
function IndexOfProfileID(findString, AllProfileID) 
{
    var profileResult = 'NoExsits';
    var profilearrayObj = new Array();
    profilearrayObj = AllProfileID.split(',');
    for (var index = 0; index < profilearrayObj.length; index++) 
    {
        if (findString == profilearrayObj[index])
        {
            profileResult = 'Exsits';
        }
    }
    return profileResult;
}

//设置之前选中的用户ID
function SetUserChecked() 
{
    if (UsersID.length > 1)
    {
        $("input[name='chkUserList']").each(function ()        //翻页时记录当前页所勾选住的用户ID
        {
            if (IndexOfUserID($(this).val(), UsersID) == 'Exsits')    //如果当前ID在UsersID在IndexOfUserID函数中返回Exsits说明能找到，则勾选住
            {
                $(this).attr("checked", true);
            }
        });
    }
}

//设置之前选中的权限ID
function SetProfileChecked() 
{
    if (ProfilesID.length > 1) 
    {
        $("input[name='chkUserList']").each(function ()        //翻页时记录当前页所勾选住的用户ID
        {
            if (IndexOfProfileID($(this).val(), ProfilesID) == 'Exsits')    //如果当前ID在UsersID字符串中不等于-1说明能找到，则勾选住
            {
                $(this).attr("checked", true);
            }
        });
    }
}

//取消勾选时，将勾选的ID从UserID字符串中删除掉
function RepalceOfUserID(findString, AllUserID) 
{ 
    var temp = '';
    var userarrayObj = new Array();
    userarrayObj = AllUserID.split(',');
    for (var index = 0; index < userarrayObj.length; index++) 
    { 
        if (findString == userarrayObj[index])
        {
            userarrayObj.splice(index-1, 0);
        }
        else 
        {
            temp += userarrayObj[index] + ",";
        }
    }
    UsersID = temp;
}


//取消勾选时，将勾选的ID从ProfilesID字符串中删除掉
function RepalceOfProfileID(findString, AllProfileID) 
{    
    var temp = '';
    var profilearrayObj = new Array();
    profilearrayObj = AllProfileID.split(',');
    for (var index = 0; index < profilearrayObj.length; index++) 
    {
        if (findString == profilearrayObj[index]) 
        {
            profilearrayObj.splice(index - 1, 1);
        }
        else 
        {
            temp += profilearrayObj[index] + ",";
        }
    }
    ProfilesID = temp;
}