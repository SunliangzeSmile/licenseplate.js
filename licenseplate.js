var provinces = new Array('京', '沪', '浙', '苏', '粤', '鲁', '晋', '冀', '豫', '川', '渝',
    '辽', '吉', '黑', '皖', '鄂', '津', '贵', '云', '桂', '琼', '青', '新', '藏', '蒙', '宁',
    '甘', '陕', '闽', '赣', '湘');
var keyNums = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Q',
    'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H',
    'J', 'K', 'L', 'OK', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Del');
var next = 0;

/**
 * 显示省份键盘
 */
function showProvince() {
    $(".keybord").empty();
    var keyUl = document.createElement("ul");
    $(keyUl).addClass("clearfix provinces_keybord");
    $.each(provinces, function(i, e) {
        $(keyUl).append("<li><span onclick='chooseProvince(this);'>" + e + "</span></li>");
    });
    $(keyUl).append("<li class='key_close' onclick='closePro();'><span>关闭</span></li>");
    $(keyUl).append("<li class='key_clean' onclick='cleanPro();'><span>清空</span></li>");
    $(".keybord").append(keyUl);
}

/**
 * 显示数字、字母键盘
 * @param {*} index 
 */
function showKeybord(index) {
    $(".keybord").empty();
    var keyUl = document.createElement("ul");
    $(keyUl).addClass("clearfix num_keybord");
    $.each(keyNums, function(i, e) {
        if (!(index === 0 && i <= 9)) {
            $(keyUl).append("<li class='ikey ikey" + i + "  " +
                (i > 9 ? 'key_zm' : 'key_num') + ' ' + (i > 28 ? 'key_w' : '') +
                "'><span onclick='choosekey(this," + i + ");'>" + e + "</span></li>");
        }
    });
    $(".keybord").append(keyUl);
    $(".keyboard_input").val($('.key_input').text());
}

/**
 * 选择省份
 * @param {*} obj 
 */
function chooseProvince(obj) {
    $('.province span').text($(obj).text());
    $('.province').addClass('has_province');
    $('.keynums').find('span').text('');
    $('.has_keynums').removeClass('has_keynums');
    next = 0;
    showKeybord(0);
}

/**
 * 选择数字、字母
 * @param {*} obj 
 * @param {*} index 
 */
function choosekey(obj, index) {
    if (index == 29) {
        $('.keybord').hide();
    } else if (index == 37) {
        if ($('.has_keynums').length == 0) {
            $('.has_province').find('span').text('');
            $('.has_province').removeClass('has_province');
            showProvince();
            next = 0;
        } else {
            $('.has_keynums:last').find('span').text('');
            $('.has_keynums:last').removeClass('has_keynums');
            next = next - 1;
        }
    } else {
        $('.keynums:eq(' + next + ')').find('span').text($(obj).text());
        $('.keynums:eq(' + next + ')').addClass("has_keynums");
        next = next + 1;
        next = next > 5 ? 5 : next;
    }
    $(".keyboard_input").val($('.key_input').text());
    if (next === 0 || index == 29) {
        return;
    }
    showKeybord(next);
}

/**
 * 关闭
 */
function closePro() {
    $('.keybord').hide();
}
/**
 * 清空
 */
function cleanPro() {
    $('.key_input').find('span').text('');
    $('.has_province').removeClass('has_province');
    $('.has_keynums').removeClass('has_keynums');
    next = 0;
}

/**
 * 渲染键盘
 * @param {*} elem 
 * @param {*} chooseCallback 
 */
function renderCarKeyBoard(elem, chooseCallback) {
    var carDiv = document.createElement('div');
    $(carDiv).addClass("car_input");
    $(elem).after(carDiv);
    $(elem).addClass("keyboard_input");
    var ul = document.createElement('ul');
    $(ul).addClass('clearfix key_input');
    $(carDiv).append("<div class='keyboard_checkbox'><input type='checkbox' /><span>新能源</span></div>");
    for (var index = 0; index < 6; index++) {
        var li = document.createElement('li');
        if (index === 0) {
            $(li).addClass('province has_province');
        } else if (index === 1) {
            $(li).addClass('keynums key_zim has_keynums');
        } else {
            $(li).addClass('keynums has_keynums');
        }
        $(li).attr("index", index);
        $(li).append("<span></span>");
        $(ul).append(li);
    }
    $(carDiv).append(ul);
    $(carDiv).append("<div class='keybord'></div>");
    $('.province').click(function() {
        $('.keybord').show();
        showProvince();
    });
    $('.keynums').click(function() {
        $('.keybord').show();
        console.log($(this).attr("index"));
        if ($('.province').hasClass('has_province')) {
            $('.keybord').show();
            showKeybord(0);
        } else {
            $('.province').click();
        }
    });
}