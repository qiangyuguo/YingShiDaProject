;(function($, window, undefined) {
    
    var win = $(window),
        doc = $(document),
        count = 1,
        isLock = false;

    var Dialogs = function(options) {
        
        this.settings = $.extend({}, Dialogs.defaults, options);
        
        this.init();
        
    }
    
    Dialogs.prototype = {
        
        /**
         * 初始化
         */
        init : function() {
            
            this.create();
        
            if (this.settings.lock) {
                this.lock();
            }

            if (!isNaN(this.settings.time)&&this.settings.time!=null) {
                this.time();
            }
            
        },
        
        /**
         * 创建
         */
        create : function() {
                
            var divHeader = (this.settings.closeIcon==null)?'<div class="rDialog-header rDialog-header-'+ this.settings.title +'">'+this.settings.titleTishi+'</div>':'<div class="rDialog-header rDialog-header-'+ this.settings.title +'">'+this.settings.titleTishi+'<span class="close_icon" onclick="$(this).closest(\'.rDialog\').detach();$(\'.rDialog-mask\').detach();}">×</span></div>';
            // HTML模板

			var templates = '<div class="rDialog-wrap">' +
							divHeader +'<div class="dialog-border-'+this.settings.borderDialog+'">'+
							'<div class="rDialog-content"><p>'+ this.settings.content +'</p></div>' +
							'<div class="rDialog-footer"></div>' +'</div>'+
						'</div>';
                        
            // 追回到body
            this.dialogs = $('<div>').addClass('rDialog').css({ zIndex : this.settings.zIndex + (count++) }).html(templates).prependTo('body');
            
            // 设置ok按钮
            if ($.isFunction(this.settings.ok)) {
                this.ok();
            }
            
            // 设置cancel按钮
            if ($.isFunction(this.settings.cancel)) {
               this.cancel(); 
            }
            
            // 设置大小
            this.size();
            
            // 设置位置
            this.position();
            
        },
        
        /**
         * ok
         */
        ok : function() {
        	var _this = this,
            footer = this.dialogs.find('.rDialog-footer');
        	if(this.settings.btnNum!='2'){
        		$('<a>', {
	                href : this.settings.okHref,
	                text : this.settings.okText,
	                target : this.settings.okTarget
	            }).on("click", function() {
	                    var okCallback = _this.settings.ok();
	                    if (okCallback == undefined || okCallback) {
	                        _this.close();
	                    }
	
	            }).addClass("btn "+ this.settings.okCss + " "+this.settings.OneokCss).prependTo(footer);
        	}else{	            	            
	            $('<a>', {
	                href : this.settings.okHref,
	                text : this.settings.okText,
	                target : this.settings.okTarget
	            }).on("click", function() {
	                    var okCallback = _this.settings.ok();
	                    if (okCallback == undefined || okCallback) {
	                        _this.close();
	                    }
	
	            }).addClass("btn "+ this.settings.okCss).prependTo(footer);
        	}
        },
        
        /**
         * cancel
         */
        cancel : function() {
            if(this.settings.btnNum=='2'){
	            var _this = this,
	                footer = this.dialogs.find('.rDialog-footer');
	            
	            $('<a>', {                            
	                href : this.settings.cancelHref,
	                text : this.settings.cancelText,                
	                target : this.settings.cancelTarget
	            }).on("click",function() {
	                    var cancelCallback = _this.settings.cancel();
	                    if (cancelCallback == undefined || cancelCallback) {
	                        _this.close();
	                    }
	            }).addClass("btn "+ this.settings.cancelCss).appendTo(footer);
            }
        },
        
        /**
         * 设置大小
         */
        size : function() {
            
            var content = this.dialogs.find('.rDialog-content'),
            	wrap = this.dialogs.find('.rDialog-wrap');
            
            content.css({ 
                width : this.settings.width,
                height : this.settings.height
            });
            //wrap.width(content.width());
        },
        
        /**
         * 设置位置
         */
        position : function() {
            
            var _this = this,
                winWidth = win.width(),
                winHeight = win.height(),
                scrollTop = 0;
            
            this.dialogs.css({ 
                left : (winWidth - _this.dialogs.width()) / 2,
                top : (winHeight - _this.dialogs.height()) / 2 + scrollTop
            });

        },
        
        /**
         * 设置锁屏
         */
        lock : function() {
            
            if (isLock) return;
            
            this.lock = $('<div>').css({ zIndex : this.settings.zIndex }).addClass('rDialog-mask');
            this.lock.appendTo('body');
            
            isLock = true;

        },
        
        /**
         * 关闭锁屏
         */
        unLock : function() {
    		if (this.settings.lock) {
    			if (isLock) {
	                this.lock.remove();
	                isLock = false;
                }
            }
        },
        
        /**
         * 关闭方法
         */
        close : function() {
            this.dialogs.remove();
            this.unLock();
        },
        
        /**
         * 定时关闭
         */
        time : function() {
            
            var _this = this;
            
            this.closeTimer = setTimeout(function() {
                _this.close();
            }, this.settings.time);

        }
        
    }
    
    /**
     * 默认配置
     */
    Dialogs.defaults = {
    		
    	//按钮个数
    	btnNum : '2',
        
        //border dialog
        borderDialog: 'none',

        // 内容
        content: '加载中...',
        
        // 标题
        title: 'green',

        // 输入标题提示
        titleTishi: '提示',

        // Close按钮
        closeIcon: null,
        
        // 宽度
        width: 'auto',
        
        // 高度
        height: 'auto',
        
        // 确定按钮回调函数
        ok: null,

        //OK +css
        okCss:'btn_reds_primary',
        
      //OneOK +css
        OneokCss:'one_ok',

        //ok href
        okHref:'javascript:;',

        //cancel href
        cancelHref:'javascript:;',

        cancelTarget : '',
        okTarget : '',
        
        // 取消按钮回调函数
        cancel: null,

        //cancel +css
        cancelCss: 'btn_default_primary',
        
        // 确定按钮文字
        okText: '确定',
        
        // 取消按钮文字
        cancelText: '取消',
        
        // 自动关闭时间(毫秒)
        time: null,
        
        // 是否锁屏
        lock: true,

        // z-index值
        zIndex: 9999
        
    }
    
    var rDialog = function(options) {
        new Dialogs(options);
    }
    
    window.rDialog = $.rDialog = $.dialogs = rDialog;
    
})(window.jQuery || window.Zepto, window);
;function alertBox(content,time){
	if($('.alert-card-dialog').length>=1) return false;
	// HTML模板
	var timer = '';
	if(typeof(time)=='undefined' || isNaN(time)){
		timer=2000;
	}else{
		timer=time;
	}	
	var templates = '<p>'+content+'</p>';                
    // 追回到body
	$('<div>').addClass('alert-card-dialog').html(templates).prependTo('body');
    setTimeout(function() {
    	$('.alert-card-dialog').remove();
    },timer);    
}

var defaultOKFn = function() {};
var YY = {};

YY.warnAlert = function(msg, fn) {
    $.dialogs({
    	title : 'orange',
    	borderDialog : 'orange',
    	btnNum : '1',
        titleTishi : '提示',
        okText: '确定',
        okCss: 'btn_oranges_primary',
        content : msg,
        ok : fn||defaultOKFn
    });
}

YY.alert = function(msg, fn) {
    $.dialogs({
    	title : 'green',
    	borderDialog : 'green',
    	btnNum : '1',
        titleTishi : '提示',
        okText: '确定',
        okCss: 'btn_lv_primary',
        content : msg,
        ok : fn||defaultOKFn
    });
}

