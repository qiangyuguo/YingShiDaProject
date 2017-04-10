/*
 * 弹出窗口开始
 * pop-up-window
 */
; (function ($, win) {
    $.fn.popupwindow = function (option) {
        _this = null;

        this.default = {
            id: '', //需要控制的DIV id
            width: '500px', // 宽度
            height: '100%', // 高度
            html: ""
        };

        this.options = $.extend({}, this.default, option);

        return this.each(function () {
            $this = $(this);

            var o = $.meta ? $.extend({}, this.options, $this.data()) : this.options;

            $this.on('click', function () {
                if (o.id === '') {
                    return;
                }

                $(o.id).show().css({
                    width: o.width,
                    height: o.height,
                    right: '0px;'
                });

                // 调用 $.fn.popupwindow.click($this);

            });
        });
    }

    // 点击按钮后触发事件
    //$.fn.popupwindow.click = function ($this) {
    //    return
    //}

})(jQuery, window)