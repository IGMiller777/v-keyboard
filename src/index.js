const x = 3;
const keyBoar = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyBoar", "keyBoar--hidden");
        this.elements.keysContainer.classList.add("keyBoar-keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyBoar-key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyBoar for elements with .use-keyBoar-input
        document.querySelectorAll(".use-keyBoar-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyBoar-key");
            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyBoar-key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;
                case "caps":
                    keyElement.classList.add("keyBoar-key--wide", "keyBoar-key--activatable");
                    keyElement.innerHTML = createIconHTML("keyBoar_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyBoar-key--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyBoar-key--wide");
                    keyElement.innerHTML = createIconHTML("keyBoar_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyBoar-key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyBoar-key--wide", "keyBoar-key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyBoar--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyBoar--hidden");
    }
};

window.addEventListener("DOMContentLoaded", function () {
    keyBoar.init();
    const keyC = document.querySelector('.keyBoar-keys');
    keyC.style.display = 'none'
    console.log(keyC);


});
const keyData = [
    [{ key: { ru: '~', en: '`' }, shift: { ru: '`', en: '~' }, code: 'Backquote' }, { key: { ru: '1', en: '1' }, shift: { ru: '!', en: '!' }, code: 'Digit1' },
    { key: { ru: '2', en: '2' }, shift: { ru: '"', en: '@' }, code: 'Digit2' }, { key: { ru: '3', en: '3' }, shift: { ru: '№', en: '#' }, code: 'Digit3' },
    { key: { ru: '4', en: '4' }, shift: { ru: ';', en: '$' }, code: 'Digit4' }, { key: { ru: '5', en: '5' }, shift: { ru: '%', en: '%' }, code: 'Digit5' },
    { key: { ru: '6', en: '6' }, shift: { ru: ':', en: '^' }, code: 'Digit6' }, { key: { ru: '7', en: '7' }, shift: { ru: '?', en: '&' }, code: 'Digit7' },
    { key: { ru: '8', en: '8' }, shift: { ru: '*', en: '*' }, code: 'Digit8' }, { key: { ru: '9', en: '9' }, shift: { ru: '(', en: '(' }, code: 'Digit9' },
    { key: { ru: '0', en: '0' }, shift: { ru: ')', en: ')' }, code: 'Digit0' }, { key: { ru: '-', en: '-' }, shift: { ru: '_', en: '_' }, code: 'Minus' },
    { key: { ru: '=', en: '=' }, shift: { ru: '+', en: '+' }, code: 'Equal' }, {
        key: 'Backspace', code: 'Backspace', class: 'key-backspace', noType: true,
    }],
    [{ key: 'Tab', code: 'Tab', class: 'key-tab', noType: true, }, { key: { ru: 'й', en: 'q' }, shift: { ru: 'Й', en: 'Q' }, code: 'KeyQ' }, { key: { ru: 'ц', en: 'w' }, shift: { ru: 'Ц', en: 'W' }, code: 'KeyW' },
    { key: { ru: 'у', en: 'e' }, shift: { ru: 'У', en: 'E' }, code: 'KeyE' }, { key: { ru: 'к', en: 'r' }, shift: { ru: 'К', en: 'R' }, code: 'KeyR' }, { key: { ru: 'е', en: 't' }, shift: { ru: 'Е', en: 'T' }, code: 'KeyT' },
    { key: { ru: 'н', en: 'y' }, shift: { ru: 'Н', en: 'Y' }, code: 'KeyY' }, { key: { ru: 'г', en: 'u' }, shift: { ru: 'Г', en: 'U' }, code: 'KeyU' }, { key: { ru: 'ш', en: 'i' }, shift: { ru: 'Ш', en: 'I' }, code: 'KeyI' },
    { key: { ru: 'щ', en: 'o' }, shift: { ru: 'Щ', en: 'O' }, code: 'KeyO' }, { key: { ru: 'з', en: 'p' }, shift: { ru: 'З', en: 'P' }, code: 'KeyP' }, { key: { ru: 'х', en: '[' }, shift: { ru: 'Х', en: '{' }, code: 'BracketLeft' },
    { key: { ru: 'ъ', en: ']' }, shift: { ru: 'Ъ', en: '}' }, code: 'BracketRight' }, { key: { ru: '\\', en: '\\' }, shift: { ru: '|', en: '|' }, code: 'Backslash', class: 'key-backslash', },],
    [{ key: '<span class="caps_icon">•</span><div>Caps<br>Lock</div>', code: 'CapsLock', class: 'key-capslock', noType: true, },
    { key: { ru: 'ф', en: 'a' }, shift: { ru: 'Ф', en: 'A' }, code: 'KeyA' }, { key: { ru: 'ы', en: 's' }, shift: { ru: 'Ы', en: 'S' }, code: 'KeyS' }, { key: { ru: 'в', en: 'd' }, shift: { ru: 'В', en: 'D' }, code: 'KeyD' },
    { key: { ru: 'а', en: 'f' }, shift: { ru: 'А', en: 'F' }, code: 'KeyF' }, { key: { ru: 'п', en: 'g' }, shift: { ru: 'П', en: 'G' }, code: 'KeyG' }, { key: { ru: 'р', en: 'h' }, shift: { ru: 'Р', en: 'H' }, code: 'KeyH' }, { key: { ru: 'о', en: 'j' }, shift: { ru: 'О', en: 'J' }, code: 'KeyJ' },
    { key: { ru: 'л', en: 'k' }, shift: { ru: 'Л', en: 'K' }, code: 'KeyK' }, { key: { ru: 'д', en: 'l' }, shift: { ru: 'Д', en: 'L' }, code: 'KeyL' }, { key: { ru: 'ж', en: ';' }, shift: { ru: 'Ж', en: ':' }, code: 'Semicolon' }, { key: { ru: 'э', en: '\'' }, shift: { ru: 'Э', en: '"' }, code: 'Quote' },
    { key: 'Enter', code: 'Enter', class: 'key-enter', noType: true, },],
    [{ key: 'Shift', code: 'ShiftLeft', class: 'key-leftshift', noType: true, }, { key: { ru: 'я', en: 'z' }, shift: { ru: 'Я', en: 'Z' }, code: 'KeyZ' }, { key: { ru: 'ч', en: 'x' }, shift: { ru: 'Ч', en: 'X' }, code: 'KeyX' }, { key: { ru: 'с', en: 'c' }, shift: { ru: 'С', en: 'C' }, code: 'KeyC' }, { key: { ru: 'м', en: 'v' }, shift: { ru: 'М', en: 'V' }, code: 'KeyV' },
    { key: { ru: 'и', en: 'b' }, shift: { ru: 'И', en: 'B' }, code: 'KeyB' }, { key: { ru: 'т', en: 'n' }, shift: { ru: 'Т', en: 'N' }, code: 'KeyN' }, { key: { ru: 'ь', en: 'm' }, shift: { ru: 'Ь', en: 'M' }, code: 'KeyM' }, { key: { ru: 'б', en: ',' }, shift: { ru: 'Б', en: '<' }, code: 'Comma' },
    { key: { ru: 'ю', en: '.' }, shift: { ru: 'Ю', en: '>' }, code: 'Period' }, { key: { ru: '.', en: '/' }, shift: { ru: ',', en: '?' }, code: 'Slash' }, { key: '▲', code: 'ArrowUp', noType: true }, { key: 'Shift', code: 'ShiftRight', class: 'key-rightshift', noType: true, },],
    [{ key: 'Ctrl', code: 'ControlLeft', class: 'key-leftctrl', noType: true }, { key: { ru: 'RU', en: 'EN' }, code: 'Lang', class: 'key-lang', noType: true }, { key: 'Alt', code: 'AltLeft', class: 'key-leftalt', noType: true }, { key: ' ', code: 'Space', class: 'key-space' }, { key: 'Alt', code: 'AltRight', class: 'key-rightalt', noType: true }, { key: 'Ctrl', code: 'ControlRight', class: 'key-rightctrl', noType: true }, { key: '◄', code: 'ArrowLeft', noType: true }, { key: '▼', code: 'ArrowDown', noType: true }, { key: '►', code: 'ArrowRight', noType: true }],
];

