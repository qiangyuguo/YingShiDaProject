
$(function () {
    // 时间控件初始化
    $('#AStartTime,#AEndTime').datetimepicker({
        format: 'yyyy-mm-dd hh:ii',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        language: 'zh-CN'
    });

    var navTabs = '<%= navTabs%>';

    // 页面出事时候选项卡
    if (navTabs === '1' || navTabs === '2') {
        $("#ActivityListLi").removeClass("active");
        $("#ActivityAddLi").attr("class", "active").find("a").text(navTabs == 2 ? "修改活动" : "添加活动");
        $("#ActivityList").addClass("hidden");
        $("#ActivityAdd").removeClass("hidden");
    }

    // 选项卡事件
    $(".nav-tabs > li").click(function () {
        var objTshi = $(this);
        var index = objTshi.index();
        var thisText = objTshi.text().trim();
        var activeThis = objTshi.attr("class");
        $(".nav-tabs > li").removeClass("active");

        if (typeof activeThis === "undefined" || activeThis.length <= 0) {
            $(objTshi).attr("class", "active");
        }

        if (index == 0 && thisText === "活动列表") {

            $("#ActivityAdd").addClass("hidden");
            $("#ActivityList").removeClass("hidden");

        } else if ((index == 1 && thisText === "添加活动") || (index == 1 && thisText === "修改活动")) {

            $("#ActivityList").addClass("hidden");
            $("#ActivityAdd").removeClass("hidden");
        }
    });

    // 添加活动确定事件
    $("#ActivityAdd_Btn").click(function () {
        var str = $("#AName").val().trim();
        if (str === "" || str.length <= 0) {
            layer.alert("请输入活动名称");
            return false;
        }
        if (str.length > 50) {
            layer.alert("活动名称最多只能输入50个字符");
            return false;
        }

        var strStartTime = $("#AStartTime").val().trim();
        if (strStartTime === "" || strStartTime.length <= 0) {
            layer.alert("请输入活动开始时间");
            return false;
        }

        var strEndTime = $("#AEndTime").val().trim();
        if (strEndTime === "" || strEndTime.length <= 0) {
            layer.alert("请输入活动结束时间");
            return false;
        }

        var strAdes = $("#ADes").val().trim();
        if (strAdes != "" && strAdes.length > 300) {
            layer.alert("备注信息最多只能输入300个字符");
            return false;
        }

        strStartTime = new Date(strStartTime);
        strStartTime = strStartTime.getTime();
        strEndTime = new Date(strEndTime);
        strEndTime = strEndTime.getTime();

        if (strStartTime >= strEndTime) {
            layer.alert("活动开始时间不能大于或等于活动结束时间");
            return false;
        }

        // 状态，防止重复提交
        var thisObj = $(this);
        if (thisObj.attr("data-status") != "Add") {
            return false;
        }
        thisObj.removeAttr("data-status").attr("data-status", "HaveInHand");

        return true;

    });

    // 清除前段table a标签的click事件
    $(function () {
        $("#tab_productList > tbody a").unbind();
    });
    
});