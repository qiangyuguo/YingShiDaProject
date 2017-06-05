$(document).ready(function () {
    if ($("#hfEditHtml").val() != "") {
        var hfEditHtml = $("#hfEditHtml").val().split(',');
        var html = "";
        for (var i = 0; i < hfEditHtml.length; i++) {
            html += "<tr><td style=\"text-align: left;\">" + hfEditHtml[i].split(':')[0] + "</td><td style=\"text-align: left;\"><a type=\"button\" class=\"color-light-blue\" onclick=\"delProduct(this,'" + hfEditHtml[i].split(':')[1] + "')\">删除</a></td></tr>";
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
    if (txtProductModel != "") {
        if (txtProductModel.length > 10) {
            layer.alert("产品型号长度不能超过10个字符", {
                icon: 2,
                offset: '10%'
            });
            return false;
        }
        $("#AddProductModel tr:eq(0)").nextAll().each(function (index, item) {
            var productModel = $(item).find("td:eq(0)").text();
            if (txtProductModel == productModel) {
                i++;
            }
        });
        if (i > 0) {
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
    else {
        layer.alert('产品型号不能为空', {
            icon: 2,
            offset: '10%'
        });
        return false;
    }
    return false;
}

function delProduct(obj, ID)
{
    $.post('/Action/ProductFile.ashx', { action: "DelProduct", ID: ID },
        function (data) {
            var dataJson = JSON.parse(data);
            if (dataJson.msg == "true") {
                $(obj).parent().parent().remove();
            } else {
                alert(dataJson.error);
            }
    });
}

function delProductModel(obj)
{
    $("#hfHtml").val("");
    $(obj).parent().parent().remove();
    $("#AddProductModel tr:eq(0)").nextAll().find("td:eq(0)").each(function (index, item) {
        var hfHtml = $("#hfHtml").val();
        if (hfHtml != "") {
            $("#hfHtml").val(hfHtml + "," + $(item).text());
        } else {
            $("#hfHtml").val($(item).text());
        }
    });
}

function checkSave()
{
    var aa = $("#AddProductModel tr:eq(0)").nextAll().find("td:eq(0)").text();
    var arrList = new Array();

    var hfHtml = $("#hfHtml").val().split(',');
    if (hfHtml[0] == "" && aa=="")
    {
        layer.alert("型号不能为空!", {
            icon: 2,
            offset:'10%'
        });
        return false;
    }
    for (var i = 0; i < hfHtml.length; i++) {
        arrList.push({ productModel: hfHtml[i] });
    }

    var jsonvalue = JSON.stringify(arrList);
    if (jsonvalue != undefined && jsonvalue != null && jsonvalue != "[]") {
        $("#hfArrList").val(jsonvalue);
    }
    if (!window.confirm("确认提交信息？")) return false;
}