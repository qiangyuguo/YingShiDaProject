/// <summary>
/// 添加商品页面JS
/// 开发人：郑开金
/// 开发时间：2016-09-26 15：46
/// </summary>
$(function () {

    $("img[id^='rptIntroPhotoes']").each(function (e, d) {
        setLocation(d);
    });

    $("img[id^='rptShowPhotoes']").each(function (e, d) {
        setLocation(d);
    });

    function setLocation(o) {
        var id = o.id.replace('Image1', 'FileUpload2');
        var pos = $(o).position();
        var f = $('#' + id);
        f.css('position', 'absolute');
        f.css('z-index', '2');
        f.offset({ top: pos.top, left: pos.left });
    }

    var addLen = $("#btnAddSpec").length;
    var delLen = $("#btnDelete").length;

    var SICC = {
        Ccmsb: "div.c-multipleSpecBox",
        Ccmisn: "input.c-msp-input-specName",
        Ccmii: "div.c-msp-i-item",
        Csi: "div.selectize-input",
        Cmi: "div.c-msp-item",
        Ccmc: "a.c-msp-close",
        Clcsl: "label.c-spec-labe",
        Ccmsn: "div.c-msp-specName",
        Ccmi: "div.c-mspv-item",
        Crm: ".remove",
        Cfi: '.file-input',
        Ctrop: '.trOp',
        Ias: "#addSpec",
        Icmr: "#c-msg-red",
        Icpt: "#c-product-table",
        IcptTheadTr: "#c-product-table  thead  tr",
        IcptTheadTh: "#c-product-table  thead  th",
        IcptTbodyTr: "#c-product-table  tbody  tr",
        IcptTbodyTd: "#c-product-table  tbody  td",
        Iusc: "#unifiedSettingCost",
        Iusp: "#unifiedSettingPrice",
        Iuso: "#unifiedSettingOffers",
        Iust: "#unifiedSettingThumbnail", // 统一设置图片ID
        Iussh: "#unifiedSettingShowHide", //显示或隐藏移除规格按钮
        Ibtns: "#btn-submit",
        Ius: "#unifiedSetting",
        Iim: "#inpMoney",
        Ihmt: "#hidMoneyType",
        Ibsm: "#btn_SettingMoeny",
        Ifszstp: "#file-show-zstpimg",
        Ifsjstp: "#file-show-jstpimg",
        Itpn: "#txtPName",
        Itip: "layer-tip",
        IspanLayer: 'spanLayer',
        Iundh: "#updateNameDH",
        Iunt: "#updateNameTit",
        Iexit: "#btn-exit",
        Iasv: "#uAddSpecValue",
        Ck: "checked",
        Usc: "unifiedSettingCost",
        Usp: "unifiedSettingPrice",
        Uso: "unifiedSettingOffers",
        Ust: "unifiedSettingThumbnail",
        Ussh: "unifiedSettingShowHide",
        Afe: ['jpg', 'png', 'gif'], //文件上传格式
        En: {
            Ck: "click",
            Bl: "blur",
            Ip: "input propertychange"
        },
        Cn: {
            Cl: "class",
            CThead: "thead",
            CTbody: "tbody",
            CTr: "tr",
            CTh: "th",
            CTd: "td"
        },
        DataMsg: {
            // specName:规格名称 specValue:规格值名称
            IsSpecValue: function (specName, specValue) {
                return "提示：" + specName + "下已存在相同( " + specValue + " )规格值,请重新输入";
            }
        },
        DataJson: {
            SpecJson: { "name": "", "data": [] },
            DomSettingJson: function (str_px) {
                return { "width": str_px + "px", "opacity": "1", "position": "relative", "left": "0px" }
            }
        },
        Fn: {
            // 0：自动获取内容 1：不需要获取文本内容
            SpecDomSetting: function (obj, type) {
                var str;

                if (type === 1) {
                    $(obj).val("");
                }

                str = $(obj).val().trim();

                if (str.length <= 0) {

                    $(obj).css(SICC.DataJson.DomSettingJson(13));

                } else {

                    $(obj).css(SICC.DataJson.DomSettingJson(str.length * 13));

                }
            },

            // 删除规格值标签函数，obj为delete标签的DOM
            DeleteSpecValue: function (obj) {
                if (obj == null) {
                    return;
                }

                var specValueList = obj.parent(SICC.Csi).find(SICC.Ccmi);

                var specValueArray = "";

                if (specValueList != null && specValueList.length > 0) {

                    for (var i = 0; i < specValueList.length; i++) {

                        var value = $(specValueList[i]).data('value') + "";
                        value = value.trim();

                        if (value == "" || value.length <= 0) {

                            value = $(specValueList[i]).text().trim().split('x')[0];

                        }

                        if (specValueArray == "" || specValueArray.length <= 0) {

                            specValueArray = value;

                        } else {

                            specValueArray += "," + value;

                        }
                    }
                }

                var str = obj.val().trim();
                if (str.length > 5) {
                    layer.tips("规格值最多只能输入1-5位字符", obj);
                    return;
                }
                if (str.length > 0 && str.length <= 5) {

                    // 检查数据是否重复
                    if (specValueArray.length > 0) {

                        // 所有标签数据
                        var specValueArrayList = specValueArray.split(',');

                        if (specValueArrayList.length > 0) {

                            for (var i = 0, len = specValueArrayList.length ; i < len; i++) {

                                if (specValueArrayList[i] != "" && specValueArrayList[i] == str) {

                                    // 数据重复

                                    var strSpec = obj.parents(SICC.Ccmii).find(SICC.Ccmsn + " >" + SICC.Ccmisn).val();

                                    $(SICC.Icmr).text(SICC.DataMsg.IsSpecValue(strSpec, str)).show();

                                    setTimeout(function () { $(SICC.Icmr).hide() }, 5000);

                                    obj.focus();

                                    return;
                                }
                            }
                        }
                    }

                    // 添加标签
                    obj.before(SICC.Template.SpecValueTemplate(str));

                    //向Tabel中添加数据

                    var cmitem = obj.prevAll(SICC.Ccmi).length - 1;

                    var cmitemObj = obj.parent(SICC.Csi).find(SICC.Ccmi + ":eq(" + cmitem + ") > " + SICC.Crm);

                    SICC.Event.add.click(cmitemObj, function (jObj) {

                        jObj.parent(SICC.Ccmi).remove();
                        SICC.Fn.AddTableColIsRow.RefreshTable.FunOne();
                    });

                    SICC.Fn.SpecDomSetting(obj, 1);

                    SICC.Fn.AddTableColIsRow.RefreshTable.FunOne();

                    obj.focus();
                }
            },

            // 退格键删除规格标签,Obj
            BackspaceDeleteSpecValue: function (obj) {

                if (obj == null) {
                    return;
                }

                var str = obj.val().trim();
                var specValueList = obj.parent(SICC.Csi).find(SICC.Ccmi);

                if (str.length <= 0 && specValueList != null && specValueList.length > 0) {

                    obj.prev(SICC.Ccmi).remove();

                    SICC.Fn.AddTableColIsRow.RefreshTable.FunOne();

                }
            },

            // 添加 table行、列
            AddTableColIsRow: {

                // 添加列 colcount:内容
                Col: {
                    th: function (content) {
                        return "<th>" + content + "</th>";
                    },
                    td: function (content) {
                        return "<td>" + content + "</td>";
                    }
                },

                // 添加行
                Row: function () {
                    console.log($(SICC.IcptTbodyTr + "eq(0)").clone(true));
                },

                RefreshTable: {

                    // 使用二维数组完成规格值
                    FunOne: function () {

                        try {
                            var arrSpecValue = []; // 存放所有规格值二维数组
                            // 获取规格个数
                            var specArray = $(SICC.Ccmsb).find(SICC.Ccmii);
                            for (var a = 0, alen = specArray.length; a < alen ; a++) {

                                var specName = $(specArray[a]).find(SICC.Ccmisn).val();
                                var specValue = $(specArray[a]).find(SICC.Ccmi);
                                var specValueArray = [];
                                for (var b = 0, bLen = specValue.length; b < bLen; b++) {
                                    specValueArray.push($(specValue[b]).attr("data-value"));
                                }

                                if (specValueArray != null && specValueArray.length > 0) {
                                    arrSpecValue.push(specValueArray);
                                } else {
                                    arrSpecValue.push([""]);
                                }
                            }

                            // 获取规格值
                            if (arrSpecValue.length < 3) {
                                for (var i = 0, ilen = 3 - arrSpecValue.length; i < ilen; i++) {
                                    arrSpecValue.push([""]);
                                }
                            }

                            var sarr = [[]]; // 最后正确的规格值
                            for (var i = 0; i < arrSpecValue.length; i++) {
                                var tarr = [];
                                for (var j = 0; j < sarr.length; j++) {
                                    for (var k = 0; k < arrSpecValue[i].length; k++) {
                                        tarr.push(sarr[j].concat(arrSpecValue[i][k]));
                                    }
                                }
                                sarr = tarr;
                            }

                            var parents = $(SICC.Icpt).parent();
                            $(SICC.Icpt).remove();
                            $(parents).append(SICC.Template.GenerateTable(sarr));
                            // 删除或恢复规格设置
                            SICC.Fn.tropClick();
                        } catch (e) {

                        }
                    },

                    // 函数三参数：arrayA 数组1 arrayB 数组2  arrayC 数组3  返回数组
                    // 返回格式： 1:2:3,4:5:6
                    FunThree: function (arrayA, arrayB, arrayC) {
                        var retStr = "";
                        try {
                            function CombinationA() {
                                if (arrayA != null && arrayA.length > 0) {
                                    for (var i = 0; i < arrayA.length; i++) {
                                        B(arrayA[i]);
                                    }
                                } else {
                                    CombinationB("");
                                }
                            }

                            function CombinationB(a) {
                                if (arrayB != null && arrayB.length > 0) {
                                    for (var i = 0; i < arrayB.length; i++) {
                                        C(a, arrayB[i]);
                                    }
                                } else {
                                    CombinationC(a, '""');
                                }
                            }

                            function CombinationC(a, b) {
                                if (arrayC != null && arrayC.length > 0) {
                                    for (var i = 0; i < arrayC.length; i++) {
                                        StringBuilder(a + ":" + b + ":" + arrayC[i]);
                                    }
                                } else {
                                    StringBuilder(a + ":" + b + ":" + '""');
                                }
                            }

                            function StringBuilder(str) {
                                if (retStr != "" && retStr.length > 0) {
                                    retStr = "," + str;
                                } else {
                                    retStr = str;
                                }
                            }
                        } catch (e) {
                            console.log("排列组合Error" + ex);
                        }

                        if (retStr === "" || retStr.length <= 0) {
                            return null
                        }
                        return retStr.split(',');

                    },

                    // 刷新函数
                    FunRefresh: function () {
                        // 克隆 tr
                        var trClone = $(SICC.IcptTbodyTr + "eq(0)").clone(true);
                    }
                }
            },

            // 多规格值表格处理函数
            AddTableManySpecVale: {

                // specIndex 规格索引,specName 规格名称,specName 规格值名称 
                addCol: function (specIndex, specName, specValeu) {
                    $(SICC.IcptTheadTh + ":eq(" + (specIndex) + ")").after(SICC.Fn.AddTableColIsRow.Col.th(specName));
                    $(SICC.IcptTbodyTr).find(SICC.Cn.CTd + ":eq(" + (specIndex) + ")").after(SICC.Fn.AddTableColIsRow.Col.td(specValeu));
                },

                // specIndex 规格索引位置
                delCol: function (specIndex) {
                    $(SICC.IcptTheadTh + ":eq(" + (specIndex) + ")").remove();
                    $(SICC.IcptTbodyTr).find(SICC.Cn.CTd + ":eq(" + (specIndex) + ")").remove();
                    SICC.Fn.AddTableColIsRow.RefreshTable.FunOne();
                }
            },

            // 统一设置函数
            unifiedSetting: {

                // title : 标题名称 type : 设置类型
                settingTitle: function (title, type) {
                    if ($(SICC.Ius).is(":hidden")) {
                        $(SICC.Ius).show();
                    }
                    $(SICC.Ius + " em").text(title + "：");
                    $(SICC.Ihmt).val(type);
                },

                // 设置vlaue值
                settingValue: function () {
                    try {
                        var DomItemAddLen = $(SICC.Ccmii).length;
                        var price = $(SICC.Iim).val().trim();
                        var str = $(SICC.Ihmt).val().trim();

                        var msg = str === SICC.Usc ? "成本价格" : str === SICC.Usp ? "销售价格" : "特价";

                        if (price === "" || price.length < 0 || str === "" || str.length < 0) {
                            layer.msg("请输入" + msg);
                            return;
                        }

                        var re = /^\d+(?=\.{0,1}\d+$|$)/;
                        if (!re.test(price)) {
                            layer.msg(msg + "只能是数字");
                            return;
                        }

                        // 格式转换
                        price = parseFloat(price).toFixed(2);

                        if (price < 0) {
                            layer.msg(msg + "不能小于0,只保留两位小数");
                            return;
                        }

                        if (str === SICC.Usc) {
                            // 统一设置成本价格
                            unifiedSettingSpecValue(DomItemAddLen + SICC.Fn.unifiedSetting.settingValueConfig.CBJG);

                        } else if (str === SICC.Usp) {
                            // 统一设置销售价格
                            unifiedSettingSpecValue(DomItemAddLen + SICC.Fn.unifiedSetting.settingValueConfig.XSJG);

                        } else if (str === SICC.Uso) {
                            // 统一设置特价
                            unifiedSettingSpecValue(DomItemAddLen + SICC.Fn.unifiedSetting.settingValueConfig.CPTJ);
                        }

                        // 设置价格函数
                        function unifiedSettingSpecValue(specIndex) {
                            $(SICC.IcptTbodyTr).find(SICC.Cn.CTd + ":eq(" + (specIndex) + ")").find("input[type='text']").val(price);
                            layer.msg("统一设置【" + msg + "】成功");
                        }

                        // 清空值 && 隐藏
                        {
                            // 清空值
                            $(SICC.Iim).val("");
                            $(SICC.Ihmt).val("");
                            $(SICC.Ius).hide();
                        }
                    } catch (e) {
                        alert("数据异常");
                    }

                },
                // 统一设置价格所在列配置
                settingValueConfig: {
                    CBJG: 2, //成本价格赋值
                    XSJG: 3, // 销售价格
                    CPTJ: 4 //商品特价
                }

            },

            /*
             * 图片文件上传 
             * ctrlName : 控件ID   
             * uploadUrl 图片上传地址  
             * afe : 允许文件扩展名字符串数组 ['jpg', 'gif', 'png']
             * maxLen: 最大上传文件个数
             */
            FileInput: function (ctrlName, uploadUrl, afe, maxLen) {
                var control = $("#" + ctrlName);
                control.fileinput({
                    language: 'zh',
                    uploadUrl: uploadUrl,
                    allowedFileExtensions: afe, // 上传文件后缀
                    overwriteInitial: false,
                    showUpload: true, // 是否显示上传按钮
                    showCaption: true, // 是否显示标题
                    //dropZoneEnabled: false,//是否显示拖拽区域
                    //minImageWidth: 50, //图片的最小宽度
                    //minImageHeight: 50,//图片的最小高度
                    //maxImageWidth: 1000,//图片的最大宽度
                    //maxImageHeight: 1000,//图片的最大高度
                    allowedFileTypes: ['image'], // 'video', 'flash'
                    maxFileSize: 1000,//单位为kb，如果为0表示不限制文件大小
                    minFileCount: 0,
                    maxFileCount: 10, //表示允许同时上传的最大文件个数
                    enctype: 'multipart/form-data',
                    validateInitialCount: true,
                    previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
                    msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
                    slugCallback: function (filename) {
                        return filename.replace('(', '_').replace(')', '_').replace(']', '_').replace('[', '_');
                    }
                }).on("fileuploaded", function (event, data) {
                    if (data.response) {
                        if (data.response['code'] == 0) {
                            alert("上传成功");
                            //$("#imgurl").val($("#imgurl").val() + '|' + data.response['img']);
                            //$("#iupload").val('1');
                        }
                        else {
                            alert("上传失败,请刷新再试");
                        }
                    }
                });
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
            WipeData: {
                All: function () {
                    $("#txtPName").val(""); // 商品名称
                    $("#txtUnitName").val(""); // 数量单位
                    $("#txtChenLieWeiZhi").val(""); // 成列位置
                    $("#txtPlatDes").val(""); // 商品特性描述

                    $("#isTheShelves").attr("checked", true); // 是否上架 checked
                    $("#isPos").attr("checked", true); // pos
                    $("#isWeChat").attr("checked", true); // 微信上传
                    $("#ddlPrdType option:selected");//商品分类ID
                    // 移除所有图片
                    $("#fileLiveThumbs-cpzstp").find(".file-preview-frame").remove();
                    $("#fileLiveThumbs-cpjstp").find(".file-preview-frame").remove();
                    $(".file-drop-zone").prepend('<div class="file-drop-zone-title" data-title="dropzone" style="">点击下方选择按钮，选择图片文件上传......</div>');
                    $(".file-caption-name").text("");

                    // 删除所有规格及规格值
                    $(SICC.Clcsl).click();
                }
            },
            GetQueryString: function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) {
                    return unescape(r[2]);
                }
                return null;
            },
            /** 
             * 设置select选中 
             * @param selectId select的id值 
             * @param checkValue 选中option的值 
            */
            SettingSelectChecked: function (selectId, checkValue) {
                var select = document.getElementById(selectId);
                for (var i = 0; i < select.options.length; i++) {
                    if (select.options[i].value == checkValue) {
                        select.options[i].selected = true;
                        break;
                    }
                }
            },

            // 设置删除和回复规格
            tropClick: function (objThis) {
                // 删除或修复规格
                $(SICC.Ctrop + ' > .theme-color ').on('click', function () {
                    var objThis = $(this);
                    var eq0 = objThis.parents("tr").find("td:eq(0)");
                    eq0.removeAttr("data-status");
                    if (objThis.text().trim() === "删除") {
                        var tbodyHidden = $(SICC.IcptTbodyTr + ":hidden"); // 查出TR的隐藏个数
                        var tbodyTr = $(SICC.IcptTbodyTr).length;
                        var submitData = $(SICC.Ibtns).attr("data-choice");
                        tbodyTr = tbodyTr - 1;
                        if (submitData === "modify") {
                            tbodyTr = tbodyTr - 1;
                        }
                        if (tbodyTr == tbodyHidden.length) {
                            SICC.DiaLog.winDialog("至少保留一个规格", 7);
                            return;
                        }
                        objThis.addClass("hidden");
                        objThis.next("a").removeClass("hidden");
                        eq0.attr("data-status", -1);
                        objThis.parents("tr").hide();

                    } else if (objThis.text().trim() === "恢复") {
                        objThis.addClass("hidden");
                        objThis.prev("a").removeClass("hidden");
                        eq0.attr("data-status", 1);
                    }
                });
            }
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
            SpecValueTemplate: function (content) {
                var temp = '<div data-value="' + content + '" class="c-mspv-item">';
                temp += content;
                temp += '<a href="javascript:void(0)" class="remove" title="删除规格值">x</a>';
                temp += '</div>';

                var CreateDom = document.createElement("body");
                CreateDom.innerHTML = temp;

                return CreateDom.firstChild;
            },

            /**
             * 添加商品时所以到的生成表格
             */
            GenerateTable: function (combination) {

                var tableHtml = '<table id="c-product-table">' +
                    '<thead>' +
                    '<tr>' +
                    '<th></th>' +
                    tableTheadTh() +
                    '<th style="width: 50px;">缩略图</th>' +
                    '<th>成本价格</th>' +
                    '<th>销售价格</th>' +
                    '<th>特价</th>' +
                    '<th>条形码</th>' +
                    '<th>商品编号</th>' +
                    '<th>批发价</th>' +
                    '<th>操作</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                    tableTbodyTrTd(combination) +
                    '</tbody>' +
                    '</table>';
                return tableHtml;

                function tableTheadTh() {
                    var th = "";
                    var specArray = $(SICC.Ccmsb).find(SICC.Ccmii);
                    for (var a = 0, alen = specArray.length; a < alen ; a++) {
                        var specName = $(specArray[a]).find(SICC.Ccmisn).val();
                        th += '<th>' + specName + '</th>'
                    }
                    return th;
                }

                function tableTbodyTrTd(combination) {
                    var trtd = "";
                    var specArray = $(SICC.Ccmsb).find(SICC.Ccmii);

                    // 生成TR
                    for (var i = 0; i < combination.length; i++) {
                        trtd += '<tr>';
                        trtd += '<td class="key" data-did="" data-status="1" >' + (i + 1) + '</td>';
                        // 生成TD
                        for (var a = 0, alen = specArray.length; a < alen ; a++) {
                            trtd += '<td class="tc mulspec1Value">' + combination[i][a] + '</td>';
                        }
                        trtd += '<td><img src="" alt="" class="image"  data-Name="" onclick="TableImageClick(this)" style="width: 50px"></td>';
                        trtd += '<td><input type="text" class="ui-input barcode" value="0"/></td>';
                        trtd += '<td><input type="text" class="ui-input barcode" value="0"/></td>';
                        trtd += '<td><input type="text" class="ui-input barcode" value="0"/></td>';
                        trtd += '<td><input type="text" class="ui-input barcode" value=""/></td>';
                        trtd += '<td><input type="text" class="ui-input barcode" value=""/></td>';
                        trtd += '<td><input type="text" class="ui-input barcode" value="0"/></td>'; // 批发价
                        trtd += '<td class="trOp" ><a href="javascript:void(0)" class="theme-color">删除</a>';
                        trtd += '<a href="javascript:void(0)" class="theme-color restore hidden">恢复</a></td>';
                        trtd += '</tr>';
                    }
                    return trtd;
                }
            },

            /**
             * 查看或修改时候用到的生表格
             * @param specArray 规格集合
             * @param specDetailArray 详情集合
             * @param type 类型，通过类型去控制删除按钮是否显示，类型有两种查看：false 修改:true
             */
            GenerateTableTow: function (specArray, specDetailArray, type) {
                var tableHtml = '<table id="c-product-table">' +
                   '<thead>' +
                   '<tr>' +
                   '<th></th>' + tableTheadTh() +
                   '<th style="width: 50px;">缩略图</th>' +
                   '<th>成本价格</th>' +
                   '<th>销售价格</th>' +
                   '<th>特价</th>' +
                   '<th>条形码</th>' +
                   '<th>商品编号</th>' +
                   '<th>批发价</th>' +
                   '<th>操作</th>' +
                   '</tr>' +
                   '</thead>' +
                   '<tbody>' + tableTbodyTrTd() +
                   '</tbody>' +
                   '</table>';
                return tableHtml;

                function tableTheadTh() {
                    var th = "";
                    if (specArray != null && specArray.length > 0) {
                        for (var a = 0, alen = specArray.length; a < alen ; a++) {
                            var specName = specArray[a].specName;
                            if (specName == null || specName.length <= 0) {
                                specName = "规格";
                            }
                            th += '<th>' + specName + '</th>';
                        }
                    } else {
                        th += '<th>无规格</th>';
                    }
                    return th;
                }

                function tableTbodyTrTd() {
                    var trtd = "";

                    // 生成TR
                    for (var i = 0, iLen = specDetailArray.length; i < iLen; i++) {
                        if (specDetailArray[i].Status === "-1") {
                            trtd += '<tr style = "display: none;" >';
                        } else {
                            trtd += '<tr>';
                        }
                        trtd += '<td class="key" data-did="' + specDetailArray[i].detailId + '" data-status="' + specDetailArray[i].Status + '" >' + (i + 1) + '</td>';
                        // 生成TD
                        if (specDetailArray[i].specValue != null && specDetailArray[i].specValue.length > 0) {
                            for (var a = 0, alen = specDetailArray[i].specValue.length; a < alen ; a++) {
                                trtd += '<td class="tc mulspec1Value">' + specDetailArray[i].specValue[a] + '</td>';
                            }
                        } else {
                            trtd += '<td class="tc mulspec1Value"></td>';
                        }

                        var dImage = specDetailArray[i].detailImage != '' ? specDetailArray[i].detailImage : "";
                        var sImageName = "";
                        if (dImage != null && dImage.length > 0) {
                            sImageName = dImage.split('P_XXX/')[1];
                        }

                        var pNumber = specDetailArray[i].pNumber === "null" ? "" : specDetailArray[i].pNumber;
                        var tradePrice = 0;
                        if (specDetailArray[i].TradePrice != null) {
                            tradePrice = parseFloat(specDetailArray[i].TradePrice).toFixed(2);
                        }

                        trtd += '<td><img src="' + dImage + '" alt="" class="image" onclick="TableImageClick(this)"  data-Name="' + sImageName + '" style="width: 50px"></td>';
                        trtd += '<td><input type="text" class="ui-input barcode" value="' + parseFloat(specDetailArray[i].cost).toFixed(2) + '"/></td>';
                        trtd += '<td><input type="text" class="ui-input barcode" value="' + parseFloat(specDetailArray[i].price).toFixed(2) + '"/></td>';
                        trtd += '<td><input type="text" class="ui-input barcode" value="' + parseFloat(specDetailArray[i].offers).toFixed(2) + '"/></td>';
                        trtd += '<td><input type="text" class="ui-input barcode" value="' + specDetailArray[i].barcode + '"/></td>';
                        trtd += '<td><input type="text" class="ui-input barcode" value="' + pNumber + '"/></td>'; // 添加字段商品编号
                        trtd += '<td><input type="text" class="ui-input barcode" value="' + tradePrice + '"/></td>'; // 添加字段商品批发价格
                        trtd += '<td class="trOp" >';
                        if (type != null && type) {
                            if (specDetailArray[i].Status === "1") {
                                trtd += '<a href="javascript:void(0)" class="theme-color">删除</a>';
                                trtd += '<a href="javascript:void(0)" class="theme-color restore hidden">恢复</a>';
                            } else if (specDetailArray[i].Status === "-1") {
                                trtd += '<a href="javascript:void(0)" class="theme-color hidden">删除</a>';
                                trtd += '<a href="javascript:void(0)" class="theme-color restore ">恢复</a>';
                            }
                        }
                        trtd += '</td>';
                        trtd += '</tr>';
                    }

                    // 只有在修改的是才显示 添加规格值 也就是type 等于 true 时
                    if (type != null && type && specDetailArray.length > 0 && (specDetailArray[0].specValue) != null) {
                        var sum = 9 + Number(specDetailArray[0].specValue.length);
                        trtd += "<tr>";
                        trtd += "<td colspan='" + sum + "'>";
                        trtd += '<a href="javascript:void(0)" class="theme-color" id="uAddSpecValue" >添加规格值</a>';
                        trtd += "</td>";
                        trtd += "</tr>";
                    } else {
                        trtd += '<tr style="display: none" ><td></td></tr>';
                    }
                    return trtd;
                }


            },
            GenerateTableTbodyTrtd: function (SerialNumber, trLen) {
                var specHtml = "";
                for (var i = 0; i < trLen; i++) {
                    specHtml += '<td class="tc mulspec1Value"></td>';
                }
                var html = '<tr>' +
                '<td class="key" data-status="1" data-did="" data-event="uyes" >' + SerialNumber + '</td>' + specHtml +
                '<td><img src="" alt="" class="image" onclick="TableImageClick(this)" data-name="" style="width: 50px"></td>' +
                '<td><input type="text" class="ui-input barcode" value="0"></td>' +
                '<td><input type="text" class="ui-input barcode" value="0"></td>' +
                '<td><input type="text" class="ui-input barcode" value="0"></td>' +
                '<td><input type="text" class="ui-input barcode" value=""></td>' +
                '<td><input type="text" class="ui-input barcode" value=""></td>' +
                '<td class="trOp"><a href="javascript:void(0)" class="theme-color">删除</a><a href="javascript:void(0)" class="theme-color restore hidden">恢复</a></td>' +
                '</tr>';
                return html;
            },

            GenerateTableValue: function (sum, parentstr, trhtml) {
                var html = '';
                html += ' <div class="winPopup-content">';
                html += '<div class="lists">';
                html += appendItem();
                html += '<i class="popup-tip" style="display: none;">请输字符</i>';
                html += '</div>';
                html += '</div>';
                function appendItem() {
                    var items = '';
                    for (var i = 0; i < sum; i++) {
                        items += '<div class="item">';
                        items += '<span class="key">' + $(SICC.IcptTheadTr).find("th:eq(" + (i + 1) + ")").text() + ':</span>';
                        items += '<span>';
                        items += '<input placeholder="规格值名称" class="key-input" value="" />';
                        items += '</span>';
                        items += '</div>';
                    }
                    return items;
                }

                layer.open({
                    type: 1,
                    title: "添加分类",
                    skin: 'layui-layer-molv',
                    //skin: 'layui-layer-rim', //加上边框
                    //shadeClose: true,
                    //shade: 0.3,
                    offset: '60%',
                    area: ['430px', '300px'], //宽高
                    btns: 2,
                    content: html,
                    btn: ['确定', '取消'],
                    yes: function (index, layero) {
                        var layerDom = $("#layui-layer" + index);
                        var layerDomItem = layerDom.find(".item");
                        var parentForm = layerDom.parent("body").find("form");
                        var specValueGroup = "";
                        var layerDomItemLen = layerDomItem.length;
                        for (var i = 0; i < layerDomItemLen; i++) {
                            var inputs = $(layerDomItem[i]).find("input").val().trim();
                            var spanKey = $(layerDomItem[i]).find("span.key").text();
                            if (inputs === "" && inputs.length <= 0) {
                                layerDom.find('.popup-tip').text("请在【" + spanKey + "】规格后的文本框中输入所需要【规格】").show(300).css({ "display": "block", "text-align": "center" });
                                return false;
                            }
                            if (specValueGroup === "") {
                                specValueGroup = inputs;
                            } else {
                                specValueGroup += "," + inputs;
                            }
                        }

                        if (!isSpecValueGroup()) {
                            return;
                        }

                        parentstr.before(trhtml);
                        SICC.Fn.tropClick();


                        // 循环向页面添加数据
                        var tbodyTrs = parentForm.find(SICC.IcptTbodyTr);
                        var tbodytrh = $(tbodyTrs[tbodyTrs.length - 2]);

                        for (var h = 0; h < layerDomItemLen; h++) {
                            tbodytrh.find("td:eq(" + (h + 1) + ")").text($(layerDomItem[h]).find("input").val().trim());
                        }

                        layer.closeAll();

                        // 检查是否已存在规格
                        function isSpecValueGroup() {
                            var tbodyTheadd = parentForm.find(SICC.IcptTheadTr);
                            var tbodyTr = parentForm.find(SICC.IcptTbodyTr);
                            try {
                                for (var j = 0; j < tbodyTr.length - 1; j++) {
                                    var theadThkey = "", tbodyTdJ = "";
                                    for (var k = 0; k < layerDomItemLen ; k++) {
                                        if (tbodyTdJ === "") {

                                            tbodyTdJ = $(tbodyTr[j]).find("td:eq(" + (k + 1) + ")").text().trim();
                                        } else {
                                            tbodyTdJ += "," + $(tbodyTr[j]).find("td:eq(" + (k + 1) + ")").text().trim();
                                        }
                                    }
                                    var trj = $(tbodyTr[j]);
                                    if (specValueGroup == tbodyTdJ) {
                                        if (trj.is(":hidden")) {
                                            SICC.DiaLog.winDialog("已存在相同规格组合，不能重复添加，您可以通过点击页面上的'显示已删除的规格'按钮进行恢复规格", 6);
                                            return false;
                                        } else {
                                            var datastatus = trj.find("td:eq(0)").attr("data-status");
                                            if (datastatus === "1") {
                                                SICC.DiaLog.winDialog("已存在相同规格组合,不能重复添加。", 2);
                                                return false;
                                            } else {
                                                SICC.DiaLog.winDialog("已存在相同规格组合，不能重复添加，您可以通过页面表格'操作'列中的恢复按钮进行恢复", 6);
                                                return false;
                                            }
                                        }
                                    }
                                }
                                return true;
                            } catch (e) {
                                SICC.DiaLog.winDialog("页面数据错误，请刷新页面后重试！", 2);
                                return false;
                            }
                        }
                    },
                    cancel: function (index) {

                    }
                });
            },

            /** 
             * 显示图片内容
             * @param addr 图片完整路径地址
             * @param fileName 图片名称
             * @param isDelete 是否显示图片删除按钮 true 显示 ， false 不显示，默认不显示
             */
            GenerateImageFindOption: function (addr, fileName, isDelete) {
                var deleteHtml = '';
                if (isDelete != null && isDelete) {
                    deleteHtml = '<button type="button" data-event="delete" class="kv-file-remove btn btn-xs btn-default" title="删除文件" onClick="deleteFun(this)"><i class="glyphicon glyphicon-trash text-danger"></i></button>';
                }
                var fileInputHtml = '<div class="file-preview-frame" data-ImgName=' + fileName + ' data-template="image">' +
                        '<div class="kv-file-content">' +
                            '<img src="' + addr + '" class="kv-preview-data file-preview-image" title=' + fileName + ' alt=' + fileName + ' style="width: auto; height: 160px;">' +
                        '</div>' +
                        '<div class="file-thumbnail-footer">' +
                            '<div class="file-footer-caption" title=' + fileName + '>' + fileName + '<br>' +
                        //'<samp>(' + (Number(size) / 1024).toFixed(2) + ' KB)</samp>' +
                        '</div>' +

                        '<div class="file-actions">' +
                            '<div class="file-footer-buttons">' + deleteHtml +
                            '</div>' +
                                    '<div class="clearfix"></div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
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

            /**
             * 生成规格行
             */
            GenerateSpecOption: function (specName, specValueHtml) {
                var name = "规格";
                if (specName != "") {
                    name = specName;
                }
                var html = '<div class="c-msp-i-item">' +
                            '<div class="c-msp-specName">' +
                            '<input type="text" class="c-msp-input-specName" name="name" value="' + name + '" maxlength="10">' +
                            '</div>' +
                            '<div class="c-msp-specValue">' +
                            '<div class="selectize-input">' +
                            specValueHtml +
                            '</div>' +
                            '</div>' +
                            '</div>';
                return html;
            },

            /**
             * 生成规格行内的规格值
             */
            GenerateSpecValueOpetion: function (specValeu) {
                return specValeu == "" ? "" : '<div data-value="asdas" class="c-mspv-item">' + specValeu + '</div>';
            }

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

    // 设置商品多规格 展开 隐藏事件
    $(SICC.Clcsl).on(SICC.En.Ck, function () {
        var domThis = $(this);

        domThis.toggleClass(function () {
            return SICC.Ck;
        });

        if (domThis.attr(SICC.Cn.Cl).indexOf(SICC.Ck) > 0) {

            $(SICC.Ccmsb).show();

            $(SICC.Ccmii + ":eq(0)").find(SICC.Ccmisn).val("规格1").parents(SICC.Ccmii).find(SICC.Csi + "> input:eq(0)").val("");

        } else {
            $(SICC.Ccmsb).hide();
            $(SICC.Ccmii).each(function (a, i) {
                if (a > 0) {
                    $(i).remove();
                }
            });
            $(SICC.Ccmii + ":eq(0)").find(SICC.Ccmisn).val("无规格").parents(SICC.Ccmii).find(SICC.Csi + "> input:eq(0)").val("");
            $(SICC.Ccmi).remove();
        }
        SICC.Fn.AddTableColIsRow.RefreshTable.FunOne();
        return false;
    });

    // 删除商品规格事件
    $(SICC.Ccmii + " " + SICC.Ccmc).on(SICC.En.Ck, function () {

        var DomItemDelteLen = $(SICC.Ccmii).length;

        var DomAddSpec = $(SICC.Ias).is(':hidden');

        if (DomItemDelteLen <= 3 && DomItemDelteLen > 0 && DomAddSpec) {

            $(SICC.Ias).show();

        }

        if (DomItemDelteLen > 1) {
            var objThis = $(this).parents(SICC.Ccmii);
            var objIndex = objThis.index();
            objThis.remove();

            // 多规格表格Del处理
            SICC.Fn.AddTableManySpecVale.delCol(objIndex + 1);

        } else {

            alert("规格启用时，至少保留一个规格");
        }
    });

    // 添加多规格事件
    $(SICC.Ias).click(function () {

        var DomItemAddLen = $(SICC.Ccmii);

        if (DomItemAddLen.length < 3) {

            var DomClone = $(SICC.Ccmii + ":eq(0)");

            $(SICC.Cmi).append(DomClone.clone(true));

            var Len = DomItemAddLen.length;

            $(SICC.Ccmii + ":eq(" + Len + ")").find(SICC.Ccmisn).val("规格" + (Len + 1)).parents(SICC.Ccmii).find(SICC.Csi + "> input:eq(0)").val("").prevAll(SICC.Ccmi).remove();
            $(SICC.Ccmii + ":eq(" + Len + ")").find('#' + SICC.Itip).removeAttr('id').attr('id', SICC.Itip + (Len + 1)).unbind();
            $(SICC.Ccmii + ":eq(" + Len + ")").find('#' + SICC.IspanLayer).removeAttr('id').attr('id', SICC.IspanLayer + (Len + 1));

            SICC.DiaLog.winSpec(SICC.Itip + (Len + 1), SICC.IspanLayer + (Len + 1)); // 提示信息绑定

            if (DomItemAddLen.length == 2) {
                $(SICC.Ias).hide();
            }

            // 多规格表格Add处理
            SICC.Fn.AddTableManySpecVale.addCol(Len, "规格" + (Len + 1), "");

            SICC.Fn.AddTableColIsRow.RefreshTable.FunOne();
        }

    });

    // 规格值事件
    $(SICC.Ccmii + " " + SICC.Csi).on(SICC.En.Ck, function () {

        var StrInput = $(this).find("input:eq(0)").focus().val();

        var Str = $(this).parents(SICC.Ccmii).find(SICC.Ccmsn + ">" + SICC.Ccmisn).val().trim();

        return false;
    });

    // 规格值input文本框事件    
    $(SICC.Csi + ">input:eq(0)").on({

        blur: function () {

            SICC.Fn.DeleteSpecValue($(this));

            return false; // 防止事件递归

        }, propertychange: function () { //兼容IE9以下版本

            SICC.Fn.SpecDomSetting($(this));

            SICC.Fn.AddTableColIsRow.RefreshTable.FunOne();

            return false; // 防止事件递归

        }, input: function () {

            SICC.Fn.SpecDomSetting($(this));

            SICC.Fn.AddTableColIsRow.RefreshTable.FunOne();

            return false; // 防止事件递归

        }, keydown: function (e) {

            if (e.keyCode == 9 || e.keyCode == 13) {

                SICC.Fn.DeleteSpecValue($(this));

                SICC.Fn.AddTableColIsRow.RefreshTable.FunOne();

                return false; // 防止事件递归

            } else if (e.keyCode == 8) {

                SICC.Fn.BackspaceDeleteSpecValue($(this)); // 退格键事件

            }
        }
    });

    // 规格事件
    $(SICC.Ccmii + " " + SICC.Ccmisn).on({
        blur: function () {
            var objThis = $(this);
            var objThisStr = objThis.val().trim();
            if (objThisStr.length > 2) {
                layer.tips("规格名称最多只能输入1-2位字符", objThis);
                return false;
            }
            if (objThisStr != "" && objThisStr > 0 && objThisStr.length <= 2) {

                // 获取节点位置
                var index = objThis.parents(SICC.Ccmii).index();

                // 动态设置名称
                $(SICC.IcptTheadTh + ":nth-child(" + (index + 2) + ")").text(objThis.val());
            }
        }
    });

    // 统一设置事件
    $(SICC.Iusc + "," + SICC.Iusp + "," + SICC.Iuso + "," + SICC.Iust).on(SICC.En.Ck, function () {

        switch ($(this).attr("id")) {
            case SICC.Usc://统一设置成本价格
                SICC.Fn.unifiedSetting.settingTitle("成本价格", SICC.Usc);
                break;
            case SICC.Usp://统一设置销售价格
                SICC.Fn.unifiedSetting.settingTitle("销售价格", SICC.Usp);
                break;
            case SICC.Uso://统一设置特价
                SICC.Fn.unifiedSetting.settingTitle("特价", SICC.Uso);
                break;
            case SICC.Ust: // 统一设置图片
                TableImageClick($(this));
                break;
            default:

                break;
        }
        return false;
    });

    // 统一设置价格事件
    SICC.Event.add.click(SICC.Ibsm, function (obj) { SICC.Fn.unifiedSetting.settingValue(); });

    // 提交按钮
    SICC.Event.add.click(SICC.Ibtns, function (obj) {
        try {
            var choice = $(obj).data("choice");
            if (choice === "submit") {
                return;
            }
            if (choice != "Add" && choice != "modify") {
                SICC.DiaLog.winDialog("您没有权限", 4);
                return;
            }

            var btnConfig = {
                inputId: {
                    pName: "#txtPName", //商品名称ID
                    pType: "#ddlPrdType option:selected",//商品分类ID
                    pUname: "#txtUnitName",//商品数量单位ID
                    pClwz: "#txtChenLieWeiZhi", //商品陈列位置 100
                    pPlatDes: "#txtPlatDes",// 商品特性描述
                    pisTheShelves: "#isTheShelves",// 是否上架
                    piPos: "#isPos",// 展示pos平台
                    piWeChat: "#isWeChat", // 展示微信商城
                },
                Reg: {
                    Special: /[&*%$#]/,
                    Chinese: /^[\u4E00-\u9FA5]*$/
                }
            };
            var fl = $(btnConfig.inputId.pType).val();
            var clwz = $(btnConfig.inputId.pClwz).val();
            var pd = $(btnConfig.inputId.pPlatDes).val();
            var sl = $(btnConfig.inputId.pisTheShelves).is(":checked") ? 2 : 1;
            var ck = WeChatJoin($(btnConfig.inputId.piWeChat).is(":checked"), $(btnConfig.inputId.piPos).is(":checked"));

            var postJson = {}; // 提交后台Json数据
            postJson.pName = isNull(btnConfig.inputId.pName, "商品名称", 20);
            postJson.pNamePY = pinyinUtil.getFirstLetter(postJson.pName, false); // 名称拼音
            postJson.pUname = isNull(btnConfig.inputId.pUname, "数量单位", 10);
            postJson.pType = fl; // 分类ID
            postJson.pClwz = clwz; // max 100
            postJson.pPlatDes = pd; // 允许为空 max:100
            postJson.pisTheShelves = sl;//是否上架
            postJson.piPosOrWeChat = ck;
            postJson.cpzsImg = []; // 商品展示图片 max 5
            postJson.cpjsImg = []; // 商品介绍图片 max 10
            postJson.pSpec = [];   // 商品规格列表 {"specName":[],"specValue":[]}
            postJson.pDetail = []; // 商品详情 { "spec":["","",""],"image":"",cost:"",price:"",offers:"",barcode:"" }


            if (btnConfig.Reg.Special.test(postJson.pName)) {
                WinDiaLog("商品名称中不能输入特殊字符！");
                postJson = {};
                return;
            }

            if (postJson.pType == null || postJson.pType.length <= 0) {
                WinDiaLog("请选择商品分类！");
                postJson = {};
                return;
            }

            if (!btnConfig.Reg.Chinese.test(postJson.pUname)) {
                WinDiaLog("数量单位必须是中文！");
                postJson = {};
                return;
            }

            if (postJson.pClwz.length > 100) {
                WinDiaLog("商品陈列位置字数不能大于100个字符！");
                postJson = {};
                return;
            }

            if (postJson.pPlatDes.length > 100) {
                WinDiaLog("商品特性描述字数不能大于100个字符！");
                postJson = {};
                return;
            }

            // 获取展示图片
            var cpzstpAll = $('#fileLiveThumbs-cpzstp > div[data-template="image"]');
            for (var z = 0; z < cpzstpAll.length; z++) {
                var zI = $(cpzstpAll[z]).attr('data-imgname');
                if (zI == "") {
                    WinDiaLog("商品展示图片，数据存在异常");
                    return;
                }
                postJson.cpzsImg.push(zI);
            }

            // 获取介绍图片
            var cpzstpAll = $('#fileLiveThumbs-cpjstp > div[data-template="image"]');
            for (var l = 0; l < cpzstpAll.length; l++) {
                var zI = $(cpzstpAll[l]).attr("data-imgname");
                if (zI == "") {
                    WinDiaLog("商品介绍图片，数据存在异常");
                    return;
                }
                postJson.cpjsImg.push(zI);
            }

            if (postJson.cpzsImg == null || postJson.cpzsImg <= 0) {
                WinDiaLog("请上传商品展示图片，最多可上传5张图片");
                return;
            }

            if (postJson.cpzsImg.length > 5) {
                var msg = '商品展示图片超出了最大上传限制，最多可上传5张图片';
                var zstp = $('.file-caption-name:eq(0)');
                zstp.html(zstp.html().split('</i>')[0] + '</i>' + msg).css({ 'color': 'red', 'display': 'block' });
                WinDiaLog(msg);
                return;
            }

            if (postJson.cpjsImg == null || postJson.cpjsImg <= 0) {
                WinDiaLog("请上传商品介绍图片，最多可上传10张图片");
                return;
            }

            if (postJson.cpjsImg.length > 10) {
                var msg = "商品介绍图片超出了最大上传限制，最多可上传10张图片";
                var jstp = $('.file-caption-name:eq(1)');
                jstp.html(jstp.html().split('</i>')[0] + '</i>' + msg).css({ 'color': 'red', 'display': 'block' });
                WinDiaLog(msg);
                return;
            }

            var specNum = $(SICC.Ccmii);

            // 传入规格
            if ($(SICC.Clcsl).attr(SICC.Cn.Cl).indexOf(SICC.Ck) > 0) {
                for (var i = 0, iLen = specNum.length; i < iLen; i++) {
                    var specI = $(specNum[i]);
                    var specName = specI.find(SICC.Ccmsn + " input[type='text']").val();
                    var specValue = specI.find(SICC.Csi + " " + SICC.Ccmi);
                    if (specValue.length <= 0) {
                        WinDiaLog(specName + "：规格下没有规格值,请检查或删除！");
                        throw new DOMException();
                    }
                    var specValueAll = [];
                    for (var j = 0, jLen = specValue.length; j < jLen; j++) {
                        var ispecValue = $(specValue[j]).attr("data-value");
                        specValueAll.push(ispecValue);
                    }
                    postJson.pSpec.push(specJson(specName, specValueAll));
                }
            }

            // 传入table表格tr
            var tabelObj = $(SICC.IcptTbodyTr)


            //修改时需要将最后一个td的数据移除
            var iLen = tabelObj.length;
            if (choice === "modify") {
                iLen--;
            }

            for (var i = 0; i < iLen; i++) {
                var specNums = specNum.length;
                if (specNums <= 0) {
                    specNums = 1;
                }
                postJson.pDetail.push(detailJson(specNums, tabelObj[i]));
            }
            var pid = SICC.Fn.GetQueryString("pid") // 获取参数
            if (pid == null || pid == "") {
                pid = '';
            }
            // 异步调用
            $(SICC.Ibtns).removeAttr("data-choice").attr("data-choice", "submit").text("请稍后...");
            SICC.Fn.ajax('http://' + window.location.host + '/Action/ProductServer.ashx?Action=' + choice + '&Bussid=' + $("#hidBID").val() + '&pid=' + pid, JSON.stringify(postJson), function (data) {
                $(SICC.Ibtns).removeAttr("data-choice").attr("data-choice", choice).text("确定");
                if (data == null || data == "") {
                    var dialogMsg = (choice === "Add" ? "添加商品失败" : "修改商品失败");
                    removeImgItem();
                    SICC.DiaLog.winDialog(dialogMsg, 5);
                    return;
                }
                var dataJson = JSON.parse(data);

                if (dataJson != null && dataJson.State == "200" && dataJson.IsOK == true) {
                    if (choice === "Add") {
                        var actions = SICC.Fn.GetQueryString("action");// 获取控制
                        if (actions == "prmladd") {
                            $.PE_FrameTab.AddNew('/Setting/JXCBaseSetting.aspx?act=prml', '商品原料配比');
                        } else {
                            SICC.Fn.WipeData.All();
                        }

                    } else {
                        $.PE_FrameTab.AddNew('/Setting/ProductSetting.aspx?act=pl', '商品列表');
                    }

                    SICC.DiaLog.winDialog(dataJson.Remarks, 1);

                } else {
                    removeImgItem();
                    SICC.DiaLog.winDialog(dataJson.Remarks, 5);
                }
            });

            function removeImgItem() {
                $(SICC.Ifszstp + " .file-preview-frame," + SICC.Ifsjstp + " .file-preview-frame").remove();
                var strhtml = '<div class="file-drop-zone-title" data-title="dropzone" style="">上传商品失败，请重新上传图片......</div>';
                $(SICC.Ifszstp).find(".file-drop-zone").prepend(strhtml);
                $(SICC.Ifszstp).find("div.input-group").find(".file-caption-name").attr("title", "").text("");
                $(SICC.Ifsjstp).find(".file-drop-zone").prepend(strhtml);
                $(SICC.Ifsjstp).find("div.input-group").find(".file-caption-name").attr("title", "").text("");
            }

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

            // 函数内部的判断方法一定不能颠倒，微信商城的显示或不显示商品必须是在
            // 拼接的字符串的倒数第二位数
            function WeChatJoin(wechat, pos) {
                var join = '000'
                if (wechat) {
                    join = join + '1';
                } else {
                    join = join + '0';
                }

                if (pos) {
                    join = join + '1';
                } else {
                    join = join + '0';
                }

                return join;
            }

            // 生成规格及规格值Json 数组，向 postJson.pSpec 中添加
            function specJson(specName, specValueArray) {
                var Json = {};
                var specname = specName.trim();
                var specvaluearray = specValueArray;

                if (specname == null || specname.length <= 0) {
                    WinDiaLog("规格名称不能为空！");
                    throw new DOMException();
                }
                if (specvaluearray == null || specvaluearray.length <= 0 || typeof specvaluearray != "object") {
                    WinDiaLog(specname + "规格下没有规格值！");
                    throw new DOMException();
                }
                Json.specName = specname;
                Json.specValue = [];

                for (var i = 0, iLen = specValueArray.length; i < iLen; i++) {
                    var specValue = specValueArray[i].trim();
                    if (specValue.length <= 0) {
                        WinDiaLog(specname + "规格下有“空”的规格值，请检查！");
                        throw new DOMException();
                    }
                    Json.specValue.push(specValue);
                }
                return Json;
            }

            // 生成商品详情Json数组，向postJson.pDetail 中添加
            // specNum 是规格的个数
            function detailJson(specNum, trDomObj) {
                var domObj = $(trDomObj).find("td");
                var Json = {
                    specValue: [],
                    detailId: "", //data-did
                    status: "",
                    detailImage: "",
                    cost: "",
                    price: "",
                    offers: "",
                    barcode: "",
                    pNumber: "",
                    TradePrice: ""
                };

                if (domObj == null || domObj.length <= 0) {
                    WinDiaLog("table表格下td 为空,请检查!");
                    throw new DOMException();
                }
                var msg = "";

                for (var i = 1, iLen = domObj.length; i < iLen; i++) {
                    if (i == 1) {
                        var datas = $(trDomObj).find('td:eq(' + Number(i - 1) + ')');
                        //商品详情ID
                        var datadpid = datas.attr('data-did');
                        if (typeof datadpid != "undefined" && datadpid.length > 0) {
                            Json.detailId = datadpid.trim();
                        }

                        // 商品详情状态
                        var dataStatus = datas.attr('data-status');
                        if (typeof dataStatus != "undefined" && dataStatus.length > 0) {
                            Json.status = dataStatus.trim();
                        }
                    }

                    if (i <= specNum) {
                        var specValue = $(trDomObj).find('td:eq(' + i + ')').text();
                        if (typeof specValue === "undefined" || specValue.length <= 0) {
                            specValue = "";
                        } else {
                            specValue.trim();
                        }
                        // 获取规格值
                        if (specValue.length > 0) {
                            Json.specValue.push(specValue);
                        }

                    } else if (i == specNum + 1) {

                        //获取图片
                        Json.detailImage = $(trDomObj).find('td:eq(' + i + ')').find("img").attr("data-name").trim();

                    } else if (i == specNum + 2) {

                        //成本价格
                        Json.cost = $(trDomObj).find('td:eq(' + i + ')').find("input").val().trim();
                        if (Json.cost.length <= 0) {
                            msg += "成本价格不能为空,";
                        } else {
                            if (!isNumber(Json.cost)) {
                                msg += "成本价格只能是数字,";
                            } else {
                                if (parseFloat(Json.cost) <= 0 || parseFloat(Json.cost).toFixed(2) === '0.00') {
                                    msg += "成本价格不能小于等于0,";
                                } else {
                                    // 格式转换
                                    Json.cost = parseFloat(Json.cost).toFixed(2);
                                }
                            }
                        }


                    } else if (i == specNum + 3) {

                        // 销售价格
                        Json.price = $(trDomObj).find('td:eq(' + i + ')').find("input").val().trim();
                        if (Json.price.length <= 0) {
                            msg += "销售价格不能为空,";
                        } else {
                            if (!isNumber(Json.price)) {
                                msg += "销售价格只能是数字,";
                            } else {
                                if (parseFloat(Json.price) <= 0 || parseFloat(Json.price).toFixed(2) === '0.00') {
                                    msg += "销售价格不能小于等于0,";
                                } else {
                                    // 格式转换
                                    Json.price = parseFloat(Json.price).toFixed(2);
                                }
                            }
                        }

                    } else if (i == specNum + 4) {
                        // 特价
                        Json.offers = $(trDomObj).find('td:eq(' + i + ')').find("input").val().trim();
                        if (Json.offers.length > 0) {
                            if (!isNumber(Json.offers)) {
                                msg += "特价只能是数字,";
                            } else {
                                // 格式转换
                                Json.offers = parseFloat(Json.offers).toFixed(2);
                            }
                        } else {
                            Json.offers = parseFloat("0").toFixed(2);
                        }

                    } else if (i == specNum + 5) {

                        // 销售条码
                        Json.barcode = $(trDomObj).find('td:eq(' + i + ')').find("input").val().trim();
                        if (Json.barcode.length <= 0) {
                            msg += "条码不能为空,";
                        }
                    } else if (i == specNum + 6) {

                        // 商品条码
                        Json.pNumber = $(trDomObj).find('td:eq(' + i + ')').find("input").val().trim();
                    } else if (i == specNum + 7) {
                        // 批发价格
                        Json.TradePrice = $(trDomObj).find('td:eq(' + i + ')').find("input").val().trim();
                        if (Json.TradePrice.length > 0) {
                            if (!isNumber(Json.TradePrice)) {
                                msg += "批发价只能是数字";
                            } else {
                                Json.TradePrice = parseFloat(Json.TradePrice).toFixed(2);
                            }
                        }
                    }
                }

                if (msg != "") {
                    WinDiaLog("商品详情表第" + $(trDomObj).find("td:eq(0)").text() + "行," + msg + "请修改！")
                    throw new DOMException();
                }

                if (Number(Json.price) < Number(Json.offers)) {
                    WinDiaLog("商品详情表第" + $(trDomObj).find("td:eq(0)").text() + "行," + msg + "销售价格小于特价,请修改！")
                    throw new DOMException();
                }

                function isNumber(price) {
                    var re = /^\d+(?=\.{0,1}\d+$|$)/;
                    if (!re.test(price)) {
                        layer.msg(msg + "只能是数字");
                        return false;
                    }
                    return true;
                }

                return Json;
            }
        } catch (e) {
        }
    });

    // 返回事件
    SICC.Event.add.click(SICC.Iexit, function (obj) {
        var actions = SICC.Fn.GetQueryString("action");// 获取控制
        if (actions == "prmladd") {
            $.PE_FrameTab.AddNew('/Setting/JXCBaseSetting.aspx?act=prml', '商品原料配比');
        } else {
            $.PE_FrameTab.AddNew('/Setting/ProductSetting.aspx?act=pl', '商品列表');
        }

    });

    // 删除或恢复规格设置
    SICC.Fn.tropClick();

    // 规格提示
    SICC.DiaLog.winSpec(SICC.Itip, SICC.IspanLayer);

    // 显示已移除的规格
    SICC.Event.add.click(SICC.Iussh, function (obj) {
        var thisobj = obj;
        var statusLen = $(SICC.Icpt + " tbody tr");
        if (thisobj.attr("data-trstatus") === "1") {
            thisobj.text("隐藏已移除的规格");
            thisobj.removeAttr("trstatus");
            thisobj.attr("data-trstatus", -1);
            // 显示所有为-1的tr
            for (var i = 0; i < statusLen.length; i++) {
                var status = $(statusLen[i]).find("td:eq(0)").attr("data-status");
                if (status === '-1') {
                    $(statusLen[i]).show();
                }
            }
        } else if (thisobj.attr("data-trstatus") === "-1") {
            // 隐藏所有为1的tr
            thisobj.text("显示已移除的规格");
            thisobj.removeAttr("trstatus");
            thisobj.attr("data-trstatus", 1);
            for (var i = 0; i < statusLen.length; i++) {
                var status = $(statusLen[i]).find("td:eq(0)").attr("data-status");
                if (status === '-1') {
                    $(statusLen[i]).hide();
                }
            }
        }
    });

    // 页面初始化，判断是
    var actions = SICC.Fn.GetQueryString("action");// 获取控制
    var pid = SICC.Fn.GetQueryString("pid") // 获取参数

    if (actions != null && actions.length > 0 && actions != "prmladd") {

        $(SICC.Ibtns).removeAttr("data-choice");

        if (pid == null || pid.length <= 0) {
            var name = actions === "see" ? "查看商品" : acctions === "view" ? "修改商品" : "";
            SICC.DiaLog.winDialog(name + "初始化失败！请刷新页面重试", 2);
            return;
        }
        var SeccViewConfig = {
            inputId: {
                pName: "#txtPName", //商品名称ID
                pType: "#ddlPrdType",//商品分类ID
                pUname: "#txtUnitName",//商品数量单位ID
                pClwz: "#txtChenLieWeiZhi", //商品陈列位置 100
                pPlatDes: "#txtPlatDes",// 商品特性描述
                pisTheShelves: "#isTheShelves",// 是否上架
                piPos: "#isPos",// 展示pos平台
                piWeChat: "#isWeChat", // 展示微信商城
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
        SICC.Fn.ajax('http://' + window.location.host + '/Action/ProductServer.ashx?Action=see&Bussid=' + $("#hidBID").val() + '&pid=' + pid, "", function (data) {
            if (data == null || data == "") {
                SICC.DiaLog.winDialog("页面初始化失败，请刷新后重试！", 2);
                return;
            }
            var dataJson = JSON.parse(data);
            if (dataJson != null && dataJson.State == "200" && dataJson.IsOK == true) {
                try {
                    $(SICC.Iusc).remove();
                    $(SICC.Iusp).remove();
                    $(SICC.Iuso).remove();
                    $(SICC.Iust).remove();
                    $(SICC.Ias).remove();
                    $(SICC.Ius).remove();
                    $(SICC.Ccmii).remove(); // 移除所有规格列
                    $(SICC.Clcsl).unbind("click");
                    $(SICC.Ccmc).unbind("click");
                    SeccViewConfig.Fn.AssignmentInput(SeccViewConfig.inputId.pName, dataJson.data.pName);        //商品名称
                    SeccViewConfig.Fn.AssignmentInput(SeccViewConfig.inputId.pUname, dataJson.data.pUname);      //数量单位
                    SeccViewConfig.Fn.AssignmentInput(SeccViewConfig.inputId.pClwz, dataJson.data.pClwz);        // 陈列位置
                    SeccViewConfig.Fn.AssignmentInput(SeccViewConfig.inputId.pPlatDes, dataJson.data.pPlatDes);  // 特性描述
                    SICC.Fn.SettingSelectChecked("ddlPrdType", dataJson.data.pType);                             // 商品分类选中    
                    $(SeccViewConfig.inputId.pisTheShelves + ":checkbox").attr("checked", Number(dataJson.data.pisTheShelves) == 2 ? true : false);                 // 是否上架
                    var posOrWechat = dataJson.data.piPosOrWeChat; // 切割字符串
                    if (posOrWechat != null && posOrWechat.length >= 0) {
                        var powSpelit = posOrWechat.split("");
                        if (Number(powSpelit[powSpelit.length - 2]) == 1) { //微信
                            $(SeccViewConfig.inputId.piWeChat + ":checkbox").attr("checked", true);                 // 商品显示在微信平台上
                        } else {
                            $(SeccViewConfig.inputId.piWeChat + ":checkbox").attr("checked", false);                 // 商品不显示在微信平台上
                        }
                        if (Number(powSpelit[powSpelit.length - 1]) == 1) { //pos
                            $(SeccViewConfig.inputId.piPos + ":checkbox").attr("checked", true);                    // 商品显示在POS机平台上
                        } else {
                            $(SeccViewConfig.inputId.piPos + ":checkbox").attr("checked", false);                    // 商品不显示在POS机平台上
                        }
                    }
                    // 图片绑定
                    var zstp = $(SICC.Ifszstp);//展示图片                        
                    var jstp = $(SICC.Ifsjstp);//介绍图片

                    var zstpDynamicGenerationHtml = "";
                    var jstpDynamicGenerationHtml = "";
                    var TableHtml = "";
                    if (actions === "see") {

                        //产看商品
                        $(SICC.Ibtns).remove();
                        $(SICC.Icpt + " a").remove();
                        $(".input-group").remove();
                        $('input,select').attr('disabled', true);
                        zstpDynamicGenerationHtml = SICC.Template.GenerateImageParentOption("cpzstp", forArrayFun(dataJson.data.cpzsImg, false), "无商品展示图片 …"); // 展示图片
                        jstpDynamicGenerationHtml = SICC.Template.GenerateImageParentOption("cpjstp", forArrayFun(dataJson.data.cpjsImg, false), "无商品介绍图片 …"); // 介绍图片
                        TableHtml = SICC.Template.GenerateTableTow(dataJson.data.pSpec, dataJson.data.pDetail, false);
                        // 向页面添加表格
                        if (TableHtml != null && TableHtml.length > 0) {
                            var objAppend = $(SICC.Icpt).parent("div");
                            $(SICC.Icpt).remove();
                            objAppend.append(TableHtml);
                        }
                    } else if (actions === "view") {
                        // 修改商品
                        $(SICC.Ibtns).attr("data-choice", "modify")
                        $(SICC.Itpn).attr('disabled', true);
                        $(SICC.Iundh).text("编辑商品");
                        $(SICC.Iunt).text("编辑商品");
                        zstpDynamicGenerationHtml = SICC.Template.GenerateImageParentOption("cpzstp", forArrayFun(dataJson.data.cpzsImg, true), "点击下方选中按钮，选则图片文件上传 …"); // 展示图片
                        jstpDynamicGenerationHtml = SICC.Template.GenerateImageParentOption("cpjstp", forArrayFun(dataJson.data.cpjsImg, true), "点击下方选中按钮，选则图片文件上传 …"); // 介绍图片
                        TableHtml = SICC.Template.GenerateTableTow(dataJson.data.pSpec, dataJson.data.pDetail, true);
                        // 向页面添加表格
                        if (TableHtml != null && TableHtml.length > 0) {
                            var objAppend = $(SICC.Icpt).parent("div");
                            $(SICC.Icpt).remove();
                            objAppend.append(TableHtml);

                            var spec = dataJson.data.pSpec; // 规格数据
                            if (spec != null && typeof spec != "undefined") {
                                var specLen = spec.length; // 规格个数
                                // 添加 规格 点击事件
                                $(SICC.Iasv).on("click", function () {
                                    var e = $(this);
                                    SICC.Template.GenerateTableValue(specLen == 0 ? 1 : specLen, e.parents("tr"), SICC.Template.GenerateTableTbodyTrtd(Number(e.parents("tr").prev("tr:eq(0)").find("td:eq(0)").text()) + 1, specLen == 0 ? 1 : specLen))

                                });
                                // 删除或恢复规格设置
                                SICC.Fn.tropClick();
                            }
                        }
                    }

                    if (zstp.find(SICC.Cfi).length < 0) {
                        zstp.prepend(SICC.Template.GenerateImageParentFileInputOption(zstpDynamicGenerationHtml));
                    } else {
                        zstp.find(SICC.Cfi).prepend(zstpDynamicGenerationHtml);
                    }

                    if (jstp.find(SICC.Cfi).length < 0) {
                        jstp.prepend(SICC.Template.GenerateImageParentFileInputOption(jstpDynamicGenerationHtml));
                    } else {
                        jstp.find(SICC.Cfi).prepend(jstpDynamicGenerationHtml);
                    }
                    var SpecHtmlS = forArraySpecFun(dataJson.data.pSpec);
                    if (SpecHtmlS != null || SpecHtmlS.length > 0) {
                        $(SICC.Ccmsb).show();
                    }
                    $(SICC.Cmi).append(SpecHtmlS);

                    if (actions === "see") {
                        $('input,select').attr('disabled', true);
                    }

                    // 生成规格及规格值
                    function forArraySpecFun(SpecArray) {
                        var specAll = "";
                        if (SpecArray != null && typeof SpecArray != "undefined" && SpecArray.length > 0) {

                            //$(SICC.Clcsl).find("input").toggleClass()
                            //$(SICC.Clcsl).find("input:checkbox").attr("checked", true);
                            // 循环规格
                            for (var i = 0, iLen = SpecArray.length; i < iLen; i++) {
                                var specValeuHtml = "";
                                // 循环规格值
                                if (SpecArray[i].specValue != null) {
                                    for (var j = 0, jLen = SpecArray[i].specValue.length; j < jLen; j++) {
                                        if (SpecArray[i].specValue[j] != null) {
                                            specValeuHtml += SICC.Template.GenerateSpecValueOpetion(SpecArray[i].specValue[j]);
                                        }
                                    }
                                }
                                specAll += SICC.Template.GenerateSpecOption(SpecArray[i].specName, specValeuHtml);
                            }
                        }
                        return specAll;
                    }

                    // 循环图片集合函数
                    function forArrayFun(array, tf) {
                        var html = "";
                        if (array != null && typeof array != "undefined" && array.length > 0) {
                            for (var i = 0, ilen = array.length; i < ilen; i++) {
                                if (array[i].length <= 0) {
                                    continue;
                                }
                                var arrayIsplit = array[i].split('P_XXX/');
                                html += SICC.Template.GenerateImageFindOption(array[i], arrayIsplit[arrayIsplit.length - 1], tf);
                            }
                        }
                        return html;
                    }

                } catch (e) {

                }
            } else {
                SICC.DiaLog.winDialog("查看商品失败", 5);
            }
        });

    }

    // 页面出事时初始化展示图片 介绍图片 tip
    SICC.DiaLog.winSpec("layer-tip-zstp", "span-layer-zstp-text");
    SICC.DiaLog.winSpec("layer-tip-jstp", "span-layer-jstp-text");

});
