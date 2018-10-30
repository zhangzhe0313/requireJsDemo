define(['jquery'], function ($) {
	function isPlaceholder() {
		var input = document.createElement('input');
		return 'placeholder' in input;
	}

	$(function () {
		if (!isPlaceholder()) { //不支持placeholder 用jquery来完成
			$(document).ready(function () {
				if (!isPlaceholder()) {
					$("input").not("input[type='password']").focus(function () {
						var input = $(this);
						if (input.val() == input.attr('placeholder')) {
							input.val('');
							if ('code' == input.attr('mark')) {
								input.removeClass('placeholder off-replace-code');
							} else {
								input.removeClass('placeholder off-replace-input');
							}
						}
					}).blur(function () {
						var input = $(this);
						if (input.val() == '' || input.val() == input.attr('placeholder')) {
							if ('code' == input.attr('mark')) {
								input.addClass('placeholder off-replace-code');
							} else {
								input.addClass('placeholder off-replace-input');
							}
							input.val(input.attr('placeholder'));
						}
					}).blur();

					//对password框的特殊处理1.创建一个text框 2获取焦点和失去焦点的时候切换
					$("input[type='password']").each(
						function () {
							var pwdField = $(this);
							var pwdVal = pwdField.attr('placeholder');
							if ('code' == pwdField.attr('mark')) {
								pwdField.after('<input  class="login-input off-replace-code" type="text" value=' + pwdVal + ' autocomplete="off" />');
							} else {
								pwdField.after('<input  class="login-input off-replace-input" type="text" value=' + pwdVal + ' autocomplete="off" />');
							}
							var pwdPlaceholder = $(this).siblings('.login-input');
							pwdPlaceholder.show();
							pwdField.hide();

							pwdPlaceholder.focus(function () {
								pwdPlaceholder.hide();
								pwdField.show();
								pwdField.focus();
							});

							pwdField.blur(function () {
								if (pwdField.val() == '') {
									pwdPlaceholder.show();
									pwdField.hide();
								}
							});
						})
				}
			});
		}
	})
})