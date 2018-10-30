define(['jquery'], function ($) {

    var validate = {

        // 校验非空数据
        checkEmptyData: function (data, func) {
            var errorJson = {
                error: '您的信息填写有误，请检查是否已填写完整！',
                type: null
            };
            errorJson.type = data.type;
            if (data && data.value) {
                return true;
            } else {
                func && func(errorJson);
                return false;
            }
        },

        // 校验保单编号//证件号非空
        checkInsuNo: function (data, func) {
            var errorJson = {
                error: '请输入正确的保单号',
                type: null
            };
            errorJson.type = data.type;
            var reg = /^[8][6][0-9]{18}$/;
            if (data && data.value) {
                if (reg.test(data.value)) {
                    return true;
                }
            }
            func && func(errorJson);
            return false;
        },
        // 校验姓名--可以中文，英文，但是不能混合
        checkLegalName: function (data, func) {
            var errorJson = {
                error: '请输入正确的姓名',
                type: null
            };
            errorJson.type = data.type;
            if (data && data.value) {
                var ruleNumber = new RegExp('^[a-zA-Z]+$'); // input 设置了最大长度40，故此处省略长度校验
                var ruleCN = new RegExp('^[\u4E00-\u9FA5]{1,20}$');

                if (ruleNumber.test(data.value) || ruleCN.test(data.value)) {
                    return true;
                }
            }
            func && func(errorJson);
            return false;
        },
        // 校验身份证
        checkIdCard: function (data, func) {
            var errorJson = {
                error: '身份证输入有误，请核对！',
                type: null
            };
            errorJson.type = data.type;
            if (data && data.value) {
                // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
                var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if (reg.test(data.value)) {
                    return true;
                }
            }
            func && func(errorJson);
            return false;
        },
        // 校验手机号码
        checkLegalMobile: function (data, func) {
            var errorJson = {
                error: '手机号码输入有误，请核对！',
                type: null
            };
            errorJson.type = data.type;
            if (data && data.value) {
                var reg = /^[1][3,4,5,7,8][0-9]{9}$/;

                if (reg.test(data.value)) {
                    return true;
                }
            }
            func && func(errorJson);
            return false;
        },

        checkPhone: function (val) {
            var phone = $.trim(val);
            var res = phone.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/);
            return res;
        },

        checkName: function (val) {
            var name = $.trim(val);
            var ruleNumber = new RegExp('^[a-zA-Z]+$'); // input 设置了最大长度40，故此处省略长度校验
            var ruleCN = new RegExp('^[\u4E00-\u9FA5]{1,20}$');

            if (ruleNumber.test(name) || ruleCN.test(name)) {
                return true;
            } else {
                return false;
            }
        },
        // 验证代理人编码
        checkAgentNumber: function (num) {
            var number = $.trim(num);
            var reg = /^\d{10}$/;
            return reg.test(number);
        },
        checkCardId: function (val) {
            // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
            var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            var id = $.trim(val);
            if (reg.test(id)) {
                return true;
            } else {
                return false;
            }
        },
        //60秒倒计时
        countDown: function (self) {
            var sec = 60;
            for (var i = 0; i <= 60; i++) {
                window.setTimeout(function () {
                    if (sec != 0) {
                        self.text(sec + '秒后重试');
                        self.attr('disabled', true);
                        sec--;
                    } else {
                        sec = 60; //如果倒计时结束就让  获取验证码显示出来
                        self.attr('disabled', false);
                        self.text('获取验证码');
                    }
                }, i * 1000)
            }
        },

        // 校验密码 6-16 大小写数字组合
        checkPwd: function (pwd) {
            var _pwd = $.trim(pwd);
            // 检验密码长度
            if (_pwd.length < 6 || _pwd.length > 16) {
                return false;
            }
            // 检验是否含有排除的特殊符号
            var markReg = new RegExp("[`|{}':;',\\[\\]<>/?~！￥……（）——|{}【】‘；：”“'。，、？]");
            if (markReg.test(_pwd)) {
                return false;
            }
            // 检验是否包含数字字母
            var regex = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]/;
            if (regex.test(_pwd)) {
                return true;
            }
            return false;
        },

        // 登录校验密码长度
        checkPwdLength: function (pwd) {
            var lgth = $.trim(pwd).length;
            if (lgth < 6 || lgth > 16) {
                return false;
            }
            return true;
        },

        //验证邮箱
        checkEmail: function (val) {
            var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
            return re.test($.trim(val));
        },
        //  输入框有内容时边框变色(非表单)
        inputChangeColor: function (self, errObj) {
            self.keyup(function () {
                if ($(this).val()) {
                    $(this).removeClass('off-input-error').addClass("off-input-focus");
                    errObj.addClass("off-none");
                } else if ($(this.val).length === 0) {
                    errObj.addClass("off-none");
                    $(this).removeClass('off-input-error');
                    $(this).removeClass("off-input-focus");
                } else {
                    $(this).removeClass("off-input-focus");
                }
            })
        },
        // 输入框有内容时边框变色(表单)
        getInputFocus: function (self) {
            self.keyup(function () {
                if ($(this).val()) {
                    $(this).removeClass('off-input-error').addClass("off-input-focus");
                    $(this).parent().find('.info-error-message').css("visibility", 'hidden');
                } else {
                    $(this).removeClass("off-input-focus");
                }
            })
        },

        // 验证码倒计时
        timeCountFromEnd: function (buttonView, disableClss) {
            var InterValObj; //timer变量，控制时间
            var count = 60; //间隔函数，1秒执行
            var curCount; //当前剩余秒数

            curCount = count;
            buttonView.attr("disabled", "true");
            buttonView.addClass(disableClss);
            buttonView.text(curCount);

            InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次

            //timer处理函数
            function SetRemainTime() {
                if (curCount == 0) {
                    window.clearInterval(InterValObj); //停止计时器
                    buttonView.removeAttr("disabled"); //启用按钮
                    buttonView.removeClass(disableClss);
                    buttonView.text('获取验证码');
                } else {
                    curCount--;
                    buttonView.text(curCount);
                }
            }
        },

        // 校验用户名
        checkAccount: function (account) {
            var self = $.trim(account);
            var reg = /^[a-zA-Z][a-zA-Z0-9]*$/;
            if (reg.test(self)) {
                return true;
            } else {
                return false;
            }
        }

    }

    return validate;
})