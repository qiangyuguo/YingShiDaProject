function showEdit(c, e) {
    $(c).show();
    $(e).show();
    coverOpen()
}
function hideEdit(c, e) {
    $(c).hide();
    $(e).hide();
    coverClose()
}
var openBranchBox = function (b) {
    $(b).show(); coverOpen()
};
var closeBranchBox = function (b) {
    $(b).hide(); coverClose()
};
function coverOpen() {
    $(".cover").show()
}
function coverClose() {
    $(".cover").hide()
}
function check(k, i) {
    var j = $(k).next("i").attr("class");
    if (j == "checkIcon01") {
        i.removeClass("checkIcon01");
        i.addClass("checkIcon")
    }
    if (j == "checkIcon") {
        i.removeClass("checkIcon");
        i.addClass("checkIcon01")
    }
    var g = $(k).parents(".branchBox").find("input[type=checkbox]");
    for (var h = 0; h < g.length; h++) { g[h].checked = k.checked }
}
var $sta = $("input[id$='fmDate']"),
    $end = $("input[id$='toDate']");
var nowFull = new Date();
var nowYmd = new Date(nowFull.getFullYear(), nowFull.getMonth(), nowFull.getDate(), 0, 0, 0, 0);
function dateFormat() {
    Date.prototype.format = function (k) {
        var f = { Y: this.getFullYear(), M: (this.getMonth() + 1), D: this.getDate(), h: this.getHours(), m: this.getMinutes(), s: this.getSeconds() }, j = "", l = false, m = null, i = ""; for (j in f) { m = new RegExp("[" + j + "]{1,}", "g"); l = m.test(k); if (l) { i = f[j]; k = k.replace(m, i < 10 ? ("0" + i) : i) } } return k
    }
}
dateFormat();
var d = new Date();
var yesterday = new Date();
yesterday.setDate(d.getDate() - 1);
var weekday = new Date();
weekday.setDate(d.getDate() - 7);
var monthday = new Date();
monthday.setDate(d.getDate() - 30);
$sta.datepicker({ format: "yyyy-mm-dd", weekStart: 1, endDate: nowYmd, autoclose: true }).on("changeDate", function (b) { $end.val(yesterday.format("YYYY-MM-DD")); $(".time-btn").removeClass("time-current"); $("input[name='selectedButtonType']").val("") }); $("input[id$='toDate']").datepicker({ format: "yyyy-mm-dd", weekStart: 1, endDate: nowYmd, autoclose: true }).on("changeDate", function (b) { if ($sta.datepicker("getDate").valueOf() > b.date.valueOf()) { $sta.datepicker("setDate", b.date) } $(".time-btn").removeClass("time-current"); $("input[name='selectedButtonType']").val("") }); var ChoiceValidTime = (function () { var x = $("#fmDate"), t = $("#toDate"), s = $(".time-btn"), w = new Date(), p = w.getDay(), o = w.getDate(), v = w.getMonth(), u = w.getFullYear(), q = $("#choice-today"), y = $("#choice-week"), r = $("#choice-month"); q.bind("click", function (a) { ChoiceValidTime.choiceToday() }); y.bind("click", function (a) { ChoiceValidTime.choiceWeek() }); r.bind("click", function (a) { ChoiceValidTime.choiceMonth() }); s.bind("click", function () { s.removeClass("time-current"); $(this).addClass("time-current") }); function n() { x.datepicker("update"); t.datepicker("update") } return { choiceToday: function () { x.val(d.format("YYYY-MM-DD")); t.val(d.format("YYYY-MM-DD")); n() }, choiceWeek: function () { x.val(weekday.format("YYYY-MM-DD")); t.val(yesterday.format("YYYY-MM-DD")); n() }, choiceMonth: function () { x.val(monthday.format("YYYY-MM-DD")); t.val(yesterday.format("YYYY-MM-DD")); n() } } })();