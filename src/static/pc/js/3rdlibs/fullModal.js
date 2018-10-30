(function (window, $) {
  var _$$ = function (id) {
    return document.getElementById(id);
  };

  var ModalHelper = {
    init: function (ops) {
      var _defaultBodyCls = "off-fullmodal-open";
      //如果默认是string，就当做id来处理
      if (typeof ops === "string") {
        this.id = ops;
        this.bodyCls = _defaultBodyCls;
      } else {
        this.id = ops.id;
        this.bodyCls = ops.bodyCls || _defaultBodyCls;
      }
      this.scrollTop;
      return this;
    },
    open: function () {
      if (_$$(this.id)) {
        _$$(this.id).style.display = 'block';
      }
      this.afterOpen();
      this.bindBgClose();
    },
    afterOpen: function () {
      this.scrollTop = document.scrollingElement.scrollTop;
      // document.body.classList.add(this.bodyCls);
      $('body').addClass(this.bodyCls);
      document.body.style.top = -this.scrollTop + 'px';
    },
    close: function () {
      this.beforeClose();
      if (_$$(this.id)) {
        // 还原滚动位置
        _$$(this.id).scrollTop = "0px";
        _$$(this.id).style.display = 'none';
      }
    },
    beforeClose: function () {
      $('body').removeClass(this.bodyCls);
      // document.body.classList.remove(this.bodyCls);
      document.scrollingElement.scrollTop = this.scrollTop;
    },
    // 单击背景时自动关闭
    bindBgClose: function () {
      var _that = this;
      _$$(_that.id).addEventListener("click", function (e) {
        if (e.target.id === _that.id) {
          _that.close();
        }
      });
    }
  };

  window.ModalHelper = ModalHelper;
}(window, jQuery));