// createDom


function createDom(element, innerHTML, ...tyles) {
    switch (element) {
        case "backspace":
            keyElement.classList.add("keyBoar-key--wide");
            keyElement.innerHTML = createIconHTML("backspace");
            keyElement.addEventListener("click", () => {
                this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                this._triggerEvent("oninput");
            });

            break;
        case "caps":
            keyElement.classList.add("keyBoar-key--wide", "keyBoar-key--activatable");
            keyElement.innerHTML = createIconHTML("keyBoar_capslock");

            keyElement.addEventListener("click", () => {
                this._toggleCapsLock();
                keyElement.classList.toggle("keyBoar-key--active", this.properties.capsLock);
            });

            break;

        case "enter":
            keyElement.classList.add("keyBoar-key--wide");
            keyElement.innerHTML = createIconHTML("keyBoar_return");

            keyElement.addEventListener("click", () => {
                this.properties.value += "\n";
                this._triggerEvent("oninput");
            });

            break;

        case "space":
            keyElement.classList.add("keyBoar-key--extra-wide");
            keyElement.innerHTML = createIconHTML("space_bar");

            keyElement.addEventListener("click", () => {
                this.properties.value += " ";
                this._triggerEvent("oninput");
            });

            break;
    }
    const domN = document.createElement(element)
    domN.classList.add(...tyles)
    domN.innerHTML = innerHTML;
    return domN
}


