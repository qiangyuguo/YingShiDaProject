/*
 * Add or Update Rwa Material
 * Author: zhengkaijin
 * BeginTime: 2017-01-06
 * EndTime:
 * Remarks:
 */
var rmauc = {
    c: {
        ps: ".panel_state",
        pe: ".panel_enable",
        pn: ".panel_no",
        fp: ".file-preview",
        bkfr: "button[type='button'].kv-file-remove"
    },
    i: {
        dp: "#dynamic_panel", // 副单位
        trn: "#tbRmauName",  // 原料名称
        drt: "#ddlRmauType", // 原料分类
        drmu: "#ddlRmauMainUnit", // 主单位
        au: "#accessory_unit", // 副单位详情
        dau: "#ddlAccessoryUnit", // 副单位
        jmu: "#joinMainUnit", //换算关系（主）
        jd: "#joinDynamic",// 换算关系 （ 副 ）
        dvu: "#divValuationUnit",// 副计价单位
        dsvu: "#divSelectValuationUnit", // 副库存查看单位
        tbc: "#tbBarcode", // 条形码
        Cfi: '.file-preview-thumbnails',
        tpd: "#txtPlatDes",//保质期
        th1: "#tbHS1", // 主单位换算关系
        th2: "#tbHS2", // 副单位换算关系
        bid: "#bid",// 商圈ID
        rmm: "#rawMaterialMap", // 原料图
        fhrmm: "#file-how-raw-material-map", // 原料图最外层div id
        btnexit: "#btn-exit", // 取消按钮
        Ibtns: "#btn-submit", // 保存按钮
        btn_armt: "#addRawMaterialType", //添加原料分类
        btn_act: "#addCompanyType", //添加单位管理
    },
    fun: {
        getSelectValue: function (attr) {
            return {

                // 获取select 选中的 text
                text: $(attr).find("option:selected").text(),

                // 获取select选中的 value
                value: $(attr).val(),

                // 获取select选中的索引
                index: $(attr).get(0).selectedIndex
            };
        },
        settingSelect: {
            index: function (attr, indexs) {
                //设置Select索引值为indexs的项选中
                $(attr).get(0).selectedIndex = indexs;
            },
            value: function (attr, value) {
                // 设置Select的Value值为value的项选中
                $(attr).val(value);
            }
        },
        getMainUnit: function () {

            // 获取主单位选中值
            return rmauc.fun.getSelectValue(rmauc.i.drmu);
        },
        getDynamic: function () {

            // 获取副单位选中值
            return rmauc.fun.getSelectValue(rmauc.i.dau);
        },
        getInputVal: function (attr) {
            return $(attr).val();
        },
        setInputVal: function (attr, value) {
            $(attr).val(value);
        }
    },
    Fn: {
        GetQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
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
                        WinDiaLog("请求错误！");
                    }
                }

            });
        },
        projectfileoptions: {
            showUpload: false,
            showRemove: false,
            language: 'zh',
            allowedPreviewTypes: ['image'],
            allowedFileExtensions: ['jpg', 'png', 'gif'],
            maxFileSize: 2000,
        }
    },
    facility: {
        yesShow: function () {
            $(rmauc.i.dp + ">" + rmauc.c.pe).addClass("hidden");
            $(rmauc.i.dp + ">" + rmauc.c.pn).removeClass("hidden");
            $(rmauc.i.au).addClass("hidden");
        },
        noShow: function () {
            $(rmauc.i.dp + ">" + rmauc.c.pe).removeClass("hidden")
            $(rmauc.i.dp + ">" + rmauc.c.pn).addClass("hidden");
            $(rmauc.i.au).removeClass("hidden");
        },
        checkDynamic: function () { // 副单位按钮
            var mainMsg = rmauc.fun.getMainUnit(); // 主
            var dynamicMsg = rmauc.fun.getDynamic(); // 副
            if (dynamicMsg.text == "全部单位名称") {
                dynamicMsg = mainMsg;
            }
            if (mainMsg.text != "") {
                $(rmauc.i.jmu).text(mainMsg.text);
                $(rmauc.i.dvu + ">" + rmauc.c.pe + " p").text(mainMsg.text);
                $(rmauc.i.dsvu + ">" + rmauc.c.pe + " p").text(mainMsg.text);
            }

            if (dynamicMsg.text != "") {
                $(rmauc.i.jd).text(dynamicMsg.text);
                $(rmauc.i.dvu + ">" + rmauc.c.pn + " p").text(dynamicMsg.text);
                $(rmauc.i.dsvu + ">" + rmauc.c.pn + " p").text(dynamicMsg.text);
            }
        },
        dvuMinShow: function () {
            $(rmauc.i.dvu + ">" + rmauc.c.pe).addClass("hidden");
            $(rmauc.i.dvu + ">" + rmauc.c.pn).removeClass("hidden");
        },
        dvuDynamicShow: function () {
            $(rmauc.i.dvu + ">" + rmauc.c.pe).removeClass("hidden")
            $(rmauc.i.dvu + ">" + rmauc.c.pn).addClass("hidden");
        },
        dsvuMinShow: function () {
            $(rmauc.i.dsvu + ">" + rmauc.c.pe).addClass("hidden");
            $(rmauc.i.dsvu + ">" + rmauc.c.pn).removeClass("hidden");
        },
        dsvuDynamicShow: function () {
            $(rmauc.i.dsvu + ">" + rmauc.c.pe).removeClass("hidden")
            $(rmauc.i.dsvu + ">" + rmauc.c.pn).addClass("hidden");
        },
        dynamicInit: function () {
            // 副单位初始化
            rmauc.fun.settingSelect.index(rmauc.i.dau, 0);
            rmauc.fun.setInputVal(rmauc.i.th1, 1);
            rmauc.fun.setInputVal(rmauc.i.th2, 1);
            rmauc.facility.dvuDynamicShow();
            rmauc.facility.dsvuDynamicShow();
            rmauc.facility.checkDynamic();
        },
        fileInput: function (id, checkEvent, okEvent, errorEvent) {
            $(id).fileinput({
                uploadUrl: rmauc.action.host + rmauc.action.fileUpload + rmauc.fun.getInputVal(rmauc.i.bid) + "&rid=" + Math.random(),
                language: 'zh', // 设置语言
                showZoom: false,
                allowedFileExtensions: ['jpg', 'png', 'jpeg', 'gif', 'bmp'], // 接收文件的后缀
                overwriteInitial: false, // 
                validateInitialCount: false,
                showUpload: false,
                showRemove: false,
                showCancel: false,
                maxFileSize: 1024,
                maxFileNum: 1,
                minFileCount: 1,
                showUpload: false,
                showRemove: false,
                showClose: false,
                enctype: 'multipart/form-data',
                msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
                slugCallback: function (filename) {
                    return filename.replace('(', '_').replace(')', '_').replace(']', '_').replace('[', '_');
                }
            }).on({
                fileerror: function (event, data, msg) {
                    // 错误处理
                    errorEvent(event, data, msg);
                },
                fileuploaded: function (event, data, previewId, index) {
                    // 上传成功后事件
                    okEvent(event, data, previewId, index);
                },
                filebatchselected: function (event, files) {
                    // 选择文件后触发事件
                    checkEvent(event, files);
                }
            });
        }
    },
    action: {
        host: 'http://' + window.location.host,
        fileUpload: '/Action/FileUploadService.ashx?Action=img&Bussid='
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
    Template: {
        /** 
         * 显示图片内容
         * @param addr 图片完整路径地址
         * @param fileName 图片名称
         * @param isDelete 是否显示图片删除按钮 true 显示 ， false 不显示，默认不显示
         */
        GenerateImageFindOption: function (addr, fileName, isDelete) {
            var deleteHtml = '';
            var fileInputHtml = '';
            if (fileName != "") {
                if (isDelete != null && isDelete) {
                    deleteHtml = '<button type="button" data-event="delete" class="kv-file-remove1 btn btn-xs btn-default" title="删除文件"><i class="glyphicon glyphicon-trash text-danger"></i></button>';
                }
                fileInputHtml = '<div class="file-preview-frame file-preview-success" data-fileindex="0" data-template="image" data-in="' + fileName + '">' +
                    '<div class="kv-file-content"> ' +
                    ' <img src="' + addr + '" class="kv-preview-data file-preview-image" title="' + fileName + '" alt="' + fileName + '" style="width:auto;height:160px;" /> ' +
                    '</div>' +
                    '<div class="file-thumbnail-footer"> ' +
                    ' <div class="file-footer-caption" title="' + fileName + '">' + fileName + ' <br />' +
                    ' </div> ' +
                    ' <div class="file-actions"> ' +
                    '  <div class="file-footer-buttons"> ' + deleteHtml + '  </div>' +
                    ' </div>' +
                    '</div>' +
                    '</div>';
            }
            return fileInputHtml;
        },

        /** 
         * 显示图片框架
         * @param id :cpzstp 或者 cpjstp
         * @param html: 动态插入的图片集合HTML
         * @param title: 如果HTML为空则显示没有图片
         */
        GenerateImageParentOption: function (id, html, title) {
            var titleHtml = "";
            var titles = "无图片......";
            if (title != null || title != "") {
                titles = title;
            }
            if (html == null || html == "") {

                titleHtml = '<div class="file-drop-zone-title" id="file-drop-zone-title-' + id + '">' + titles + '</div>'
            } else {
                titleHtml = '<div class="file-drop-zone-title" id="file-drop-zone-title-' + id + '" style="display:none" >' + titles + '</div>'
            }
            var fileInputHtml = '<div class="file-preview">' +
                    '<div class=" file-drop-zone">' +
                        '<div class="file-preview-thumbnails">' + titleHtml +
                            '<div class="file-live-thumbs" id="fileLiveThumbs-' + id + '">' + html + '</div>' +
                        '</div>' +
                        '<div class="clearfix"></div>' +
                        '<div class="file-preview-status text-center text-success"></div>' +
                        '<div class="kv-fileinput-error file-error-message" style="display: none;"></div>' +
                    '</div>' +
                '</div>';
            return fileInputHtml;
        },

        /**
         * 显示图片 fileInput 框架
         * @param valueHtml 可以向内部插入任何HTML
         */
        GenerateImageParentFileInputOption: function (valueHtml) {
            return '<div class="file-input file-input-ajax-new">' + valueHtml + '</div>'
        },
    },
    enum: {
        yes: "是",
        no: "否",
        pe: "panel_enable",
        pn: "panel_no",
        drmu: "ddlRmauMainUnit", // 主单位
        dau: "ddlAccessoryUnit" // 副单位
    },
    Event: {
        add: {
            // 点击事件函数，  str：需要绑定点击事件的DOM名称 Callback：回调函数（将绑定事件的DOM返回一个jquery对象）
            click: function (str, Callback) {
                $(str).click(function () {
                    Callback($(this));
                    return false;
                });
            }
        }
    }
};

