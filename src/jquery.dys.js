; (function ($) {
    $.fn.dys = function () {
        $(this).each(function () {
            var main = $(this);
            var cid = 'dys_' + main.index();
            main.after('<div id=\'' + cid + '\' class=\'dys\'><div class="nav left">&#x1F890;</div><div class="vis"><input type=\'text\' class=\'fltr\' autocomplete=\'off\' /></div><div class="nav right">&#x1F892;</div><div class=\'pop\'></div></div>').hide();
            var dupe = $('#' + cid);
            var vis = dupe.find('.vis').outerWidth(main.outerWidth());
            var pop = dupe.find('.pop').outerWidth(dupe.outerWidth()).hide();
            dupe.find('.fltr').outerWidth(vis.outerWidth()).outerHeight(vis.outerHeight() - 2);
            main.find('option').each(function () {
                var cls = 'en-' + ($(this).index() + 1);
                if ($.trim($(this).text()) == $.trim(main.children("option").filter(":selected").text())) { cls = cls + ' sel'; }
                $('#' + cid).find('.vis').append('<span class="en '+cls+'">'+$.trim($(this).text())+'</span>');
            });

            dupe.on('click', function (e) {
                e.stopImmediatePropagation();
                var et = e.target;
                if ($(et).is('.sel:not(.fltr)')) {
                    $(et).addClass('cur').removeClass('sel').siblings('.fltr').addClass('sel').focus();
                    sr();
                } else if ($(et).hasClass('nav')) {
                    var cN = dupe.find('.sel').index();
                    var iN = vis.find('.en').length;
                    slct(!$(et).index() ? cN == 1 ?  iN : cN -1 : cN == iN ? 1 : cN + 1);
                    desr();
                } else if ($(et).hasClass('sr')) {
                    slct($(".en:contains('" + $(et).text() + "')").index());
                    desr();
                }
            });

            dupe.find('.fltr').blur(function () {
                $(this).val("").removeClass('sel').siblings('.cur').addClass('sel').removeClass('cur');
            }).on('keyup', function(){
                sr($(this).val());
            });

            $(document).on('click', function () { desr(); });

            function sr(tx) {
                desr();
                dupe.find('.en').each(function () {
                    if(!tx || $(this).text().toLowerCase().indexOf(tx) > -1){
                        pop.append('<div class=\'sr\'>' + $(this).text() + '</div>');
                    }
                });
                if($.trim(pop.html())){
                    dupe.addClass('pop');
                    pop.slideDown('fast');
                }
            }

            function desr() {
                pop.html("").hide();
                dupe.removeClass('pop');
            }

            function slct(i) {
                dupe.find('.sel').removeClass('sel');
                main.find('option:selected').removeAttr('selected');
                main.find('option:contains("' + dupe.find('.en-' + i).addClass('sel').text() + '")').attr('selected', 'selected');
            }
        });
    };
}(jQuery));