class KeyBoard {
    constructor() {
        this.alt = false
        this.ctrl = false
        this.home = true
        this.lang = 'en';
        this.caps = 'off';
        this.shift = false;

    }
    createKey() {
        const keyboard = createDom('div', '', 'keyboard');
        const container = createDom('div', '', 'keyboard-container');
        this.langS();
        for (let i = 0; i < keyData.length; i += 1) {
            const row = createDom('div', '', 'keyboard-row');
            keyData[i].forEach((e) => {
                const keyLabel = (e.key.ru && e.key.en) ? e.key[this.lang] : e.key;
                const key = createDom('div', keyLabel, 'key');
                if (e.class) key.classList.add(e.class);
                key.dataset.code = e.code;
                if (e.key.ru && e.key.en) {
                    key.dataset.ru = e.key.ru;
                    key.dataset.en = e.key.en;
                }
                if (e.shift) {
                    key.dataset.ruShift = e.shift.ru;
                    key.dataset.enShift = e.shift.en;
                }
                if (e.noType) {
                    key.dataset.noType = true;
                }
                row.append(key);
            });
            container.append(row);
        }
        keyboard.append(container);
        return keyboard;
    }
    langS() {
        if (localStorage.getItem('lang')) {
            this.lang = localStorage.getItem('lang')
        } else {
            localStorage.setItem('lang', this.lang)
        }
    }
    logF() {
        console.log('BIIIIII');
    }
    langCh(event) {
        if (this.lang === 'en') {
            this.lang = 'ru'
        }
        else {
            this.lang = 'en'
        }
        localStorage.setItem('lang', this.lang)
        this.updateKeys(event)
    }

    capsIc() {
        if (this.caps === 'on') {
            document.querySelector('.caps_icon').classList.add('caps_on');
        } else {
            document.querySelector('.caps_icon').classList.remove('caps_on');
        }
    }

    changeCaps(event) {
        if (this.caps === 'on') {
            this.caps = 'off'
        } else {
            this.caps = 'on'
        }
        this.capsIc()
        this.updateKeys(event)
    }
    removeShift(event) {
        if (this.shift) {
            this.shift = !this.shift;
            document.querySelector('.key_leftshift').classList.remove('active');
            document.querySelector('.key_rightshift').classList.remove('active');
            this.updateKeys(event);
        }
    }
    updateKeys(event) {
        const { lang } = this
        if (event.shiftKey || this.shift) {
            document.querySelectorAll('.key').forEach((el) => {
                if (el.dataset[`${lang}Shift`]) {
                    if (this.caps === 'on') {
                        el.innerHTML = el.dataset[`${lang}Shift`].toLowerCase()
                    } else el.innerHTML = el.dataset[`${lang}Shift`]
                }
                else if (el.dataset[lang]) {
                    el.innerHTML = el.dataset[lang]
                }
            })
        }
        else {
            document.querySelectorAll('.key').forEach((el) => {
                if (el.dataset[lang]) {
                    if (this.caps === 'on' && !(event.shiftKey || this.shift)) {
                        el.innerHTML = el.dataset[lang].toUpperCase()
                    } else {
                        el.innerHTML = el.dataset[lang]
                    }

                }
            })
        }
    }


}

const title = 'Keyboard'
const { body } = document
const textField = createDom('textarea', '', 'textfield')
const keyboard = new KeyBoard()

