function CloseScoreForm()
{
    $("#divCenter").hide();
}

function DaFen(contentid,parameter) {
        var par = parameter.split(',');
        //par[0]我的userid, par[1] 为等级分正  par[2] 等级分负 //   par[3] 某某类别的id blog photo等类别  par[4]被打分人ID
        var dafen_userID=par[0];
        var by_userID = par[5];
        var levelScoref = parseInt(par[2]);
        var levelScorez = parseInt(par[1]);
        var objectID = par[3];
        var typeID = par[4];
        var con =$("#txtScore"+objectID).val();
        if ( con== "") {
            alert('评分理由：请输入内容');
            return false;
        }
        if (dafen_userID == 0) {
            alert('请您登录.....');
            return false;
        }
        var urlParam=$( "#lableslider"+objectID).text();
        var is_weibo=0;
        if($("#checkboxweibo"+objectID).attr("checked")==true)
        {
            is_weibo=1;
        }
        $("#Score"+objectID).html("<div style='line-height:80px;text-align:center;'><img id='imgload' style='width:20px;heigth:20px;' src='/content/images/weibo/loadding.gif'/>处理中，请稍后...</div>");
        
        $.ajax({
            async: false,
            type: 'GET',
            url: '/Action/ScoreAdd.ashx?jsoncallback=?',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            data: { byUserID: by_userID,dafenUserID:dafen_userID, objcet: objectID, MoudleType:typeID,
                num: urlParam, con: con, scoretype: 1,isweibo:is_weibo
            },
            success: function (data) {
                switch (data.value1) {
                    case "0":  $("#Score"+objectID).html("<span class='ui-icon ui-icon-alert' style='float: left; margin-right: .3em;'></span><p>抱歉！您未登陆，尚不能打分 ...</p>");
                        break;
                    case "1": 
                     $("#Score"+objectID).html("<span class='ui-icon ui-icon-info' style='float: left; margin-right: .3em;'></span><p>评分成功</p>");
                        break;
                    case "2": 
                    $("#Score"+objectID).html("<span class='ui-icon ui-icon-alert' style='float: left; margin-right: .3em;'></span><p>数据库忙.......</p>");
                        break;
                    case "3": 
                    $("#Score"+objectID).html("<span class='ui-icon ui-icon-alert' style='float: left; margin-right: .3em;'></span><p>没有填写内容</p>");
                        break;
                    case "4": 
                    $("#Score"+objectID).html("<span class='ui-icon ui-icon-alert' style='float: left; margin-right: .3em;'></span><p>今日您已经评过分了</p>");
                        break;
                    case "5": 
                    $("#Score"+objectID).html("<span class='ui-icon ui-icon-alert' style='float: left; margin-right: .3em;'></span><p>不能给自己打分</p>");
                        break;
                    case "6": 
                    $("#Score"+objectID).html("<span class='ui-icon ui-icon-alert' style='float: left; margin-right: .3em;'></span><p>请您登录</p>");
                }
                $("#Score" + objectID).remove();
            }
        });
    }
