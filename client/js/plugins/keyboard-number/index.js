
/*
* 数字软键盘
* KeyboardNumber
* css need (./index.less)
* @author: Micheal Wang
* @build time: 2018.06.13
* 
* @params {Object} props 调用配置
*         {String} inputs: 作用input选择器
*         {Function} handleChange: value变化时回调
*         {Function} handleFocus: input获得焦点时触发
@example: 
    var keyboard = new KeyboardNumber({
        inputs: 'input[type="number"]',
        handleChange: function (input) {
            console.log(input.value);
        },
        handleFocus: function (input) {
            input.className += 'z-focous'
        }
    });

    keyboard.init();
*/


class KeyboardNumber {
    constructor(props = {}) {
        let { inputs, handleChange, handleFocus, nodou } = props;
        if (!inputs) throw new Error('Error! No input, cannot set keyboard.');

        this.$inputs = document.querySelectorAll(inputs);
        this.$selectedInput = this.$inputs[0];
        this.handleChange = handleChange;
        this.handleFocus = handleFocus;
		this.nodou = nodou;
        this.key = null;
        this.operation = null;
    }

    _appendKeyboard () {
        let item = document.createElement('div');console.log(this.nodou);
        let html = `
            <table>
                <tbody>
                    <tr>
                        <td class="u-number" data-key="1">1<em class="icon-num">1</em></td>
                        <td class="u-number" data-key="2">2<em class="icon-num">2</em></td>
                        <td class="u-number" data-key="3">3<em class="icon-num">3</em></td>
                        <td rowspan="2" class="u-operation u-delete" data-opc="delete">x</td>
                    </tr>
                    <tr>
                        <td class="u-number" data-key="4">4<em class="icon-num">4</em></td>
                        <td class="u-number" data-key="5">5<em class="icon-num">5</em></td>
                        <td class="u-number" data-key="6">6<em class="icon-num">6</em></td>
                    </tr>
                    <tr>
                        <td class="u-number" data-key="7">7<em class="icon-num">7</em></td>
                        <td class="u-number" data-key="8">8<em class="icon-num">8</em></td>
                        <td class="u-number" data-key="9">9<em class="icon-num">9</em></td>
                        <td rowspan="2" class="u-operation u-confirm">确认</td>
                    </tr>
                    <tr>
						${this.nodou ? '<td class="u-number"> </td>' : ''}
                        <td class="u-number ${this.nodou && 'z-hide' || ''}" data-key=".">.<em class="icon-num">.</em></td>
                        <td class="u-number" data-key="0">0<em class="icon-num">0</em></td>
                        <td class="u-number ${this.nodou && 'z-hide'} || ''" data-key="00">00<em class="icon-num">00</em></td>
                    </tr>
                </tbody>
            </table>
        `;

        item.id = 'fundKeyboard';
        item.className = 'u-numberonly';
        item.innerHTML = html;

        item.style.display = 'none';
        document.body.appendChild(item);
    }

    _addEvents () {
        let THIS = this,
            item = this.$keyboard;
        let timer,
            upbool = true;
        item.addEventListener('touchstart', function (e) {
            e = e || window.event;

            upbool = false;
            let $item = e.target,
                _key = $item.dataset.key;

            if (_key !== undefined) {
                THIS.key = _key;
            } else {
                THIS.operation = $item.dataset.opc;
            }
            $item.className = $item.className += ' z-tap';

            timer = setInterval(function () {
                if (!upbool && THIS.operation == 'delete') {
                    THIS.$selectedInput.value = THIS.$selectedInput.value.slice(0, -1);
                } else {
                    clearInterval(timer);
                    timer = null;
                }
            }, 200);
        }, false);
        item.addEventListener('touchend', function () {
            upbool = true;
            clearInterval(timer);
            let $taps = document.querySelectorAll('.z-tap');
            if ($taps.length) {
                for (let i = 0, len = $taps.length; i < len; i++) {
                    $taps[i].className = $taps[i].className.replace(' z-tap', '');
                }
            }

            if (THIS.key) {
				let _maxLength = THIS.$selectedInput.getAttribute("maxlength");
                if (!_maxLength || THIS.$selectedInput.value.toString().length < _maxLength) THIS.$selectedInput.value += '' + THIS.key;
            } else if (THIS.operation == 'delete') {
                THIS.$selectedInput.value = THIS.$selectedInput.value.slice(0, -1);
            }

            if (THIS.handleChange) THIS.handleChange(THIS.$selectedInput, THIS.key, THIS.operation);
            THIS.key = THIS.operation = null;
        }, false);

        item.getElementsByClassName('u-confirm')[0].addEventListener('click', () => {
			window.handleKeyboardConfirm ? window.handleKeyboardConfirm() : THIS.hide();
		}, false);


        for (let i = 0, len = this.$inputs.length; i < len; i++) {
            this.$inputs[i].setAttribute('readonly', true);
            this.$inputs[i].addEventListener('touchstart', () => {
                this.$selectedInput = this.$inputs[i];
                if (this.handleFocus) this.handleFocus(this.$selectedInput);
                if (this.$keyboard.style.display == 'none') {
                    this.show();
                }
            }, false);
        }
    }

    show () {
        this.$keyboard.style.display = 'block';
    }

    hide () {
        this.$keyboard.style.display = 'none';
    }

    init () {
        this._appendKeyboard();
        this.$keyboard = document.getElementById('fundKeyboard');
        this._addEvents();
    }
}

module.exports = KeyboardNumber;