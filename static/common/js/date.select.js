/*
 
settings 参数说明
----- 
year:默认省份
month:默认城市
day:默认地区（县）
nodata:无数据状态
required:必选项
------------------------------ */
(function($) {
    $.fn.dateSelect = function(settings) {
        if (this.length < 1) {
            return;
        };

        // 默认值
        settings = $.extend({
            year: null,
            month: null,
            day: null
        }, settings);

        var $this = this;
        var $year = $this.find(".year");
        var $month = $this.find(".month");
        var $day = $this.find(".day");
        var year_val = settings.year;
        var month_val = settings.month;
        var day_val = settings.day;
        var current_year = (new Date()).getFullYear();
        var select_option = "<option value=''>" + current_year + "</option>";


        //年份赋值
        var yearStart = function() {
            var option_item = select_option;
            for (var i = current_year - 1; i > 1950; i--) {
                option_item += "<option value='" + i + "'>" + i + "</option>";
            }
            $year.html(option_item);
            monthStart();
        }

        // 赋值市级函数
        var monthStart = function() {
            $month.empty().attr("disabled", true);
            $day.empty().attr("disabled", true);
            var option_item = "<option value=''>" + 1 + "</option>";
            for (var i = 1; i < 13; i++) {
                option_item += "<option value='" + i + "'>" + i + "</option>";
            }

            $month.html(option_item).removeAttr("disabled").css({
                "display": "",
                "visibility": ""
            });
            // dayStart();
            d();
        };

        // 赋值地区（县）函数
        // var dayStart = function() { 
        //     var year_val,month_val;
        //     var l1 = $year.Options.length;
        //     var l2 = $month.Options.length;
        //     for (var i = 0; i < l1; i++) {
        //         if ($year.Options[i].hasAttr("selected")) {
        //             year_val = $year.Options[i].val();
        //         }
        //     } 
        //     for (var i = 0; i < l2; i++) {
        //         if ($month.Options[i].hasAttr("selected")) {
        //             month_val = $month.Options[i].val();
        //         }
        //     }
        //     $day.empty().attr("disabled", true);

        //     // 遍历赋值市级下拉列表
        //     option_item = "<option value=''>" + 1 + "</option>";
        //     if (year_val % 100 == 0) {
        //         if (year_val % 400 == 0) {
        //             switch (month_val) {
        //                 case 1, 3, 5, 7, 8, 10, 12:
        //                     for (var i = 1; i < 32; i++) {
        //                         option_item += "<option value='" + i + "'>" + i + "</option>";
        //                     };
        //                     break;
        //                 case 2:
        //                     for (var i = 1; i < 30; i++) {
        //                         option_item += "<option value='" + i + "'>" + i + "</option>";
        //                     };
        //                     break;
        //                 case 4, 6, 9, 11:
        //                     for (var i = 1; i < 31; i++) {
        //                         option_item += "<option value='" + i + "'>" + i + "</option>";
        //                     };
        //                     break;
        //             }
        //         }
        //     } else if (year_val % 4 == 0) {
        //         switch (month_val) {
        //             case 1, 3, 5, 7, 8, 10, 12:
        //                 for (var i = 1; i < 32; i++) {
        //                     option_item += "<option value='" + i + "'>" + i + "</option>";
        //                 };
        //                 break;
        //             case 2:
        //                 for (var i = 1; i < 30; i++) {
        //                     option_item += "<option value='" + i + "'>" + i + "</option>";
        //                 };
        //                 break;
        //             case 4, 6, 9, 11:
        //                 for (var i = 1; i < 31; i++) {
        //                     option_item += "<option value='" + i + "'>" + i + "</option>";
        //                 };
        //                 break;
        //         }
        //     } else {
        //         switch (month_val) {
        //             case 1, 3, 5, 7, 8, 10, 12:
        //                 for (var i = 1; i < 32; i++) {
        //                     option_item += "<option value='" + i + "'>" + i + "</option>";
        //                 };
        //                 break;
        //             case 2:
        //                 for (var i = 1; i < 29; i++) {
        //                     option_item += "<option value='" + i + "'>" + i + "</option>";
        //                 };
        //                 break;
        //             case 4, 6, 9, 11:
        //                 for (var i = 1; i < 31; i++) {
        //                     option_item += "<option value='" + i + "'>" + i + "</option>";
        //                 };
        //                 break;
        //         }
        //     }

        //     $day.html(option_item).removeAttr("disabled").css({
        //         "display": "",
        //         "visibility": ""
        //     });
        // };

        var d = function() {
            $day.empty().attr("disabled", true);
            var option_item = "<option value=''>" + 1 + "</option>";
            for (var i = 1; i < 32; i++) {
                option_item += "<option value='" + i + "'>" + i + "</option>";
            }

            $day.html(option_item).removeAttr("disabled").css({
                "display": "",
                "visibility": ""
            });
        }

        var init = function() {
            // 遍历赋值省份下拉列表
            yearStart();

            // 选择省份时发生事件
            $year.bind("change", function() {
                monthStart();
            });

            // 选择市级时发生事件
            // $month.bind("change", function() {
            //     dayStart();
            // });
            $month.bind("change", function() {
                d();
            });
        };

        init();
    };
})(Zepto);