// 图片上传

rmauc.facility.fileInput(rmauc.i.rmm,
    function (event, data, msg) {

        // 获取原料图片
        var i = 0;
        var yltpAll = $('.file-preview-thumbnails div[data-template="image"]');
        var size = (document.getElementById("rawMaterialMap").files[0].size / 1024).toFixed(2);
        if (size > 1024) {
            $(".file-preview-error").hide();//移除图片
            $(".kv-fileinput-error").remove();//移除提示至少1
            //$(".file-footer-caption").last().remove();//移除标题
            var FacePhotoNameFirst = $(".file-footer-caption").first().attr("title");// 原料图第一个
            var FacePhotoNameLast = $(".file-footer-caption").last().attr("title");// 原料图最后一个
            if (FacePhotoNameFirst == FacePhotoNameLast){
                $(".file-caption-name").text("");
            } else {
                $(".file-caption-name").attr("title", FacePhotoNameFirst);
                $(".file-caption-name").html('<i class="glyphicon glyphicon-file kv-caption-icon"></i>' + FacePhotoNameFirst);
            }
            rmauc.DiaLog.winDialog("上传图片不能大于1024KB");
            return;
        }
        for (var z = 0; z < yltpAll.length; z++) {
            var zI = $(yltpAll[z]).attr('data-template');
            if (zI == "") {
                rmauc.DiaLog.winDialog("商品展示图片，数据存在异常");
                return;
            }
            else {
                
                i = i + 1;
                if (i > 1) {
                    $(yltpAll[z]).remove();
                    var FacePhotoName = $(".file-footer-caption").attr("title");// 原料图
                    $(".file-caption-name").attr("title", FacePhotoName);
                    $(".file-caption-name").html('<i class="glyphicon glyphicon-file kv-caption-icon"></i>' + FacePhotoName);
                    rmauc.DiaLog.winDialog("只能上传一张原料图片");
                    return;
                }
            }
        }
        $(rmauc.i.rmm).fileinput("upload");
    },
    function (event, data, previewId, index) {
        if (data.jqXHR.readyState === 4 && data.jqXHR.status === 200 && data.response.IsOK && data.response.ImgTF) {
            $('#' + previewId).attr('data-in', data.response.ImgName);
            var FacePhotoName = $(".file-footer-caption").attr("title");// 原料图
            $(".file-caption-name").attr("title", FacePhotoName);
            $(".file-caption-name").html('<i class="glyphicon glyphicon-file kv-caption-icon"></i>' + FacePhotoName);
        } else {
            rmauc.DiaLog.winDialog(data.response.Remak, 2);
            $('#' + previewId).find(rmauc.c.bkfr).click();
        }
    },
    function (event, files) { }); // 错误处理
