﻿$(document).ready(function () {
    if ($("#hfEditHtml").val() != "") {
        var hfEditHtml = $("#hfEditHtml").val().split(',');
        var html = "";
        for (var i = 0; i < hfEditHtml.length; i++) {
            html += "<tr><td style=\"text-align: left;\">" + hfEditHtml[i] + "</td><td style=\"text-align: left;\">上次添加</td></tr>";
        }
        $("#AddProductModel").append(html);
    }
    if ($("#hfHtml").val() != "") {
        var hfHtml = $("#hfHtml").val().split(',');
        var html = "";
        for (var i = 0; i < hfHtml.length; i++) {
            html += "<tr><td style=\"text-align: left;\">" + hfHtml[i] + "</td><td style=\"text-align: left;\"><a type=\"button\" class=\"color-light-blue\" onclick=\"delProductModel(this)\">删除</a></td></tr>";
        }
        $("#AddProductModel").append(html);
    }
});
function ProductAdd()
{
    var html = "";
    var i = 0;
    var txtProductModel = $("#txtProductModel").val();
    if (txtProductModel != null)
    {
        if (txtProductModel.length > 6)
        {
            layer.alert("产品型号长度不能超过6个字符", {
                icon: 2,
                offset:'10%'
            });
            return false;
        }
        $("#AddProductModel tr:eq(0)").nextAll().each(function (index, item) {
            var productModel = $(item).find("td:eq(0)").text();
            if (txtProductModel == productModel)
            {
                i++;
            }
        });
        if (i > 0)
        {
            layer.alert('产品型号不能重复', {
                icon: 2,
                offset: '10%'
            });
            return false;
        }
        html += "<tr><td style=\"text-align: left;\">" + txtProductModel + "</td><td style=\"text-align: left;\"><a type=\"button\" class=\"color-light-blue\" onclick=\"delProductModel(this)\">删除</a></td></tr>";
        $("#AddProductModel").append(html);
        var hfHtml = $("#hfHtml").val();
        if (hfHtml != "") {
            $("#hfHtml").val(hfHtml + "," + txtProductModel);
        } else {
            $("#hfHtml").val(txtProductModel);
        }
    }
    return false;
}

function delProductModel(obj)
{
    $(obj).parent().parent().remove();
}

function checkSave()
{
    var aa = $("#AddProductModel tr:eq(0)").nextAll().find("td:eq(0)").text();
    var arrList = new Array();

    var hfHtml = $("#hfHtml").val().split(',');
    for (var i = 0; i < hfHtml.length; i++) {
        arrList.push({ productModel: hfHtml[i] });
    }

    var jsonvalue = JSON.stringify(arrList);
    if (jsonvalue != undefined && jsonvalue != null && jsonvalue != "[]") {
        $("#hfArrList").val(jsonvalue);
    }
    if (!window.confirm("确认提交信息？")) return false;
}