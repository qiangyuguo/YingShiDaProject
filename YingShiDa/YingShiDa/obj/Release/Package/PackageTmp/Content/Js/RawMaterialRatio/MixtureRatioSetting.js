/*
 * Add or Update Rwa Material
 * Author: zhengkaijin
 * BeginTime: 2017-01-09
 * EndTime:
 * Remarks:
 */
var mrsc = {
    c: {
        ps: ".panel_state",
        pe: ".panel_enable",
        pn: ".panel_no",
        mi: ".mrs_ItemI"
    },
    i: {
        dp: "#dynamic_panel", // div商品成本计算
        dfcp: "#divFixedCostPrice", // div 固定成本价
        fcp: "#FixedCostPrice", // input 固定成本价
        dayl: "#addyl",  // 添加原料
        fwr: "#fun_win_right",
        btnexit: "#btn-exit", //取消按钮
        btnmbe: '#mrs-btn-exit',
        fy: "#fenye", // 分页数据
        tbp: "#tb_product", // 表格ID
        tul: "#TypeItemUl",//类型列表
        mpi: "#mrs_productItem" // Item
    },
    fun: {
        getInputVal: function (attr) {
            return $(attr).val();
        },
        setInputVal: function (attr, value) {
            $(attr).val(value);
        },
        getBrowserVisualizationData: function () {
            return {
                wh: $(window).height(), 　//浏览器时下窗口可视区域高度 
                wdh: $(document).height(),　　　　//浏览器时下窗口文档的高度 
                wdbh: $(document.body).height(),　　　　　　//浏览器时下窗口文档body的高度 
                wdboh: $(document.body).outerHeight(true),　//浏览器时下窗口文档body的总高度 
                ww: $(window).width(), 　//浏览器时下窗口可视区域宽度 
                wdw: $(document).width(),//浏览器时下窗口文档对于象宽度 
                wdbw: $(document.body).width(),　　　　　　//浏览器时下窗口文档body的高度 
                wdbow: $(document.body).outerWidth(true)　//浏览器时下窗口文档body的总宽度 
            };
        },
        ajax: function (url, json, Callback) {
            $.ajax({
                url: url,
                type: "post",
                data: json,
                async: true,
                success: function (data) {
                    Callback(data);
                },
                statusCode: {
                    404: function (ex) {
                        mrsc.DiaLog.winDialog("请求错误！", 2);
                    }
                }

            });
        },
    },
    facility: {
        yesShow: function () {
            $(mrsc.i.dp + ">" + mrsc.c.pe).addClass("hidden");
            $(mrsc.i.dp + ">" + mrsc.c.pn).removeClass("hidden").attr("data-on", "act");
            $(mrsc.i.dfcp).removeClass("hidden");
        },
        noShow: function () {
            $(mrsc.i.dp + ">" + mrsc.c.pe).removeClass("hidden").attr("data-on", "act");
            $(mrsc.i.dp + ">" + mrsc.c.pn).addClass("hidden");
            $(mrsc.i.dfcp).addClass("hidden");
            mrsc.fun.setInputVal(mrsc.i.fcp, "0.00");
        },
        setDivWH: function () {
            var bvd = mrsc.fun.getBrowserVisualizationData();
            $(mrsc.i.fwr).css({
                height: bvd.wh + 'px'
            });
        },
        /*
         * curr : 默认展示第几页（默认为第一页）
         * pTypes: 分类ID
         * PNames:原料名称
         * dPid: 产品详情ID
         */
        layPage: function (curr, ptypes, pNames, dPid) {
            if (pNames != "") {
                $('#mrs_inputName').val(pNames);
            }
            if (ptypes != "") {
                $("#ddlTypeItem").val(ptypes);
            }

            $(mrsc.i.mpi).find(mrsc.c.mi).remove();
            $("#mrs-add-content1").remove(); // 移除原有所以对象
            var bid = $("#hidBid").val();
            var pName = $('#mrs_inputName').val();
            var pType = $("#ddlTypeItem").val() == "-1" ? "" : $("#ddlTypeItem").val();
            var currs = curr || 1;
            var url = 'http://' + window.location.host + '/Action/MixtureRatio.ashx?Action=getMixtureRatioProductPage&Bussid=' + bid + '&pn=' + pName + '&pt=' + pType + '&pi=' + currs + '&ps=15';
            mrsc.fun.ajax(url, null, function (data) {
                if (data != null && data != "") {
                    var json = JSON.parse(data);
                    if (json != null && json.State == 200 && json.IsOk) {
                        mrsc.facility.tbodyHtml(json, dPid);
                        layui.use(['laypage', 'layer'], function () {
                            var laypage = layui.laypage,
                                layer = layui.layer;
                            laypage({
                                cont: 'fenye',
                                pages: json.page.PageCount,
                                curr: curr || 1,
                                groups: 20,
                                skip: true,
                                jump: function (obj, first) {
                                    if (!first) {
                                        mrsc.facility.layPage(obj.curr, "", "");
                                    }
                                }
                            });
                        });
                    }
                }
            });
        },
        tbodyHtml: function (json, dPid) {
            if (json.Data != null && json.Data.length > 0) {
                var html = "";
                for (var i = 0; i < json.Data.length; i++) {
                    html += '<div class="mrs_ItemI" data-pid="' + json.Data[i].PID + '" data-dpid="' + json.Data[i].DetailPID + '" data-ptid="' + json.Data[i].PTypeID + '"  data-pn="' + json.Data[i].PName + '" data-pc="' + json.Data[i].PBarCode + '" data-tn="' + json.Data[i].TypeName + '" data-img="' + json.Data[i].photo + '" ><label>' + json.Data[i].PName + '</label><div class="mrs_del hidden">一</div></div>';
                }
                $(mrsc.i.mpi).append(html).find(mrsc.c.mi).on("click", function () {
                    cloneDomFun($(this));
                });
                if (dPid != null || typeof (dPid) != "undefined" && dPid.length > 0) {
                    cloneDomFun($('div[data-dpid="' + dPid + '"]'));
                }
            }

            function cloneDomFun(obj) {
                $("#mrs-add-content1").remove(); // 移除原有所以对象

                var bid = $("#hidBid").val(); // 获取商圈ID
                var e = $(obj);
                var pid = e.data("pid");
                var url = 'http://' + window.location.host + '/Action/MixtureRatio.ashx?Action=getunit&Bussid=' + bid + '&pid=' + pid + '&rid=' + Math.random(10000);
                if (
                    bid == null || typeof (bid) == "undefined" || bid.length <= 0 ||
                    pid == null || typeof (pid) == "undefined" || pid.length <= 0
                    ) {
                    mrsc.DiaLog.winDialog("页面数据异常，请刷新页面后重试", 2);
                    return;
                }

                mrsc.fun.ajax(url, null, function (data) {
                    if (data != null && data != "") {
                        var json = JSON.parse(data);
                        if (json != null && json.State == 200 && json.IsOk) {
                            if (json.Data != null && json.Data.length > 0) {
                                var html = "";
                                for (var i = 0; i < json.Data.length; i++) {
                                    html += '<option value="' + json.Data[i].UnitID + '">' + json.Data[i].UnitName + '</option>';
                                }
                                var cloneDom = $("#mrs-add-content").clone(); // 克隆对象
                                cloneDom.removeClass("hidden").attr("id", cloneDom.attr("id") + '1');  // + ('' + Math.random()).split('.')[1]
                                cloneDom.find("#ddlUnit").append(html).attr("id", cloneDom.find("#ddlUnit").attr("id") + "1"); // + ('' + Math.random()).split('.')[1]
                                cloneDom.find("#mrs-add-conConsumption").attr("id", cloneDom.find("#mrs-add-conConsumption").attr("id") + "1"); // ('' + Math.random()).split('.')[1]
                                cloneDom.find("#mrs-btn-add").attr("id", cloneDom.find("#mrs-btn-add").attr("id") + "1"); //  + ('' + Math.random()).split('.')[1]                                
                                e.after(cloneDom);
                                addMixtureRation();
                            }
                        }
                    }
                });
            }


            function addMixtureRation() {
                $("#mrs-btn-add1").on("click", function () {
                    var ddu = $("#ddlUnit1").val();
                    var ddt = $("#ddlUnit1").find("option:selected").text();
                    var xhl = $("#mrs-add-conConsumption1").val();
                    if (ddu.length <= 0) {
                        layer.msg("请选择消耗单位");
                        return;
                    }
                    if (xhl.length <= 0) {
                        layer.msg("请输入消耗量");
                        return;
                    } else {
                        if (!isNumber(xhl, "消耗量")) {
                            return;
                        }
                    }

                    var eII = $(this).parents(".cloneTemplate").prev('.mrs_ItemI:eq(0)');
                    var pid = eII.data("pid");
                    var dpid = eII.data("dpid");
                    var ptid = eII.data("ptid");
                    var pn = eII.data("pn");
                    var pc = eII.data("pc");
                    var tn = eII.data("tn");
                    var ti = eII.data("img");


                    var trobj = $('tr[data-dpid="' + dpid + '"]');
                    if (trobj.length <= 0) {
                        $('#tab_TypeList').find("tbody").append(mrsc.facility.tabHtml(pid, dpid, ptid, pn, pc, tn, ddu, ddt, xhl, ti)); // 添加
                        mrsc.facility.trbindEvent(dpid);
                    }
                    else {
                        // 修改
                        trobj.attr("data-dw", ddu).attr("data-dwt", ddt).attr("data-xhl", xhl).removeAttr("data-status").attr("data-status", 1).removeClass("hidden");
                        trobj.find("td:eq(2)").text(xhl + ddt);
                    }

                    $("#mrs-add-content1").remove();
                });
            }
            function isNumber(price, msg) {
                var re = /^\d+(?=\.{0,1}\d+$|$)/;
                if (!re.test(price)) {
                    layer.msg(msg + "只能是数字");
                    return false;
                }
                return true;
            }

        },
        tabHtml: function (pid, dpid, ptid, pn, pc, tn, dw, dwt, xhl, img) {
            return '<tr  data-pid="' + pid + '" data-dpid="' + dpid + '" data-ptid="' + ptid + '" data-pn="' + pn + '" data-pc="' + pc + '" data-tn="' + tn + '" data-dw="' + dw + '" data-dwt="' + dwt + '" data-xhl="' + xhl + '" data-status="1" >' +
                    '<td><img class="image" width="50" src="' + img + '"></td>' +
                    '<td>' + pn + '</td>' +
                    '<td>' + xhl + dwt + '</td>' +
                    '<td>' +
                    '<a href="javascript:void(0);" data-bind="event" data-eattr="upd" class="color-light-blue" style="margin-right: 5px;" >修改</a>' +
                    '<a href="javascript:void(0);" data-bind="event" data-eattr="del" class="color-light-blue">删除</a>' +
                    '</td>' +
                    '</tr>';
        },
        trbindEvent: function (dpid) {
            $('#tab_TypeList').find('tbody > tr[data-dpid="' + dpid + '"]').find('a[data-bind="event"]').on("click", function () {
                var e = $(this);
                var eattr = e.attr("data-eattr");
                var updtr = $(e).parents("tr:eq(0)");
                if (eattr != null && typeof (eattr) != "undefined" && eattr.length > 0) {
                    switch (eattr) {
                        case "upd": // 修改      
                            $(mrsc.i.dayl).click();
                            mrsc.facility.layPage("", updtr.attr("data-ptid"), updtr.attr("data-pn"), updtr.attr("data-dpid"));
                            break;
                        case "del": // 删除
                            updtr.removeAttr("data-status").attr("data-status", -1).addClass("hidden");
                            break;
                        default:
                            throw new DOMException("错误操作类型");

                    }
                }
            });
        },
        submit: function (obj) {
            var choice = $(obj).data("choice");
            if (choice == "submit") {
                return false;
            }

            var _sid = $("#hidSID").val(); // 门店ID
            var _pid = $("#hidDetailPID").val(); // 产品详情ID
            var _fcs = $('div[data-on="act"]').data("fcs"); // yes or no
            var _fc = $('#FixedCostPrice').val(); // 固定成本
            var djf = DetailJsonFun();

            if (_sid === "" || _pid === "" || _sid.length <= 0 || _pid <= 0) {
                mrsc.DiaLog.winDialog("页面数据存在异常，请刷新页面后重试！", 2);
                return false;
            }

            if (_fcs == "no") {
                if (_fc.length <= 0) {
                    layer.msg("请填写固定成本价");
                    return false;
                } else {
                    if (!isNumber(_fc, "固定成本价")) {
                        return false;
                    }
                }
            } else {
                if (djf.length <= 0) {
                    mrsc.DiaLog.winDialog("添加配比数据时原料列表不能为空，请选择原料后添加", 2);
                    return false;
                }
            }

            var postJson = {};
            postJson.sid = _sid;
            postJson.pid = _pid;
            postJson.fcs = _fcs || "yes";
            postJson.fc = _fc;
            postJson.detail = djf;

            $("#btn-submit").removeAttr("data-choice").attr("data-choice", "submit").text("请稍后...");
            var url = 'http://' + window.location.host + '/Action/MixtureRatio.ashx?Action=setmixtureratiodata&rid=' + (Math.random() + '').split('.')[1];
            mrsc.fun.ajax(url, JSON.stringify(postJson), function (data) {
                if (data != null && data != "") {
                    var json = JSON.parse(data);
                    if (json != null && json.State == 200 && json.IsOk) {
                        $.PE_FrameTab.AddNew('/Setting/JXCBaseSetting.aspx?act=prml', '商品原料配比');
                    } else {
                        if (json == null) {
                            mrsc.DiaLog.winDialog("未知错误", 2);
                        } else {
                            mrsc.DiaLog.winDialog(json.Remarks, 2);
                        }
                    }
                }
            });

            function DetailJsonFun() {
                var detail = [];
                var tr = $("#tab_TypeList tbody tr");
                if (tr.length <= 0) {
                    return detail;
                }
                for (var i = 0, ilen = tr.length; i < ilen; i++) {
                    var detailJson = {};
                    var ei = $(tr[i]);
                    var _dpid = $(ei).data("dpid");
                    var _uid = $(ei).data("dw");
                    var _quantity = $(ei).data("xhl");
                    var _status = $(ei).data("status") || 1;

                    if (
                        typeof (_dpid) == "undefined" ||
                        typeof (_uid) == "undefined" ||
                        typeof (_quantity) == "undefined" ||
                        _dpid.length <= 0 ||
                        _uid.length <= 0
                        ) {
                        mrsc.DiaLog.winDialog("配比列表数据存在异常，请刷新页面后重试！", 2);
                        return detail;
                    }

                    if (_quantity.length <= 0) {
                        mrsc.DiaLog.winDialog("配比列表第" + (i + 1) + "行数据存消耗单位不能为空！", 2);
                        return detail;
                    } else {
                        if (!isNumber(_quantity, "配比列表第" + (i + 1) + "行数据消耗单位")) {
                            return detail;
                        }
                    }
                    detailJson.dpid = _dpid; // 原料ID
                    detailJson.uid = _uid; // 单位ID
                    detailJson.quantity = _quantity; // 数量
                    detailJson.status = _status; // 状态
                    detail.push(detailJson);
                }
                return detail;

            }

            function isNumber(price, msg) {
                var re = /^\d+(?=\.{0,1}\d+$|$)/;
                if (!re.test(price)) {
                    layer.msg(msg + "只能是数字");
                    return false;
                }
                return true;
            }
        },
        Init: function () {
            var _sid = $("#hidSID").val(); // 门店ID
            var _pid = $("#hidDetailPID").val(); // 产品详情ID
            var url = 'http://' + window.location.host + '/Action/MixtureRatio.ashx?Action=getsetmixtureratiodata&sid=' + _sid + '&dpid=' + _pid + '&rid=' + (Math.random() + '').split('.')[1];
            mrsc.fun.ajax(url, null, function (data) {
                if (data != null && data != "") {
                    var json = JSON.parse(data);
                    if (json != null && json.State == 200 && json.IsOk) {
                        var jdata = json.Data;
                        if (jdata == null) {
                            return;
                        }
                        if (jdata.fcs === "no") {
                            mrsc.facility.yesShow();
                            mrsc.fun.setInputVal(mrsc.i.fcp, jdata.fc);
                        } else {
                            mrsc.facility.noShow();
                        }
                        var jdatad2 = jdata.detail2;
                        if (jdatad2 != null && jdatad2.length > 0) {
                            for (var i = 0, ilen = jdatad2.length; i < ilen; i++) {
                                $('#tab_TypeList').find("tbody").append(mrsc.facility.tabHtml(jdata.pid, jdatad2[i].MaterialDetailPID, jdatad2[i].PTypeID, jdatad2[i].PName, jdatad2[i].PBarCode, jdatad2[i].TypeName, jdatad2[i].UnitID, jdatad2[i].UnitName, jdatad2[i].Quantity, jdatad2[i].photo));
                                mrsc.facility.trbindEvent(jdatad2[i].MaterialDetailPID);
                            }

                        }
                    }
                }
            });
        }
    },
    action: {

    },
    DiaLog: {
        /*
            有确定按钮的 
            MSG：需要提示是的信息，
            indexIco ： 更具不同的数字值将出现不同的警告
                        1：成功图标 2：错误图标 3：问号图标 4：锁  
                        5：不高兴图标   6：微笑图片 7：感叹号
        */
        winDialog: function (msg, indexIco) {
            layer.alert(msg, {
                icon: indexIco,
                skin: 'layer-ext-moon'
            });
        },
        winSpec: function (tip, layers) {
            $("#" + tip).on({
                mouseenter: function () {
                    tips(tip, layers, 0, 1);
                },
                mouseout: function () {
                    tips(tip, layers, 1, 1);
                }
            });
            function tips(tipss, layerss, time, tips) {
                layer.tips($("#" + layerss).html(), '#' + tipss, {
                    time: time,
                    tips: tips
                });
            }
        }
    },
    enum: {
        yes: "是",
        no: "否",
        pe: "panel_enable",
        pn: "panel_no",
        drmu: "ddlRmauMainUnit", // 主单位
        dau: "ddlAccessoryUnit" // 副单位
    }

};

