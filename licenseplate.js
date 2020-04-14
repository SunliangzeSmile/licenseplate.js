var provinces = new Array('京', '沪', '浙', '苏', '粤', '鲁', '晋', '冀', '豫', '川', '渝',
		'辽', '吉', '黑', '皖', '鄂', '津', '贵', '云', '桂', '琼', '青', '新', '藏', '蒙', '宁',
		'甘', '陕', '闽', '赣', '湘');
var keyNums = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Q',
		'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H',
		'J', 'K', 'L', 'OK', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Del');
var next = 0;

function showProvince() {
	$(".keybord_panel").empty();
	var keyUl=document.createElement("ul");
	$(keyUl).addClass("clearfix ul_pro");
	$.each(provinces,function(i,e) {
		$(keyUl).append("<li><span onclick='chooseProvince(this);'>" +e+"</span></li>");
	});
	$(keyUl).append("<li class='li_close' onclick='closePro();'><span>关闭</span></li>");
	$(keyUl).append("<li class='li_clean' onclick='cleanPro();'><span>清空</span></li>");
	$(".keybord_panel").append(keyUl);
}

function showKeybord(index) {
	console.log(index);
	$(".keybord_panel").empty();
	var keyUl=document.createElement("ul");
	$(keyUl).addClass("clearfix ul_keybord");
	$.each(keyNums,function(i,e) {
		if (index===1 && i<=9){

		} else {
			$(keyUl).append("<li class='ikey ikey"+i+"  "+
					(i > 9 ? 'li_zm' : 'li_num') + ' ' + (i > 28 ? 'li_w' : '')
					+"'><span onclick='choosekey(this,"+i+");'>" +e+"</span></li>");
		}
	});
	$(".keybord_panel").append(keyUl);
	$(".car_license").val($('.ul_input').text());
}

function chooseProvince(obj) {
	$('.input_pro span').text($(obj).text());
	$('.input_pro').addClass('hasPro');
	$('.input_pp').find('span').text('');
	$('.ppHas').removeClass('ppHas');
	next = 0;
	showKeybord(next+1);
}

function choosekey(obj, jj) {
	if (jj == 29) {
		$('.keybord_panel').hide();
	} else if (jj == 37) {
		if ($('.ppHas').length == 0) {
			$('.hasPro').find('span').text('');
			$('.hasPro').removeClass('hasPro');
			showProvince();
			next = 0;
		}
		$('.ppHas:last').find('span').text('');
		$('.ppHas:last').removeClass('ppHas');
		next = next - 1;
		if (next < 1) {
			next = 0;
		}
	} else {
		if (next > 5) {
			return;
		}
		for (var i = 0; i < $(".input_pp").length; i++) {
			if (next == 0 & jj < 10 &
					$('.input_pp:eq(' + next + ')').hasClass('input_zim')) {
				layer.msg('车牌第二位为字母');
				return;
			}
			$('.input_pp:eq(' + next + ')').find('span').text($(obj).text());
			$('.input_pp:eq(' + next + ')').addClass('ppHas');
			next = next + 1;
			if (next > 5) {
				next = 6;
			}
			showKeybord(next+1);
			$(".car_license").val($('.ul_input').text());
			return;
		}
	}
}

function closePro() {
	$('.keybord_panel').hide();
}

function cleanPro() {
	$('.ul_input').find('span').text('');
	$('.hasPro').removeClass('hasPro');
	$('.ppHas').removeClass('ppHas');
	next = 0;
}
function renderCarLicense(elem, chooseCallback) {
	var carDiv=document.createElement('div');
	$(carDiv).addClass("car_input");
	$(elem).after(carDiv);
	$(elem).addClass("car_license");
	var ul = document.createElement('ul');
	$(ul).addClass('clearfix ul_input');
	$(carDiv).append("<div class='car_checkbox'><input type='checkbox' /><span>新能源</span></div>");
	for (var index = 0; index < 6; index++) {
		var li = document.createElement('li');
		if (index === 0) {
			$(li).addClass('input_pro hasPro');
		} else if (index === 1) {
			$(li).addClass('input_pp input_zim ppHas');
		} else {
			$(li).addClass('input_pp ppHas');
		}
		$(li).attr("index",index);
		$(li).append('<span></span>');
		$(ul).append(li);
	}
	$(carDiv).append(ul);
	$(carDiv).append('<div  class=\'keybord_panel\'></div>');
	$('.input_pro').click(function() {
		$('.keybord_panel').show();
		showProvince();
	});
	$('.input_pp').click(function() {
		if ($('.input_pro').hasClass('hasPro')) {
			$('.keybord_panel').show();
			showKeybord($(this).attr("index"));
		} else {
			$('.input_pro').click();
		}
	});
}