// 弹出窗口
function WinDiaLog(msg) {
    var clintWidth = document.documentElement.clintWidth || document.body.clintWidth;
    var clintHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var btnOffsetTop = obj.offset().top; // 提交按钮的高度
    var parentClintHeight = window.parent.parent.document.body.clientHeight; // 高度

    layer.alert(msg, {
        icon: 2,
        skin: 'layer-ext-moon',
        offset: clintHeight - ((parentClintHeight / 2) + 146) + 'px'
    });
}


var txt = "";
var tfA = "";
var tfB = "";
$(function () {

    "use strict";

    //rmauc.fun.setInputVal(rmauc.i.bid, "B00000120160216"); // 测试

    // 显示pateView
    $(rmauc.i.fhrmm).find(rmauc.c.fp).show();


    // 设置副单位-动态面板
    $(rmauc.i.dp + ">" + rmauc.c.ps).on("click", function () {
        txt = $(this).find("p").text();
        if (txt == rmauc.enum.yes) {
            rmauc.facility.yesShow();
            rmauc.facility.dynamicInit(); // 隐藏时初始化副面板
        } else if (txt == rmauc.enum.no) {
            rmauc.facility.noShow();
            // 显示副单位
            rmauc.facility.checkDynamic();
        }
    });

    // 副单位 - 动态面板1
    $(rmauc.i.dvu + ">" + rmauc.c.ps).on("click", function () {
        tfA = $(this).hasClass(rmauc.enum.pe);
        if (tfA) {
            rmauc.facility.dvuMinShow();
        } else {
            var tf2 = $(this).hasClass(rmauc.enum.pn);
            if (tf2) {
                rmauc.facility.dvuDynamicShow();
            }
        }
        rmauc.facility.checkDynamic();
    });

    // 副单位 - 动态面板2
    $(rmauc.i.dsvu + ">" + rmauc.c.ps).on("click", function () {
        tfB = $(this).hasClass(rmauc.enum.pe);
        if (tfB) {
            rmauc.facility.dsvuMinShow();
        } else {
            var tf2 = $(this).hasClass(rmauc.enum.pn);
            if (tf2) {
                rmauc.facility.dsvuDynamicShow();
            }
        }
        rmauc.facility.checkDynamic();
    });

    // select 选中事件
    $(rmauc.i.drmu + "," + rmauc.i.dau).on("change", function () {
        var e = $(this);
        var obj = rmauc.fun.getSelectValue(e);
        if (e.attr("id") === rmauc.enum.drmu) { //主单位
            // 获取副单位select 值
            var dau = rmauc.fun.getSelectValue(rmauc.i.dau);
            if (obj.text == dau.text) {
                //rmauc.DiaLog.winDialog("主单位不能与副单位一样，请重新选择");
                //重置副单位的选中值
                //rmauc.fun.settingSelect.index(e, 1);
            }

        } else {
            if (e.attr("id") === rmauc.enum.dau) { // 副单位
                // 获取主单位select 值
                var drmu = rmauc.fun.getSelectValue(rmauc.i.drmu)
                if (obj.text == drmu.text) {
                    //rmauc.DiaLog.winDialog("副单位不能与主单位一样，请重新选择");
                    // 重置副单位的选中值
                    //rmauc.fun.settingSelect.index(e, 1);

                }
            }
        }
        rmauc.facility.checkDynamic();
    });

    // 取消按钮
    $(rmauc.i.btnexit).on("click", function () {
        $.PE_FrameTab.AddNew('/Setting/JXCBaseSetting.aspx?act=rml', '添加原料');
        return false;
    });

    // 提交按钮
    rmauc.Event.add.click(rmauc.i.Ibtns, function (obj) {
        try {
            var choice = $(obj).data("choice");
            if (choice === "submit") {
                return;
            }
            if (choice != "Add" && choice != "edit") {
                rmauc.DiaLog.winDialog("您没有权限", 4);
                return;
            }
            var btnConfig = {
                inputId: {
                    dp: "#dynamic_panel", // 副单位
                    trn: "#tbRmauName",  // 原料名称
                    drt: "#ddlRmauType", // 原料分类
                    drmu: "#ddlRmauMainUnit", // 主单位
                    au: "#accessory_unit", // 副单位详情
                    dau: "#ddlAccessoryUnit", // 副单位
                    jmu: "#joinMainUnit", //换算关系（主）
                    jd: "#joinDynamic",// 换算关系 （ 副 ）
                    dvu: "#divValuationUnit",// 副计价单位
                    dsvu: "#divSelectValuationUnit", // 副库存查看单位
                    tbc: "#tbBarcode", // 条形码
                    tpd: "#txtPlatDes",//保质期
                    th1: "#tbHS1", // 主单位换算关系
                    th2: "#tbHS2", // 副单位换算关系
                    bid: "#bid",// 商圈ID
                    rmm: "#rawMaterialMap", // 原料图
                    fhrmm: "#file-how-raw-material-map", // 原料图最外层div id
                    btnexit: "#btn-exit", // 取消按钮
                    Ibtns: "#btn-submit", // 保存按钮
                    btn_armt: "#addRawMaterialType", //添加原料分类
                    btn_act: "#addCompanyType", //添加单位管理
                },
                Reg: {
                    Special: /[&*%$#]/,
                    Chinese: /^[\u4E00-\u9FA5]*$/
                }
            };
            var PName = $(btnConfig.inputId.trn).val().trim();//原料名称
            if (PName == "") {
                rmauc.DiaLog.winDialog("原料名称不能为空", 5);
                $(btnConfig.inputId.trn).focus();
                return;
            }
            if (PName.length > 5) {
                rmauc.DiaLog.winDialog("原料名称请输入5个字符以内", 5);
                $(btnConfig.inputId.trn).focus();
                return;
            }
            var PTypeID = $(btnConfig.inputId.drt).val().trim();//原料分类
            var MainUnitID = $(btnConfig.inputId.drmu).val().trim();// 主单位名称
            if (txt === rmauc.enum.no) {
                var ViceUnitStatus = 1;
                var ViceUnitID = $(btnConfig.inputId.dau).val().trim();//副单位名称下拉框
                if (ViceUnitID == "") {
                    rmauc.DiaLog.winDialog("请选择副单位名称", 2);
                    return;
                }
                if (MainUnitID == ViceUnitID) {
                    rmauc.DiaLog.winDialog("主单位与副单位名称不能重复", 2);
                    return;
                }
                var u = /^[1-9]*[1-9][0-9]*$/;
                var MainUnitRatio = $(btnConfig.inputId.th1).val().trim();//主单位对副单位的换算单位--主单位
                var ViceUnitRatio = $(btnConfig.inputId.th2).val().trim();//主单位对副单位的换算单位--副单位
                if (MainUnitRatio == "") {
                    rmauc.DiaLog.winDialog("请输入单位换算的主单位", 2);
                    return;
                }
                if (MainUnitRatio != "" && !u.test(MainUnitRatio)) {
                    rmauc.DiaLog.winDialog("单位换算的主单位的格式不正确,请输入数字", 2);
                    return;
                }
                if (ViceUnitRatio == "") {
                    rmauc.DiaLog.winDialog("请输入单位换算的副单位", 2);
                    return;
                }
                if (ViceUnitRatio != "" && !u.test(ViceUnitRatio)) {
                    rmauc.DiaLog.winDialog("单位换算的副单位的格式不正确,请输入数字", 2);
                    return;
                }
                if (MainUnitRatio != 1 && ViceUnitRatio != 1) {
                    rmauc.DiaLog.winDialog("换算关系必须有一方为1", 2);
                    return;
                }
                if (tfA) {
                    var PriceUint = 2;
                } else {
                    var PriceUint = 1;
                }
                if (tfB) {
                    var StorageUint = 2;
                } else {
                    var StorageUint = 1;
                }
            } else {
                var ViceUnitStatus = 0;
            }
            var PBarCode = $(btnConfig.inputId.tbc).val().trim();// 条形码
            var GuaranteePeriod = $(btnConfig.inputId.tpd).val().trim();// 保质期
            if (GuaranteePeriod == "") {
                GuaranteePeriod = 0;
            }
            var g = /^[0-9]*[0-9][0-9]*$/;
            if (GuaranteePeriod != "" && !g.test(GuaranteePeriod)) {
                rmauc.DiaLog.winDialog("保质期请输入自然数", 5);
                $(btnConfig.inputId.tpd).focus();
                return;
            }
            if (Number(GuaranteePeriod) > 36500) {
                rmauc.DiaLog.winDialog("保质期请输入小于36500的自然数", 5);
                $(btnConfig.inputId.tpd).focus();
                return;
            }
            var FacePhoto = $(".file-preview-frame:eq(0)").attr("data-in");// 原料图

            var postJson = {}; //提交后台Json数据
            postJson.PName = PName;//原料名称
            postJson.PTypeID = PTypeID;//原料分类
            postJson.MainUnitID = MainUnitID;//主单位名称
            postJson.ViceUnitStatus = ViceUnitStatus; //是否副单位
            postJson.ViceUnitID = ViceUnitID; //副单位名称
            postJson.MainUnitRatio = MainUnitRatio;//主单位对副单位的换算单位--主单位
            postJson.ViceUnitRatio = ViceUnitRatio;//主单位对副单位的换算单位--副单位
            postJson.PriceUint = PriceUint;//计价单位
            postJson.StorageUint = StorageUint;//库存查看单位
            postJson.PBarCode = PBarCode;// 条形码
            postJson.GuaranteePeriod = GuaranteePeriod;// 保质期
            postJson.FacePhoto = FacePhoto;// 原料图

            var yltpAll = $('.file-preview-thumbnails div[data-template="image"]');
            //if (yltpAll.length == 0) {
            //    WinDiaLog("请上传原料图片");
            //    return;
            //}
            // 异步调用
            $(rmauc.i.Ibtns).removeAttr("data-choice").attr("data-choice", "submit").text("请稍后...");
            rmauc.Fn.ajax('http://' + window.location.host + '/Action/RawMaterialAU.ashx?Action=' + choice + '&Bussid=' + $("#bid").val() + '&pid=' + pid, JSON.stringify(postJson), function (data) {
                $(rmauc.i.Ibtns).removeAttr("data-choice").attr("data-choice", choice).text("确定");
                if (data == null || data == "") {
                    var dialogMsg = (choice === "Add" ? "添加商品失败" : "修改商品失败");
                    rmauc.DiaLog.winDialog(dialogMsg, 5);
                    return;
                }
                var dataJson = JSON.parse(data);
                if (dataJson.flag == "true") {
                    $.PE_FrameTab.AddNew('/Setting/JXCBaseSetting.aspx?act=rml', '添加原料');
                } else {
                    rmauc.DiaLog.winDialog(dataJson.msg, 5);
                }
            });

            // 空值 及 长度验证
            function isNull(dom, msg, maxLen) {
                var data = $(dom).val().trim();
                if (data == null || data.length <= 0 || data.length > maxLen) {
                    WinDiaLog("请输入1-" + maxLen + "位的字符的" + msg);
                    postJson = {};
                    throw new DOMException();
                }
                return data;
            }

            // 弹出窗口
            function WinDiaLog(msg) {
                var clintWidth = document.documentElement.clintWidth || document.body.clintWidth;
                var clintHeight = document.documentElement.clientHeight || document.body.clientHeight;
                var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                var btnOffsetTop = obj.offset().top; // 提交按钮的高度
                var parentClintHeight = window.parent.parent.document.body.clientHeight; // 高度

                layer.alert(msg, {
                    icon: 2,
                    skin: 'layer-ext-moon',
                    offset: clintHeight - ((parentClintHeight / 2) + 146) + 'px'
                });
            }
            return Json;
        } catch (e) {
        }
    });

    // 页面初始化
    var actions = rmauc.Fn.GetQueryString("action");// 获取控制
    var pid = rmauc.Fn.GetQueryString("pid") // 获取参数
    if (actions != null && actions.length > 0) {
        $("#RmauNavigationName").text("编辑原料");
        $("#RmauTitleName").text("编辑原料");
        $(rmauc.i.Ibtns).removeAttr("data-choice");

        if (pid == null || pid.length <= 0) {
            var name = actions === "see" ? "查看原料" : actions === "edit" ? "编辑原料" : "";
            rmauc.DiaLog.winDialog(name + "初始化失败！请刷新页面重试", 2);
            return;
        }
        var SeccViewConfig = {
            inputId: {
                dp: "#dynamic_panel", // 副单位
                trn: "#tbRmauName",  // 原料名称
                drt: "#ddlRmauType", // 原料分类
                drmu: "#ddlRmauMainUnit", // 主单位
                au: "#accessory_unit", // 副单位详情
                dau: "#ddlAccessoryUnit", // 副单位
                jmu: "#joinMainUnit", //换算关系（主）
                jd: "#joinDynamic",// 换算关系 （ 副 ）
                dvu: "#divValuationUnit",// 副计价单位
                dsvu: "#divSelectValuationUnit", // 副库存查看单位
                tbc: "#tbBarcode", // 条形码
                tpd: "#txtPlatDes",//保质期
                th1: "#tbHS1", // 主单位换算关系
                th2: "#tbHS2", // 副单位换算关系
                bid: "#bid",// 商圈ID
                rmm: "#rawMaterialMap", // 原料图
                fhrmm: "#file-how-raw-material-map", // 原料图最外层div id
                btnexit: "#btn-exit", // 取消按钮
                Ibtns: "#btn-submit", // 保存按钮
                btn_armt: "#addRawMaterialType", //添加原料分类
                btn_act: "#addCompanyType", //添加单位管理
            },
            Reg: {
                Special: /[&*%$#]/,
                Chinese: /^[\u4E00-\u9FA5]*$/
            },
            Fn: {
                // 复制函数，domIc ：dom的ID或class  value:填写的值
                AssignmentInput: function (domIc, value) {
                    var values = "";
                    if (value != null) {
                        values = value;
                    }
                    $(domIc).val(values);
                }
            }
        };
        rmauc.Fn.ajax('http://' + window.location.host + '/Action/RawMaterialAU.ashx?Action=' + actions + '&pid=' + pid + '&Bussid=' + $("#bid").val(), "", function (data) {
            if (data == null || data == "") {
                rmauc.DiaLog.winDialog("页面初始化失败，请刷新后重试！", 2);
                return;
            }
            var dataJson = JSON.parse(data);
            if (dataJson != null) {
                try {
                    SeccViewConfig.Fn.AssignmentInput(SeccViewConfig.inputId.trn, dataJson[0].PName);//原料名称
                    SeccViewConfig.Fn.AssignmentInput(SeccViewConfig.inputId.drt, dataJson[0].PTypeID);//原料分类
                    SeccViewConfig.Fn.AssignmentInput(SeccViewConfig.inputId.drmu, dataJson[0].MainUnitID);// 主单位名称
                    //是否副单位
                    if (dataJson[0].ViceUnitStatus == 1) {
                        txt = rmauc.enum.no;//是副单位--赋值
                        rmauc.facility.noShow();
                        // 显示副单位
                        rmauc.facility.checkDynamic();
                        SeccViewConfig.Fn.AssignmentInput(SeccViewConfig.inputId.dau, dataJson[0].ViceUnitID);// 副单位名称下拉框
                        SeccViewConfig.Fn.AssignmentInput(SeccViewConfig.inputId.jmu, dataJson[0].MainUnitName);// 主单位名称文本
                        SeccViewConfig.Fn.AssignmentInput(SeccViewConfig.inputId.jd, dataJson[0].ViceUnitName);// 副单位名称文本
                        SeccViewConfig.Fn.AssignmentInput(SeccViewConfig.inputId.th1, dataJson[0].MainUnitRatio);// 主单位对副单位的换算单位--主单位
                        SeccViewConfig.Fn.AssignmentInput(SeccViewConfig.inputId.th2, dataJson[0].ViceUnitRatio);// 主单位对副单位的换算单位--副单位
                        //计价单位是否是主单位
                        if (dataJson[0].PriceUint == 1) {
                            tfA = false;
                            rmauc.facility.dvuDynamicShow();
                            rmauc.facility.checkDynamic();
                        }
                        else {
                            tfA = true;
                            rmauc.facility.dvuMinShow();
                            rmauc.facility.checkDynamic();
                        }
                        //库存查看单位是否是主单位
                        if (dataJson[0].StorageUint == 1) {
                            tfB = false;
                            rmauc.facility.dsvuDynamicShow();
                            rmauc.facility.checkDynamic();
                        }
                        else {
                            tfB = true;
                            rmauc.facility.dsvuMinShow();
                            rmauc.facility.checkDynamic();
                        }
                    } else if (txt == rmauc.enum.no) {
                        rmauc.facility.yesShow();
                        rmauc.facility.dynamicInit(); // 隐藏时初始化副面板
                    }
                    SeccViewConfig.Fn.AssignmentInput(SeccViewConfig.inputId.tbc, dataJson[0].PBarCode);// 条形码
                    SeccViewConfig.Fn.AssignmentInput(SeccViewConfig.inputId.tpd, dataJson[0].GuaranteePeriod);// 保质期
                    // 图片绑定
                    var yltp = $(rmauc.i.fhrmm);//原料图片
                    var yltpDynamicGenerationHtml = forArrayFun(new Array(dataJson[0].FacePhoto), true)// rmauc.Template.GenerateImageParentOption("rawMaterialMap", , "无原料图片 …"); // 原料图片
                    if (yltp.find(rmauc.i.Cfi).length < 0) {
                        //yltp.prepend(rmauc.Template.GenerateImageParentFileInputOption(yltpDynamicGenerationHtml));
                    } else {
                        if (yltpDynamicGenerationHtml != "") {
                            $(".file-drop-zone-title").hide();
                            yltp.find(rmauc.i.Cfi).prepend(yltpDynamicGenerationHtml);
                            $('button[data-event="delete"]').on("click", function () {
                                $(this).parents("div.file-preview-frame").remove();
                                $(".file-caption-name").attr("title", "");
                                $(".file-caption-name").text("");
                                $(".file-drop-zone-title").show();
                            });
                            var FacePhotoName = $(".file-preview-frame:eq(0)").attr("data-in");// 原料图
                            $(".file-caption-name").attr("title", FacePhotoName);
                            $(".file-caption-name").append('<i class="glyphicon glyphicon-file kv-caption-icon"></i>' + FacePhotoName);
                        }
                    }

                    //SeccViewConfig.Fn.AssignmentInput(SeccViewConfig.inputId.rmm, dataJson[0].FacePhoto);// 原料图

                    //// 文件上传框
                    //$('input[class=projectfile]').each(function () {
                    //    //var imageurl = $(this).attr("value");
                    //    if (true) {
                    //        var op = $.extend({
                    //            initialPreview: [ // 预览图片的设置
                    //            "<img src='" + dataJson[0].FacePhoto + "' class='file-preview-image'>", ]
                    //        }, rmauc.Fn.projectfileoptions);

                    //        $(this).fileinput(op);
                    //    } else {
                    //        $(this).fileinput(rmauc.Fn.projectfileoptions);
                    //    }
                    //});

                    if (actions === "see") {
                    } else if (actions === "edit") {
                        $(rmauc.i.Ibtns).attr("data-choice", "Add");
                    }
                    if (actions === "see") {
                        $('input,select').attr('disabled', true);
                    }
                } catch (e) {

                }
            } else {
                rmauc.DiaLog.winDialog("查看原料失败", 5);
            }
        });
    }
});


// 循环图片集合函数
function forArrayFun(array, tf) {
    var html = "";
    if (array != null && typeof array != "undefined" && array.length > 0) {
        for (var i = 0, ilen = array.length; i < ilen; i++) {
            if (array[i].length <= 0) {
                continue;
            }
            var arrayIsplit = array[i].split('P_XXX/');
            html += rmauc.Template.GenerateImageFindOption(array[i], arrayIsplit[arrayIsplit.length - 1], tf);
        }
    }
    return html;
}