$(function () {

    "use strict";

    // 页面初始化加载
    mrsc.facility.Init();

    // 商品成本计算-动态面板
    $(mrsc.i.dp + ">" + mrsc.c.ps).on("click", function () {
        $(mrsc.i.dp + ">" + mrsc.c.ps).removeAttr("data-on");
        var txt = $(this).find("p").text();
        if (txt == mrsc.enum.yes) {
            mrsc.facility.yesShow();
        } else if (txt == mrsc.enum.no) {
            mrsc.facility.noShow();
        }
    });

    //固定成本价
    $(mrsc.i.fcp).on({
        "focus": function () {
            mrsc.fun.setInputVal($(this), "");
        },
        "blur": function () {
            var str = mrsc.fun.getInputVal($(this));
            if (str <= 0) {
                mrsc.fun.setInputVal($(this), "0.00");
            }
        }
    });

    // 添加对应原料
    $(mrsc.i.dayl).on("click", function () {
        $(mrsc.i.fwr).show().css({
            right: '0px'
        });
        mrsc.facility.setDivWH();
    });

    // 取消(关闭弹出窗口)
    $(mrsc.i.btnmbe).on("click", function () {
        $(mrsc.i.fwr).css({
            right: '-' + $(mrsc.i.fwr).width() + 'px'
        }).hide();
        mrsc.facility.setDivWH();
    });

    // 取消按钮
    $(mrsc.i.btnexit).on("click", function () {
        $.PE_FrameTab.AddNew('/Setting/JXCBaseSetting.aspx?act=prml', '商品原料配比');
        return false;
    });

    // 对应原料的菜单事件
    $("#ddlTypeItem").on("change", function () { mrsc.facility.layPage("", "", ""); });

    // 对应原料的搜索事件
    $('#mrs_btn_search').on('click', function () {
        mrsc.facility.layPage("", "", "");
    });

    // 对应原料的添加按钮事件
    $("#btn-submit").on('click', function () {
        mrsc.facility.submit($(this));
        return false;
    });

});