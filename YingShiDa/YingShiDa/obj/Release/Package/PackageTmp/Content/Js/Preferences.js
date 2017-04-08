
$(function () {
    
    $("#comname").bind("click", function () {
        ShowUpdateDialog({ thisBtnObj: this, showObj: 'oldName', hidObj: 'hidName', confirmBtnObj: 'btnName', valObj: 'companyName', showText: 'newName' });

    });
    $("#comlogo").bind("click", function () {
        ShowUpdateDialog({ thisBtnObj: this, showObj: 'uploadefile', hidObj: 'hidLOGO', confirmBtnObj: 'btnLogo', valObj: 'CompanyPic', showText: 'newLogo' });

    });
    $("#comtheme").bind("click", function () {
        ShowThemeDialog(this);
    });
    $("#CompanyPic").bind("change", function () {
        $("#preview").bind("click", function () {
            ShowPreviewPic();
        }).show("slow");

    });
    
});


//修改公司名称
function SetCompanyName(comName) {
    var comName = parent.$("#CurrentCompanyName").val();
    
    $("#sethidcomname").val(comName);
    if ($.trim($("#newName").html()).length !=0 ) {
        $("#newName").html(comName).show();
    }
}

//修改公司logo
function SetLogo(imgName, pathPotion) {
    var comlogo = parent.$("CurrentLogo").val();
   
    $("#sethidlogo").val(comlogo);
   
    if ( $.trim($("#newLogo").html()).length!=0) {
        $("#newLogo").html(comlogo).show();
    }
}

//修改整体的frame样式
function SetSkin() {
    var stlePotion = parent.$("#CurrentSkin").val();
   
    $("#sethidtheme").val(stlePotion); //设置和数据库一致的值
    if ( $.trim($("#newTheme").html()).length!=0) {
        //$("#newTheme").html(stlePotion).show();
    }
}

function ShowPreviewPic() {
   
    var logoImgDiv = $("<div />", { "id": "showLogoDiv" }).hide();
    logoImgDiv.append("<div id='showLogo' style='width:170px;height:45px;'></div>");
    $("body").append(logoImgDiv);
    $("#" + $(logoImgDiv).attr("id")).dialog({
        title: "图片预览",
        autoOpen: false,
        cache: false,
        width: 350,
        modal: true,
        buttons: {
            '关闭': function () {

                $(this).dialog('close');
            }
        }
    });
    $("#CompanyPic").uploadPreview({ imgDiv: '#showLogo', maxwidth: 170, maxheight: 45 });
    $("#showLogoDiv").dialog("open");

}

function CreateDiv() {
    var createDiv = $("<div />", { "id": "ThemeGroupDiv", "hidElement": "hidSkin", "style": "overflow:hidden", "title": "选择您想要的企业主题" }).hide();
    createDiv.append("<div id=\"themeDiv\"></div>");
    $("body").append(createDiv);
    return createDiv;
}

function ShowThemeDialog() {
    AjaxGetThemeInfo();
}

function DisData(dataParam) {
    var htmlStr = "";
    var obj = eval(dataParam);
    htmlStr = "<ul class=\"ulMarg\">";
    for (var i = 0; i < obj.length; i++) {
        htmlStr += "<li class=\"w30h fl-left marg\"><span class=\"w30h dis-block\"  style=\"background:url('/Content/Skin/" + obj[i].SkinName + "/img/toolbar-bg.png') repeat-x;\"></span><span style=\"margin-top:1px;\"><input style=\"margin:0 0 0 6px;\" type=\"radio\" name=\"theme\" id=\"" + obj[i].SkinDesc + "\" value=\"" + obj[i].SkinName + "\"/></span></li>";
    }
    htmlStr += "</ul>";
    
    return htmlStr;
}

function AjaxGetThemeInfo() {
    $.ajax({
        url: '/PickList/IndexPage/GetThemeInfo',
        type: 'get',
        cache: false,
        success: function (data) {
            if (null != data) {
                var obj = CreateDiv(data);
                ShowDialog(obj);
                var htmlStr = DisData(data);
                $("#themeDiv").html(htmlStr);
                //CheckCurrentTheme();
            }
        },
        error: function () { }
    });
}

function CheckCurrentTheme() {
    var currentTheme = $("#sethidtheme").val();
    
    $("#themeDiv").find("input[type=radio]").each(function () {
        if ($.trim($(this).attr("id")) === $.trim(currentTheme)) {
            $(this).attr("checked", "true");
        }
    });
}

function ShowDialog(themeDiv) {

    $("#" + $(themeDiv).attr("id")).dialog({
        title: $(themeDiv).attr("title"),
        autoOpen: false,
        cache: false,
        width: 350,
        modal: true,
        buttons: {
            '确定': function () {
                var themeVal = GetSelectRadio();
                $("#" + $(themeDiv).attr("hidElement")).val(themeVal);
               
                $("#newTheme").html(themeVal).show("slow");

                $(this).dialog('close');
            },
            '关闭': function () {

                $(this).dialog('close');
            }
        }
    });

    $("#ThemeGroupDiv").dialog("open");
}

function ShowUpdateDialog(options) {

    if ($("#" + options.showObj).css("display") === "none") {
        $("#" + options.showObj).show("slow");
        $(options.thisBtnObj).val("隐藏");
    } else {
        $("#" + options.showObj).hide("slow");
        $(options.thisBtnObj).val("修改");
    }

    $("#" + options.confirmBtnObj).bind("click", function () {
        confirmInputValue(options, this);

    });

}

function confirmInputValue(opts, clickBtnObj) {

    var inpuVal = $("#" + opts.valObj); //获取填写框的值

    if ("" != $.trim(inpuVal.val()) && null != inpuVal.val()) {

        $("#" + opts.hidObj).val(inpuVal.val());

        $("#" + opts.showObj).hide("slow");

        $("#" + opts.showText).html(inpuVal.val()).show("slow");

    } else {
        return false;
    }

}

function GetSelectRadio() {
    var returnVal = "";
    $("#themeDiv").find("li").each(function () {
        if ($(this).find("input[type=radio]").attr("checked") == true) {
            returnVal = $(this).find("input[type=radio]:checked").val();
        }
    });
   
    return returnVal;
}

function OnSubmitBefore() {

    var name = $("#hidName").val();

    var logo = $("#hidLOGO").val();

    var skin = $("#hidSkin").val();
    if ($.trim(skin).length === 0) {
        skin = parent.$("#CurrentSkin").val();
    }

    if ($.trim(name) === "" && $.trim(logo) === "" && $.trim(skin) === "") {

        $("#ErrorDiv").html("您没有更新信息，不能完成数据提交！");

        return false;

    } else {
        var str = "SESNT_CompanyName:" + name + ",SESNT_Logo:" + logo + ",SESNT_Skin:" + skin;
        $("#KeyCode").val(str);
        
    }
}

