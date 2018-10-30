! function (e, t) {
    "function" == typeof define && (define.amd || define.cmd) ? define(t) : e.Refresh = t()
}(this, function (require) {
    return "function" == typeof require ? require("Keyboard") : !window.Keyboard && window.console && window.console.warn("you may forget include Keyboard.js"), $.fn.zIndex = function () {
            return $(this).each(function () {
                var e = this,
                    t = $(this).css("z-index"),
                    a = 19;
                $("body").children().each(function () {
                    var t = this,
                        i = $(t),
                        n = 1 * i.css("zIndex");
                    n && t !== e[0] && "none" !== i.css("display") && i.width() * i.height() > 0 && (a = Math.max(n, a))
                }), t != a && $(this).css("z-index", a)
            })
        }, $.fn.refresh = function () {
            return $(this).each(function () {
                var e = $(this);
                e.is("select") && e.selectMatch ? e.selectMatch() : /^radio|checkbox$/i.test(e.attr("type")) && e.propMatch ? e.propMatch() : e.attr("placeholder") && e.placeholder ? e.placeholder() : e.data("pagination") && e.data("pagination").show()
            })
        }, $.fn.disabled = function () {
            return $(this).each(function () {
                var e = $(this);
                if (e.is(":input")) e.attr("disabled", "disabled");
                else if (e.is("a")) e.data("href", e.attr("href")), e.removeAttr("href"), e.attr("aria-disabled", "true");
                else {
                    var t = e.attr("tabindex");
                    t && (e.data("tabindex", t), e.removeAttr("tabindex"))
                }
                e.addClass("disabled")
            })
        }, $.fn.enabled = function () {
            return $(this).each(function () {
                var e = $(this);
                if (e.is(":input")) e.removeAttr("disabled");
                else if (e.is("a")) e.attr("href", e.data("href") || "javascript:"), e.attr("aria-disabled", "false");
                else {
                    var t = e.data("tabindex");
                    t && e.attr("tabindex", t)
                }
                e.removeClass("disabled")
            })
        }, $.fn.isDisabled = function () {
            var e = $(this).eq(0);
            return e.is(":input") ? e.prop("disabled") : e.hasClass("disabled")
        },
        function (e) {
            e.refresh()
        }
});