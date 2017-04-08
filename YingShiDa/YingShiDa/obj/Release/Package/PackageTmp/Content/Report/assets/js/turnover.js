

//
//0     0
//-4080 9
// 6
//-3696 8    
// 6
//-3312 -3234  -3157    7
// 6
//             -2773    6
// 6
//             -2310    5
// 6
//             -1848    4
// 6
//             -1386    3
// 6
//             -924     3
// 6
//             -462     2
// 6
//             0        1

var Step = 77;
//  价格 Price_ten
(function ($) {
    $.extend($.fn, {
        Price_ten: function (_obj, _Old_Number, _New_Number) {
            var _MarginTop = 0;
            var _Transform_n = 0;
            switch (_Old_Number) {
                case 1:
                    _MarginTop = 0;
                    break;
                case 2:
                    _MarginTop = -462;
                    break;
                case 3:
                    _MarginTop = -924;
                    break;
                case 4:
                    _MarginTop = -1848;
                    break;
                case 5:
                    _MarginTop = -2310;
                    break;
                case 6:
                    _MarginTop = -2773;
                    break;
                case 7:
                    _MarginTop = -3157;
                    break;
                case 8:
                    _MarginTop = -3696;
                    break;
                case 9:
                    _MarginTop = -4080;
                    break;
                case 0:
                    _MarginTop = 0;
                    break;
            }
            if (_Old_Number > _New_Number && _New_Number >= 4) {
                _MarginTop = 0;
                _Transform_n = (_New_Number + 1) * 6;
            } else if ((_Old_Number > _New_Number && _New_Number < 4) || _Old_Number == 0) {
                _MarginTop = 0;
                _Transform_n = _New_Number * 6;
            }
            else if (_Old_Number >= 4) {
                _Transform_n = (_New_Number - _Old_Number) * 6;
            }
            else if (_Old_Number == 0 && _New_Number == 1) {
                _Transform_n = 6;
            }
            else {
                _Transform_n = (_New_Number - _Old_Number + 1) * 6;
            }
            if (_Old_Number != _New_Number) {
                var p = new $.Price_ten_run(_obj, _Transform_n, _MarginTop);
            }
        }

    });

    var Price_ten_n = 0;
    var Price_ten_mtop = 0;
    var Price_ten_obj_div = "";

    $.Price_ten_SetMarginTop = function () {
        Price_ten_mtop = Price_ten_mtop - Step;
        $("#" + Price_ten_obj_div).css("margin-top", Price_ten_mtop + "px");

    }
    $.Price_ten_SetRemainTime = function () {
        if (Price_ten_n > 0) {
            Price_ten_n = Price_ten_n - 1;
            setTimeout("$.Price_ten_SetRemainTime()", 60);
            $.Price_ten_SetMarginTop();
        }

    }
    $.Price_ten_run = function (_obj, _n, _mtop) {
        Price_ten_n = _n;
        Price_ten_mtop = _mtop;
        Price_ten_obj_div = _obj;
        new $.Price_ten_SetRemainTime();
    }



}(jQuery));
//  价格 Price_bit
(function ($) {
    $.extend($.fn, {
        Price_bit: function (_obj, _Old_Number, _New_Number) {
            var _MarginTop = 0;
            var _Transform_n = 0;
            switch (_Old_Number) {
                case 1:
                    _MarginTop = 0;
                    break;
                case 2:
                    _MarginTop = -462;
                    break;
                case 3:
                    _MarginTop = -924;
                    break;
                case 4:
                    _MarginTop = -1848;
                    break;
                case 5:
                    _MarginTop = -2310;
                    break;
                case 6:
                    _MarginTop = -2773;
                    break;
                case 7:
                    _MarginTop = -3157;
                    break;
                case 8:
                    _MarginTop = -3696;
                    break;
                case 9:
                    _MarginTop = -4080;
                    break;
                case 0:
                    _MarginTop = 0;
                    break;
            }
            if (_Old_Number > _New_Number && _New_Number >= 4) {
                _MarginTop = 0;
                _Transform_n = (_New_Number + 1) * 6;
            } else if ((_Old_Number > _New_Number && _New_Number < 4) || _Old_Number == 0) {
                _MarginTop = 0;
                _Transform_n = _New_Number * 6;
            }
            else if (_Old_Number >= 4) {
                _Transform_n = (_New_Number - _Old_Number) * 6;
            }else if (_Old_Number == 0 && _New_Number == 1) {
                _Transform_n = 6;
            }
            else {
                _Transform_n = (_New_Number - _Old_Number + 1) * 6;
            }
            if (_Old_Number != _New_Number) {
                var p = new $.Price_bit_run(_obj, _Transform_n, _MarginTop);
            }
        }

    });
    var Price_bit_n = 0;
    var Price_bit_mtop = 0;
    var Price_bit_obj_div = "";

    $.Price_bit_SetMarginTop = function () {
        Price_bit_mtop = Price_bit_mtop - Step;
        $("#" + Price_bit_obj_div).css("margin-top", Price_bit_mtop + "px");

    }
    $.Price_bit_SetRemainTime = function () {
        if (Price_bit_n > 0) {
            Price_bit_n = Price_bit_n - 1;
            setTimeout("$.Price_bit_SetRemainTime()", 60);
            $.Price_bit_SetMarginTop();
        }

    }
    $.Price_bit_run = function (_obj, _n, _mtop) {
        Price_bit_n = _n;
        Price_bit_mtop = _mtop;
        Price_bit_obj_div = _obj;
        new $.Price_bit_SetRemainTime();
    }



}(jQuery));
//  价格 Price_quite
(function ($) {
    $.extend($.fn, {
        Price_quite: function (_obj, _Old_Number, _New_Number) {
            var _MarginTop = 0;
            var _Transform_n = 0;
            switch (_Old_Number) {
                case 1:
                    _MarginTop = 0;
                    break;
                case 2:
                    _MarginTop = -462;
                    break;
                case 3:
                    _MarginTop = -924;
                    break;
                case 4:
                    _MarginTop = -1848;
                    break;
                case 5:
                    _MarginTop = -2310;
                    break;
                case 6:
                    _MarginTop = -2773;
                    break;
                case 7:
                    _MarginTop = -3157;
                    break;
                case 8:
                    _MarginTop = -3696;
                    break;
                case 9:
                    _MarginTop = -4080;
                    break;
                case 0:
                    _MarginTop = 0;
                    break;
            }
            if (_Old_Number > _New_Number && _New_Number >= 4) {
                _MarginTop = 0;
                _Transform_n = (_New_Number + 1) * 6;
            } else if ((_Old_Number > _New_Number && _New_Number < 4) || _Old_Number == 0) {
                _MarginTop = 0;
                _Transform_n = _New_Number * 6;
            }
            else if (_Old_Number >= 4) {
                _Transform_n = (_New_Number - _Old_Number) * 6;
            } else if (_Old_Number == 0 && _New_Number == 1) {
                _Transform_n = 6;
            }
            else {
                _Transform_n = (_New_Number - _Old_Number + 1) * 6;
            }
            if (_Old_Number != _New_Number) {
                var p = new $.Price_quite_run(_obj, _Transform_n, _MarginTop);
            }
        }

    });

    var Price_quite_n = 0;
    var Price_quite_mtop = 0;
    var Price_quite_obj_div = "";

    $.Price_quite_SetMarginTop = function () {
        Price_quite_mtop = Price_quite_mtop - Step;
        $("#" + Price_quite_obj_div).css("margin-top", Price_quite_mtop + "px");

    }
    $.Price_quite_SetRemainTime = function () {
        if (Price_quite_n > 0) {
            Price_quite_n = Price_quite_n - 1;
            setTimeout("$.Price_quite_SetRemainTime()", 60);
            $.Price_quite_SetMarginTop();
        }

    }
    $.Price_quite_run = function (_obj, _n, _mtop) {
        Price_quite_n = _n;
        Price_quite_mtop = _mtop;
        Price_quite_obj_div = _obj;
        new $.Price_quite_SetRemainTime();
    }



}(jQuery));
//  人数 men_ten
(function ($) {
    $.extend($.fn, {
        men_ten: function (_obj, _Old_Number, _New_Number) {
            var _MarginTop = 0;
            var _Transform_n = 0;
            switch (_Old_Number) {
                case 1:
                    _MarginTop = 0;
                    break;
                case 2:
                    _MarginTop = -462;
                    break;
                case 3:
                    _MarginTop = -924;
                    break;
                case 4:
                    _MarginTop = -1848;
                    break;
                case 5:
                    _MarginTop = -2310;
                    break;
                case 6:
                    _MarginTop = -2773;
                    break;
                case 7:
                    _MarginTop = -3157;
                    break;
                case 8:
                    _MarginTop = -3696;
                    break;
                case 9:
                    _MarginTop = -4080;
                    break;
                case 0:
                    _MarginTop = 0;
                    break;
            }
            if (_Old_Number > _New_Number && _New_Number >= 4) {
                _MarginTop = 0;
                _Transform_n = (_New_Number + 1) * 6;
            } else if ((_Old_Number > _New_Number && _New_Number < 4) || _Old_Number == 0) {
                _MarginTop = 0;
                _Transform_n = _New_Number * 6;
            }
            else if (_Old_Number >= 4) {
                _Transform_n = (_New_Number - _Old_Number) * 6;
            }
            else if (_Old_Number == 0 && _New_Number == 1) {
                _Transform_n = 6;
            }
            else {
                _Transform_n = (_New_Number - _Old_Number + 1) * 6;
            }
            if (_Old_Number != _New_Number) {
                var p = new $.men_ten_run(_obj, _Transform_n, _MarginTop);
            }
        }

    });

    var men_ten_n = 0;
    var men_ten_mtop = 0;
    var men_ten_obj_div = "";

    $.men_ten_SetMarginTop = function () {
        men_ten_mtop = men_ten_mtop - Step;
        $("#" + men_ten_obj_div).css("margin-top", men_ten_mtop + "px");

    }
    $.men_ten_SetRemainTime = function () {
        if (men_ten_n > 0) {
            men_ten_n = men_ten_n - 1;
            setTimeout("$.men_ten_SetRemainTime()", 60);
            $.men_ten_SetMarginTop();
        }

    }
    $.men_ten_run = function (_obj, _n, _mtop) {
        men_ten_n = _n;
        men_ten_mtop = _mtop;
        men_ten_obj_div = _obj;
        new $.men_ten_SetRemainTime();
    }



}(jQuery));
//  人数 men_bit
(function ($) {
    $.extend($.fn, {

        men_bit: function (_obj, _Old_Number, _New_Number) {
            var _MarginTop = 0;
            var _Transform_n = 0;
            switch (_Old_Number) {
                case 1:
                    _MarginTop = 0;
                    break;
                case 2:
                    _MarginTop = -462;
                    break;
                case 3:
                    _MarginTop = -924;
                    break;
                case 4:
                    _MarginTop = -1848;
                    break;
                case 5:
                    _MarginTop = -2310;
                    break;
                case 6:
                    _MarginTop = -2773;
                    break;
                case 7:
                    _MarginTop = -3157;
                    break;
                case 8:
                    _MarginTop = -3696;
                    break;
                case 9:
                    _MarginTop = -4080;
                    break;
                case 0:
                    _MarginTop = 0;
                    break;
            }
            if (_Old_Number > _New_Number && _New_Number >= 4) {
                _MarginTop = 0;
                _Transform_n = (_New_Number + 1) * 6;
            } else if ((_Old_Number > _New_Number && _New_Number < 4) || _Old_Number == 0) {
                _MarginTop = 0;
                _Transform_n = _New_Number * 6;
            }
            else if (_Old_Number >= 4) {
                _Transform_n = (_New_Number - _Old_Number) * 6;
            }
            else if (_Old_Number == 0 && _New_Number == 1) {
                _Transform_n = 6;
            }
            else {
                _Transform_n = (_New_Number - _Old_Number + 1) * 6;
            }
            if (_Old_Number != _New_Number) {
                var p = new $.men_bit_run(_obj, _Transform_n, _MarginTop);
            }
        }

    });

    var men_bit_n = 0;
    var men_bit_mtop = 0;
    var men_bit_obj_div = "";

    $.men_bit_SetMarginTop = function () {
        men_bit_mtop = men_bit_mtop - Step;
        $("#" + men_bit_obj_div).css("margin-top", men_bit_mtop + "px");

    }
    $.men_bit_SetRemainTime = function () {
        if (men_bit_n > 0) {
            men_bit_n = men_bit_n - 1;
            setTimeout("$.men_bit_SetRemainTime()", 60);
            $.men_bit_SetMarginTop();
        }

    }
    $.men_bit_run = function (_obj, _n, _mtop) {
        men_bit_n = _n;
        men_bit_mtop = _mtop;
        men_bit_obj_div = _obj;
        new $.men_bit_SetRemainTime();
    }



}(jQuery));
//  人数 men_quite
(function ($) {
    $.extend($.fn, {
        men_quite: function (_obj, _Old_Number, _New_Number) {
            var _MarginTop = 0;
            var _Transform_n = 0;
            switch (_Old_Number) {
                case 1:
                    _MarginTop = 0;
                    break;
                case 2:
                    _MarginTop = -462;
                    break;
                case 3:
                    _MarginTop = -924;
                    break;
                case 4:
                    _MarginTop = -1848;
                    break;
                case 5:
                    _MarginTop = -2310;
                    break;
                case 6:
                    _MarginTop = -2773;
                    break;
                case 7:
                    _MarginTop = -3157;
                    break;
                case 8:
                    _MarginTop = -3696;
                    break;
                case 9:
                    _MarginTop = -4080;
                    break;
                case 0:
                    _MarginTop = 0;
                    break;
            }
            if (_Old_Number > _New_Number && _New_Number >= 4) {
                _MarginTop = 0;
                _Transform_n = (_New_Number + 1) * 6;
            } else if ((_Old_Number > _New_Number && _New_Number < 4) || _Old_Number == 0) {
                _MarginTop = 0;
                _Transform_n = _New_Number * 6;
            }
            else if (_Old_Number >= 4) {
                _Transform_n = (_New_Number - _Old_Number) * 6;
            } else if (_Old_Number == 0 && _New_Number == 1) {
                _Transform_n = 6;
            }
            else {
                _Transform_n = (_New_Number - _Old_Number + 1) * 6;
            }
            if (_Old_Number != _New_Number) {
                var p = new $.men_quite_run(_obj, _Transform_n, _MarginTop);
            }
        }

    });

    var men_quite_n = 0;
    var men_quite_mtop = 0;
    var men_quite_obj_div = "";

    $.men_quite_SetMarginTop = function () {
        men_quite_mtop = men_quite_mtop - Step;
        $("#" + men_quite_obj_div).css("margin-top", men_quite_mtop + "px");

    }
    $.men_quite_SetRemainTime = function () {
        if (men_quite_n > 0) {
            men_quite_n = men_quite_n - 1;
            setTimeout("$.men_quite_SetRemainTime()", 60);
            $.men_quite_SetMarginTop();
        }

    }
    $.men_quite_run = function (_obj, _n, _mtop) {
        men_quite_n = _n;
        men_quite_mtop = _mtop;
        men_quite_obj_div = _obj;
        new $.men_quite_SetRemainTime();
    }



}(jQuery));
//  车辆台数 car_ten
(function ($) {
    $.extend($.fn, {
        car_ten: function (_obj, _Old_Number, _New_Number) {
            var _MarginTop = 0;
            var _Transform_n = 0;
            switch (_Old_Number) {
                case 1:
                    _MarginTop = 0;
                    break;
                case 2:
                    _MarginTop = -462;
                    break;
                case 3:
                    _MarginTop = -924;
                    break;
                case 4:
                    _MarginTop = -1848;
                    break;
                case 5:
                    _MarginTop = -2310;
                    break;
                case 6:
                    _MarginTop = -2773;
                    break;
                case 7:
                    _MarginTop = -3157;
                    break;
                case 8:
                    _MarginTop = -3696;
                    break;
                case 9:
                    _MarginTop = -4080;
                    break;
                case 0:
                    _MarginTop = 0;
                    break;
            }
            if (_Old_Number > _New_Number && _New_Number >= 4) {
                _MarginTop = 0;
                _Transform_n = (_New_Number + 1) * 6;
            } else if ((_Old_Number > _New_Number && _New_Number < 4) || _Old_Number == 0) {
                _MarginTop = 0;
                _Transform_n = _New_Number * 6;
            }
            else if (_Old_Number >= 4) {
                _Transform_n = (_New_Number - _Old_Number) * 6;
            }
            else if (_Old_Number == 0 && _New_Number == 1) {
                _Transform_n = 6;
            }
            else {
                _Transform_n = (_New_Number - _Old_Number + 1) * 6;
            }
            if (_Old_Number != _New_Number) {
                var p = new $.car_ten_run(_obj, _Transform_n, _MarginTop);
            }
        }

    });

    var car_ten_n = 0;
    var car_ten_mtop = 0;
    var car_ten_obj_div = "";

    $.car_ten_SetMarginTop = function () {
        car_ten_mtop = car_ten_mtop - Step;
        $("#" + car_ten_obj_div).css("margin-top", car_ten_mtop + "px");

    }
    $.car_ten_SetRemainTime = function () {
        if (car_ten_n > 0) {
            car_ten_n = car_ten_n - 1;
            setTimeout("$.car_ten_SetRemainTime()", 60);
            $.car_ten_SetMarginTop();
        }

    }
    $.car_ten_run = function (_obj, _n, _mtop) {
        car_ten_n = _n;
        car_ten_mtop = _mtop;
        car_ten_obj_div = _obj;
        new $.car_ten_SetRemainTime();
    }



}(jQuery));
//  车辆台数 car_bit
(function ($) {
    $.extend($.fn, {
        car_bit: function (_obj, _Old_Number, _New_Number) {
            var _MarginTop = 0;
            var _Transform_n = 0;
            switch (_Old_Number) {
                case 1:
                    _MarginTop = 0;
                    break;
                case 2:
                    _MarginTop = -462;
                    break;
                case 3:
                    _MarginTop = -924;
                    break;
                case 4:
                    _MarginTop = -1848;
                    break;
                case 5:
                    _MarginTop = -2310;
                    break;
                case 6:
                    _MarginTop = -2773;
                    break;
                case 7:
                    _MarginTop = -3157;
                    break;
                case 8:
                    _MarginTop = -3696;
                    break;
                case 9:
                    _MarginTop = -4080;
                    break;
                case 0:
                    _MarginTop = 0;
                    break;
            }
            if (_Old_Number > _New_Number && _New_Number >= 4) {
                _MarginTop = 0;
                _Transform_n = (_New_Number + 1) * 6;
            } else if ((_Old_Number > _New_Number && _New_Number < 4) || _Old_Number == 0) {
                _MarginTop = 0;
                _Transform_n = _New_Number * 6;
            }
            else if (_Old_Number >= 4) {
                _Transform_n = (_New_Number - _Old_Number) * 6;
            }
            else if (_Old_Number == 0 && _New_Number == 1) {
                _Transform_n = 6;
            }
            else {
                _Transform_n = (_New_Number - _Old_Number + 1) * 6;
            }
            if (_Old_Number != _New_Number) {
                var p = new $.car_bit_run(_obj, _Transform_n, _MarginTop);
            }
        }

    });

    var car_bit_n = 0;
    var car_bit_mtop = 0;
    var car_bit_obj_div = "";

    $.car_bit_SetMarginTop = function () {
        car_bit_mtop = car_bit_mtop - Step;
        $("#" + car_bit_obj_div).css("margin-top", car_bit_mtop + "px");

    }
    $.car_bit_SetRemainTime = function () {
        if (car_bit_n > 0) {
            car_bit_n = car_bit_n - 1;
            setTimeout("$.car_bit_SetRemainTime()", 60);
            $.car_bit_SetMarginTop();
        }

    }
    $.car_bit_run = function (_obj, _n, _mtop) {
        car_bit_n = _n;
        car_bit_mtop = _mtop;
        car_bit_obj_div = _obj;
        new $.car_bit_SetRemainTime();
    }



}(jQuery));
//  车辆台数 car_quite
(function ($) {
    $.extend($.fn, {
        car_quite: function (_obj, _Old_Number, _New_Number) {
            var _MarginTop = 0;
            var _Transform_n = 0;
            switch (_Old_Number) {
                case 1:
                    _MarginTop = 0;
                    break;
                case 2:
                    _MarginTop = -462;
                    break;
                case 3:
                    _MarginTop = -924;
                    break;
                case 4:
                    _MarginTop = -1848;
                    break;
                case 5:
                    _MarginTop = -2310;
                    break;
                case 6:
                    _MarginTop = -2773;
                    break;
                case 7:
                    _MarginTop = -3157;
                    break;
                case 8:
                    _MarginTop = -3696;
                    break;
                case 9:
                    _MarginTop = -4080;
                    break;
                case 0:
                    _MarginTop = 0;
                    break;
            }
            if (_Old_Number > _New_Number && _New_Number >= 4) {
                _MarginTop = 0;
                _Transform_n = (_New_Number + 1) * 6;
            } else if ((_Old_Number > _New_Number && _New_Number < 4) || _Old_Number == 0) {
                _MarginTop = 0;
                _Transform_n = _New_Number * 6;
            }
            else if (_Old_Number >= 4) {
                _Transform_n = (_New_Number - _Old_Number) * 6;
            } else if (_Old_Number == 0 && _New_Number == 1) {
                _Transform_n = 6;
            }
            else {
                _Transform_n = (_New_Number - _Old_Number + 1) * 6;
            }
            if (_Old_Number != _New_Number) {
                var p = new $.car_quite_run(_obj, _Transform_n, _MarginTop);
            }
        }
    });

    var car_quite_n = 0;
    var car_quite_mtop = 0;
    var car_quite_obj_div = "";

    $.car_quite_SetMarginTop = function () {

        car_quite_mtop = car_quite_mtop - Step;
        $("#" + car_quite_obj_div).css("margin-top", car_quite_mtop + "px");

    }
    $.car_quite_SetRemainTime = function () {
        if (car_quite_n > 0) {
            car_quite_n = car_quite_n - 1;
            setTimeout("$.car_quite_SetRemainTime()", 60);
            $.car_quite_SetMarginTop();
        }

    }
    $.car_quite_run = function (_obj, _n, _mtop) {
        car_quite_n = _n;
        car_quite_mtop = _mtop;
        car_quite_obj_div = _obj;
        new $.car_quite_SetRemainTime();
    }



}(jQuery));
