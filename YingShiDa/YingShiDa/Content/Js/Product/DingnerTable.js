/// <summary>
/// 桌位列表
/// 开发人：刘若飞
/// 开发时间：2016-10-11 14：37
/// </summary>
var AreaId = "";
var CustomerID="";
$(function () {
    var CSPECLIST = {
        C: {},
        I: {
            TSL: "#tb_Dingner"
        },
        DOM: {
            Template: {
                SpecValueDiv: function (colspan, dataJson) {
                    var html = "<tr data-append='Detail'>";
                    html += "<td colspan='" + colspan + "'>";
                    html += '<table class=" table table-bordered table-hover " id="tb_DingnerTable">';
                    html += "<thead>";
                    html += '<tr>';
                    html += '<th>桌位名称</th>';
                    html += '<th>建议人数</th>';
                    html += '<th>启用状态</th>';
                    html += '<th style="text-align:center;width:50px">锁定状态</th>';
                    html += '<th style="width: 220px">操作</th>';
                    html += '</tr>';
                    html += "</thead>"
                    html += '<tbody>';
                    html += newTR(dataJson);
                    html += '<tr>';
                    html += '<th><input id="AddTableName" type="text" placeholder="桌位名称" class="stati-maker stati-tool-item br4 right" maxlength="4"/></th>';
                    html += '<th><input id="AddSuggestUser" type="number" placeholder="推荐人数" class="stati-maker stati-tool-item br4 right"/></th>';
                    html += '<th><div class="checkbox checkbox-slider--a"><label><input id="AddEnabledState" type="checkbox" checked="true"/><span></span></label></div></th>';
                    html += '<th style="width: 220px">';
                    html += '<button class="stati-check br4 stati-tool-item" type="button" id="specValueAddOk" style="width: 90px;" onclick="return AddTableValue(this)">添加桌位';
                    html += '</button>';
                    html += '</th>';
                    html += '</tr>';
                    html += '</tbody>';
                    html += " </table>";
                    return html;
                    function newTR(trdataJson) {
                        var newtr = '';
                        if (trdataJson != null) {
                            for (var i = 0; i < trdataJson.length; i++) {
                                newtr += '<tr>';
                                newtr += '<td><input id="tdTableName" type="text" placeholder="桌位名称" value="' + trdataJson[i].TableName + '" oldValue="' + trdataJson[i].TableName + '" class="stati-maker stati-tool-item br4 right mg0 h24" disabled="disabled" maxlength="4"></td>';
                                newtr += '<td><input id="tdSuggestUser" type="number" placeholder="建议人数" value="' + trdataJson[i].SuggestUser + '" oldValue="' + trdataJson[i].tdSuggestUser + '" class="stati-maker stati-tool-item br4 right mg0 h24" disabled="disabled" ></td>';
                                if (trdataJson[i].EnabledState == 1) {
                                    newtr += '<td><div class="checkbox checkbox-slider--a"><label><input id="tdEnabledState"  checked="true" type="checkbox" disabled="disabled"/><span></span></label></div></td>';
                                }
                                else {
                                    newtr += '<td><div class="checkbox checkbox-slider--a"><label><input id="tdEnabledState"  type="checkbox" disabled="disabled"/><span></span></label></div></td>';
                                }
                                newtr += '<td style="text-align:center;vertical-align: middle;">' + retunStatu(trdataJson[i].LockingState) + '</td>';
                                newtr += '<td>';
                                newtr += '<a onclick="return TableUpdate(this)" TableID="' + trdataJson[i].TableID + '" class="color-light-blue" href="javascript:void(0)">编辑</a>';
                                newtr += '&nbsp;<a onclick="return Setcancel(this)" TableID="' + trdataJson[i].TableID + '" class="color-light-blue hidden" href="javascript:void(0)">取消</a>';
                                newtr += '&nbsp;<a onclick="return SpecEdit(this)" TableID="' + trdataJson[i].TableID + '"  ManinId="' + trdataJson[i].ID + '" class="color-light-blue hidden" href="javascript:void(0)" >完成</a>';
                                newtr += '&nbsp;<a onclick="return TableDel(this)" TableID="' + trdataJson[i].TableID + '" class="color-light-blue" href="javascript:void(0)">删除</a>';
                                if (trdataJson[i].LockingState == 1) {
                                    newtr += '&nbsp;<a onclick="return SetLock(this)" TableID="' + trdataJson[i].TableID + '" class="color-light-blue" href="javascript:void(0)">解锁</a>';
                                }
                                else {
                                    newtr += '&nbsp;<a onclick="return SetLock(this)" TableID="' + trdataJson[i].TableID + '" class="color-light-blue hidden" href="javascript:void(0)">解锁</a>';
                                }
                                newtr += '</td>';
                                newtr += '</tr>';
                            }
                        }
                        return newtr;
                    }
                    html += "</td>";
                    html += "<tr>";

                }
            }
        }
    };

    $(CSPECLIST.I.TSL+ " tbody tr").find("td:eq(0)").on({
        click: function () {
            var thisobj = $(this);
            var thisTbody = thisobj.parents("tbody");
            thisTbody.find('tr[data-append="Detail"]').remove();
            var thisisfh = thisobj.text();
            thisTbody.find("tr").find("td:eq(0)").text("+");
            AreaId = thisobj.attr("data-pi");
            CustomerID = thisobj.attr("data-cm");
            if (AreaId == null || AreaId === '' || AreaId.length <= 0) {
                return;
            }
            if (thisisfh.length > 0 && thisisfh === "+") {
                thisobj.text("-");
                $.post('/Action/Dingner.ashx', { action: "selectTable", areaId: AreaId, customerID: CustomerID },
                function (data) {
                    if (data != "" && data != "[]") {
                        $(thisobj).text("-");
                        var dataJson = eval(data);;
                        $(thisobj).parent("tr").after(CSPECLIST.DOM.Template.SpecValueDiv(7, dataJson));
                        thisobj = null;
                    } else {
                        $(thisobj).parent("tr").after(CSPECLIST.DOM.Template.SpecValueDiv(7, null));
                        thisobj = null;
                    }
                });
            }
        }
    });




});

