require(['jquery', 'validateUtils', 'mscore', 'base'], function ($, validateUtils, mscore) {

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
		registerAccount_Jq = null, // 重设密码
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
		codeSvg_error = null,
		registerContentZoon = null,
		loginTransitePage = null,
		rgstPtlUnchecked = null,
		rgstPtlChecked = null,
		rgstPtlAgreeError = null;

	var isPhoneInit = true,
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
		registerAccount_Jq = $('#registerAccount');
		phoneSvg_default = $('.register-phone-default');
		phoneSvg_input = $('.register-phone-input');
		phoneSvg_error = $('.register-phone-error');
		pwdSvg_default = $('.register-pwd-default');
		pwdSvg_input = $('.register-pwd-input');
		pwdSvg_error = $('.register-pwd-error');
		phoneInputSvg_ok = $('.register-phone-oksvg');
		phoneInputSvg_error = $('.register-phone-errsvg');
		pwdInputSvg_ok = $('.register-pwdsvg-ok');
		pwdInputSvg_error = $('.register-pwdsvg-err');
		codeSvg_default = $('.register-code-default');
		codeSvg_input = $('.register-code-input');
		codeSvg_error = $('.register-code-error');
		registerContentZoon = $('[data-register]');
		loginTransitePage = $('#loginTransitePage');
		rgstPtlUnchecked = $('.register-protocol-unchecked');
		rgstPtlChecked = $('.register-protocol-checked');
		rgstPtlAgreeError = $('[data-rgsrptl-error]');
	}


	//	input焦点事件处理: focus, blur
	function handleInputsFoucusBlur() {
		//手机号码输入框
		phone_Jq.on({
			focus: function () {},
			blur: function () {
				var _fgphone = phone_Jq.val();
				if (_fgphone.length != 0) {
					var _isphoneOk = validateUtils.checkPhone(_fgphone);
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
					var _isPwdOk = validateUtils.checkPwd(_fgpwd);
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
				isPhoneInit = false;
				changeInputCss('add', phoneZoon_Jq, phoneSvg_default, phoneSvg_input, phoneSvg_error, phone_Jq, phoneError_Jq, phoneInputSvg_error, phoneInputSvg_ok);
			} else {
				if (isPhoneInit) {
					return false;
				}
				isPhoneInit = true;
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
		if (!inputZoonView || !defaultIcon || !nowIcon) {
			return;
		}
		changeBorderColor(inputZoonView, 'off-input-border', 'add');
		defaultIcon.addClass('off-none');
		nowIcon.removeClass('off-none');
		if (errIcon) {
			errIcon.addClass('off-none');
		}
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
			if (!validateUtils.checkPhone(_fgphone)) {
				changeIputSvgCss('remove', phoneZoon_Jq, phoneSvg_default, phoneSvg_input, phoneSvg_error, phone_Jq, phoneError_Jq, phoneInputSvg_error, phoneInputSvg_ok);
				return false;
			}
			getVerificationCode(_fgphone);
			return false;
		})

		// 手机号码输入错误右侧清除图标
		phoneInputSvg_error.on('click', function () {
			changeIputSvgCss('reback', phoneZoon_Jq, phoneSvg_default, phoneSvg_input, phoneSvg_error, phone_Jq, phoneError_Jq, phoneInputSvg_error, phoneInputSvg_ok);
		});

		// 密码输入错误右侧清除图标
		pwdInputSvg_error.on('click', function () {
			changeIputSvgCss('reback', pwdZoon_Jq, pwdSvg_default, pwdSvg_input, pwdSvg_error, password_Jq, pwdError_Jq, pwdInputSvg_error, pwdInputSvg_ok);
		});

		//注册
		registerAccount_Jq.on('click', function () {
			var _ckphone = phone_Jq.val();
			if (!validateUtils.checkPhone(_ckphone)) {
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
			if (!validateUtils.checkPwd(_ckpwd)) {
				changeIputSvgCss('remove', pwdZoon_Jq, pwdSvg_default, pwdSvg_input, pwdSvg_error, password_Jq, pwdError_Jq, pwdInputSvg_error, pwdInputSvg_ok);
				return false;
			}
			if (rgstPtlChecked.hasClass('off-none')) {
				rgstPtlAgreeError.removeClass('off-off-visible');
				return false;
			} else {
				rgstPtlAgreeError.addClass('off-off-visible');
			}

			// var registerForm = document.getElementById('register_form');
			// registerForm.submit();

			$('.register-validateUtils-fail-identify').addClass('off-none');

			mscore.ajaxClient({
				id: 'userRegister',
				params: {
					'mobile': _ckphone,
					'pass': _ckpwd,
					'validCode': ckcode,
					'sysCode': 'mshome'
				},
				autoLoading: true,
				successFuc: function (data) {
					if (!data || $.isEmptyObject(data)) {
						return;
					}
					if (data.code != '200') {
						if (data.code == '101' || data.code == '400') {
							ajaxErrorCss(codeZoon_Jq, code_Jq, codeSvg_input, codeSvg_error);
						} else if (data.code == '201') {
							ajaxErrorCss(phoneZoon_Jq, phone_Jq, phoneSvg_input, phoneSvg_error, phoneInputSvg_ok);
						}
						$('.register-validateUtils-fail-identify').removeClass('off-none');
						$('.register-vf-text').text(data.message);
					} else {
						window.location.href = window.__msBaseUrl + 'registSucc';
					}
				}
			});
		});

		// 进入老官网
		$('#loginOldNet').on('click', function () {
			registerContentZoon.addClass('off-none');
			loginTransitePage.removeClass('off-none');
			window.open('http://ebusiness.minshenglife.com', '_blank');
		});

		// 协议
		$('.register-ckb').on('click', function () {
			if ($(this).hasClass('register-protocol-unchecked')) {
				rgstPtlUnchecked.addClass('off-none');
				rgstPtlChecked.removeClass('off-none');
				rgstPtlAgreeError.addClass('off-off-visible');
			} else {
				rgstPtlChecked.addClass('off-none');
				rgstPtlUnchecked.removeClass('off-none');
			}
		});
	}

	// ajax验证返回错误信息
	function ajaxErrorCss(inputZoon, inputView, inputSvg, errorSvg, okIcon) {
		inputZoon.removeClass('off-input-border');
		inputZoon.addClass('off-error-border');
		inputView.addClass('off-error-text');
		inputSvg.addClass('off-none');
		if (okIcon) {
			okIcon.addClass('off-none');
		}
		errorSvg.removeClass('off-none');
	}

	// 短信接口
	function getVerificationCode(phone) {
		var params = {
			"mobile": phone,
			"type": "regist"
		};
		// 禁用点击按钮
		codeButton_Jq.attr("disabled", "true");
		codeButton_Jq.addClass('off-disabled');
		mscore.ajaxClient({
			id: "getVerificationCodeInUser",
			params: params,
			successFuc: function (data) {
				if (data != null && data.code == '200') {
					$('.register-validateUtils-fail-identify').addClass('off-none');
					validateUtils.timeCountFromEnd(codeButton_Jq, 'off-disabled');
				} else {
					$('.register-validate-fail-identify').removeClass('off-none');
					$('.register-vf-text').text(data.message);
					changeIputSvgCss('remove', phoneZoon_Jq, phoneSvg_default, phoneSvg_input, phoneSvg_error, phone_Jq, phoneError_Jq, phoneInputSvg_error, phoneInputSvg_ok);
					phoneError_Jq.addClass('off-off-visible');
					codeButton_Jq.removeAttr("disabled");
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

	// 当验证input内容时做相应变换
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