﻿
$(function () {

    $(".dafen").live({
        click: function(){
            var parameter = $(this).attr("rel");
            var par = parameter.split(',');
            //par[0]我的userid, par[1] 为等级分正  par[2] 等级分负 //   par[3] 某某类别的id blog photo等类别  par[4]被打分人ID par[5]被打分人企业ID
            var dafen_userID=par[0];
            var by_userID = par[5];
            var levelScoref = parseInt(par[2]);
            var levelScorez = parseInt(par[1]);
            var objectID = par[3];
            var typeID = par[4];
            if ($("#PingLun" + objectID).length > 0)
                $("#PingLun" + objectID).remove();
            if ($("#ZhuanFa" + objectID).length > 0)
                $("#ZhuanFa" + objectID).remove();
            if ($("#HuiBao" + objectID).length > 0)
                $("#HuiBao" + objectID).remove();
            if ($("#QueRen" + objectID).length > 0)
                $("#QueRen" + objectID).remove();
            if($("#Score"+objectID).length>0)
            {
                $("#Score" + objectID).remove();
                return;
            }

            var html="<dd class=\"clear\"/>";
            html+="<dd class=\"pl_box\" id=\"Score"+objectID+"\">";
            html+="<p class=\"wb_arrowjl\"><span class=\"wb_arrpl\">◆</span><span class=\"wb_owpl\">◆</span></p>";
            html+="<p class=\"closes\"><a href=\"javascript:;\" onclick=\"closeDivs(\'Score"+objectID+"\')\"><img src=\"/content/images/weibo/close.jpg\" width=\"12\" height=\"12\"></a></p>";
            html+="<DIV style=\"WIDTH: 96%;\" class=\"yj-component clear\">";
            html=html+"<TABLE>"
            +"<TBODY>"
            +"<TR>"
            +"<TD><SPAN style=\"FLOAT: left; MARGIN-RIGHT: 0.3em\" class=\"ui-icon ui-icon-info\"></SPAN></TD>"
            +"<TD style=\"TEXT-ALIGN: left\">拖动下面的滑块，评分：&nbsp;<LABEL style=\"FLOAT: none; COLOR: blue; FONT-SIZE: 20px; FONT-WEIGHT: bold\" id=\"lableslider"+objectID+"\">0</LABEL> 分 </TD></TR>"
            +"<TR style=\"HEIGHT: 30px\">"
            +"<TD></TD>"
            +"<TD style=\"WIDTH: 100%\">"
            +"<DIV style=\"WIDTH: 98%\" id=\"sliderstr"+objectID+"\" class=\"demoHeaders ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all\">"
            +"<DIV style=\"WIDTH: 50%; BACKGROUND: url(/content/jq/themes/ui-bulestart/images/ui-bg_glass_85_dfeffc_1x400.png) #dfeffc repeat-x 50% 50%\" class=\"ui-slider-range ui-slider-range-min ui-widget-header\"></DIV><A style=\"LEFT: 50%\" class=\"ui-slider-handle ui-state-default ui-corner-all\" href=\"#\"></A></DIV></TD></TR>"
            +"<TR style=\"HEIGHT: 26px\">"
            +"<TD></TD>"
            +"<TD>"
            +"<DIV style=\"WIDTH: 30px; FLOAT: left\"><IMG style=\"MARGIN-LEFT: 10px\" src=\"/content/images/weibo/sanjiao.gif\" complete=\"complete\">" 
            +"<DIV style=\"TEXT-ALIGN: right; WIDTH: 30px\"><FONT size=2>"+par[2]+"</FONT></DIV></DIV>"
            +"<DIV style=\"WIDTH: 30px; FLOAT: right\"><IMG style=\"MARGIN-LEFT: 10px\" src=\"/content/images/weibo/sanjiao.gif\" complete=\"complete\"> "
            +"<DIV style=\"TEXT-ALIGN: right; WIDTH: 30px\"><FONT size=2>"+par[1]+"</FONT></DIV></DIV></TD>"
            +"<TR style=\"HEIGHT: 26px\">"
            +"<TD><SPAN style=\"FLOAT: left; MARGIN-RIGHT: 0.3em\" class=\"ui-icon ui-icon-alert\"></SPAN></TD>"
            +"<TD style=\"TEXT-ALIGN: left\">您可以说明一下评分理由： </TD></TR>"
            +"<TR style=\"HEIGHT: 26px\">"
            +"<TD></TD>"
            +"<TD style=\"WIDTH: 100%\"><INPUT style=\"WIDTH: 98%\" id=\"txtScore"+objectID+"\" maxLength=\"250\" type=\"text\"> </TD></TR>"
            +"<TR style=\"HEIGHT: 26px\">"
            +"<TD><SPAN style=\"FLOAT: left; MARGIN-RIGHT: 0.3em\" class=\"ui-icon ui-icon-circle-check\"></SPAN></TD>"
            +"<TD><INPUT id=\"checkboxweibo"+objectID+"\" type=\"checkbox\">同时转发到我的微博 </TD></TR></TBODY></TABLE>";
            html+="<p><a class=\"pl_button\" href=\"javascript:;\" onclick=\"DaFen("+objectID+",'"+parameter+"')\">打&nbsp;分</a></p>"
            html+="</dd>";

                $("#Operator" + objectID).parent().parent().append(html);

        $( "#sliderstr"+objectID ).slider({
            range: "min",
			max:levelScorez,
			min:levelScoref,
			value:0,
		    slide: function( event, ui ) {
				    $( "#lableslider"+objectID ).text(ui.value);
			    }
		});
        
        }

    });
});
