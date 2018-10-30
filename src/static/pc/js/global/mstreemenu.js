(function (window, undefined) {

  // 如果需要修改样式，只能通过外部覆盖样式即可，不能修改类名
  var _constClass = {
    rootUl: 'mstreemenu',
    rootItem: 'rootitem',
    rootIcon: 'rooticon',
    rootExpand: 'rootexpand',
    rootUnExpand: 'rootunexpand',
    rootActived: 'rootactived',
    parentItem: 'parentitem',
    parentIcon: 'parenticon',
    parentExpand: 'parentexpand',
    parentUnExpand: 'parentunexpand',
    parentActived: 'parentactived',
    itemClass: 'item',
    itemActived: 'itemactived',
  }

  var defaultOps = {
    aTarget: '_self',
  };

  function MSTreeMenu(options) {
    // 对参数和默认参数进行合并
    for (var key in defaultOps) {
      options[key] = options[key] || defaultOps[key];
    }
    this.ops = options;
    this.init();
    _handler.onClickNode(this.ops.warpId);
  }

  MSTreeMenu.prototype.init = function () {
    var _ops = this.ops;
    var id = _ops.warpId;
    var data = _ops.data;
    var activedId = _ops.activedId;
    var html = [];
    html.push("<ul class='" + _constClass.rootUl + "'>");
    this.makeHtml(html, data, 0);
    html.push("</ul>");
    document.getElementById(id).innerHTML = html.join("");
  };

  MSTreeMenu.prototype.makeHtml = function (html, data, rootIndex) {
    data = data || [];
    for (var i = 0; i < data.length; i++) {
      var node = data[i];
      if (rootIndex === 0) {
        var itemClass = _constClass.rootItem;
        var rootExpandClass = this.checkNodeIsExpand(node) ? _constClass.rootExpand : "";
        if (node.id && node.id === this.ops.activedId) { // root如果选中激活的话，优先使用激活的样式
          rootExpandClass = _constClass.rootActived;
        }
        html.push("<li class='" + _constClass.rootItem + " " + rootExpandClass + "'>");
        this.makeRootNodeHtml(html, node);
        if (node.children && node.children.length > 0) {
          this.makeChildrenUlBeforeNodeHtml(html, node, true);
          this.makeHtml(html, node.children);
          this.makeChildrenUlAfterNodeHtml(html, node);
        }
        html.push("</li>");
      } else {
        if (node.children && node.children.length > 0) {
          var parentExpandClass = this.checkNodeIsExpand(node) ? _constClass.parentExpand : "";
          html.push("<li class='" + _constClass.parentItem + " " + parentExpandClass + "'>");
          this.makeParentNodeHtml(html, node);
          this.makeChildrenUlBeforeNodeHtml(html, node);
          this.makeHtml(html, node.children);
          this.makeChildrenUlAfterNodeHtml(html, node);
          html.push("</li>");
        } else {
          this.makeItemNodeHtml(html, node);
        }
      }
    }
  };

  MSTreeMenu.prototype.makeRootNodeHtml = function (html, node) {
    html.push(this.makeABeforeNodeHtml(html, node));
    html.push("<span class='" + _constClass.rootIcon + "'></span>");
    html.push(this.makeRootNodeIconHtml(html, node));
    html.push(this.makeNodeTextHtml(html, node));
    html.push(this.makeAAfterNodeHtml(html, node));
  };

  MSTreeMenu.prototype.makeParentNodeHtml = function (html, node) {
    html.push(this.makeABeforeNodeHtml(html, node));
    html.push("<span class='" + _constClass.parentIcon + "'></span>");
    html.push(this.makeNodeTextHtml(html, node));
    html.push(this.makeAAfterNodeHtml(html, node));
  };

  MSTreeMenu.prototype.makeChildrenUlBeforeNodeHtml = function (html, node, isRoot) {
    var ulClass = "";
    if (this.checkNodeIsExpand(node)) {
      ulClass = isRoot ? _constClass.rootExpand : _constClass.parentExpand;
    } else {
      ulClass = isRoot ? _constClass.rootUnExpand : _constClass.parentUnExpand;
    }
    html.push("<ul class='" + ulClass + "'>");
  };

  MSTreeMenu.prototype.makeChildrenUlAfterNodeHtml = function (html, node) {
    html.push("</ul>");
  };

  MSTreeMenu.prototype.makeItemNodeHtml = function (html, node) {
    var itemClass = _constClass.itemClass;
    var liActived = (node.id === this.ops.activedId || node.actived) ? _constClass.itemActived : "";
    html.push("<li class='" + liActived + " " + itemClass + "'>");
    html.push(this.makeABeforeNodeHtml(html, node));
    html.push(this.makeNodeTextHtml(html, node));
    html.push(this.makeAAfterNodeHtml(html, node));
    html.push("</li>");
  };

  MSTreeMenu.prototype.makeNodeTextHtml = function (html, node) {
    html.push("<span>" + node.name + "</span>");
  };

  MSTreeMenu.prototype.makeABeforeNodeHtml = function (html, node) {
    var _ops = this.ops;
    var href = node.href;
    var target = node.target || _ops.aTarget;
    html.push("<a " + (_helper.checkHrefIsValid(href) ? ("href=" + href) : "") + " target=" + target + ">");
  };

  MSTreeMenu.prototype.makeAAfterNodeHtml = function (html, node) {
    html.push("</a>");
  };

  MSTreeMenu.prototype.makeRootNodeIconHtml = function (html, node) {
    var iconSize = "display:inline-block;width:20px;height:20px;margin-right:5px;vertical-align:middle;";
    // 根节点的图标
    if (node.iconUrl) {
      var strIconBg = "background-image:url("+node.iconUrl+");background-repeat:no-repeat;"
      html.push("<div class='rootleftimg' style='" + iconSize + strIconBg+ "'></div>");
    } else {
      html.push("<div style='" + iconSize + "'></div>");
    }
  }

  MSTreeMenu.prototype.checkNodeIsExpand = function (node) {
    if (node.expand && node.expand === true) {
      return true;
    }
    if (node.children && node.children.length > 0) {
      for (var i = 0; i < node.children.length; i++) {
        var tmp = node.children[i];
        if (tmp.children && tmp.children.length > 0) {
          if (this.checkNodeIsExpand(tmp)) {
            return true;
          }
        }
        else {
          if ((tmp.id && tmp.id === this.ops.activedId) || (tmp.expand && tmp.expand === true) || (tmp.actived && tmp.actived === true)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  var _handler = {
    onClickNode: function (warpId) {
      var _that = this;
      var nodes = document.querySelectorAll("#" + warpId + " .mstreemenu a"); // 获取所有的a标签并绑定单击事件
      for (var i = 0; i < nodes.length; i++) {
        var tmpNode = nodes[i];
        if (tmpNode.getAttribute("href") && tmpNode.getAttribute("href") !== "#") {
          //直接跳转即可
        } else {
          tmpNode.addEventListener("click", function (e) {
            var parentLiEle = this.parentElement;
            if (_helper.hasClass(parentLiEle, _constClass.rootItem)) { // root节点
              _helper.removeClass(parentLiEle, _constClass.rootActived);
              var ulEle = this.nextElementSibling;
              if (ulEle) {
                _helper.toggleClass(ulEle, _constClass.rootExpand, _constClass.rootUnExpand);
                _helper.toggleClass(parentLiEle, _constClass.rootExpand);
              } else {
                _that.removeAllNodeActived(warpId);
                _helper.addClass(parentLiEle, _constClass.rootActived);
              }
            } else if (_helper.hasClass(parentLiEle, _constClass.parentItem)) { // 有子节点的父节点
              _helper.removeClass(parentLiEle, _constClass.parentActived);
              var ulEle = this.nextElementSibling;
              if (ulEle) {
                _helper.toggleClass(ulEle, _constClass.parentExpand, _constClass.parentUnExpand);
                _helper.toggleClass(parentLiEle, _constClass.parentExpand);
              } else {
                _that.removeAllNodeActived(warpId);
                _helper.addClass(parentLiEle, _constClass.parentActived);
              }
            } else { // 正常节点
              _that.removeAllNodeActived(warpId);
              _helper.addClass(parentLiEle, _constClass.itemActived);
            }
          })
        }
      }
    },
    removeAllNodeActived: function (warpId) {
      // 移除现有全部actived的节点
      var nodes = document.querySelectorAll("#" + warpId + " .mstreemenu li");
      for (var i = 0; i < nodes.length; i++) {
        _helper.removeClass(nodes[i], _constClass.itemActived);
      }
    }
  }

  var _helper = {
    hasClass: function (el, className) {
      var reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
      return reg.test(el.className)
    },
    addClass: function (el, className) {
      if (this.hasClass(el, className)) {
        return
      }
      var newClass = el.className.split(' ')
      newClass.push(className)
      el.className = newClass.join(' ')
    },
    removeClass: function (el, className) {
      if (this.hasClass(el, className)) {
        var classArray = el.className.split(' ')
        var newClass = []
        for (var i = 0; i < classArray.length; i++) {
          if (classArray[i] !== className) {
            newClass.push(classArray[i]);
          }
        }
        el.className = newClass.join(' ')
      }
    },
    toggleClass: function (el, hasClassName, newClassName) {
      if (_helper.hasClass(el, hasClassName)) {
        _helper.removeClass(el, hasClassName);
        _helper.addClass(el, newClassName);
      } else {
        _helper.removeClass(el, newClassName);
        _helper.addClass(el, hasClassName);
      }
    },
    checkHrefIsValid: function (href) {
      if (href === "" || href === null || href === undefined || href === "#") {
        return false;
      }
      return true;
    }
  };

  window.MSTreeMenu = MSTreeMenu;
}(window));