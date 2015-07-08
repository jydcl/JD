/**
 *
 * @authors Guyw (gyw.1046@163.com)
 * @date    2015-04-21 14:38:08
 * @version 1.0
 */


// 获取指定父元素内标签类名为所传参数classNma的所有标签
function getClasses(parent, className) {
    var tags = parent.all ? parent.all : parent.getElementsByTagName('*');
    var arr = new Array();
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].className.indexOf(className) != -1) {
            arr.push(tags[i]);
        }
    };
    return arr;
};

//获取document内所有标签类名为className的所有标签
function getAllClasses(className) {
    var tags = document.all ? document.all : document.getElementsByTagName('*');
    var arr = [];
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].className.indexOf(className) != -1) {
            arr.push(tags[i]);
        };
    };
    return arr;
};

//给对象obj添加fn事件
function addEvent(obj, ev, fn) {
    if (obj.addEventListener) {
        //监听 谷歌,火狐,IE9...
        obj.addEventListener(ev, fn, false);
    } else if (obj.attachEvent) {
        //监听 IE6 7 8
        obj.attachEvent("on" + ev, fn);   
    } else {
        obj["on" + ev] = fn;
    }
}

//移除对象obj的fn事件
function removeEvent(obj, ev, fn) {
    if (obj.removeEventListener) {
        //监听 谷歌,火狐,IE9...
        obj.removeEventListener(ev, fn, false);
    } else if (obj.detachEvent) {
        //监听 IE6 7 8
        obj.detachEvent("on" + ev, fn);
    } else {
        delete obj["on" + ev];
    }
}

//获取非行间样式
function getStyle(obj, oStyle) { //obj→对象  oStyle→样式名
    if (obj.currentStyle) {
        return obj.currentStyle[oStyle]; //IE6 7 8
    } else {
        return getComputedStyle(obj, null)[oStyle]; //非IE
    };
};

//获取下一个兄弟节点
function nextNode(obj) {
    if (obj.nextElementSibling) {
        return obj.nextElementSibling; //谷歌火狐IE9+等支持
    } else {
        return obj.nextSibling; //IE6 7 8支持
    };
};

//获取上一个兄弟节点
function previousNode(obj) {
    if (obj.previousElementSibling) {
        return obj.previousElementSibling; //谷歌火狐IE9+等支持
    } else {
        return obj.previousSibling; //IE6 7 8支持
    };
};

//获取第一个节点
function firstNode(obj) {
    if (obj.firstElementChild) {
        return obj.firstElementChild; //谷歌火狐IE9+等支持
    } else {
        return obj.firstChild; //IE6 7 8支持
    };
};

//获取最后一个节点 	
function lastNode(obj) {
    if (obj.lastElementChild) {
        return obj.lastElementChild; //谷歌火狐IE9+等支持
    } else {
        return obj.lastChild; //IE6 7 8支持
    };
};

//实现返回顶部功能
function backToTop(objId) {
    var Tween = {
        Linear: function(t, b, c, d) {
            return c * t / d + b;
        },
        Cubic: {
            easeIn: function(t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOut: function(t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            }
        }
    };
    var oDiv = document.getElementById(objId);
    var ind = 0;
    var timer = null;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (window.navigator.userAgent.indexOf("MSIE 6") != -1) {
        oDiv.style.top = scrollTop + document.documentElement.clientHeight - oDiv.offsetHeight + "px";
    } else {
        oDiv.style.position = "fixed";
    }
    oDiv.onclick = function() {
        ind = 0;
        clearInterval(timer);
        var start = scrollTop;
        var change = -start;
        timer = setInterval(function() {
            ind++;
            if (ind >= 20) {
                clearInterval(timer);
            }
            document.documentElement.scrollTop = Tween.Cubic.easeInOut(ind, start, change, 20);
            document.body.scrollTop = Tween.Cubic.easeInOut(ind, start, change, 20);
        }, 25);
    }
}

//通过scrollLeft和scrollTop属性获得滚动条位置,兼容IE怪异模式
function getScrollOffsets(w) {
    var w = w || window;
    if (w.pageXoffset != null) {
        return {
            left: w.pageXoffset,
            top: pageYoffset
        };
    }
    var d = w.document;
    if (document.compatMode == "CSS1Compat")
        return {
            left: d.body.scrollLeft,
            top: d.body.scrollTop
        };
    return {
        left: d.documentElement.scrollLeft,
        top: d.documentElement.scrollTop
    };
}

//判断视口的尺寸
function getViewPortSize(w) {
    var w = w || window;
    if (w.innerWidth != null)
        return {
            width: w.innerWidth,
            height: w.innerHeight
        };
    var d = w.document;
    if (document.compatMode == "CSS1Compat")
        return {
            width: d.body.clientWidth,
            height: d.body.clientHeight
        };
    return {
        width: d.documentElement.clientWidth,
        height: d.documentElement.clientHeight
    };
}

//递归上溯累加计算元素距离body的距离
function getElementPosition(e) {
    var x = 0,
        y = 0;
    // while (e != null) {
    while (e) {
        x += e.offsetLeft;
        y += e.offsetTop;
        e = e.offsetParent;
    }
    return {
        left: x,
        top: y
    };
}

function loadXMLDoc(url, callback) {
        var xmlhttp = null;
        if (window.XMLHttpRequest) { // code for all new browsers
            xmlhttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // code for IE5 and IE6
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (xmlhttp != null) {
            xmlhttp.open("GET", url, true);
            xmlhttp.send(null);
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var str = null;
                        if (url.substr(-1, 4) === '.xml') {
                            str = xmlhttp.responseXML;
                        } else {
                            str = xmlhttp.responseText;
                        }
                        callback(str);
                    } else {
                        alert("Problem retrieving XML data");
                    }
                }
            }
        } else {
            alert("Your browser does not support XMLHTTP.");
        }
    }
    // callback函数
    // function state_Change() {
    //     if (xmlhttp.readyState == 4) { // 4 = "loaded"
    //         if (xmlhttp.status == 200) { // 200 = OK
    //             // ...our code here...
    //         } else {
    //             alert("Problem retrieving XML data");
    //         }
    //     }
    // }
    