require(['jquery', 'validate', 'base'], function ($, validate) {

	var phone_Jq = null, // 手机号码输入框
		phoneZoon_Jq = null, // 手机号码外边框区域
		phoneError_Jq = null, // 手机号码错误信息提示区
		password_Jq = null, // 密码输入框
		pwdZoon_Jq = null, // 密码外边框区域
		pwdError_Jq = null, // 密码错误信息提示区
		phoneSvg_default = null,
		phoneSvg_input = null,
		phoneSvg_err = null,
		pwdSvg_default = null,
		pwdSvg_input = null,
		pwdSvg_err = null,
		phoneInputOkSvg = null,
		phoneInputErrSvg = null,
		pwdInputOkSvg = null,
		pwdInputErrSvg = null,
		loginSystem = null,
		identifyDlg = null,
		identifyName = null,
		identifyIdCard = null,
		identifyName_zoon = null,
		identifyIdCard_zoon = null,
		identifyNameSvg_default = null,
		identifyNameSvg_input = null,
		identifyNameSvg_err = null,
		identifyIdCardSvg_default = null,
		identifyIdCardSvg_input = null,
		identifyIdCardSvg_err = null,
		identifyName_okSvg = null,
		identifyName_errSvg = null,
		identifyIdCard_okSvg = null,
		identifyIdCard_errSvg = null,
		identifyName_error = null,
		identifyIdCard_error = null,
		loginContentZoon = null,
		loginTransitePage = null;

	var isPhoneInit = true,
		ispasswdInit = true,
		isNameInit = true,
		isIdcardInit = true;

	// 初始化标签变量
	function initViewJq() {
		phone_Jq = $('[data-input-phone]');
		password_Jq = $('[data-input-pwd]');
		phoneZoon_Jq = $('[data-phone-zoon]');
		pwdZoon_Jq = $('[data-pwd-zoon]');
		phoneSvg_default = $('.login-phone-default');
		phoneSvg_input = $('.login-phone-input');
		phoneSvg_err = $('.login-phone-error');
		pwdSvg_default = $('.login-pwd-default');
		pwdSvg_input = $('.login-pwd-input');
		pwdSvg_err = $('.login-pwd-error');
		phoneError_Jq = $('[data-phone-error]');
		pwdError_Jq = $('[data-pwd-error]');
		phoneInputOkSvg = $('.login-phone-oksvg');
		phoneInputErrSvg = $('.login-phone-errsvg');
		pwdInputOkSvg = $('.login-pwd-oksvg');
		pwdInputErrSvg = $('.login-pwd-errsvg');
		loginSystem = $('#loginSystem');
		identifyDlg = $('#identifyDlg');
		identifyName = $('[data-input-vfname]');
		identifyIdCard = $('[data-input-vfidcard]')
		identifyName_zoon = $('[data-zoon-vfname]');
		identifyIdCard_zoon = $('[data-zoon-vfidcard]');
		identifyNameSvg_default = $('.login-vfname-default');
		identifyNameSvg_input = $('.login-vfname-input');
		identifyNameSvg_err = $('.login-vfname-error');
		identifyIdCardSvg_default = $('.login-vfidcard-default');
		identifyIdCardSvg_input = $('.login-vfidcard-input');
		identifyIdCardSvg_err = $('.login-vfidcard-error');
		identifyName_okSvg = $('.login-vfname-oksvg');
		identifyName_errSvg = $('.login-vfname-errsvg');
		identifyIdCard_okSvg = $('.login-vfidcard-oksvg');
		identifyIdCard_errSvg = $('.login-vfidcard-errsvg');
		identifyName_error = $('[data-vfname-error]');
		identifyIdCard_error = $('[data-vfidcard-error]');
		loginContentZoon = $('#loginContentZoon');
		loginTransitePage = $('#loginTransitePage');

	}

	//	input焦点事件处理: focus, blur
	function handleInputsFoucusBlur() {
		//手机号码输入框
		phone_Jq.on({
			focus: function () {},
			blur: function () {
				// var _phone = phone_Jq.val();
				// if (_phone.length != 0) {
				// 	var _isPhoneOk = validate.checkPhone(_phone);
				// 	if (!_isPhoneOk) {
				// 		changeIputSvgCss('remove', phoneZoon_Jq, phoneSvg_default, phoneSvg_input, phoneSvg_err, phone_Jq, phoneError_Jq, phoneInputErrSvg, phoneInputOkSvg);
				// 	} else {
				// 		changeIputSvgCss('add', phoneZoon_Jq, phoneSvg_default, phoneSvg_input, phoneSvg_err, phone_Jq, phoneError_Jq, phoneInputErrSvg, phoneInputOkSvg);
				// 	}
				// }
			}
		});
		//密码输入框
		password_Jq.on({
			focus: function () {},
			blur: function () {
				// var _pwd = password_Jq.val();
				// if (_pwd.length != 0) {
				// 	var _isPwdOk = validate.checkPwdLength(_pwd);
				// 	if (!_isPwdOk) {
				// 		changeIputSvgCss('remove', pwdZoon_Jq, pwdSvg_default, pwdSvg_input, pwdSvg_err, password_Jq, pwdError_Jq, pwdInputErrSvg, pwdInputOkSvg);
				// 	} else {
				// 		changeIputSvgCss('add', pwdZoon_Jq, pwdSvg_default, pwdSvg_input, pwdSvg_err, password_Jq, pwdError_Jq, pwdInputErrSvg, pwdInputOkSvg);
				// 	}
				// }
			}
		});

		// 姓名输入框
		identifyName.on({
			focus: function () {},
			blur: function () {
				var _nameValue = identifyName.val();
				if (_nameValue.length != 0) {
					var _isNameOk = validate.checkName(_nameValue);
					if (!_isNameOk) {
						changeIputSvgCss('remove', identifyName_zoon, identifyNameSvg_default, identifyNameSvg_input, identifyNameSvg_err, identifyName, identifyName_error, identifyName_errSvg, identifyName_okSvg);
					} else {
						changeIputSvgCss('add', identifyName_zoon, identifyNameSvg_default, identifyNameSvg_input, identifyNameSvg_err, identifyName, identifyName_error, identifyName_errSvg, identifyName_okSvg);
					}
				}
			}
		});
		// 身份证件号码输入框
		identifyIdCard.on({
			focus: function () {},
			blur: function () {
				var _idCardValue = identifyIdCard.val();
				if (_idCardValue.length != 0) {
					var _isIdCardOk = validate.checkCardId(_idCardValue);
					if (!_isIdCardOk) {
						changeIputSvgCss('remove', identifyIdCard_zoon, identifyIdCardSvg_default, identifyIdCardSvg_input, identifyIdCardSvg_err, identifyIdCard, identifyIdCard_error, identifyIdCard_errSvg, identifyIdCard_okSvg);
					} else {
						changeIputSvgCss('add', identifyIdCard_zoon, identifyIdCardSvg_default, identifyIdCardSvg_input, identifyIdCardSvg_err, identifyIdCard, identifyIdCard_error, identifyIdCard_errSvg, identifyIdCard_okSvg);
					}
				}
			}
		});
	}

	// 监听click事件
	function listenClickEvent() {
		// 手机号码输入框clear图标
		phoneInputErrSvg.on('click', function () {
			changeIputSvgCss('reback', phoneZoon_Jq, phoneSvg_default, phoneSvg_input, phoneSvg_err, phone_Jq, phoneError_Jq, phoneInputErrSvg, phoneInputOkSvg);
		});

		// 密码输入框clear图标
		pwdInputErrSvg.on('click', function () {
			changeIputSvgCss('reback', pwdZoon_Jq, pwdSvg_default, pwdSvg_input, pwdSvg_err, password_Jq, pwdError_Jq, pwdInputErrSvg, pwdInputOkSvg);
		});

		// 姓名输入错误图标
		identifyName_errSvg.on('click', function () {
			changeIputSvgCss('reback', identifyName_zoon, identifyNameSvg_default, identifyNameSvg_input, identifyNameSvg_err, identifyName, identifyName_error, identifyName_errSvg, identifyName_okSvg);
		});

		// 证件号码输入错误
		identifyIdCard_errSvg.on('click', function () {
			changeIputSvgCss('reback', identifyIdCard_zoon, identifyIdCardSvg_default, identifyIdCardSvg_input, identifyIdCardSvg_err, identifyIdCard, identifyIdCard_error, identifyIdCard_errSvg, identifyIdCard_okSvg);
		});

		// 登录
		loginSystem.on('click', function () {
			var _phone = phone_Jq.val();
			// if (!validate.checkPhone(_phone)) {
			// 	changeIputSvgCss('remove', phoneZoon_Jq, phoneSvg_default, phoneSvg_input, phoneSvg_err, phone_Jq, phoneError_Jq, phoneInputErrSvg, phoneInputOkSvg);
			// 	return false;
			// }
			if ($.trim(_phone).length === 0) {
				changeIputSvgCss('remove', phoneZoon_Jq, phoneSvg_default, phoneSvg_input, phoneSvg_err, phone_Jq, phoneError_Jq, phoneInputErrSvg, phoneInputOkSvg);
				return false;
			}
			var _pwd = password_Jq.val();
			if (!validate.checkPwdLength(_pwd)) {
				changeIputSvgCss('remove', pwdZoon_Jq, pwdSvg_default, pwdSvg_input, pwdSvg_err, password_Jq, pwdError_Jq, pwdInputErrSvg, pwdInputOkSvg);
				return false;
			}

			var login_form = document.getElementById('loginForm');
			login_form.submit();

			// 弹框
			// identifyDlg.removeClass('off-none');

			// // 验证失败
			// validateInputOpt('add');

		});

		// 弹出框关闭
		$('[data-close]').on('click', function () {
			identifyDlg.addClass('off-none');
		});

		// 进入老官网
		$('#loginOldNet').on('click', function () {
			loginContentZoon.addClass('off-none');
			loginTransitePage.removeClass('off-none');
			window.open('http://ebusiness.minshenglife.com', '_blank');
		});

		// 身份认证提交
		$('#identifyBtn').on('click', function () {
			var _name = identifyName.val();
			if (!validate.checkName(_name)) {
				changeIputSvgCss('remove', identifyName_zoon, identifyNameSvg_default, identifyNameSvg_input, identifyNameSvg_err, identifyName, identifyName_error, identifyName_errSvg, identifyName_okSvg);
				return false;
			}
			var _idcard = identifyIdCard.val();
			if (!validate.checkCardId(_idcard)) {
				changeIputSvgCss('remove', identifyIdCard_zoon, identifyIdCardSvg_default, identifyIdCardSvg_input, identifyIdCardSvg_err, identifyIdCard, identifyIdCard_error, identifyIdCard_errSvg, identifyIdCard_okSvg);
				return false;
			}

			var identifyForm = document.getElementById('identifyForm');
			identifyForm.submit();
			// identifyInputOpt('add');
		});
	}

	// 验证失败，登录input边框改变
	function validateInputOpt(kind) {
		if (!kind) {
			return;
		}
		switch (kind) {
			case 'add':
				phoneZoon_Jq.addClass('off-error-border');
				pwdZoon_Jq.addClass('off-error-border');
				phoneInputOkSvg.addClass('off-none');
				pwdInputOkSvg.addClass('off-none');
				$('.login-validate-fail').removeClass('off-none');
				break;
			case 'remove':
				phoneZoon_Jq.removeClass('off-error-border');
				pwdZoon_Jq.removeClass('off-error-border');
				$('.login-validate-fail').addClass('off-none');
				break;
		}
	}

	// 身份认证
	function identifyInputOpt(kind) {
		if (!kind) {
			return;
		}
		switch (kind) {
			case 'add':
				identifyName_zoon.addClass('off-error-border');
				identifyIdCard_zoon.addClass('off-error-border');
				identifyIdCard_okSvg.addClass('off-none');
				identifyName_okSvg.addClass('off-none');
				$('.login-validate-fail-identify').removeClass('off-none');
				break;
			case 'remove':
				identifyName_zoon.removeClass('off-error-border');
				identifyIdCard_zoon.removeClass('off-error-border');
				$('.login-validate-fail-identify').addClass('off-none');
				break;
		}
	}

	//	input 输入发生长度变化时候
	function inputTextChange() {
		// 手机号码输入框
		phone_Jq.on('keyup', function () {
			var _phone = phone_Jq.val();
			if (_phone.length > 0) {
				isPhoneInit = false;
				changeInputCss('add', phoneZoon_Jq, phoneSvg_default, phoneSvg_input, phoneSvg_err, phone_Jq, phoneError_Jq, phoneInputErrSvg, phoneInputOkSvg);
			} else {
				if (isPhoneInit) {
					return false;
				}
				isPhoneInit = true;
				changeInputCss('remove', phoneZoon_Jq, phoneSvg_default, phoneSvg_input, phoneSvg_err, phone_Jq, phoneError_Jq, phoneInputErrSvg, phoneInputOkSvg);
			}
		});

		// 密码输入框
		password_Jq.on('keyup', function () {
			var _pwd = password_Jq.val();
			if (_pwd.length > 0) {
				ispasswdInit = false;
				changeInputCss('add', pwdZoon_Jq, pwdSvg_default, pwdSvg_input, pwdSvg_err, password_Jq, pwdError_Jq, pwdInputErrSvg, pwdInputOkSvg);
			} else {
				if (ispasswdInit) {
					return false;
				}
				ispasswdInit = true;
				changeInputCss('remove', pwdZoon_Jq, pwdSvg_default, pwdSvg_input, pwdSvg_err, password_Jq, pwdError_Jq, pwdInputErrSvg, pwdInputOkSvg);
			}
		});

		// 姓名输入框
		identifyName.on('keyup', function () {
			var _name = identifyName.val();
			if (_name.length > 0) {
				isNameInit = false;
				changeInputCss('add', identifyName_zoon, identifyNameSvg_default, identifyNameSvg_input, identifyNameSvg_err, identifyName, identifyName_error, identifyName_errSvg, identifyName_okSvg);
			} else {
				if (isNameInit) {
					return false;
				}
				isNameInit = true;
				changeInputCss('remove', identifyName_zoon, identifyNameSvg_default, identifyNameSvg_input, identifyNameSvg_err, identifyName, identifyName_error, identifyName_errSvg, identifyName_okSvg);
			}
		});

		// 证件号码输入框
		identifyIdCard.on('keyup', function () {
			var _idcard = identifyIdCard.val();
			if (_idcard.length > 0) {
				isIdcardInit = false;
				changeInputCss('add', identifyIdCard_zoon, identifyIdCardSvg_default, identifyIdCardSvg_input, identifyIdCardSvg_err, identifyIdCard, identifyIdCard_error, identifyIdCard_errSvg, identifyIdCard_okSvg);
			} else {
				if (isIdcardInit) {
					return false;
				}
				isIdcardInit = true;
				changeInputCss('remove', identifyIdCard_zoon, identifyIdCardSvg_default, identifyIdCardSvg_input, identifyIdCardSvg_err, identifyIdCard, identifyIdCard_error, identifyIdCard_errSvg, identifyIdCard_okSvg);
			}
		})
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

	//	页面初始化
	var init = function () {
		initViewJq();
		inputTextChange();
		handleInputsFoucusBlur();
		listenClickEvent();
	};

	$(function () {
		init();
	})
});