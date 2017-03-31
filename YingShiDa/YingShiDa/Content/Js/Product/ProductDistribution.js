$(function () {
    //初始化加载树
    $.ajax({
        type: "post",
        url: "",
        success: function (data) {

        }
    });

    // 模拟tree Json数据
    var treeJson = [
    {
        "id": 1,
        "text": "卤味",
        "state": "closed",
        "children": [
            {
                "id": 11,
                "text": "鸭锁骨",
                "state": "closed",
                "children": [
                    {
                        "id": 111,
                        "text": "颜色：红色,大小：中"
                    },
                    {
                        "id": 112,
                        "text": "颜色：棕色,大小：大"
                    },
                    {
                        "id": 113,
                        "text": "颜色：黑色,大小：小"
                    }
                ]
            },
            {
                "id": 12,
                "text": "鸡翅",
                "state": "closed",
                "children": [
                    {
                        "id": 121,
                        "text": "颜色：金色 ,大小：中"
                    },
                    {
                        "id": 122,
                        "text": "颜色：暗金 ,大小：中",
                        "attributes": {
                            "p1": "Custom Attribute1",
                            "p2": "Custom Attribute2"
                        }
                    },
                    {
                        "id": 123,
                        "text": "颜色：淡色 ,大小：中"
                    },
                    {
                        "id": 124,
                        "text": "颜色：红色,大小：中",

                    }
                ]
            }
        ]
    },
    {
        "id": 1,
        "text": "衬衫",
        "state": "closed",
        "children": [
            {
                "id": 11,
                "text": "短袖",
                "state": "closed",
                "children": [
                    {
                        "id": 111,
                        "text": "颜色：橙色 ,大小：中，尺寸：15"
                    },
                    {
                        "id": 112,
                        "text": "颜色：橙色 ,大小：大，尺寸：20"
                    },
                    {
                        "id": 113,
                        "text": "颜色：橙色 ,大小：小，尺寸：10"
                    }
                ]
            },
            {
                "id": 12,
                "text": "长袖",
                "state": "closed",
                "children": [
                    {
                        "id": 121,
                        "text": "颜色：橙色 ,大小：小，尺寸：10"
                    },
                    {
                        "id": 122,
                        "text": "颜色：橙色 ,大小：小，尺寸：10"
                    },
                    {
                        "id": 123,
                        "text": "颜色：橙色 ,大小：小，尺寸：10"
                    },
                    {
                        "id": 124,
                        "text": "颜色：橙色 ,大小：小，尺寸：10",

                    }
                ]
            }
        ]
    }
    ];

    // 添加节点
    $("#product-tree").tree({
        data: treeJson,
        cascadeCheck: true,
        onSelect: function (node) {
        },
        onBeforeCheck: function BeforeCheck(node) {
            //return CheckEvent(node);
        },
        onCheck: function (node) {
            //CheckEvent(node)
        }

    });

});