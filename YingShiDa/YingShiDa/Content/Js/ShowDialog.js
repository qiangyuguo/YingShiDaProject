function showSelectUserDialog(isMulti, inputID, inputName) {
    $("#isMulti").val(isMulti);
    $(".treeview").find(".collapsable").find("div").attr("class", "hitarea expandable-hitarea");
    $(".treeview").find(".collapsable").find("ul").css("display", "none");
    $(".treeview").find(".collapsable").attr("class", "expandable");
    $("#divSelectUser").dialog({
        title: '',
        autoOpen: false,
        width: 700,
        height: 500,
        modal: true,
        buttons: {
            '保存': function () {
                if (inputID != "") {
                    $("#" + inputID).val($("#HiddenUserID").val());
                }
                $("#" + inputName).val($("#HiddenUserAccount").val());
                document.getElementById("UserList").innerHTML = "";
                $("#HiddenUserID").val("");
                $("#HiddenUserAccount").val("");
                $(this).dialog('close');
            },
            "取消": function () {
                document.getElementById("UserList").innerHTML = "";
                $("#HiddenUserID").val("");
                $("#HiddenUserAccount").val("");
                $(this).dialog('close');
            }
        },
        close: function () {
        }
    });
    $("#divSelectUser").dialog('open');
    $("#divSelectUser").css("display", "block");
};

function showSelectGroupDialog(inputID, inputName) {
    $("#divSelectGroup").dialog({
        title: '',
        autoOpen: false,
        width: 300,
        height: 500,
        modal: true,
        buttons: {
            '保存': function () {
                if (inputID != "") {
                    $("#" + inputID).val($("#HiddenGroupID").val());
                }
                $("#" + inputName).val($("#HiddenGroupName").val());
                $("#HiddenGroupID").val("");
                $("#HiddenGroupName").val("");
                $("#divSelectGroup").find(":checkbox").each(function () {
                    $(this).removeAttr("checked");
                });
                $(this).dialog('close');
            },
            "取消": function () {
                $("#HiddenGroupID").val("");
                $("#HiddenGroupName").val("");
                $(this).dialog('close');
            }
        },
        close: function () {
        }
    });
    $("#divSelectGroup").dialog('open');
    $("#divSelectGroup").css("display", "block");
};