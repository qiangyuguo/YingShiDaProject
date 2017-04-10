;(function(win, doc, undefined) {

	/**
	 * [Popup description] 弹窗对象
	 * @param {[type]} options [description] options为配置的对象
	 */
	var Popup = function(options) {

		var self = this;

		// 获取配置值
		self.el = options.id;
		self.title = options.title;
		self.type = options.type;
		self.text = options.text ? options.text : '';
		self.status = options.status ? options.status : '';
		self.time = options.time ? options.time : 0;

		self.btn = typeof options.btn === 'undefined' ? {
			bIsSureBtn: true,
			sSureBtnText: '确定',
			bIsCancelBtn: true,
			sCancelBtnText: '取消'
		} : options.btn;

		self.bIsPopupStatus = typeof options.bIsPopupStatus === 'undefined' ? true : options.bIsPopupStatus;
		self.bIsPopupBtn = typeof options.bIsPopupBtn === 'undefined' ? true : options.bIsPopupBtn;
		self.bIsCloseBtn = typeof options.bIsCloseBtn === 'undefined' ? true : options.bIsCloseBtn;
		self.fnSureBtn = options.fnSureBtn ? options.fnSureBtn : function() { return false; };
		self.fnCancelBtn = options.fnCancelBtn ? options.fnCancelBtn : '';
		self.fnCloseBtn = options.fnCloseBtn ? options.fnCloseBtn : function() { self.close(); };

		self.init();
	}

	Popup.prototype = {

		constructor: Popup,

		init: function() {

			var self = this;

			// 判断传入id的类型 之所以需要这一步，是为了兼容1.0.0版本形式
			if (typeof self.el === 'object' && self.el.length === 0) {
				console.log('对象不存在');
			}
			else if (typeof self.el === 'string') {
				// 如果有传type参数，那么可以生成弹窗html,不用再页面中单独加html,type取值有 fb-反馈类型弹窗
				if (self.type) {
					self.createHTML();

					// 弹窗加入body中，获取该id，用于接口控制
					self.el = $('#' + self.el);

					// 确定按钮添加事件
					self.el.find('.popup-sure').bind('click', function() {
						self.fnSureBtn();
					})
				}
			}

			// 为x按钮添加关闭弹窗事件
			self.el.find('.popup-close').click(function() {
				self.fnCloseBtn();
			});

			// 为取消按钮添加关闭弹窗事件
			self.el.find('.popup-cancel').click(function() {
				// 若有传取消按钮回调函数，则执行它，否则关闭弹窗
				self.fnCancelBtn ? self.fnCancelBtn() : self.close();
			});
		},

		/**
		 * [createHTML description] 创建弹窗相应类型html，自定义弹窗不需要创建
		 * @return {[type]} [description]
		 */
		createHTML: function() {

			var self = this,
				el = self.el,
				title = self.title,
				type = self.type,
				text = self.text,
				status = self.status,
				btn = self.btn,
				bIsPopupStatus = self.bIsPopupStatus,
				bIsPopupBtn = self.bIsPopupBtn,
				bIsCloseBtn = self.bIsCloseBtn,
				fnSureBtn = self.fnSureBtn,
				fnCancelBtn = self.fnCancelBtn,

				html = '';

			// 使用switch便于拓展
			switch(type) {

				case 'fb':
					html = [
						'<div id="' + el + '" class="popup popup-fb">',
						'	<div class="popup-bg"></div>',
						'	<div class="popup-wrap">',
						'		<div class="popup-top cf">',
						'			<h3 class="popup-title">' + title + '</h3>',
						'			<i class="popup-close' + (bIsCloseBtn ? '' : ' dn') + '"></i>',
						'		</div>',
						'		<div class="popup-content">',
						'			<div class="popup-status' + (status ? ' popup-status-' + status : '') + (bIsPopupStatus ? '' : ' dn') + '"></div>',
						'			<div class="popup-text">' + text + '</div>',
						'			<div class="popup-btn' + (bIsPopupBtn ? '' : ' dn') + '">',
						'				<a class="popup-sure' + (status ? ' popup-sure-' + status : '') + (btn.bIsSureBtn ? '' : ' dn') + '">' + btn.sSureBtnText + '</a>',
						'				<a class="popup-cancel' + (btn.bIsCancelBtn ? '' : ' dn') + '">' + btn.sCancelBtnText + '</a>',
						'			</div>',
						'		</div>',
						'	</div>',
						'</div>'
					].join('\n');
				break;
				case 'custom':
					html = [
						'<div id="' + el + '" class="popup popup-custom">',
						'	<div class="popup-bg"></div>',
						'	<div class="popup-wrap">',
						'		<div class="popup-top cf">',
						'			<h3 class="popup-title">' + title + '</h3>',
						'			<i class="popup-close"></i>',
						'		</div>',
						'		<div class="popup-content">',
						'			'+ text + '',
						'			<div class="popup-btn' + (bIsPopupBtn ? '' : ' dn') + '">',
						'				<a class="popup-sure' + (btn.bIsSureBtn ? '' : ' dn') + '">' + btn.sSureBtnText + '</a>',
						'				<a class="popup-cancel' + (btn.bIsCancelBtn ? '' : ' dn') + '">' + btn.sCancelBtnText + '</a>',
						'			</div>',
						'		</div>',
						'	</div>',
						'</div>'
					].join('\n');
				break;
			}

			// 将html文本加到网页中
			$('body').append(html);
		},

		/**
		 * [show description] 弹窗展示
		 * @return {[type]} [description]
		 */
		show: function() {

			var self = this;

			self.el.show();

			// 如果穿了time值，则定时自动关闭
			if (self.time !== 0) {
				setTimeout(function() {
					self.hide()
				}, self.time);
			}
		},

		/**
		 * [hide description] 弹窗隐藏
		 * @return {[type]} [description]
		 */
		hide: function() {
			this.el.hide();
		},

		/**
		 * [close description] 关闭弹窗函数
		 * @return {[type]} [description]
		 */
		close: function() {
			this.el.hide();
		},

		/**
		 * [setTitle description] 设置弹窗标题
		 * @param {[type]} text [description] 标题文本
		 */
		setTitle: function(text) {
			this.el.find('.popup-title').text(text);
		},

		/**
		 * [setText description] 设置弹窗内容
		 * @param {[type]} html [description] 内容文本，可以包含html代码，比如<br />
		 */
		setText: function(html) {
			this.el.find('.popup-text').html(html);
		},

		/**
		 * [setStatus description] 设置弹窗状态，取值有correct-成功，error错误，warn警告，wait-等待
		 * @param {[type]} status [description] 状态值
		 */
		setStatus: function(status) {

			var self = this,
				el = self.el,
				btn = self.btn;

			el.find('.popup-status').removeClass().addClass('popup-status popup-status-' + status);
			el.find('.popup-sure').removeClass().addClass('popup-sure popup-sure-' + status + (btn.bIsSureBtn ? '' : ' dn'));
		},

		/**
		 * [setWidth description] 设置弹窗宽度
		 * @param {[type]} value [description] 宽度值
		 */
		setWidth: function(value) {

			var self = this,
				el = self.el;

			el.find('.popup-wrap').css({
				width: value,
				'marginLeft': -value/2
			})
		},

		/**
		 * [isPopupStatus description] 是否显示提示图标
		 * @param  {[type]}  value [description] 布尔值，取值有true-显示，false-隐藏
		 * @return {Boolean}       [description]
		 */
		isPopupStatus: function(value) {
			!value ? this.el.find('.popup-status').hide() : this.el.find('.popup-status').show();
		},

		/**
		 * [isPopupBtn description] 是否显示用于操作的按钮
		 * @param  {[type]}  value [description]  布尔值，取值有true-显示，false-隐藏
		 * @return {Boolean}       [description]
		 */
		isPopupBtn: function(value) {
			!value ? this.el.find('.popup-btn').hide() : this.el.find('.popup-btn').show();
		},

		/**
		 * [isPopupBtn description] 是否显示用于操作的按钮
		 * @param  {[type]}  value [description]  布尔值，取值有true-显示，false-隐藏
		 * @return {Boolean}       [description]
		 */
		isCloseBtn: function(value) {
			!value ? this.el.find('.popup-close').hide() : this.el.find('.popup-close').show();
		},

		/**
		 * [reset description] 弹窗配置内容重置
		 * @param  {[type]} options [description]
		 * @return {[type]}         [description]
		 */
		reset: function(options) {

			var self = this;


			self.fnSureBtn = options.fnSureBtn;
			self.fnCancelBtn = options.fnCancelBtn;
			self.fnCloseBtn = options.fnCloseBtn ? options.fnCloseBtn : self.fnCloseBtn;

			self.hide();

			options.title ? self.setTitle(options.title) : '';
			options.text ? self.setText(options.text) : '';
			options.status ? self.setStatus(options.status) : '';

			(typeof options.time) !== 'undefined' ? (self.time = options.time) : '';
			(typeof options.bIsPopupStatus) !== 'undefined' ? self.isPopupStatus(options.bIsPopupStatus) : '';
			(typeof options.bIsPopupBtn) !== 'undefined' ? self.isPopupBtn(options.bIsPopupBtn) : '';
			(typeof options.bIsCloseBtn) !== 'undefined' ? self.isCloseBtn(options.bIsCloseBtn) : '';

			if (typeof options.btn !== 'undefined') {

				var sure = self.el.find('.popup-sure'),
					cancel = self.el.find('.popup-cancel');

				options.btn.bIsSureBtn === true ? sure.show() : sure.hide();
				options.btn.sSureBtnText !== 'undefined' ? sure.text(options.btn.sSureBtnText) : '';

				options.btn.bIsCancelBtn === true ? cancel.show() : cancel.hide();
				options.btn.sCancelBtnText !== 'undefined' ? cancel.text(options.btn.sCancelBtnText) : '';
			}

			self.show();
		}
	}

	win.Popup = Popup;

})(window, document);