function TimeControl(start, end) {
    //$('.date').datetimepicker({
    //    minView: 'month',            //设置时间选择为年月日 去掉时分秒选择
    //    format: 'yyyy-mm-dd',
    //    weekStart: 1,
    //    todayBtn: 1,
    //    autoclose: 1,
    //    todayHighlight: 1,
    //    startView: 2,
    //    forceParse: 0,
    //    showMeridian: 1,
    //    language: 'zh-CN'              //设置时间控件为中文
    //});
    $(start).datepicker({
        minView: 'month',
        todayBtn: 1,
        format: 'yyyy-mm-dd',
        startView: 2,
        autoclose: true,
        todayHighlight: true,
        endDate: new Date(),
        showMeridian: 1,
        language: 'zh-CN'
    }).on('changeDate', function (e) {
        var startTime = e.date;
        $(end).datepicker('setStartDate', startTime);
    });
    //结束时间：  
    $(end).datepicker({
        minView: 'month',
        todayBtn: 1,
        format: 'yyyy-mm-dd',
        startView: 2,
        autoclose: true,
        todayHighlight: true,
        endDate: new Date(),
        showMeridian: 1,
        language: 'zh-CN'
    }).on('changeDate', function (e) {
        var endTime = e.date;
        $(start).datepicker('setEndDate', endTime);
    });
}

function ComParisonTime(start, end) {
    var start = $(start).val();
    var end = $(end).val();
    if (start == "" && end != "") {
        layer.msg("开始时间不能为空", {
            time: 2000,
            icon: 5,
            offset: '20%'
        });
        return false;
    }
    if (start != "" && end == "") {
        layer.msg("结束时间不能为空",{
            icon: 5,
            offset: '20%'
        });
        return false;
    }
    if (start > end) {
        layer.msg("开始时间不能大于结束时间", {
            time: 2000,
            icon: 5,
            offset: '20%'
        });
        return false;
    }
    return true;
}
function SingleTimeControl(start) {
    $(start).datetimepicker({
        //minView: 'month',            //设置时间选择为年月日 去掉时分秒选择
        format: 'yyyy-mm-dd hh:ii',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 2,
        language: 'zh-CN'              //设置时间控件为中文
    });
    //$(".date").datetimepicker({
    //    format: "yyyy-mm-dd hh:ii",//设置时间格式，默认值: 'mm/dd/yyyy'
    //    weekStart: 0, //一周从哪一天开始。0（星期日）到6（星期六）,默认值0
    //    //startDate: "2013-02-14 10:00",//可以被选择的最早时间
    //    //endDate: "2016-02-14 10:00",//可以被选择的最晚时间
    //    daysOfWeekDisabled: "0,6",//禁止选择一星期中的某些天，例子中这样是禁止选择周六和周日
    //    autoclose: true,//当选择一个日期之后是否立即关闭此日期时间选择器
    //    startView: 2,//点开插件后显示的界面。0、小时1、天2、月3、年4、十年，默认值2
    //    minView: 0,//插件可以精确到那个时间，比如1的话就只能选择到天，不能选择小时了
    //    maxView: 4,//同理
    //    todayBtn: true,//是否在底部显示“今天”按钮
    //    todayHighlight: true,//是否高亮当前时间
    //    keyboardNavigation: true,//是否允许键盘选择时间
    //    language: 'zh-CN',//选择语言，前提是该语言已导入
    //    forceParse: true,//当选择器关闭的时候，是否强制解析输入框中的值。也就是说，当用户在输入框中输入了不正确的日期，选择器将会尽量解析输入的值，并将解析后的正确值按照给定的格式format设置到输入框中
    //    minuteStep: 5,//分钟的间隔
    //    pickerPosition: "bottom-right",//显示的位置，还支持bottom-left
    //    viewSelect: 0,//默认和minView相同
    //    showMeridian: true,//是否加上网格
    //    initialDate: new Date().getDate()//初始化的时间
    //});
}
$(function () {
    $("input,textarea").css({
        "border-radius": 5
    });
});