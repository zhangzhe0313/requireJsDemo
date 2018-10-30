define(["jquery", "apiconfig"], function ($, apiconfig) {

	// 特殊的接口，不走ajaxClient
	var specialUrl = {
		uploadFile:apiconfig.urlHost + "attachservice/api/attach/upload"// 上传文件接口
	}


	//ajax请求
	var ajaxClient = function (options) {
		return new ApiDataFn(options);
	};

	function ApiDataFn(options) {
		var me = this;
		me.opts = $.extend(true, {}, {
			id: "",
			requestType: "post",
			dataType: "json",
			params: "",
			autoLoading: false,
			loadingContainer: "body",
			loadingMsg: undefined,
			successFuc: function () { },
			errorFuc: function () {
				ajaxErrorMsg()
			},
			completeFuc: function () { }
		}, options);

		var _isAutoLoading = me.opts.autoLoading;
		var _loadingContainer = me.opts.loadingContainer;
		var _loadingMsg = me.opts.loadingMsg;
		var loadingTimer;
		if (_isAutoLoading) {
			loadingTimer = setTimeout(function () {
				msLoadingShow(_loadingContainer, _loadingMsg);
			}, 300);
		}

		$.ajax({
			contentType: "application/json;charset=utf-8",
			url: apiconfig.urlHost + apiconfig.apiList[me.opts.id].url,
			timeout: 30000,
			type: me.opts.requestType,
			dataType: me.opts.dataType,
			data: me.opts.params ? JSON.stringify(me.opts.params) : '',
			success: function (data) {
				if (_isAutoLoading) {
					msLoadingClose(_loadingContainer);
					clearTimeout(loadingTimer);
				}
				// 403 重定向登录页面
				if (data.code == '403') {
					window.location.href = window.__msBaseUrl + "login";
				} else {
					me.opts.successFuc(data);
				}
			},
			error: function (e, xhr, opt) {
				ajaxErrorMsg();
				if (_isAutoLoading) {
					msLoadingClose(_loadingContainer);
					clearTimeout(loadingTimer);
				}
				me.opts.errorFuc(e, xhr, opt);
			},
			complete: function (e, xhr, opt) {
				if (_isAutoLoading) {
					msLoadingClose(_loadingContainer);
					clearTimeout(loadingTimer);
				}
				me.opts.completeFuc(e.xhr, opt);
			}
		});
	};

	//获取地址栏参数
	var getArgs = function () {
		var args = {};
		var query = location.search.substring(1);
		var pairs = query.split("&");
		for (var i = 0; i < pairs.length; i++) {
			var pos = pairs[i].indexOf('=');
			if (pos == -1) continue;
			var argname = pairs[i].substring(0, pos);
			var value = pairs[i].substring(pos + 1);
			value = decodeURIComponent(value);
			args[argname] = value;
		}
		return args;
	};

	//模板转换成html；
	var templateToHtml = function (dataObj, templateId, emptyValue) {
		var rstHtml = "";
		var tmpHtml = $(templateId).html();
		var allKeys = tmpHtml.match(/{{\w.*?}}/g);
		if (allKeys != null) {
			if ((dataObj instanceof Array) && dataObj.length > 0) {
				for (var i = 0; i < dataObj.length; i++) {
					rstHtml += templateItemToHtml(allKeys, dataObj[i], tmpHtml, emptyValue);
				}
			} else {
				rstHtml = templateItemToHtml(allKeys, dataObj, tmpHtml, emptyValue);
			}
		}
		return rstHtml;
	};

	var templateItemToHtml = function (allKeys, dataObj, tmpHtml, emptyValue) {
		var rstItemHtml = tmpHtml;
		for (var i = 0; i < allKeys.length; i++) {
			var tmpKey = allKeys[i].replace('{{', '').replace('}}', '');
			//判断tmpkey是否为多层选择
			if (tmpKey.indexOf('.') != -1) {
				var keyArr = tmpKey.split('.');
				var tmpObj = dataObj;
				for (var j = 0; j < keyArr.length; j++) {
					tmpObj = tmpObj == null ? {} : tmpObj[keyArr[j]];
				};
				if (tmpObj.toString() == "[object Object]") { //防止不存在值
					tmpObj = emptyValue ? emptyValue : "-";
				}
				rstItemHtml = rstItemHtml.replace(allKeys[i], tmpObj);
			} else {
				if (dataObj[tmpKey] == undefined) {
					dataObj[tmpKey] = emptyValue ? emptyValue : "-";
				}
				rstItemHtml = rstItemHtml.replace(allKeys[i], dataObj[tmpKey]);
			}
		}
		return rstItemHtml;
	}

	// 绑定顶部查询事件
	function BindHeaderSearchEvent() {
		if ($("#btnHeaderSearch").length > 0) {
			$("#btnHeaderSearch").on("click", function () {
				var searchTxt = $("#txtHeaderSearch").val();
				if (searchTxt) {
					var form = document.getElementById('formSearch');
					form.submit();
				}
			});
		}
	}

	// 绑定菜单展开、收缩事件
	function BindHeaderMenuEvents() {
		if ($("#msHeaderPanel").length > 0) {
			var timer;
			$('.has-children', $("#msHeaderPanel")).hover(function () {
				$(".children-tab", $(this)).css("display", "block");
				$(".white-triangel", $(this)).css("display", "block");
			}, function () {
				var self = $(this);
				timer = setTimeout(function () {
					$(".white-triangel", self).css("display", "none");
					$(".children-tab", self).css("display", "none");
				}, 50);
			});

			$(".children-tab", $("#msHeaderPanel")).hover(function () {
				clearTimeout(timer);
				$(this).parent().find(".white-triangel").css("display", "block");
			}, function () {
				var _that = this;
				$(_that).parent().find(".white-triangel").css("display", "none");
				$(_that).css("display", "none");
			});

		}
	}

	// 顶部导航在fix同时，可以根据滚动条进行滚动
	function BindHeaderFixScroll() {
		window.onscroll = function () {
			if ($(".ms-header").length > 0) {
				var sl = -Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
				$($(".ms-header")[0]).css({
					"left": sl + "px"
				});
			}
		};
	}

	// 图片加载失败处理
	function ErrorImageHandler(){
		$('img').error(function(){
			var tmpSrc = window.__msBaseUrl || "";
			tmpSrc += 'pc/img/errorimg.png';
			$(this).attr('src', tmpSrc);
			$(this).unbind();
         });
	}

	$(function () {
		BindHeaderMenuEvents();
		BindHeaderSearchEvent();
		BindHeaderFixScroll();
		ErrorImageHandler();
	});

	// 修复前端代码通过require append html时候的渲染先后问题
	function initHeaderEvents() {
		BindHeaderMenuEvents();
		BindHeaderSearchEvent();
		BindHeaderFixScroll();
	}

	var msLoadingShow = function (ele, msg) {
		var loadingClassId = "ms-loading";
		ele = ele || "body";
		if ($(ele).find("." + loadingClassId).length > 0) return;

		var loadingHtml = "<div class='" + loadingClassId + "'>";
		loadingHtml += "<div class='ms-loading-icon'></div>";
		if (msg) {
			loadingHtml += "<div class='ms-loading-msg'>" + msg + "</div>";
		}
		loadingHtml += "</div>";
		$(ele).append(loadingHtml);
	}

	var msLoadingClose = function (ele) {
		var loadingClassId = ".ms-loading";
		ele = ele || "body";
		$(ele).find(loadingClassId).length > 0 && $($(ele).find(loadingClassId)[0]).remove();
	}

	var ajaxErrorMsg = function (msg) {
		var wrapId = "msAjaxErrorWrap";
		if ($("body").find("#" + wrapId).length > 0) return;

		msg = msg || "网络异常，请检查网络后重试！";
		var errorHtml = "<div class='ms-ajax-error-wrap' id='" + wrapId + "'>";
		errorHtml += "<div class='ms-ajax-error-content'>";
		errorHtml += "<svg class='off-icon' aria-hidden='true'><use xlink:href='#icon-wenxintishi'></use></svg>";
		errorHtml += msg;
		errorHtml += "</div>";
		errorHtml += "</div>";
		$("body").append(errorHtml);
		setTimeout(function () {
			$("#" + wrapId).css({
				"opacity": "0"
			});
			setTimeout(function () {
				$("#" + wrapId).remove();
			}, 1000)
		}, 2000);
	}

	return {
		ajaxClient: ajaxClient,
		getArgs: getArgs,
		templateToHtml: templateToHtml,
		initHeaderEvents: initHeaderEvents,
		ajaxErrorMsg: ajaxErrorMsg,
		msLoadingShow: msLoadingShow,
		msLoadingClose: msLoadingClose,
		specialUrl: specialUrl
	};
});