function retunStatu(objState)
{
    if (objState == 1)
        return "<span style=\"color: #D85555;\">锁定</span>";
    else
        return "<span>未锁定</span>";
}

function TableDel(obj) {
    if (confirm('该桌位删除后无法恢复,将永久删除!请慎重考虑 '))
    {
        var trParent = $(obj).parent().parent();
        $.post('/Action/Dingner.ashx', { action: "Tabledelete", TableID: $(obj).attr("TableID") },
            function (data) {
                if (data != "" && data != "[]") {
                    var jsondate = data.split("|");
                    if (jsondate != undefined && jsondate.length > 0)
                    {
                        if (jsondate[0].toString()=="Succee") {
                            trParent.remove();
                        }
                        else {
                            layerMsg(jsondate[1]);
                        }
                    }
                   
                }
            });
    }
}

function AddTableValue(obj) {
    var tableName = $("#AddTableName").val();
    var SuggestUser = $("#AddSuggestUser").val();
    var EnabledState = $("#AddEnabledState").prop("checked");
    var re = /^\+?[1-9]\d*$/;
    if (tableName == "") {
        layerMsg("桌位名称不能为空!");
        return false;
    }
    if (tableName.length >4) {
        layerMsg("桌位名称不能超过4个字符");
        return false;
    }
    if (SuggestUser == "") {
        layerMsg("建议人数不能为空!");
        return false;
    }
    if (!re.test(SuggestUser)) {
        layerMsg("建议人数只能为正整数!");
        return false;
    }
    var newtr = '';
    $.post('/Action/Dingner.ashx', { action: "AddTable", tableName: tableName, suggestUser: SuggestUser, areaId: AreaId, customerID: CustomerID, enabledState: EnabledState },
        function (data) {
            var dataJson = JSON.parse(data);
            if (dataJson.flag == "false") {
                layerMsg(dataJson.msg);
            } else {
                newtr += '<tr>';
                //newtr += '<td>' + dataJson.TableID + '</td>';
                newtr += '<td><input id="tdTableName" type="text" placeholder="桌位名称" value="' + dataJson.TableName + '" oldValue="' + dataJson.TableName + '" class="stati-maker stati-tool-item br4 right mg0 h24" disabled="disabled" maxlength="4"></td>';
                newtr += '<td><input id="tdSuggestUser" type="number" placeholder="建议人数" value="' + dataJson.SuggestUser + '" oldValue="' + dataJson.SuggestUser + '" class="stati-maker stati-tool-item br4 right mg0 h24" disabled="disabled" ></td>';
                newtr += '<td><div class="checkbox checkbox-slider--a"><label>';
                if (EnabledState == true) {
                    newtr += '<input id="tdEnabledState"  checked="' + dataJson.EnabledState + '" oldValue="' + dataJson.EnabledState + '" type="checkbox" disabled="disabled"/>';
                }
                else {
                    newtr += '<input id="tdEnabledState"   oldValue="' + dataJson.EnabledState + '" type="checkbox" disabled="disabled"/>';
                }
                newtr += '<span></span></label></div></td>';
                newtr += '<td style="text-align:center;vertical-align: middle;">' + retunStatu(dataJson.LockingState) + '</td>';
                newtr += '<td>';
                newtr += '<a onclick="return TableUpdate(this)" TableID="' + dataJson.TableID + '" class="color-light-blue" href="javascript:void(0)">编辑</a>';
                newtr += '&nbsp;<a onclick="return Setcancel(this)" TableID="' + dataJson.TableID + '" class="color-light-blue hidden" href="javascript:void(0)">取消</a>';
                newtr += '&nbsp;<a onclick="return SpecEdit(this)" TableID="' + dataJson.TableID + '"  ManinId="' + dataJson.ID + '" class="color-light-blue hidden" href="javascript:void(0)" >完成</a>';
                newtr += '&nbsp;<a onclick="return TableDel(this)" TableID="' + dataJson.TableID + '" class="color-light-blue" href="javascript:void(0)">删除</a>';
                newtr += '&nbsp;<a onclick="return SetLock(this)" TableID="' + dataJson.TableID + '" class="color-light-blue hidden" href="javascript:void(0)">解锁</a>';
                newtr += '</td>';
                newtr += '</tr>';
                $(obj).parent().parent().before(newtr);
            }
        });
    $(obj).parent().parent().children("th:eq(0)").find("#AddTableName").val("");//清除历史记录
    $(obj).parent().parent().children("th:eq(1)").find("#AddSuggestUser").val("");//清除历史记录
}

