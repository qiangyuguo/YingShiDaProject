$(function () {
    var userid, username, photourl
    var _UserInfor_TimeOut;

    $("#pop").hide(); //隐藏所有弹出层

    $(".user_info").live({
        'mouseover': function () { },
        'mouseout': function () { }
    });

    $(".user_info").live({
        mouseover: function () {
            clearTimeout(_UserInfor_TimeOut);
            var parameter = $(this).attr("rel");
            var par = parameter.split(',');
            userid = par[0];
            username = par[1];
            photourl = par[2];
            var offset = $(this).offset();
            var X = offset.top; //获取图片层左上角的横坐标
            var Y = offset.left + $(".user_info").attr("offsetWidth") + 5; //获取图片层左上角的纵坐标

            $.ajax({
                type: "GET",
                url: "/Action/UserInfo.ashx",
                dataType: 'json',
                data: { toUserID: userid, userName: username, photourl: photourl, fromUserID: IntURLUserID },
                error: function (a, b, c) {
                    //alert(b)
                },
                beforeSend: function () {
                    //window.open("/Action/UserInfo.ashx?userID=" + userid + "&userName=" + username + "&photourl=" + photourl);
                },
                success: function (data) {
                    if (data.result) {
                        var str;
                        if (data.IntUserID != userid) {
                            str = "<a href='javascript:;' class=\"ConcernLink\" rel=\"{a:" + userid + ",b:" + data.IntUserID + ",c:'" + photourl + "',d:'" + username + "'}\"></a>";
                            if (data.isImgage > 0) {
                                if (data.isFriend == 3) {
                                    str += "<a id='a" + userid + "list' class='isImage' rel='1'  onclick=\"Initialize(" + userid + "," + data.IntUserID + ",'" + photourl + "','" + username + "',this) \"><img src='/Content/Images/Weibo/hufen.gif' class=\"isImage\"/></a>";
                                } else {
                                    str += "<a id='a" + userid + "list' class='isImage' rel='1'  onclick=\"Initialize(" + userid + "," + data.IntUserID + ",'" + photourl + "','" + username + "',this) \"><img src='/Content/Images/Weibo/deleteguanzhu.jpg' class=\"isImage\"/></a>";
                                }
                            } else {
                                str += "<a id='a" + userid + "list' class='isImage' rel='0'  onclick=\"Initialize(" + userid + "," + data.IntUserID + ",'" + photourl + "','" + username + "',this) \"><img src='/Content/Images/Weibo/addguanzhu.jpg' class=\"isImage\" /> </a>";
                            }
                        } else {
                            str = "";
                        }
                        var myUrl = "javascript:parent.PE_FrameTab.AddNew('" + data.myUrl + "','')";
                        $("#pop").html("<div class=\"personal_c left\">"
                       + "<div class=\"left imgs\"><a href=\"" + myUrl + "\" title=\"" + username + "\"><img onerror=\"imgError(this)\" src=\"" + photourl + "\" width=\"50\" height=\"60\" /></a></div>"
                       + "<div class=\"personal_r left\"><div class=\"BF4482 left\"><a href=\"" + myUrl + "\" title=\"" + username + "\">" + username + "</a> &nbsp;</div>"
                       + "<div class=\"left Level" + data.levelUserNum + "\"></div><br />"
                       + "<div class=\"left personal_r1\">"
                       + "<span class=\"BF4482\">职位：</span>" + data.business + "<br />"
                       + "<span class=\"BF4482\">部门：</span>" + data.dept + "<br />"
                       + "</div>"
                       + "<ul><li><span class=\"BF4482\">关注：</span><a href='" + data.ConcernURL + "'>" + data.attentNumb + "</a></li>"
                       + "<li><span class=\"BF4482\">粉丝：</span><a href='" + data.FollowURL + "'>" + data.fansNumb + "</a></li>"
                       + "<li><span class=\"BF4482\">微博：</span><a href='" + data.WeiboURL + "'>" + data.weiboNumb + "</a></li>"
                       + "</ul>"
                       + "</div></div>"
                       + "<div class=\"personal_c left txtRight m5 clearfix\" style=\"padding-top:5px;\"> "
                       + str
                       + " </div>"
                    );

                        $("#pop").css({ "left": Y + "px", "top": X + "px" }); //修改pop层的css属性
                        if (data.IntUserID == userid) {
                            $("#pop").css({ background: 'url(/Content/Images/Weibo/grzlbg1.png)', height: '101px' })
                        } else {
                            $("#pop").css({ background: 'url(/Content/Images/Weibo/grzlbg.png)', height: '121px' })

                        }

                        $("#pop").show();
                        $(".isImage").click(function () {
                            $("#pop").hide();
                        });
                    }
                }
            });
        },
        mouseout: function () {
            _UserInfor_TimeOut = setTimeout(function () { $("#pop").hide() }, 500);
        }
    });
    $("#pop").live({
        mouseover: function () {
            clearTimeout(_UserInfor_TimeOut);
            $(this).show();
        },
        mouseout: function () { $(this).hide(); }
    });
});

