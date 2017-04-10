$(function () {
    // 配置
    var sptc = {
        c: {

        },
        i: {
            bid: "#hidbid",
            sid: "#storeList",
            fwr: "#fun_win_right",
            cpcc: "#cpcctable",
            hp: "#hidPrinter",
            cpfl: "#cpfltable",
            mbs: "#mrs_btn_search",
            mbe: "#mrs-btn-exit",
            min: "#mrs_inputName",
            dti: "#ddlTypeItem",
            swct: "#spt_win_con_top",
            swcu: "#spt_win_con_ul",
            ap: "#aprinte",
            anp: "#anotprinte",
            ss: "#search",
            del: "#delete",
            sas: "#spt_allselected",
            ca: "#cb_all",
            wfy: "#winfenye"
        },
        fun: {
            getInputVal: function (attr) {
                return $(attr).val();
            },
            setInputVal: function (attr, value) {
                $(attr).val(value);
            },
            getSelectValue: function (attr) {
                return $(attr + " option:selected").val() || null;
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
            getUrl: function (action) {
                return "http://" + window.location.host + "/Action/PrinterServer.ashx?Action=" + action
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
                            sptc.DiaLog.diaLog("远程连接失败！");
                        }
                    }
                });
            },
            fenye: function (id, json, curr, Callback) {
                layui.use(['laypage', 'layer'], function () {
                    var laypage = layui.laypage,
                        layer = layui.layer;
                    laypage({
                        cont: id,
                        pages: json.page.PageCount,
                        curr: curr || 1,
                        groups: 20,
                        skip: true,
                        jump: function (obj, first) {
                            if (!first) {
                                Callback(obj, first);
                            }
                        }
                    });
                });
            }
        },
        diaLog: {
            /*
                有确定按钮的 
                MSG：需要提示是的信息，
                indexIco ： 根具不同的数字值将出现不同的警告
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
        facility: {
            getCpccdySetting: function (curr) {
                var currs = curr || 1;
                var ps = 15;
                sptc.fun.ajax(
                    sptc.fun.getUrl(sptc.emum.gpjp) + "&sid=" + sptc.fun.getSelectValue(sptc.i.sid) + "&bid=" + sptc.fun.getInputVal(sptc.i.bid) + "&pi=" + currs + "&ps=" + ps + "&rid" + Math.random(1000),
                    null,
                    function (data) {
                        if (data != null && data != "") {
                            var json = JSON.parse(data);
                            if (json != null && json.State == 200 && json.IsOk) {

                                $(sptc.i.cpcc).find("tbody > tr").remove();

                                var html = "";
                                if (json.Data != null && json.Data.length > 0) {
                                    for (var i = 0; i < json.Data.length; i++) {
                                        html += sptc.pagehtml.cpcc(json.Data[i].PrinterName, json.Data[i].ProductSum, json.Data[i].PrinterID);
                                    }
                                }
                                else {
                                    html = sptc.pagehtml.cpccNoData();
                                }
                                $(sptc.i.cpcc).find("tbody").append(html);

                                // 事件绑定
                                sptc.bindEvent.addProduct();
                                sptc.bindEvent.delProduct();
                                sptc.fun.fenye("fenye1", json, currs, function (obj, first) {
                                    sptc.facility.getCpccdySetting(obj.curr);
                                });
                            } else {
                                if (json != null && json.Remarks != null && json.Remarks.length > 0) {
                                    sptc.diaLog.winDialog(json.Remarks, 2);
                                } else {
                                    sptc.diaLog.winDialog("未知错误,请刷新页面后重试！", 2);
                                }
                            }
                        }
                    });
            },
            getPrinterList: function () {
                // 获取打印机列表
                sptc.fun.ajax(
                    sptc.fun.getUrl(sptc.emum.pl) + "&sid=" + sptc.fun.getSelectValue(sptc.i.sid) + "&rid" + Math.random(1000), null, function (data) {
                        if (data != null && data != "") {
                            var json = JSON.parse(data);
                            if (json != null && json.State == 200 && json.IsOk) {
                                $(sptc.i.hp).empty();
                                var html = "<option value='-1'>请选择打印机</option>";
                                if (json.Data != null && json.Data.length > 0) {
                                    for (var i = 0; i < json.Data.length; i++) {
                                        html += '<option value="' + json.Data[i].PrinterID + '">' + json.Data[i].PrinterName + '</option>';
                                    }
                                }
                                $(sptc.i.hp).append(html);
                                //菜品分类传菜打印设置
                                sptc.facility.getCpflccSetting(1);
                            }
                        }
                    });
            },
            getCpflccSetting: function (curr) {
                var currs = curr || 1;
                var ps = 15;
                sptc.fun.ajax(
                    sptc.fun.getUrl(sptc.emum.pjt) + "&sid=" + sptc.fun.getSelectValue(sptc.i.sid) + "&bid=" + sptc.fun.getInputVal(sptc.i.bid) + "&pi=" + currs + "&ps=" + ps + "&rid" + Math.random(1000),
                    null,
                    function (data) {
                        if (data != null && data != "") {
                            var json = JSON.parse(data);
                            if (json != null && json.State == 200 && json.IsOk) {

                                $(sptc.i.cpfl).find("tbody > tr").remove();
                                var html = "";
                                if (json.Data != null && json.Data.length > 0) {
                                    for (var i = 0; i < json.Data.length; i++) {
                                        html += sptc.pagehtml.cpfl(json.Data[i].TypeName, json.Data[i].PIDS, json.Data[i].PTypeID);
                                    }
                                }
                                else {
                                    html = sptc.pagehtml.cpflNoData();
                                }
                                $(sptc.i.cpfl).find("tbody").append(html);

                                sptc.fun.fenye("fenye2", json, currs, function (obj, first) {
                                    sptc.facility.getCpflccSetting(obj.curr);
                                });

                                //设置默认值
                                $(sptc.i.cpfl).find("tbody tr").each(function (e, o) {
                                    var eq1 = $(o).find("td:eq(1)");
                                    eq1.find("select").val(eq1.data("option"));
                                });

                                // select事件绑定
                                sptc.bindEvent.selectType();


                            } else {
                                if (json != null && json.Remarks != null && json.Remarks.length > 0) {
                                    sptc.diaLog.winDialog(json.Remarks, 2);
                                } else {
                                    sptc.diaLog.winDialog("未知错误,请刷新页面后重试！", 2);
                                }
                            }
                        }
                    });
            },
            addProductSetting: function (json) {
                sptc.fun.ajax(sptc.fun.getUrl(sptc.emum.ap2p) + "&rmd=" + Math.random(1000), json, function (data) {
                    if (data != null && data != "") {
                        var json = JSON.parse(data);
                        if (json != null && json.State == 200 && json.IsOk) {
                            sptc.bindEvent.btnSearch(1);
                            sptc.facility.getCpccdySetting(1);
                        } else {
                            if (json != null && json.Remarks != null && json.Remarks.length > 0) {
                                sptc.diaLog.winDialog(json.Remarks, 2);
                            } else {
                                sptc.diaLog.winDialog("添加失败！", 2);
                            }
                        }
                    }
                });

            },
            delProductSetting: function (json) {
                sptc.fun.ajax(sptc.fun.getUrl(sptc.emum.delpl) + "&rmd=" + Math.random(1000), json, function (data) {
                    if (data != null && data != "") {
                        var json = JSON.parse(data);
                        if (json != null && json.State == 200 && json.IsOk) {
                            sptc.bindEvent.btnSearch(1);
                            sptc.facility.getCpccdySetting(1);
                        } else {
                            if (json != null && json.Remarks != null && json.Remarks.length > 0) {
                                sptc.diaLog.winDialog(json.Remarks, 2);
                            } else {
                                sptc.diaLog.winDialog("删除失败！", 2);
                            }
                        }
                    }
                });
            },
        },
        bindEvent: {
            // 打印机添加商品
            addProduct: function () {
                $('a[data-event="addProduct"]').unbind(sptc.emum.ck).on(sptc.emum.ck, function () {
                    var e = $(this);
                    var pid = e.data("pi");// 获取打印机ID
                    var bid = sptc.fun.getInputVal(sptc.i.bid); // 获取商圈ID
                    var sid = sptc.fun.getSelectValue(sptc.i.sid); // 门店ID
                    var prName = e.parents("tr").find("td:eq(0)").text();

                    // 判断页面数据
                    if (
                        pid === null || bid === null || sid === null ||
                        typeof pid == "undefined" || typeof bid == "undefined" || typeof sid == "undefined" ||
                        pid.length <= 0 || bid.length <= 0 || sid.length <= 0
                        ) {
                        sptc.diaLog.winDialog("页面数据异常，请刷新页面后重试", 2);
                        return;
                    }

                    // 显示弹出层
                    $(sptc.i.fwr).show().css({
                        right: '0px'
                    }).attr("data-checkprinter", pid);

                    // 设置名称
                    $(sptc.i.ap).text("(打印机：" + prName + ") 未选商品").attr("title", "(打印机：" + prName + ") 未选商品");
                    $(sptc.i.anp).text("(打印机：" + prName + ") 已选商品").attr("title", "(打印机：" + prName + ") 已选商品");

                    // 设置弹出层高度
                    $(sptc.i.fwr).css({
                        height: sptc.fun.getBrowserVisualizationData() + 'px'
                    });

                    // 加载数据
                    sptc.bindEvent.btnSearch(1);

                });
            },
            delProduct: function () {
                $('a[data-event="delProduct"]').unbind(sptc.emum.ck).on(sptc.emum.ck, function () {
                    var e = $(this);
                    var pid = e.data("pi");// 获取打印机ID
                    var bid = sptc.fun.getInputVal(sptc.i.bid); // 获取商圈ID
                    var sid = sptc.fun.getSelectValue(sptc.i.sid); // 门店ID
                    if (
                        pid === null || bid === null || sid === null ||
                        typeof pid == "undefined" || typeof bid == "undefined" || typeof sid == "undefined" ||
                        pid.length <= 0 || bid.length <= 0 || sid.length <= 0
                        ) {
                        sptc.diaLog.winDialog("页面数据异常，请刷新页面后重试", 2);
                        return;
                    }
                    sptc.fun.ajax(
                        sptc.fun.getUrl(sptc.emum.delp) + "&sid=" + sid + "&bid=" + bid + "&prid=" + pid + "&rid=" + Math.random(1000),
                        null,
                        function (data) {
                            if (data != null && data != "") {
                                var json = JSON.parse(data);
                                if (json != null && json.State == 200 && json.IsOk) {
                                    //菜品传菜打印设置 
                                    sptc.facility.getCpccdySetting(1);

                                } else {
                                    if (json != null && json.Remarks != null && json.Remarks.length > 0) {
                                        sptc.diaLog.winDialog(json.Remarks, 2);
                                    } else {
                                        sptc.diaLog.winDialog("删除失败,删除数据时出现错误，请刷新页面后重试！", 2);
                                    }
                                }
                            }
                        });
                });
            },
            selectType: function () {
                $(sptc.i.cpfl).find("tbody select").unbind("change").on("change", function () {
                    var e = $(this);
                    var typeId = e.parent("td").data("type"); // 分类ID
                    var yoption = e.parent("td").data("option"); // 源分类ID
                    var thisOption = e.val(); // 选中的Option
                    var sid = sptc.fun.getSelectValue(sptc.i.sid); // 门店ID

                    if (
                        typeId == null || yoption == null || thisOption == null ||
                        typeof typeId == "undefined" || typeof yoption == "undefined" || typeof thisOption == "undefined" ||
                        typeId.length <= 0 || yoption.length <= 0 || thisOption.length <= 0
                        ) {

                        sptc.diaLog.winDialog("页面数据异常，请刷新页面后重试", 2);
                        return;
                    }

                    if (yoption == thisOption) {
                        return;
                    }

                    sptc.fun.ajax(
                        sptc.fun.getUrl(sptc.emum.ap2pt) + "&sid=" + sid + "&tid=" + typeId + "&prid=" + yoption + "&nprid=" + thisOption + "&rid=" + Math.random(1000),
                        null,
                        function (data) {
                            if (data != null && data != "") {
                                var json = JSON.parse(data);
                                if (json != null && json.State == 200 && json.IsOk) {
                                    //菜品传菜打印设置 
                                    sptc.facility.getCpflccSetting(1);

                                } else {
                                    if (json != null && json.Remarks != null && json.Remarks.length > 0) {
                                        sptc.diaLog.winDialog(json.Remarks, 2);
                                    } else {
                                        sptc.diaLog.winDialog("菜品分类传菜打印设置失败，请刷新页面后重试！", 2);
                                    }
                                }
                            }
                        });
                });
            },
            btnExit: function () {
                // 设置名称
                $(sptc.i.ap).text("(打印机) 未选商品");
                $(sptc.i.anp).text("(打印机) 已选商品");
                // 清除数据
                $(sptc.i.swcu).empty();
                $(sptc.i.wfy).empty();
                sptc.fun.setInputVal(sptc.i.min, "");

                // 隐藏控件
                $(sptc.i.ss).addClass("hidden");
                $(sptc.i.del).addClass("hidden");
                $(sptc.i.sas).addClass("hidden");

                // 恢复默认选中
                $(sptc.i.dti).val("-1");

                // 设置选项卡默认选中
                $(sptc.i.ap).addClass("action");
                $(sptc.i.anp).removeClass("action");

                // 设置窗体 的 right
                $(sptc.i.fwr).removeAttr("data-checkprinter").css("right", "-" + $(sptc.i.fwr).width());

                // 设置选中项
                $(sptc.i.ca).removeAttr("checked");
            },
            btnSearch: function (curr) {
                $(sptc.i.swcu).empty();
                // 搜索按钮
                var action = $(sptc.i.swct).find(".action").attr("data-action"); // 选中类型
                var bid = sptc.fun.getInputVal(sptc.i.bid); // 获取商圈ID
                var sid = sptc.fun.getSelectValue(sptc.i.sid); // 门店ID
                var pn = sptc.fun.getInputVal(sptc.i.min) // 产品名称
                var pt = sptc.fun.getSelectValue(sptc.i.dti); // 产品类型
                var prid = $(sptc.i.fwr).attr("data-checkprinter"); // 打印机ID
                var saction = action == "notselected" ? sptc.emum.gpl : sptc.emum.gpdb;
                var pi = curr || 1;
                var ps = 15;

                if (bid == null || typeof bid === "undefined" || bid.length <= 0) {
                    sptc.diaLog.winDialog("页面缺少关键参数,请刷新页面后重试！", 2);
                    return;
                }

                if (sid == null || typeof sid === "undefined" || sid === "-1" || sid.length <= 2) {
                    sptc.diaLog.winDialog("请选择门店", 2);
                    return;
                }

                if (prid == null || typeof prid === "undefined" || prid.length <= 0) {
                    sptc.diaLog.winDialog("请选择打印机", 2);
                    return;
                }

                if (pt == "-1") {
                    pt = "";
                }

                // 隐藏按钮
                $(sptc.i.ss).addClass("hidden");
                $(sptc.i.del).addClass("hidden");
                $(sptc.i.sas).addClass("hidden");
                sptc.fun.ajax(
                sptc.fun.getUrl(saction) + "&sid=" + sid + "&bid=" + bid + "&prid=" + prid + "&pn=" + pn + "&pt=" + pt + "&pi=" + pi + "&ps=" + ps + "&rid=" + Math.random(1000),
                null,
                function (data) {
                    if (data != null && data != "") {
                        var json = JSON.parse(data);
                        if (json != null && json.State == 200 && json.IsOk) {
                            //菜品传菜打印设置 
                            if (json.Data != null) {
                                var jsonData = json.Data;
                                var html = "";
                                for (var i = 0, iLen = jsonData.length; i < iLen; i++) {
                                    html += sptc.pagehtml.swcu(jsonData[i].PID, jsonData[i].PName);
                                }
                                if (html != "" && html.length > 0) {
                                    $(sptc.i.swcu).append(html);

                                    $(sptc.i.sas).removeClass("hidden");
                                    if (action == "notselected") {
                                        $(sptc.i.ss).removeClass("hidden");
                                    } else {
                                        $(sptc.i.del).removeClass("hidden");
                                    }

                                    // 事件绑定
                                    sptc.bindEvent.ulAllChecked();

                                }
                                sptc.fun.fenye("winfenye", json, curr, function (obj, first) {
                                    sptc.bindEvent.btnSearch(obj.curr);
                                });
                            }
                        }
                    }
                });
            },
            ulAllChecked: function () {
                // ul 下的checke 
                $(sptc.i.swcu).find('input[type="checkbox"]').unbind(sptc.emum.ck).on(sptc.emum.ck, function () {
                    var checkboxAll = $(sptc.i.swcu).find('input[type="checkbox"]');
                    var sum = 0;
                    for (var i = 0, iLen = checkboxAll.length; i < iLen; i++) {
                        if ($(checkboxAll[i]).is(':checked')) {
                            sum++;
                        }
                    }
                    if (sum == checkboxAll.length) {
                        $(sptc.i.ca).attr("checked", 'true');
                    } else {
                        $(sptc.i.ca).removeAttr("checked");
                    }
                });
            }
        },
        emum: {
            ck: "click",
            gpjp: "getprinterjoinproduct",
            pl: "getprinterlist",
            pjt: "getprinterjointype",
            delp: "delprinterjionproduct",
            ap2pt: "addp2pt",
            ap2p: "addp2pp",
            gpl: "getproductlist",
            gpdb: "getproductdistribution",
            delpl: "delprinterlist"
        },
        pagehtml: {
            // 菜品传菜打印设置
            cpcc: function (printerName, productSum, printerId) {
                var pname = printerName || "";
                var psum = productSum || 0;
                var pid = printerId || "";
                var html = '<tr>' +
                    '<td>' + pname + '</td>' +
                    '<td>' + psum + '</td>' +
                    '<td>' +
                        '<a onclick="" class="color-light-blue" href="javascript:void(0)" data-event="addProduct" data-pi="' + pid + '" >添加商品</a>&nbsp;&nbsp;' +
                        '<a onclick="" class="color-light-blue" href="javascript:void(0)" data-event="delProduct" data-pi="' + pid + '" >删除</a>' +
                    '</td>' +
                '</tr>';
                return html;
            },
            cpccNoData: function () {
                return '<tr><td colspan="3" style="text-align: center; height: 150px; line-height: 150px; font-weight: bold; letter-spacing: 20px;">暂无打印机数据</td></tr>';
            },

            // 菜品分类传菜打印设置
            cpfl: function (name, option, type) {
                var selectHtml = $(sptc.i.hp).html();
                var select = '<select class="form-control">' + selectHtml + '</select>';
                return '<tr><td>' + name + '</td><td data-type="' + type + '" data-option="' + option + '">' + select + '</td></tr>';
            },
            cpflNoData: function () {
                return '<tr><td colspan="2" style="text-align: center; height: 150px; line-height: 150px; font-weight: bold; letter-spacing: 20px;">暂无分类数据</td></tr>';
            },

            // 弹出窗口的列表页
            swcu: function (pid, pname) {
                return '<li data-pid="' + pid + '"><input type="checkbox" value="" />' + pname + '</li>';
            }

        }
    };

    // 初始化
    $(sptc.i.sid).on("change", function () {
        sptc.facility.getCpccdySetting(1);
        sptc.facility.getPrinterList();
        sptc.facility.getCpflccSetting(1);

    });

    // 产品分类change事件
    $(sptc.i.dti).on("change", function () {
        sptc.bindEvent.btnSearch();
    });


    // 获取打印机列表
    sptc.facility.getPrinterList();

    //菜品传菜打印设置 
    sptc.facility.getCpccdySetting(1);


    // 搜索按钮    
    $(sptc.i.mbs).on(sptc.emum.ck, function () {
        sptc.bindEvent.btnSearch();
    });

    //取消按钮
    $(sptc.i.mbe).on(sptc.emum.ck, function () {
        sptc.bindEvent.btnExit();
    });

    // 未选中商品 / 已选中商品
    $(sptc.i.ap + "," + sptc.i.anp).on(sptc.emum.ck, function () {
        $(sptc.i.ap).removeClass("action");
        $(sptc.i.anp).removeClass("action");
        $(this).addClass("action");
        $(sptc.i.ca).removeAttr("checked");
        $(sptc.i.wfy).empty();
        sptc.bindEvent.btnSearch(1);
    });

    // 全选按钮
    $(sptc.i.ca).on(sptc.emum.ck, function () {
        if ($(this).is(':checked')) {
            $(sptc.i.swcu).find('input[type="checkbox"]').attr("checked", 'true');
        } else {
            $(sptc.i.swcu).find('input[type="checkbox"]').removeAttr("checked");
        }
    });

    // 添加按钮事件
    $(sptc.i.ss).on(sptc.emum.ck, function () {
        var json = GetProductId();
        if (json.detail.length <= 0) {
            sptc.diaLog.winDialog("请选择商品后添加", 7);
            return false;
        }
        sptc.facility.addProductSetting(JSON.stringify(json));
        return false;
    });

    // 删除按钮事件
    $(sptc.i.del).on(sptc.emum.ck, function () {
        var json = GetProductId();
        if (json.detail.length <= 0) {
            sptc.diaLog.winDialog("请选择商品后删除", 7);
            return false;
        }
        sptc.facility.delProductSetting(JSON.stringify(json));
        return false;
    });

    // 组织Json数据
    function GetProductId() {
        var checkboxAll = $(sptc.i.swcu).find('input[type="checkbox"]');
        var prid = $(sptc.i.fwr).attr("data-checkprinter"); // 打印机ID
        var json = {
            detail: []
        };
        for (var i = 0, iLen = checkboxAll.length; i < iLen; i++) {
            var check = $(checkboxAll[i]);
            if (check.is(':checked')) {
                var pid = check.parent("li").data("pid");
                if (pid != null && pid.length > 0) {
                    var detail = {
                        PrinterID: prid,
                        ProductID: pid
                    };
                    json.detail.push(detail);
                }
            }
        }
        return json;
    }

});