(function (window) {
  var $ = MsQuery = function (selector, content) {
    return new MsQuery.fn.init(selector, content);
  }

  MsQuery.fn = MsQuery.prototype = {
    constructor: MsQuery,
    init: function (selector, context) {
      selector = selector || document;
      context = context || document;
      if (!selector) {
        return this;
      }
      if (selector.nodeType) {
        this[0] = selector;
        this.length = 1;
        this.context = selector;
        return this;
      }
      if (typeof selector === "string") {
        if (selector.indexOf("#") == 0) {
          var eleId = context.getElementById(selector.substring(1));
          this[0] = eleId;
          this.length = 1;
          this.context = context;
          return this;

        } else if (selector.indexOf(".") == 0) {
          var eleClass = context.getElementsByClassName(selector.substring(1));
          for (var i = 0; i < eleClass.length; i++) {
            this[i] = eleClass[i];
          }
          this.length = eleClass.length;
          this.context = context;
          return this;
        } else {
          var eleTag = context.getElementsByTagName(selector);
          for (var i = 0; i < eleTag.length; i++) {
            this[i] = eleTag[i];
          }
          this.length = eleTag.length;
          this.context = context;
          return this;
        }
      }
    },
    html: function (val) {
      MsQuery.each(this, function (val) {
        this.innerHTML = val;
      }, val);
      return this;
    },
    size: function () {
      if (this.context) return this.length;
    },
    children: function (selector) {
      if (selector) {
        return new MsQuery.fn.init(selector, this.context)
      }
      else {
        let instance = new MsQuery.fn.init(selector, this.context)
        let childArray;
        for (let index = 0; index < this.length; index++) {
          childArray = this[index].children;
        }
        let child = Array.prototype.slice.call(childArray)
        for (let index = 0; index < child.length; index++) {
          instance[index] = child[index];
        }
        return instance
      };
    },
    parent: function (selector) {
      if (selector) {
        return new MsQuery.fn.init(selector, this.context)
      } else {
        let instance = new MsQuery.fn.init(selector, this.context)
        let childArray;
        for (let index = 0; index < this.length; index++) {
          childArray = this[index].parentElement;
        }
        
        instance[0] = childArray;
        return instance
      };
    },
    css: function (property, value) {
      for (let index = 0; index < this.length; index++) {
        this[index].style.setProperty(property, value)
      }
      if (property instanceof Object) {
        for (const item in property) {
          let prop = String.prototype.replace.call(item, /[A-Z]{1}/g, function (s) {
            return "-" + s.toLowerCase()
          });
          for (let index = 0; index < this.length; index++) {
            this[index].style.setProperty(prop, property[item])
          }
        }
      }
      return this
    },
    addClass: function (classname) {
      MsQuery.each(this, function (classname) {
        this.classList.add(classname)
      }, classname)
      return this;
    },
    removeClass: function (classname) {
      MsQuery.each(this, function (classname) {
        this.classList.remove(classname)
      }, classname)
      return this;
    },
    append: function (content) {
      const reg = /^<([^\d\s\WA-Z\/>]*)>([^<]*)<\/([^\d\s\WA-Z\/>]*)>$/;
      try {
        if (reg.test(content)) {
          const tagT = content.match(reg);
          console.log(tagT);
          const beforeTag = tagT[1];
          const contentTag = tagT[2];
          const afterTag = tagT[3];
          if (beforeTag === afterTag) {
            MsQuery.each(this, function () {
                const ele = document.createElement(beforeTag);
                const text = document.createTextNode(contentTag);
                ele.appendChild(text)
                this.appendChild(ele)
            })
          } else {
            throw `标签不同`
          }
        } else {
          throw `错误的字符串`
        }
      } catch(error) {
        console.warn(`append():${error}`);
      }
      return this;
    },
    show: function () {
      MsQuery.each(this, function () { 
        this.style.display = 'block';
      });
      return this;
    },
    hide: function () {
      MsQuery.each(this, function () { 
        this.style.display = 'none';
      });
      return this;
    },
    toggle: function () {
      _this = this;
      MsQuery.each(this, function () { 
        if (this.style.display === "none") {
          _this.show();
        } else {
          _this.hide();
       }
      });
      return this;
    },
    on: function (event, callback) {
      for (let index = 0; index < this.length; index++){
        this[index].addEventListener(event,callback);
      }
      return this;
    },
  }

  MsQuery.fn.init.prototype = MsQuery.fn;

  MsQuery.each = function (object, callback, args) {
    for (var i = 0; i < object.length; i++) {
      callback.call(object[i], args);
    }
    return object;
  }

  MsQuery.extend = MsQuery.fn.extend = function () {
    var destiantion = arguments[0],
        source = arguments[1];
    if (typeof destiantion == "object" && typeof source == "object") {
      for (var property in source) {
        destiantion[property] = source[property];
      }
      return destiantion;
    } else {
      for (var prop in destiantion) {
        this[prop] = destiantion[prop];
      }
      return this;
    }
  }
  
  window.MsQuery = window.$ = MsQuery;
})(window)