function keyPress(event, button, code) {
    let text = ''
    let cursor = textField.selectionStart;
    event.preventDefault()
    textField.focus()

    if (code === 'CapsLock') {
        keyboard.changeCaps(event)
    }
    if ((code === 'AltLeft' && (event.shiftKey || keyboard.shift))
        || (code === 'AltRight' && (event.shiftKey || keyboard.shift))
        || (code === 'ShiftLeft' && event.altKey)
        || (code === 'ShiftRight' && event.altKey)
        || (code === 'Lang')) {
        keyboard.langCh(event)
        keyboard.removeShift(event)
    }

    if (code === 'ShiftLeft' || code === 'ShiftRight') {
        keyboard.updateKeys(event);
    }

    // ARROWWWSS
    if (code === 'ArrowLeft' && cursor > 0) {
        textField.setSelectionRange(cursor - 1, cursor - 1);
    }
    if (code === 'ArrowRight') {
        cursor = textField.selectionEnd;
        textField.setSelectionRange(cursor + 1, cursor + 1);
    }
    if (code === 'ArrowUp') {
        const textBeforeCursor = textField.value.substring(0, cursor).split('\n');
        if (textBeforeCursor.length === 1 || textBeforeCursor[textBeforeCursor.length - 1].length >= 57) {
            cursor -= 57;
        } else if (textBeforeCursor[textBeforeCursor.length - 1].length <= textBeforeCursor[textBeforeCursor.length - 2].length % 57) {
            cursor -= (textBeforeCursor[textBeforeCursor.length - 2].length % 57) + 1;
        } else {
            cursor -= textBeforeCursor[textBeforeCursor.length - 1].length + 1;
        }
        if (cursor < 0) cursor = 0;
        textField.setSelectionRange(cursor, cursor);
    }
    if (code === 'ArrowDown') {
        cursor = textField.selectionEnd;
        const textBeforeCursor = textField.value.substring(0, cursor).split('\n');
        const textAfterCursor = textField.value.substring(textField.selectionEnd).split('\n');
        if (textAfterCursor.length === 1 || textAfterCursor[0].length >= 57) {
            cursor += 57;
        } else if ((textBeforeCursor[textBeforeCursor.length - 1].length % 57)
            > textAfterCursor[1].length) {
            cursor += textAfterCursor[0].length + textAfterCursor[1].length + 1;
        } else if ((((textBeforeCursor[textBeforeCursor.length - 1].length)
            + textAfterCursor[0].length) > 57)) {
            cursor += textAfterCursor[0].length;
        } else {
            cursor += (textBeforeCursor[textBeforeCursor.length - 1].length % 57)
                + textAfterCursor[0].length + 1;
        }
        textField.setSelectionRange(cursor, cursor);
    }

    if (code === 'Tab') {
        text = '    '
    }
    if (code === 'Enter') {
        text = '\n';
    }
    if (code === 'Backspace') {
        text = '-1';
    }
    if (!button.dataset.noType) {
        text = button.textContent;
        keyboard.removeShift(event);
    }
    if (text) {
        let textBeforeCursor = textField.value.substring(0, cursor);
        const textAfterCursor = textField.value.substring(textField.selectionEnd);
        if (text === '-1') {
            text = '';
            if (cursor === textField.selectionEnd) {
                textBeforeCursor = textBeforeCursor.slice(0, -1);
                cursor -= (cursor > 0) ? 2 : 1;
            } else cursor -= 1;
        }
        textField.value = textBeforeCursor + text + textAfterCursor;
        textField.setSelectionRange(cursor + 1, cursor + 1);
        if (text === '    ') textField.setSelectionRange(cursor + 4, cursor + 4);
    }
}

function createHeader() {
    const header = createDom('div', '', 'header')
    header.append(createDom('h1', title, 'header__text'));
    header.append(createDom('div', '', 'subheading'));
    body.append(header);
    const subheading = document.querySelector('.subheading');
    subheading.style.color = '#fff'

    subheading.textContent = 'For switching lang use Shift-Alt or Button below'
}

window.onload = () => {
    createHeader()
    body.append(textField)
    body.append(keyboard.createKey())
    document.addEventListener('keydown', (event) => {
        const button = document.querySelector(`[data-code=${event.code}]`);
        if (button) {
            button.classList.add('active');
            keyPress(event, button, event.code);
        }
    });
    document.addEventListener('keyup', (event) => {
        const button = document.querySelector(`[data-code=${event.code}]`);
        if (button) {
            button.classList.remove('active');
            if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
                keyboard.removeShift(event);
                keyboard.updateKeys(event);
            }
        }
    });
    document.querySelector('.keyboard').addEventListener('click', (event) => {
        if (event.target.closest('.key')) {
            const button = event.target.closest('.key');
            if (button.dataset.code === 'ShiftLeft'
                || button.dataset.code === 'ShiftRight') {
                keyboard.shift = !keyboard.shift;
                button.classList.toggle('active');
            }
            keyPress(event, button, button.dataset.code);
        }
    });
}

