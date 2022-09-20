/* 
    parameters: 
        -ojb : pass-in object
        -attr : The style that performs the animation
        -target : target position
        -speed : move speed;
        -callback function: execute after the animation end.
*/
function move(obj, attr, target, speed, callback) {
    clearInterval(obj.timer);

    //get current element's position
    var current = parseInt(getStyle(obj, attr));

    //identify the positive and negative values of speed
    if (current > target) {
        speed = -speed
    }

    obj.timer = setInterval(function () {
        var preValue = parseInt(getStyle(obj, attr));
        var newValue = preValue + speed;
        obj.style[attr] = newValue;
        if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
            newValue = target;
        }
        obj.style[attr] = newValue + "px";

        if (newValue == target) {
            clearInterval(obj.timer);
            callback && callback();
        }
    }, 20)

}

/* 
    get the element style
        - object
        - style name, IE: height, width, top, left....
*/

function getStyle(obj, name) {
    //compatible issue 
    if (window.getComputedStyle) {
        // return getComputedStyle(obj, null)[name];
        return getComputedStyle(obj, null)[name];
    } else {
        return obj.currentStyle[name];
    }
}



/* 
    parameters:
        -the object needed to add class.
        -cn : class name to be added
*/
function toggle(obj, cn) {
    if (hasClass(obj, cn)) {
        removeClass(obj,cn);
    } else {
        addClass(obj, cn);
    }
}

function addClass(obj, cn) {
    if (!hasClass(obj, cn)) {
        obj.className += " " + cn;
    }
}

function removeClass(obj, cn) {
    // //first way
    // if (hasClass(obj, cn)) {
    //     obj.className = obj.className.replace(cn, "");
    // }

    //second way
    var reg = new RegExp("\\b" + cn + "\\b");
    obj.className = obj.className.replace(reg, "");
}

//check if the object in clude this class or not
function hasClass(obj, cn) {
    var reg = new RegExp("\\b" + cn + "\\b");
    return reg.test(obj.className);
}