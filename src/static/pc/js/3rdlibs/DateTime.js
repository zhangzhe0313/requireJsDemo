! function (t, a) {
    "function" == typeof define && (define.amd || define.cmd) ? define(a) : t.DateTime = a()
}(this, function (require) {
    if ("function" == typeof require) require("Follow");
    else if (!$().follow) return window.console && window.console.error("need Follow.js"), {};
    var t = "selected",
        a = /-|\//g;
    String.prototype.toDate = function () {
        var t, e, i, s = this.split(a);
        return t = 1 * s[0], e = s[1] || 1, i = s[2] || 1, t ? new Date(t, e - 1, i) : new Date
    }, Date.prototype.toArray = function () {
        var t = this.getFullYear(),
            a = this.getMonth() + 1,
            e = this.getDate();
        return a < 10 && (a = "0" + a), e < 10 && (e = "0" + e), [t, a, e]
    };
    var e = function (a, e) {
        if (!a || !a.length) return this;
        var i = {
                value: "",
                type: "auto",
                min: "auto",
                max: "auto",
                trigger: ["change"],
                onShow: $.noop,
                onHide: $.noop
            },
            s = $.extend({}, i, e || {}),
            n = null;
        if (a.get(0).type ? a = (n = a).parent() : n = a.find("input"), 0 == n.length) return this;
        n.prop("readonly", !0), n.parent().hover(function () {
            $(this).addClass("hover")
        }, function () {
            $(this).removeClass("hover")
        });
        var r = s.type;
        "auto" == r && (r = n.attr("type") || "date");
        var h = n.attr("id");
        h || (h = r + (Math.random() + "").replace("0.", ""), n.attr("id", h)), $('<label for="' + h + '"></label>').addClass("ui-date-arrow").insertAfter(n);
        var o = n.val();
        switch ("" == o && s.value && (n.val(s.value), o = s.value), r) {
            case "date":
            case "year":
            case "month":
                var l = o.toDate().toArray();
                "" == o && ("date" == r ? n.val(l.join("-")) : "year" == r ? n.val(l[0]) : "month" == r && n.val(l.slice(0, 2).join("-"))), this[t] = l;
                break;
            case "time":
            case "hour":
            case "minute":
                var d = o.split(":"),
                    c = d[0],
                    u = d[1];
                "" != o && c < 24 && c > 0 ? (u > 0 && u < 60 && "hour" != r ? 1 == u.length && (u = "0" + u) : u = "00", 1 == c.length && (c = "0" + c)) : (c = "00", u = "00"), n.val([c, u].join(":")), this[t] = [c, u];
                break;
            case "date-range":
            case "month-range":
                var v = new Date,
                    p = new Date,
                    m = o.split(" ");
                if ("" != o && 1 == m.length) {
                    var g = m[0].toDate();
                    g.getTime() > v.getTime() ? p = g : v = g
                } else v = m[0].toDate(), p = m[m.length - 1].toDate();
                var y = v.toArray(),
                    f = p.toArray();
                "date-range" == r ? n.val(y.join("-") + " 至 " + f.join("-")) : n.val(y.slice(0, 2).join("-") + " 至 " + f.slice(0, 2).join("-")), this[t] = [y, f]
        }
        var j = this,
            w = $("<div></div>").addClass("ui-date-container").delegate("a", "click", function () {
                var a, e, i = 0,
                    s = 0,
                    n = 0,
                    r = 0,
                    h = [];
                switch (w.attr("data-type")) {
                    case "date":
                        if (/prev|next/.test(this.className)) {
                            s = $(this).attr("data-month"), j[t][1] = 1 * s;
                            var o = j._monthDay(j[t]),
                                l = j[t][2],
                                d = w.data("dayOverflow"),
                                c = s - 1 < 0 ? o[11] : s > o.length ? o[0] : o[s - 1];
                            d ? j[t][2] = Math.min(d, c) : j[t][2] > c && (j[t][2] = c, w.data("dayOverflow", l)), j[t] = j[t].join("-").toDate().toArray(), j.date(), w.find(".selected").get(0).href && j.val()
                        } else /item/.test(this.className) ? (n = this.innerHTML, /\D/.test(n) ? j[t] = (new Date).toArray() : (n < 10 && (n = "0" + n), j[t][2] = n), j.val(), j.hide(), w.removeData("dayOverflow")) : "month" == $(this).attr("data-type") && j.month();
                        break;
                    case "date-range":
                        /prev|next/.test(this.className) ? (s = 1 * $(this).attr("data-month"), h = j.el.container.data("date") || j[t][0], j.el.container.data("date", new Date(h[0], s - 1, 1).toArray()), j["date-range"]()) : /item/.test(this.className) ? (i = $(this).attr("data-year"), s = $(this).attr("data-month"), n = this.innerHTML, s < 10 && (s = "0" + s), n < 10 && (n = "0" + n), (a = j[t])[0].join() == a[1].join() ? i + s + n > a[0].join("") ? a[1] = [i, s, n] : a[0] = [i, s, n] : a = [
                            [i, s, n],
                            [i, s, n]
                        ], j[t] = a, j["date-range"]()) : /button/.test(this.className) && ("ensure" == (e = $(this).attr("data-type")) ? (j.val(), j._rangeSelected = j[t], j.hide()) : "cancel" == e && (j._rangeSelected && (j[t] = j._rangeSelected), j.hide()));
                        break;
                    case "month-range":
                        /prev|next/.test(this.className) ? (i = 1 * $(this).attr("data-year"), h = j.el.container.data("date") || j[t][0], j.el.container.data("date", new Date(i, h[1], 1).toArray()), j["month-range"]()) : /item/.test(this.className) ? (i = $(this).attr("data-year"), s = $(this).attr("data-value"), n = "01", (a = j[t])[0].join() == a[1].join() ? i + s + n > a[0].join("") ? a[1] = [i, s, n] : a[0] = [i, s, n] : a = [
                            [i, s, n],
                            [i, s, n]
                        ], j[t] = a, j["month-range"]()) : /button/.test(this.className) && ("ensure" == (e = $(this).attr("data-type")) ? (j.val(), j._rangeSelected = j[t], j.hide()) : "cancel" == e && (j._rangeSelected && (j[t] = j._rangeSelected), j.hide()));
                        break;
                    case "month":
                        if (/prev|next/.test(this.className)) i = $(this).attr("data-year"), j[t][0] = 1 * i, j.month(), w.find(".selected").get(0).href && j.val();
                        else if (/item/.test(this.className)) {
                            var u = $(this).attr("data-value");
                            if (u) j[t][1] = u;
                            else {
                                var v = (new Date).toArray();
                                j[t][0] = v[0], j[t][1] = v[1]
                            }
                            j.val(), "month" == j.type ? j.hide() : j.date()
                        } else "year" == $(this).attr("data-type") && j.year();
                        break;
                    case "year":
                        /prev|next/.test(this.className) ? (i = $(this).attr("data-year"), j[t][0] = 1 * i, j.year(), w.find(".selected").get(0).href && j.val()) : /item/.test(this.className) && ("今年" == this.innerHTML ? j[t][0] = (new Date).getFullYear() : j[t][0] = 1 * this.innerHTML, j.val(), "year" == j.type ? j.hide() : j.month());
                        break;
                    case "minute":
                        /prev|next/.test(this.className) ? (1 == (r = $(this).attr("data-hour")).length && (r = "0" + r), j[t][0] = r, j.minute(), w.find(".selected").attr("href") && j.val()) : /item/.test(this.className) ? (j[t] = this.innerHTML.split(":"), j.val(), j.hide()) : "hour" == $(this).attr("data-type") && j.hour();
                        break;
                    case "hour":
                        /item/.test(this.className) && (j[t][0] = this.innerHTML.split(":")[0], j.val(), "hour" == j.type ? j.hide() : j.minute())
                }
            });
        this.el = {}, this.el.container = w, this.el.trigger = a, this.el.input = n, this.type = r, this.max = s.max, this.min = s.min, this.callback = {
            show: s.onShow,
            hide: s.onHide,
            trigger: s.trigger
        }, a.click($.proxy(function (t) {
            this.display ? this.hide() : this.show(), t.preventDefault()
        }, this));
        var D = ("d_" + Math.random()).replace("0.", "");
        return w.attr("id", D).addClass("ESC"), n.attr("data-target", D), w.attr("data-id", h), n.on({
            keydown: function (t) {
                13 == t.keyCode && (this.click(), t.preventDefault())
            },
            focus: function () {
                window.isKeyEvent && a.addClass("ui-outline")
            },
            blur: function () {
                a.removeClass("ui-outline")
            }
        }), $(document).mouseup($.proxy(function (t) {
            var e = t && t.target,
                i = this.el.container[0];
            e && a[0] != e && 0 == a[0].contains(e) && i != e && 0 == i.contains(e) && this.hide()
        }, this)), this.svg = "", window.addEventListener && (this.svg = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><path d="M85.876,100.5l49.537-50.526c4.089-4.215,4.089-11.049,0-15.262 c-4.089-4.218-10.719-4.218-14.808,0L63.586,92.868c-4.089,4.215-4.089,11.049,0,15.264l57.018,58.156 c4.089,4.215,10.719,4.215,14.808,0c4.089-4.215,4.089-11.049,0-15.262L85.876,100.5z"/></svg>'), this
    };
    return e.prototype.format = function () {
        var a = this.type,
            e = this.el.input.val();
        if ("" == e) return this;
        switch (a) {
            case "date":
            case "year":
            case "month":
                var i = e.toDate().toArray();
                this[t] = i;
                break;
            case "time":
            case "hour":
            case "minute":
                var s = e.split(":"),
                    n = s[0],
                    r = s[1];
                2 == s.length && (r > 0 && r < 60 && "hour" != a ? 1 == r.length && (r = "0" + r) : r = "00", 1 == n.length && (n = "0" + n), this.el.input.val([n, r].join(":")), this[t] = [n, r]);
                break;
            case "date-range":
            case "month-range":
                var h = new Date,
                    o = new Date,
                    l = e.split(" ");
                3 == l.length && (h = l[0].toDate(), o = l[l.length - 1].toDate(), this[t] = [h.toArray(), o.toArray()])
        }
        return this
    }, e.prototype.val = function () {
        var a = this.el.input,
            e = this[t],
            i = a.val();
        switch (this.type) {
            case "date":
                a.val(e.join("-"));
                break;
            case "month":
                a.val(e.slice(0, 2).join("-"));
                break;
            case "year":
                a.val(e[0]);
                break;
            case "date-range":
                a.val(e[0].join("-") + " 至 " + e[1].join("-"));
                break;
            case "month-range":
                a.val(e[0].slice(0, 2).join("-") + " 至 " + e[1].slice(0, 2).join("-"));
                break;
            case "time":
            case "minute":
                a.val(e.join(":"));
                break;
            case "hour":
                a.val(e[0] + ":00")
        }
        return a.val() != i && ($.isArray(this.callback.trigger) ? $.each(this.callback.trigger, function (t, e) {
            a.trigger(e)
        }) : a.trigger(this.callback.trigger)), this
    }, e.prototype._calendar = function (e) {
        var i = "",
            s = e,
            n = this.el.input,
            r = this.type,
            h = n.attr("min") || this.min,
            o = n.attr("max") || this.max,
            l = $.map([h, o], function (t, e) {
                return "string" == typeof t && 1 == /^\d{8}$/.test(t.replace(a, "")) ? t = t.toDate() : "object" == typeof t && t.getTime || (t = e ? new Date(9999, 0, 1) : new Date(0, 0, 1)), t
            });
        h = l[0], o = l[1];
        var d = ["日", "一", "二", "三", "四", "五", "六"],
            c = this._monthDay(s),
            u = s.join("-").toDate();
        i = i + '<div class="ui-day-x">' + function () {
            var t = "";
            return $.each(d, function (a, e) {
                t = t + '<span class="ui-day-item">' + e + "</span>"
            }), t
        }() + "</div>";
        var v = s.join("-").toDate(),
            p = 0;
        v.setDate(1), 2 == v.getDate() && v.setDate(0), p = v.getDay();
        var m = v.getMonth() - 1;
        m < 0 && (m = 11);
        var g = 'data-year="' + s[0] + '" data-month="' + (v.getMonth() + 1) + '"',
            y = "";
        return i = i + '<div class="ui-date-body">' + function () {
            for (var a = "", e = "", i = 0; i < 6; i++) {
                a += '<div class="ui-date-tr">';
                for (var n = 0; n < 7; n++) {
                    e = "ui-date-item col" + n;
                    var l, d, f = s[0],
                        j = v.getMonth() + 1;
                    if ("date" == r) 0 == i && n < p ? (l = c[m] - p + n + 1, d = new Date(f, m, l), a = a + '<span class="' + e + '" ' + (y = "data-date=" + d.toArray().join("-")) + ">" + l + "</span>") : (l = 7 * i + n - p + 1) <= c[v.getMonth()] ? (d = new Date(f, v.getMonth(), l), y = "data-date=" + d.toArray().join("-"), u.getDate() == l && (e = e + " " + t), a = d >= h && d <= o ? a + '<a href="javascript:;" ' + g + ' class="' + e + '" ' + y + ">" + l + "</a>" : a + '<span class="' + e + '" ' + y + ">" + l + "</span>") : (l -= c[v.getMonth()], a = a + '<span class="' + e + '" ' + (y = "data-date=" + new Date(f, j, l).toArray().join("-")) + ">" + l + "</span>");
                    else if ("date-range" == r)
                        if (0 == i && n < p) a = a + '<span class="' + e + '">&nbsp;</span>';
                        else if ((l = 7 * i + n - p + 1) <= c[v.getMonth()]) {
                        d = new Date(f, v.getMonth(), l), y = "data-date=" + d.toArray().join("-");
                        var w = this[t][0].join("-").toDate(),
                            D = this[t][1].join("-").toDate(),
                            b = d.getTime(),
                            x = w.getTime(),
                            $ = D.getTime();
                        b >= x && b <= $ && (e = e + " " + t, b == x && (e += " ui-date-begin"), b == $ && (e += " ui-date-end"), 1 == l ? e += " ui-date-first" : l == c[v.getMonth()] && (e += " ui-date-last")), a = d >= h && d <= o ? a + '<a href="javascript:;" ' + g + ' class="' + e + '" ' + y + ">" + l + "</a>" : a + '<span class="' + e + '" ' + y + ">" + l + "</span>"
                    } else a = a + '<span class="' + e + '">&nbsp;</span>'
                }
                a += "</div>"
            }
            return a
        }.call(this) + "</div>", {
            monthDay: c,
            html: i,
            min: h,
            max: o
        }
    }, e.prototype._monthDay = function (t) {
        var a = t;
        0 == $.isArray(t) && (a = t.toArray());
        var e = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return (a[0] % 4 == 0 && a[0] % 100 != 0 || a[0] % 400 == 0) && (e[1] = 29), e
    }, e.prototype._datePrevMonth = function (t) {
        var a = t;
        0 == $.isArray(t) && (a = t.toArray());
        var e = 1 * a[1],
            i = this._monthDay(a);
        return 1 == e ? [a[0] - 1, 12, a[2]].join("-").toDate() : i[e - 2] < a[2] ? [a[0], e - 1, i[e - 2]].join("-").toDate() : [a[0], e - 1, a[2]].join("-").toDate()
    }, e.prototype._dateNextMonth = function (t) {
        var a = t;
        0 == $.isArray(t) && (a = t.toArray());
        var e = 1 * a[1],
            i = this._monthDay(a);
        return 12 == e ? [a[0] + 1, 1, a[2]].join("-").toDate() : i[e] < a[2] ? [a[0], e + 1, i[e]].join("-").toDate() : [a[0], e + 1, a[2]].join("-").toDate()
    }, e.prototype.date = function () {
        var a = this[t],
            e = a[1] - 1,
            i = 1 * a[1] + 1,
            s = this._calendar(a),
            n = '<div class="ui-date-x">';
        n += '<div class="ui-date-head">';
        var r = this._datePrevMonth(a),
            h = r.getMonth(),
            o = r.getFullYear();
        n = new Date(o, h, s.monthDay[h]) >= s.min && r <= s.max ? n + '<a href="javascript:" class="ui-date-prev" data-month="' + e + '">' + this.svg + "</a>" : n + '<span class="ui-date-prev">' + this.svg + "</span>";
        var l = this._dateNextMonth(a),
            d = l.getMonth(),
            c = l.getFullYear();
        return n = l >= s.min && new Date(c, d, 1) <= s.max ? n + '<a href="javascript:" class="ui-date-next" data-month="' + i + '">' + this.svg + "</a>" : n + '<span class="ui-date-next">' + this.svg + "</span>", n = n + '<a href="javascript:" class="ui-date-switch" data-type="month">' + a.slice(0, 2).join("-") + "</a>        </div>", n += s.html, new Date >= s.min && new Date <= s.max ? n += '<a href="javascript:" class="ui-date-item ui-date-now">今天</a>' : n += '<span class="ui-date-item ui-date-now">今天</span>', n += "</div>", this.el.container.attr("data-type", "date").html(n), this
    }, e.prototype["date-range"] = function () {
        var a = this[t],
            e = this.el.container.data("date") || a[0];
        this.el.container.data("date", e);
        var i = e[1] - 1,
            s = 1 * e[1] + 1,
            n = this._calendar(e),
            r = '<div class="ui-range-x">';
        r += '<div class="ui-date-head">            <div class="ui-date-half">';
        var h = new Date(e[0], i - 1, e[2]);
        r = (r = h >= n.min && h <= n.max ? r + '<a href="javascript:" class="ui-date-prev" data-month="' + i + '" aria-label="上一个月，当前' + e[1] + '月">' + this.svg + "</a>" : r + '<span class="ui-date-prev">' + this.svg + "</span>") + '<span class="ui-date-switch">' + new Date(e[0], i, e[2]).toArray().slice(0, 2).join("-") + '</span>        </div>        <div class="ui-date-half">';
        var o = new Date(e[0], e[1], 1),
            l = new Date(e[0], s, e[2]);
        return r = l >= n.min && l <= n.max ? r + '<a href="javascript:" class="ui-date-next" data-month="' + s + '" aria-label="下一个月，当前' + s + '月">' + this.svg + "</a>" : r + '<span class="ui-date-next">' + this.svg + "</span>", r = r + '<span class="ui-date-switch">' + o.toArray().slice(0, 2).join("-") + "</span>        </div>", r += "</div>", r = r + '<div class="ui-range-body ui-range-date-body"><div class="ui-date-half">' + n.html + '</div><div class="ui-date-half">' + this._calendar(o.toArray()).html + "</div></div>", r += '<div class="ui-range-footer"><a href="javascript:;" class="ui-button ui-button-primary" data-type="ensure">确定</a><a href="javascript:;" class="ui-button" data-type="cancel">取消</a></div>', r += "</div>", this.el.container.attr("data-type", "date-range").html(r), this
    }, e.prototype._month = function (e) {
        var i = this.el.input,
            s = i.attr("min") || this.min,
            n = i.attr("max") || this.max,
            r = $.map([s, n], function (t, e) {
                return t = "object" == typeof t && t.getTime ? t.toArray().slice(0, 2).join("") : "string" == typeof t && 0 == /\D/.test(t.replace(a, "")) ? t.replace(a, "").slice(0, 6) : e ? "999912" : "000000"
            });
        s = r[0], n = r[1];
        var h = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
            o = 1 * e[0],
            l = this.type;
        return {
            html: '<div class="ui-month-body">' + function () {
                for (var a = "", i = "", r = "", d = 1; d <= 12; d += 1) {
                    if (r = d < 10 ? "0" + d : d + "", i = "ui-date-item", "month" == l) d == e[1] && (i = i + " " + t);
                    else if ("month-range" == l) {
                        var c = this[t][0].slice(0, 2).join(""),
                            u = this[t][1].slice(0, 2).join(""),
                            v = o + r;
                        v >= c && v <= u && (i = i + " " + t)
                    }
                    a = o + r >= s && o + r <= n ? a + '<a href="javascript:" class="' + i + '" data-year="' + o + '" data-value="' + r + '">' + h[d - 1] + "月</a>" : a + '<span class="' + i + '" data-value="' + r + '">' + h[d - 1] + "月</span>"
                }
                return a
            }.call(this) + "</div>",
            min: s,
            max: n
        }
    }, e.prototype.month = function () {
        var a = this[t],
            e = this._month(a),
            i = e.min,
            s = e.max,
            n = '<div class="ui-month-x">',
            r = 1 * a[0];
        n += '<div class="ui-date-head">', n = r - 1 >= Math.floor(i / 100) && r - 1 <= Math.floor(s / 100) ? n + '<a href="javascript:" class="ui-date-prev" data-year="' + (r - 1) + '">' + this.svg + "</a>" : n + '<span class="ui-date-prev">' + this.svg + "</span>", n = (n = r + 1 >= Math.floor(i / 100) && r + 1 <= Math.floor(s / 100) ? n + '<a href="javascript:" class="ui-date-next" data-year="' + (r + 1) + '">' + this.svg + "</a>" : n + '<span class="ui-date-next">' + this.svg + "</span>") + '<a href="javascript:" class="ui-date-switch" data-type="year">' + r + "</a>        </div>", n += e.html;
        var h = (new Date).toArray().slice(0, 2).join("");
        return n += h >= i && h <= s ? '<a href="javascript:" class="ui-date-item ui-date-now">今月</a>' : '<span class="ui-date-item ui-date-now">今月</span>', n += "</div>", this.el.container.attr("data-type", "month").html(n), this
    }, e.prototype["month-range"] = function () {
        var a = this[t],
            e = this.el.container.data("date") || a[0];
        this.el.container.data("date", e);
        var i = 1 * e[0] - 1,
            s = 1 * e[0] + 1,
            n = this._month(e),
            r = n.max.slice(0, 4),
            h = n.min.slice(0, 4),
            o = '<div class="ui-range-x">';
        return o += '<div class="ui-date-head">            <div class="ui-date-half">', o = i >= h && i <= r ? o + '<a href="javascript:" class="ui-date-prev" data-year="' + i + '">' + this.svg + "</a>" : o + '<span class="ui-date-prev">' + this.svg + "</span>", o = o + '<span class="ui-date-switch">' + e[0] + '</span>        </div>        <div class="ui-date-half">', o = s >= h && s < r ? o + '<a href="javascript:" class="ui-date-next" data-year="' + s + '">' + this.svg + "</a>" : o + '<span class="ui-date-next">' + this.svg + "</span>", o = o + '<span class="ui-date-switch">' + s + "</span>        </div>", o += "</div>", o = o + '<div class="ui-range-body ui-range-month-body"><div class="ui-date-half">' + n.html + '</div><div class="ui-date-half">' + this._month([s, e[1], e[2]]).html + "</div></div>", o += '<div class="ui-range-footer"><a href="javascript:;" class="ui-button ui-button-primary" data-type="ensure">确定</a><a href="javascript:;" class="ui-button" data-type="cancel">取消</a></div>', o += "</div>", this.el.container.attr("data-type", "month-range").html(o), this
    }, e.prototype.year = function () {
        var e = this[t],
            i = this.el.input,
            s = i.attr("min") || this.min,
            n = i.attr("max") || this.max;
        s = "object" == typeof s && s.getFullYear ? s.getFullYear() : "string" == typeof s && 0 == /\D/.test(s.replace(a, "")) ? s.toDate().getFullYear() : 0, n = "object" == typeof n && n.getFullYear ? n.getFullYear() : "string" == typeof n && 0 == /\D/.test(n.replace(a, "")) ? n.toDate().getFullYear() : 9999;
        var r = '<div class="ui-year-x">',
            h = e[0];
        r += '<div class="ui-date-head">', r = h - 12 >= s && h - 12 <= n ? r + '<a href="javascript:" class="ui-date-prev" data-year="' + (h - 12) + '" aria-label="上一个12年">' + this.svg + "</a>" : r + '<span class="ui-date-prev">' + this.svg + "</span>", r = (r = (r = h + 12 >= s && h + 12 <= n ? r + '<a href="javascript:" class="ui-date-next" data-year="' + (h + 12) + '" aria-label="下一个12年">' + this.svg + "</a>" : r + '<span class="ui-date-next">' + this.svg + "</span>") + '<span class="ui-date-switch">' + [h - 6, h + 5].join("-") + "</span></div>") + '<div class="ui-year-body">' + function () {
            for (var a = "", e = "", i = h - 6; i < h + 6; i += 1) e = "ui-date-item", i == h && (e = e + " " + t), a = i >= s && i <= n ? a + '<a href="javascript:" class="' + e + '">' + i + "</a>" : a + '<span class="' + e + '">' + i + "</span>";
            return a
        }() + "</div>";
        var o = (new Date).getFullYear();
        return r += o >= s && o <= n ? '<a href="javascript:" class="ui-date-item ui-date-now">今年</a>' : '<span class="ui-date-item ui-date-now">今年</span>', r += "</div>", r += "</div>", this.el.container.attr("data-type", "year").html(r), this
    }, e.prototype.hour = function () {
        var a = this[t],
            e = this.el.input,
            i = 1 * e.attr("step");
        i = "hour" != this.type || !i || i < 1 ? 1 : Math.round(i);
        var s = (e.attr("min") || this.min.toString()).split(":")[0],
            n = (e.attr("max") || this.max.toString()).split(":")[0];
        /\D/.test(s) ? s = 0 : s *= 1, /\D/.test(n) ? n = 24 : n *= 1;
        var r = '<div class="ui-hour-x">';
        return r = r + '<div class="ui-hour-body">' + function () {
            for (var e = "", r = "", h = "", o = 0; o < 24; o += i) 1 == (r = o + "").length && (r = "0" + r), h = "ui-date-item", r == a[0] && (h = h + " " + t), e = r >= s && r <= n ? e + '<a href="javascript:" class="' + h + '">' + r + ":00</a>" : e + '<span class="' + h + '">' + r + ":00</span>";
            return e
        }() + "</div>", r += "</div>", this.el.container.attr("data-type", "hour").html(r), this
    }, e.prototype.minute = function () {
        var a = this[t],
            e = this.el.input,
            i = 1 * e.attr("step") || 5,
            s = e.attr("min") || this.min + "",
            n = e.attr("max") || this.max + "";
        s = "auto" == s || /\D/.test(s.replace(":", "")) || 2 != s.split(":").length ? 0 : 1 * s.replace(":", ""), n = "auto" == n || /\D/.test(n.replace(":", "")) || 2 != n.split(":").length ? 2359 : 1 * n.replace(":", "");
        var r = '<div class="ui-minute-x">',
            h = 1 * a[0];
        return r += '<div class="ui-date-head">', r = h <= Math.floor(s / 100) ? r + '<span class="ui-date-prev">' + this.svg + "</span>" : r + '<a href="javascript:" class="ui-date-prev" data-hour="' + (h - 1) + '">' + this.svg + "</a>", r = h >= Math.floor(n / 100) ? r + '<span class="ui-date-next">' + this.svg + "</span>" : r + '<a href="javascript:" class="ui-date-next" data-hour="' + (h + 1) + '">' + this.svg + "</a>", r = r + '<a href="javascript:" class="ui-date-switch" data-type="hour">' + a[0] + ":00</a></div>", r = r + '<div class="ui-minute-body">' + function () {
            for (var e = "", r = "", h = "", o = 0; o < 60; o += i) 1 == (r = o + "").length && (r = "0" + r), h = "ui-date-item", 1 * (a[0] + r) >= s && 1 * (a[0] + r) <= n ? (r == a[1] && (h = h + " " + t), e = e + '<a href="javascript:" class="' + h + '">' + [a[0], r].join(":") + "</a>") : e = e + '<span class="' + h + '">' + [a[0], r].join(":") + "</span>";
            return e
        }() + "</div>", r += "</div>", this.el.container.attr("data-type", "minute").html(r), this
    }, e.prototype.show = function () {
        var a = this.el.container;
        return this.format(), "time" == this.type ? this.minute() : "date-range" == this.type ? (this._rangeSelected || (this._rangeSelected = this[t]), this["date-range"]()) : "month-range" == this.type ? (this._rangeSelected || (this._rangeSelected = this[t]), this["month-range"]()) : this[this.type] ? this[this.type]() : this.date(), 0 == $.contains($(document.body), a) && $(document.body).append(a), a.show().follow(this.el.trigger.addClass("active"), {
            position: "4-1"
        }), $.isFunction(this.callback.show) && this.callback.show.call(this, this.el.input, a), this.display = !0, this
    }, e.prototype.hide = function () {
        return 1 == this.display && (this.el.container.hide(), this.el.trigger.removeClass("active"), this.el.input.focus(), $.isFunction(this.callback.hide) && this.callback.hide.call(this, this.el.input, this.el.container)), this.display = !1, this
    }, $.fn.dateTime = function (t) {
        return $(this).each(function () {
            $(this).data("dateTime") || $(this).data("dateTime", new e($(this), t))
        })
    }, e
});