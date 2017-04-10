


//获取相应的成员信息
jQuery(function ($) {
    //-------------- beginning -----------从部门/组查找人员

    //为选择部门/组成员注册事件
    jQuery('.basic').click(function (e) {
        jQuery('#basic-modal-content').skygqbox();
        jQuery.WebH("/SearchDepartGroup/GetFirstTreeInfo", function callback(result) {
            CreateTree(result); //创建树结构数据
        });
      
    });
});
    //生成部门/组树结构信息
function CreateTree(json) {
        tree = new dTree("tree");
        // tree.add(id,pid,name,url,title,target,icon,iconOpen,open);
        jQuery(eval(json)).each(function (i, item) {
            tree.add(item.g_id,item.g_parid,item.g_name,'','','','',false,false,item.t);
        });
      
        jQuery("#treeDiv").html(tree.toString());

    }
    //获取选定的数据信息
    function Getselectd(a_obj, obj_name, obj_id) {
        //alert(obj_id);
        $("#hiduid").val(obj_id);
        $("#uname").val(obj_name);
    }

//-------------- end -----------从部门/组查找人员