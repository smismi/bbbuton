(function($) {


    getChk = function(obj, _options) {
        var options = $.extend({}, $.fn.chk.defaults, _options);

		var checkedImage = options.checked;
		var uncheckedImage = options.unchecked;
		var disabledImage = options.disabled;
		var disabledCheckImage = options.disabledChecked;
		var selectAllBtn = options.selectAll;
		var width = options.width;
		var height = options.height;

        $(obj).css('width', width); 

			var checkbox = obj;

			$(checkbox).wrap('<div class="styledCheckbox" ></div').css({position:'absolute', left : -7777, 'z-index': 0}).parent().css({background:uncheckedImage, width: width, height:height});
 			$(checkbox).filter(':checked').parent().addClass('checked').css({"background":checkedImage});
			if (disabledImage !== false || disabledCheckImage !== false ){
				$(checkbox).filter(':disabled').each(function(){
					if ($(this).is(':checked')){
						$(this).parent().addClass('disabled').css({"background":disabledCheckImage});
					}
					else {
						$(this).parent().addClass('disabled').css({"background":disabledImage});
					}

				});
                    $(checkbox).focus(function() {
                          $(checkbox).parent().addClass("wrapper_focused");
                    })
                    $(checkbox).blur(function() {
                          $(checkbox).parent().removeClass("wrapper_focused");
                    })
			}

			$(checkbox).each(function(){
				var checkboxClass = $(this).attr('class');
				var checkboxClick = $(this).attr('onclick');

				$(this).parent().addClass(checkboxClass);
				$(this).parent().attr('onclick',checkboxClick );
			});

			$(checkbox).parent().click(function(){
				if(!($(this).hasClass('disabled'))){

					if(!($(this).hasClass('checked'))){
						$(this).addClass('checked')
						.css({"background":checkedImage})
						.find('input:checkbox')
							.attr('checked','checked');
 					}
					else{
						$(this).removeClass('checked')
						.css({"background":uncheckedImage})
						.find('input:checkbox')
							.removeAttr('checked','checked');
						$(selectAllBtn).removeAttr('checked','checked')
							.parent('.styledCheckbox')
							.removeClass('checked')
							.css({"background":uncheckedImage});
					}


					if (selectAllBtn != null){
						if ($(this).find('input:checkbox').is(selectAllBtn)){
							if($(this).hasClass('checked')){
								$(checkbox).each(function(){
									$(this).attr('checked','checked')
									.parent('.styledCheckbox')
									.addClass('checked')
									.css({"background":checkedImage});
								});
							}
							else {
								$(checkbox).each(function(){
									$(this).removeAttr('checked','checked')
									.parent('.styledCheckbox')
									.removeClass('checked')
									.css({"background":uncheckedImage});
								});
							}
						}
					}

				}
			});


			$('label').click(function(){
				var labelFor = $(this).attr('for');
				var radioForMatch = $('input:checkbox').filter('#' + labelFor);


				if (!(radioForMatch.parent().hasClass("checked"))){
					if ( $.browser.msie ) {
					  if( $.browser.version == 7.0 || $.browser.version == 8.0 ){
						 radioForMatch.attr('checked','checked')
						.parent('.styledCheckbox')
						.addClass('checked')
						.css({"background":checkedImage});


						if (radioForMatch.is(selectAllBtn)){
							$(checkbox).each(function(){
								$(this).attr('checked','checked')
								.parent('.styledCheckbox')
								.addClass('checked')
								.css({"background":checkedImage});
							});
						}

					  }
					}
				}
				else if (radioForMatch.parent().hasClass("checked")){
					if ( $.browser.msie ) {
					  if( $.browser.version == 7.0 || $.browser.version == 8.0 ){
						radioForMatch.removeAttr('checked','checked')
							.parent('.styledCheckbox')
							.removeClass('checked')
							.css({"background":uncheckedImage});


						$(selectAllBtn).removeAttr('checked','checked')
							.parent('.styledCheckbox')
							.removeClass('checked')
							.css({"background":uncheckedImage});

					  }
					}
				}
			});
			// ------------------------------------------------
    };


    getBtn = function(obj, _options) {
        var options = $.extend({}, $.fn.btn.defaults, _options);
        //
        //		var checkedImage = options.checked;
        //		var uncheckedImage = options.unchecked;
        //		var disabledImage = options.disabled;
        //		var disabledCheckImage = options.disabledChecked;
        //		var selectAllBtn = options.selectAll;
        //		var width = options.width;
        //		var height = options.height;

        //        $(obj).css('width', width);

        var button = obj;

        $(button).css({position:'absolute', left : 150, top: 45, 'z-index': 0})
                .wrap('<div>' + $(button).attr('value') + '</div>')
                .bind({                     
                    "focus" : function() {
                        console.log('focus');
                        $(this).parent().addClass('btn_focused');
                    },
                    "blur" : function() {
                        console.log('blur');                        
                        $(this).parent().removeClass('btn_focused');
                    }
                })
                .unbind("click")
                .parent().css({display:"inline", position: 'relative'}).addClass("teplovizor")/*.append("<ul><li class='err'>1</li><li class='err2'>2</li><li class='err3'>3</li></ul>")*/
                .bind({
                    "mouseenter" : function() {
                        console.log('mouseenter');
                        $(this).addClass("btn_hoverd");

                    },
                    "click" : function(e) {
                        console.log('click');
                        $(this).removeClass("btn_clickd btn_mousedownd");
                        var target = $(e.target);
                        target.find('input').click();
                    },
                    "mouseup" : function(e) {
                        console.log('mouseup');
                        $(this).addClass("btn_clickd");
                    },
                    "mousedown" : function() {
                        console.log('mousedown');
                        $(this).addClass("btn_mousedownd");

                    },
                    "mouseleave" : function() {
                        console.log('mousedown');
                        $(this).removeClass("btn_hoverd btn_mousedownd btn_clickd");

                    }
                });



    };

    $.fn.chk = function(options) {


        this.each(function() {
            getChk($(this), options);
        });
    };
    $.fn.btn = function(options) {
        this.each(function() {
            getBtn($(this), options);
        });
    };
    $.fn.btn.defaults = {
    };
})(jQuery);

