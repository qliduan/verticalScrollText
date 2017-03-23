    /**
                    function generateStyle   生成动画所需的样式
                    @params
                        selector  作用的dom的选择器
                        length    数据的长度
                        gapTime   轮播间隔时间，单位s
                        time      切换时间，单位s
                */

    function generateStyle(selector, length, gapTime, time) {
        if (length < 2) return;
        var gapTime = gapTime || 3;
        var time = time || 0.1;
        //css3动画总时长
        var durationTime = length * (gapTime + time);
        var curGap = time / (gapTime + time) * 100;
        var eachTime = 100 / length;
        var animationName = 'name_' + length + '_' + gapTime + '_' + time;
        //animation-name不能带小数点
        animationName = animationName.replace('.', '');
        var style = 'keyframes ' + animationName + ' {' + genTransform(0, 0, '-webkit-');
        var step;
        //计算处理每一次滚动的位置和所占的时间比例
        for (var i = 1; i <= length; i++) {
            step = eachTime * i;
            style = style + genTransform(step - curGap, -(i - 1) * 0.2, '-webkit-') + genTransform(step, -i * 0.2, '-webkit-')
        }
        style += '}'
        style = '@-webkit-' + style + '@' + style;
        //将animation动画绑定到选择器上
        style += selector + ' {-webkit-animation: ' + animationName + ' ' + durationTime + 's linear 0s infinite;' +
            'animation: ' + animationName + ' ' + durationTime + 's linear 0s infinite;}';
        return style;
    }

    function genTransform(percent, translateY, prefix) {
        var transformStyle = percent + '% {' + prefix + 'transform:translate(0,' + translateY + 'rem);' +
            'transform:translate(0,' + translateY + 'rem);}'
        return transformStyle;
    }


    function init(selector, length, gapTime, time) {
        var nod = document.createElement('style'),
            str = generateStyle(selector, length, gapTime, time);
        nod.type = 'text/css';
        nod.innerHTML = str;
        document.getElementsByTagName('head')[0].appendChild(nod);
    }

    init('.demo-list1', 4, 3, 0.1)
    init('#demoList2', 6, 2, 0.1)
