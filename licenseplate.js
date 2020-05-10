;(function (window, document) {
  let licenseplate = function (elem, length) {
    let _that = this
    if (!elem) return
    if (!(this instanceof licenseplate)) return new licenseplate(elem, length)
    _that.render(elem, length === undefined ? 7 : length)
    return _that
  }
  licenseplate.prototype = {
    elem: undefined,
    length: 7,
    next: 0,
    provinces: [
      "京",
      "沪",
      "浙",
      "苏",
      "粤",
      "鲁",
      "晋",
      "冀",
      "豫",
      "川",
      "渝",
      "辽",
      "吉",
      "黑",
      "皖",
      "鄂",
      "津",
      "贵",
      "云",
      "桂",
      "琼",
      "青",
      "新",
      "藏",
      "蒙",
      "宁",
      "甘",
      "陕",
      "闽",
      "赣",
      "湘",
    ],
    keyNums: [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "Q",
      "W",
      "E",
      "R",
      "T",
      "Y",
      "U",
      "I",
      "O",
      "P",
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "OK",
      "Z",
      "X",
      "C",
      "V",
      "B",
      "N",
      "M",
      "Del",
    ],
    /**
     *渲染输入框
     */
    renderInput: function () {
      let _that = this
      $(_that.elem).attr("type", "hidden")
      let ul = document.createElement("ul")
      $(ul).addClass("clearfix key_input")
      for (let index = 0; index < _that.length; index++) {
        let li = document.createElement("li")
        if (index === 0) {
          $(li).addClass("province has_province")
        } else if (index === 1) {
          $(li).addClass("keynums key_zim has_keynums")
        } else {
          $(li).addClass("keynums has_keynums")
        }
        $(li).attr("index", index)
        $(li).append("<span></span>")
        $(ul).append(li)
      }
      $(".car_input").append(ul)
    },
    /**
     *渲染电动选项
     */
    renderElectric: function () {
      let _that = this
      $(".key_input").after(
        "<div class='keyboard_checkbox'><input type='checkbox'  name='checkElectric' /><span>新能源</span></div>"
      )
      $("input[name='checkElectric']").click(function (e) {
        _that.checkElectric(e)
      })
    },
    /**
     *渲染键盘
     */
    renderKeyBoard: function () {
      let _that = this
      $(".car_input").after("<div class='keybord'></div>")
      $(".province").click(function () {
        $(".keybord").show()
        _that.renderProvince()
      })
      $(".keynums").click(function () {
        $(".keybord").show()
        if ($(".province").hasClass("has_province")) {
          $(".keybord").show()
          _that.renderKeybord(0)
        } else {
          $(".province").click()
        }
      })
    },
    /**
     * 渲染
     * @param {*} elem
     * @param {*} length
     */
    render: function (elem, length) {
      let _that = this
      _that.elem = elem
      _that.length = length
      let carDiv = document.createElement("div")
      $(carDiv).addClass("car_input")
      $(_that.elem).after(carDiv)
      $(_that.elem).addClass("keyboard_input")
      _that.renderInput()
      _that.renderElectric()
      _that.renderKeyBoard()
    },
    /**
     *渲染关闭清空按钮
     * @param {*} elem
     */
    renderCloseAndClean(elem) {
      let _that = this
      $(elem).append("<li class='key_clean' ><span>清空</span></li>")
      $(elem).append("<li class='key_close' ><span>关闭</span></li>")
      $(".key_close span").click(function () {
        _that.closeKeyboard()
      })
      $(".key_clean span").click(function () {
        _that.cleanKeyboard()
      })
    },
    /**
     * 显示省份键盘
     */
    renderProvince: function () {
      let _that = this
      $(".keybord").empty()
      let keyUl = document.createElement("ul")
      $(keyUl).addClass("clearfix provinces_keybord")
      $.each(_that.provinces, function (i, e) {
        $(keyUl).append("<li><span class='province_key' >" + e + "</span></li>")
      })
      $(".keybord").append(keyUl)
      $(".province_key").click(function () {
        _that.chooseProvince(this)
      })
      _that.renderCloseAndClean(keyUl)
    },
    /**
     * 显示数字、字母键盘
     * @param {*} index
     */
    renderKeybord: function (index) {
      let _that = this
      $(".keybord").empty()
      let keyUl = document.createElement("ul")
      $(keyUl).addClass("clearfix num_keybord")
      $.each(_that.keyNums, function (i, e) {
        if (!(index === 0 && i <= 9)) {
          $(keyUl).append(
            "<li class='ikey' ><span index='" + i + "'>" + e + "</span></li>"
          )
        }
      })
      $(".keybord").append(keyUl)
      $(".ikey span").click(function () {
        _that.chooseKey(this, $(this).attr("index"))
      })
      $(".keyboard_input").val($(".key_input").text())
      _that.renderCloseAndClean(keyUl)
    },
    /**
     * 选择省份
     * @param {*} obj
     */
    chooseProvince: function (obj) {
      let _that = this
      $(".province span").text($(obj).text())
      $(".province").addClass("has_province")
      if ($("input[name='checkElectric']:checked").val() === "on") {
        $(".keynums[index!=2]").find("span").text("")
      } else {
        $(".keynums").find("span").text("")
      }
      $(".has_keynums").removeClass("has_keynums")
      _that.next = 0
      _that.renderKeybord(0)
    },
    /**
     * 选择数字、字母
     * @param {*} obj
     * @param {*} index
     */
    chooseKey: function (obj, index) {
      let _that = this
      if (index == 29) {
        $(".keybord").hide()
      } else if (index == 37) {
        if ($(".has_keynums").length == 0) {
          $(".has_province").find("span").text("")
          $(".has_province").removeClass("has_province")
          _that.next = 0
          _that.renderProvince()
          return
        } else {
          $(".has_keynums:last").find("span").text("")
          $(".has_keynums:last").removeClass("has_keynums")
          _that.next = _that.next - 1
          _that.checkElectric(obj)
        }
      } else {
        $(".keynums:eq(" + _that.next + ") span").text($(obj).text())
        $(".keynums:eq(" + _that.next + ")").addClass("has_keynums")
        _that.checkElectric(obj)
        let checkbox = "input[name='checkElectric']:checked"[0]
        _that.next = _that.next + (checkbox.checked && _that.next === 0 ? 2 : 1)
        _that.next =
          _that.next > _that.length - 1 ? _that.length - 1 : _that.next
      }
      $(".keyboard_input").val($(".key_input").text())
      if (index == 29) {
        return
      }
      _that.renderKeybord(_that.next)
    },
    /**
     * 关闭
     */
    closeKeyboard: function () {
      $(".keybord").hide()
    },
    /**
     * 清空
     */
    cleanKeyboard: function () {
      let _that = this
      $(".key_input").find("span").text("")
      $(".has_province").removeClass("has_province")
      $(".has_keynums").removeClass("has_keynums")
      _that.next = 0
      $("input[name='checkElectric']").prop("checked", false)
      _that.renderProvince()
    },
    /**
     *检查复选框选择
     * @param {*} obj
     */
    checkElectric: function (obj) {
      let _that = this
      let checkbox = obj.target === undefined ? undefined : $(obj.target)[0]
      if (_that.next == 1) {
        $("input[name='checkElectric']").prop("checked", "D" == $(obj).text())
      }
      if (checkbox !== undefined && checkbox.checked) {
        $("li.keynums[index='2'] span").text("D")
      } else if (checkbox !== undefined && !checkbox.checked) {
        $.each($("li.keynums span"), function (i, e) {
          if (i > 0) {
            $(this).text("")
          }
        })
        _that.next = 1
      } else if (obj.tagName !== "SPAN") {
        $("li.keynums[index='2'] span").text("")
      }
    },
  }
  //注册接口
  window.licenseplate = function (elem, length) {
    return new licenseplate(elem, length)
  }
  $.prototype.caseSelect = $.fn.licenseplate = function (length) {
    let _that = this
    return new licenseplate(_that, length)
  }
})(window, document)
