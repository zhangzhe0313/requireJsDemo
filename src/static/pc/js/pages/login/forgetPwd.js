require(['jquery', 'validate', 'mscore', 'base'], function ($, validate, mscore) {

	var phone_Jq = null, // 手机号码输入框
		phoneZoon_Jq = null, // 手机号码外边框区域
		phoneError_Jq = null, // 手机号码错误信息提示区
		password_Jq = null, // 密码输入框
		pwdZoon_Jq = null, // 密码外边框区域
		pwdError_Jq = null, // 密码错误信息提示区
		code_Jq = null, // 验证码输入框
		codeZoon_Jq = null, // 验证码外边框区域
		codeError_Jq = null, // 验证码错误信息提示区
		codeButton_Jq = null, // 获取验证码
		resetPwd_Jq = null, // 重设密码
		phoneSvg_default = null,
		phoneSvg_input = null,
		phoneSvg_error = null,
		pwdSvg_default = null,
		pwdSvg_input = null,
		pwdSvg_error = null,
		phoneInputSvg_ok = null,
		phoneInputSvg_error = null,
		pwdInputSvg_ok = null,
		pwdInputSvg_error = null,
		codeSvg_default = null,
		codeSvg_input = null,
		codeSvg_error = null;

	var isPhontInit = true,
		isPwdInit = true;

	// 初始化标签变量
	function initViewJq() {
		phone_Jq = $('[data-input-phone]');
		phoneZoon_Jq = $('[data-phone-zoon]');
		password_Jq = $('[data-input-pwd]');
		pwdZoon_Jq = $('[data-pwd-zoon]');
		phoneError_Jq = $('[data-phone-error]');
		pwdError_Jq = $('[data-pwd-error]');
		code_Jq = $('[data-input-code]');
		codeZoon_Jq = $('[data-code-zoon]');
		codeError_Jq = $('[data-code-error]');
		codeButton_Jq = $('#obtainCode');
		resetPwd_Jq = $('#resetPwd');
		phoneSvg_default = $('.forgetpwd-phone-default');
		phoneSvg_input = $('.forgetpwd-phone-input');
		phoneSvg_error = $('.forgetpwd-phone-error');
		pwdSvg_default = $('.forgetpwd-pwd-default');
		pwdSvg_input = $('.forgetpwd-pwd-input');
		pwdSvg_error = $('.forgetpwd-pwd-error');
		phoneInputSvg_ok = $('.forgetpwd-phonesvg-ok');
		phoneInputSvg_error = $('.forgetpwd-phonesvg-err');
		pwdInputSvg_ok = $('.forgetpwd-pwdsvg-ok');
		pwdInputSvg_error = $('.forgetpwd-pwdsvg-err');
		codeSvg_default = $('.forgetpwd-code-default');
		codeSvg_input = $('.forgetpwd-code-input');
		codeSvg_error = $('.forgetpwd-code-error');
	}


	//	input焦点事件处理: focus, blur
	function handleInputsFoucusBlur() {
		//手机号码输入框
		phone_Jq.on({
			focus: function () {},
			blur: function () {
				var _fgphone = phone_Jq.val();
				if (_fgphone.length != 0) {
					var _isphoneOk = validate.checkPhone(_fgphone);
					if (!_isphoneOk) {
						changeIputSvgCss('remove', phoneZoon_Jq, phoneSvg_default, phoneSvg_input, phoneSvg_error, phone_Jq, phoneError_Jq, phoneInputSvg_error, phoneInputSvg_ok);
					} else {
						changeIputSvgCss('add', phoneZoon_Jq, phoneSvg_default, phoneSvg_input, phoneSvg_error, phone_Jq, phoneError_Jq, phoneInputSvg_error, phoneInputSvg_ok);
					}
				}
			}
		});

		//验证码输入框
		code_Jq.on({
			focus: function () {},
			blur: function () {
				var fgcode = $.trim(code_Jq.val());
				if (fgcode.length != 0) {
					codeZoon_Jq.removeClass('off-error-border');
					codeZoon_Jq.addClass('off-input-border');
					codeError_Jq.addClass('off-off-visible');
					codeSvg_default.addClass('off-none')
					codeSvg_error.addClass('off-none');
					codeSvg_input.removeClass('off-none');
					code_Jq.removeClass('off-error-text');
				}
			}
		});

		//密码输入框
		password_Jq.on({
			focus: function () {},
			blur: function () {
				var _fgpwd = password_Jq.val();
				if (_fgpwd.length != 0) {
					var _isPwdOk = validate.checkPwd(_fgpwd);
					if (!_isPwdOk) {
						changeIputSvgCss('remove', pwdZoon_Jq, pwdSvg_default, pwdSvg_input, pwdSvg_error, password_Jq, pwdError_Jq, pwdInputSvg_error, pwdInputSvg_ok);
					} else {
						changeIputSvgCss('add', pwdZoon_Jq, pwdSvg_default, pwdSvg_input, pwdSvg_error, password_Jq, pwdError_Jq, pwdInputSvg_error, pwdInputSvg_ok);
					}
				}
			}
		});
	}

	//	input 输入发生长度变化时候
	function inputTextChange() {
		// 手机号码
		phone_Jq.on('keyup', function () {
			var _fgphone = phone_Jq.val();
			if (_fgphone.length > 0) {
				isPhontInit = false;
				changeInputCss('add', phoneZoon_Jq, phoneSvg_default, phoneSvg_input, phoneSvg_error, phone_Jq, phoneError_Jq, phoneInputSvg_error, phoneInputSvg_ok);
			} else {
				if (isPhontInit) {
					return false;
				}
				isPhontInit = true;
				changeInputCss('remove', phoneZoon_Jq, phoneSvg_default, phoneSvg_input, phoneSvg_error, phone_Jq, phoneError_Jq, phoneInputSvg_error, phoneInputSvg_ok);
			}
		});

		// 手机验证码
		code_Jq.on('keyup', function () {
			var fgcode = $.trim(code_Jq.val());
			if (fgcode.length > 0) {
				codeInputValueGtZero(codeZoon_Jq, codeSvg_default, codeSvg_input, codeSvg_error, codeError_Jq, code_Jq);
			} else {
				codeInputValueEqZero(code_Jq, codeZoon_Jq, codeSvg_default, codeSvg_input, codeError_Jq, codeSvg_error);
			}
		});

		// 密码输入框
		password_Jq.on('keyup', function () {
			var _fgpwd = password_Jq.val();
			if (_fgpwd.length > 0) {
				isPwdInit = false;
				changeInputCss('add', pwdZoon_Jq, pwdSvg_default, pwdSvg_input, pwdSvg_error, password_Jq, pwdError_Jq, pwdInputSvg_error, pwdInputSvg_ok);
			} else {
				if (isPwdInit) {
					return false;
				}
				isPwdInit = true;
				changeInputCss('remove', pwdZoon_Jq, pwdSvg_default, pwdSvg_input, pwdSvg_error, password_Jq, pwdError_Jq, pwdInputSvg_error, pwdInputSvg_ok);
			}
		});
	}

	// 当验证码内容大于零时
	function codeInputValueGtZero(inputZoonView, defaultIcon, nowIcon, errIcon, errorView, inputView) {
		if (!inputZoonView || !defaultIcon || !nowIcon || !errIcon) {
			return;
		}
		changeBorderColor(inputZoonView, 'off-input-border', 'add');
		defaultIcon.addClass('off-none');
		nowIcon.removeClass('off-none');
		errIcon.addClass('off-none');
		errorView.addClass('off-off-visible');
		inputView.removeClass('off-error-text');
	}

	// 当验证码长度等于零时候
	function codeInputValueEqZero(inputView, inputZoonView, defaultIcon, nowIcon, errTextView, errIcon) {
		if (!inputView || !inputZoonView || !defaultIcon || !nowIcon || !errTextView) {
			return;
		}
		changeBorderColor(inputZoonView, 'off-input-border', 'remove');
		defaultIcon.removeClass('off-none');
		nowIcon.addClass('off-none');
		errTextView.addClass('off-off-visible');
		changeBorderColor(inputZoonView, 'off-error-border', 'remove');
		inputView.removeClass('off-error-text');
		errIcon.addClass('off-none');
	}

	// 当输入框中内容length大于零，输入框边框变色
	function changeBorderColor(view, clss, kind) {
		if (!view || !kind) {
			return;
		}
		switch (kind) {
			case 'add':
				if (!view.hasClass(clss)) {
					view.addClass(clss);
				}
				break;
			case 'remove':
				if (view.hasClass(clss)) {
					view.removeClass(clss);
				}
				break;
		}
	}

	// 点击事件--点击进入重置密码页面
	function clickEvents() {
		//获取验证码
		codeButton_Jq.on('click', function () {
			var _fgphone = phone_Jq.val();
			if (!validate.checkPhone(_fgphone)) {
				changeIputSvgCss('remove', phoneZoon_Jq, phoneSvg_default, phoneSvg_input, phoneSvg_error, phone_Jq, phoneError_Jq, phoneInputSvg_error, phoneInputSvg_ok);
				return false;
			}
			getVerificationCode(_fgphone);
			return false;
		});

		// 手机号码输入错误右侧清除图标
		phoneInputSvg_error.on('click', function () {
			changeIputSvgCss('reback', phoneZoon_Jq, phoneSvg_default, phoneSvg_input, phoneSvg_error, phone_Jq, phoneError_Jq, phoneInputSvg_error, phoneInputSvg_ok);
		});

		// 密码输入错误右侧清除图标
		pwdInputSvg_error.on('click', function () {
			changeIputSvgCss('reback', pwdZoon_Jq, pwdSvg_default, pwdSvg_input, pwdSvg_error, password_Jq, pwdError_Jq, pwdInputSvg_error, pwdInputSvg_ok);
		});

		//重设密码
		resetPwd_Jq.on('click', function () {
			var _ckphone = phone_Jq.val();
			if (!validate.checkPhone(_ckphone)) {
				changeIputSvgCss('remove', phoneZoon_Jq, phoneSvg_default, phoneSvg_input, phoneSvg_error, phone_Jq, phoneError_Jq, phoneInputSvg_error, phoneInputSvg_ok);
				return false;
			}
			var ckcode = code_Jq.val();
			if ($.trim(ckcode) == '') {
				codeZoon_Jq.addClass('off-error-border');
				codeZoon_Jq.removeClass('off-input-border');
				codeError_Jq.removeClass('off-off-visible');
				codeSvg_default.addClass('off-none');
				codeSvg_error.removeClass('off-none');
				return false;
			}
			var _ckpwd = password_Jq.val();
			if (!validate.checkPwd(_ckpwd)) {
				changeIputSvgCss('remove', pwdZoon_Jq, pwdSvg_default, pwdSvg_input, pwdSvg_error, password_Jq, pwdError_Jq, pwdInputSvg_error, pwdInputSvg_ok);
				return false;
			}

			$('.forgetpwd-validate-fail-identify').addClass('off-none');

			// 提交信息
			mscore.ajaxClient({
				id: 'getPwdBycodeInForgetPwd',
				params: {
					mobile: _ckphone,
					validCode: ckcode,
					newPassword: _ckpwd
				},
				autoLoading: true,
				successFuc: function (data) {
					if (data && data.code != '200') {
						if (data.code == '201') {
							changeIputSvgCss('remove', phoneZoon_Jq, phoneSvg_default, phoneSvg_input, phoneSvg_error, phone_Jq, phoneError_Jq, phoneInputSvg_error, phoneInputSvg_ok);
							erroeCodeChangeInputCss();
						} else if (data.code == '101' || data.code == '400') {
							erroeCodeChangeInputCss();
						}
						$('.forgetpwd-validate-fail-identify').removeClass('off-none');
						$('.forgetpwd-vf-text').text(data.message);
					} else {
						window.location.href = window.__msBaseUrl + 'resetPwdSucc';
					}
				}
			});
		});
	}

	// 当验证码校验失败时，
	function erroeCodeChangeInputCss() {
		codeZoon_Jq.addClass('off-error-border');
		codeZoon_Jq.removeClass('off-input-border');
		codeError_Jq.addClass('off-off-visible');
		codeSvg_default.addClass('off-none');
		code_Jq.addClass('off-error-text');
		codeSvg_error.removeClass('off-none');
		codeSvg_input.addClass('off-none');
	}

	// 短信接口
	function getVerificationCode(phone) {
		var params = {
			"mobile": phone,
			"type": "changePass"
		}
		codeButton_Jq.attr('disabled', true);
		codeButton_Jq.addClass('off-disabled');
		mscore.ajaxClient({
			id: "forgetPwdPhoneCode",
			params: params,
			successFuc: function (data) {
				if (data != null && data.code == '200') {
					$('.forgetpwd-validate-fail-identify').addClass('off-none');
					validate.timeCountFromEnd(codeButton_Jq, 'off-disabled');
				} else {
					$('.forgetpwd-validate-fail-identify').removeClass('off-none');
					$('.forgetpwd-vf-text').text(data.message);
					changeIputSvgCss('remove', phoneZoon_Jq, phoneSvg_default, phoneSvg_input, phoneSvg_error, phone_Jq, phoneError_Jq, phoneInputSvg_error, phoneInputSvg_ok);
					phoneError_Jq.addClass('off-none');
					codeButton_Jq.removeAttr('disabled');
					codeButton_Jq.removeClass('off-disabled');
					return;
				}
			},
			errorFuc: function(err) {
				codeButton_Jq.removeAttr("disabled");
				codeButton_Jq.removeClass('off-disabled');
				console.log(err.message);
			}
		});
	}

	function changeIputSvgCss(kind, inputZoon, defaultSvg, inputSvg, errorSvg, inputView, errorView, inputErrIcon, inputOkIcon) {
		switch (kind) {
			case 'add':
				inputZoon.removeClass('off-error-border');
				inputSvg.removeClass('off-none');
				errorSvg.addClass('off-none');
				inputView.removeClass('off-error-text');
				errorView.addClass('off-off-visible');
				inputErrIcon.addClass('off-none');
				inputOkIcon.removeClass('off-none');
				defaultSvg.addClass('off-none');
				break;
			case 'remove':
				inputZoon.addClass('off-error-border');
				inputZoon.removeClass('off-input-border');
				inputSvg.addClass('off-none');
				errorSvg.removeClass('off-none');
				inputView.addClass('off-error-text');
				errorView.removeClass('off-off-visible');
				inputErrIcon.removeClass('off-none');
				inputOkIcon.addClass('off-none');
				defaultSvg.addClass('off-none');
				break;
			case 'reback':
				inputZoon.removeClass('off-error-border');
				errorSvg.addClass('off-none');
				inputView.removeClass('off-error-text');
				errorView.addClass('off-off-visible');
				inputErrIcon.addClass('off-none');
				defaultSvg.removeClass('off-none');
				inputView.val(null);
				break;
		}
	}

	// 当input change时，改变相应css
	function changeInputCss(kind, inputZoon, defaultSvg, inputSvg, errorSvg, inputView, errorView, inputErrIcon, inputOkIcon) {
		inputErrIcon.addClass('off-none');
		inputOkIcon.addClass('off-none');
		inputZoon.removeClass('off-error-border');
		errorSvg.addClass('off-none');
		errorView.addClass('off-off-visible');
		switch (kind) {
			case 'add':
				inputZoon.addClass('off-input-border');
				defaultSvg.addClass('off-none');
				inputSvg.removeClass('off-none');
				inputView.removeClass('off-error-text');
				break;
			case 'remove':
				inputZoon.removeClass('off-input-border');
				defaultSvg.removeClass('off-none');
				inputSvg.addClass('off-none');
				inputView.removeClass('off-error-text');
				break;
		}
	}

	//	页面初始化
	var init = function () {
		//	js中所有调用的函数
		initViewJq();
		handleInputsFoucusBlur();
		inputTextChange();
		clickEvents();
	};

	$(function () {
		init();
	})
});