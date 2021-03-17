~ function() {
    var reg1 = /AppleWebKit.*Mobile/i,
        reg2 = /MIDP|SymbianOs|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/;
    // true为移动端设备
    if (reg1.test(navigator.userAgent) || reg2.test(navigator.userAgent)) {
        if (window.location.href.indexOf("pc端url") >= 0) {
            window.location.href = "移动端url";
        }
        return;
    }
}