function SpecEdit(obj) {
    var tablename = $(obj).parent().parent().children("td:eq(0)").find("#tdTableName");
    var suggestUser = $(obj).parent().parent().children("td:eq(1)").find("#tdSuggestUser");
    var enabledState = $(obj).parent().parent().children("td:eq(2)").find("#tdEnabledState");
    var returnEbState = true;
    var tableid = $(obj).attr("TableID");
    var re = /^\+?[1-9]\d*$/;
    var Id = $(obj).attr("ManinId");
    var et = $(obj);
    if (tablename.val()=== "" || tablename.val().length === 0) {
        layerMsg("桌位名称不能为空!");
        return false;
    }
    if (tablename.val().length >4) {
        layerMsg("桌位名称不能超过4个字符");
        return false;
    }
    if (suggestUser.val()== "" || suggestUser.val().length === 0) {
        layerMsg("建议人数不能为空!");
        return false;
    }
    if (!re.test(suggestUser.val())) {
        layerMsg("建议人数只能为正整数!");
        return false;
    }
    if (enabledState.attr("checked") == undefined) {
        returnEbState = false;
    }
    else {
        returnEbState = true;
    }
    $.post('/Action/Dingner.ashx', { action: "TableEdit", TableID: tableid, Id: Id, suggestuser: suggestUser.val(), tbName: tablename.val(), enabledState:returnEbState },
        function (data) {
            if (data != "" && data != "[]") {
                et.addClass("hidden");
                et.prev("a:eq(0)").removeClass("hidden");
                tablename.attr("disabled", "disabled");
                suggestUser.attr("disabled", "disabled");
                enabledState.attr("disabled", "disabled");
            }
        });
}
//取消,返回原来的数据
function Setcancel(obj)
{
    var tableid = $(obj).attr("TableID");
    $.post('/Action/Dingner.ashx', { action: "setcancel", TableID: tableid },
      function (data) {
          if (data != "" && data != "[]") {
              var jsondata = JSON.parse(data);
              var tableName=$(obj).parent().parent().children("td:eq(0)").find("input[id$='tdTableName']");
              var suggeUser = $(obj).parent().parent().children("td:eq(1)").find("input[id$='tdSuggestUser']");
              var enabledState = $(obj).parent().parent().children("td:eq(2)").find("#tdEnabledState");
              tableName.val(jsondata.TableName);
              suggeUser.val(jsondata.SuggestUser);
              if (jsondata.EnabledState ==0)
                  enabledState.removeAttr("checked");
              else
                  enabledState.attr("checked",true);
              tableName.attr("disabled", "disabled");
              suggeUser.attr("disabled", "disabled");
              enabledState.attr("disabled", "disabled");
              $(obj).prev().removeClass("hidden");
              $(obj).addClass("hidden");
              $(obj).next().addClass("hidden");
          }
      });
   
}


//手动解锁
function SetLock(obj) {
    var tableid = $(obj).attr("TableID");
    $.post('/Action/Dingner.ashx', { action: "setlockingstatesuccee", TableID: tableid},
      function (data) {
          if (data != "" && data != "[]") {
              var jsondate = data.split("|");
              if (jsondate[0].toString() == "Succee") {
                  $(obj).addClass("hidden");
                  layerMsg(jsondate[1], 6);
                  $(obj).parent().prev().find("span").text("未锁定");
                  $(obj).parent().prev().find("span").css("color", "black");
              }
          }
      });
}

function TableUpdate(obj) {
    //编辑的时候锁定当前桌位
    $.post('/Action/Dingner.ashx', { action: "updatelockingstate", TableID: $(obj).attr("TableID") },
           function (data) {
               if (data != "" && data != "[]") {
                   var jsondate = data.split("|");
                   if (jsondate != undefined && jsondate.length > 0) {
                       if (jsondate[0].toString() == "Succee") {
                           $(obj).addClass("hidden");
                           $(obj).next("a:eq(0)").removeClass("hidden");
                           $(obj).next().next("a:eq(0)").removeClass("hidden");
                           $(obj).parent().parent().children("td:eq(0)").find("#tdTableName").removeAttr("disabled");
                           $(obj).parent().parent().children("td:eq(1)").find("#tdSuggestUser").removeAttr("disabled");
                           $(obj).parent().parent().children("td:eq(2)").find("#tdEnabledState").removeAttr("disabled");
                       }
                       else {
                           layerMsg(jsondate[1]);
                           return false;
                       }
                   }
               }
           });
}

function layerMsg(msg,number)
{
    if (number == null || number == undefined)
        number = 5;
    layer.msg(msg, {
        time:1000,
        icon: number,
        offset: '20%'
    });
}



