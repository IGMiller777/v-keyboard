
import keyData from "./keys.js";


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

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

            // Add attributes/classes
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









// аааа


const createDomNode = (element, innerHTML, ...classes) => {
    const node = document.createElement(element)
    node.classList.add(...classes)
    node.innerHTML = innerHTML;
    return node
}


// const testCapsLock = (event) => {
//     if (event.getModifierState('CapsLock')) {
//         document.querySelector('.caps_icon').classList.add('caps_on')
//     }
//     else {
//         document.querySelector('.caps_icon').classList.remove('caps_on')
//     }
// }



class KeyBoard {
    constructor() {
        this.lang = 'en';
        this.caps = 'off';
        this.shift = false;

        this.alt = false
    }

    //CREATE KEYS

    generateKeyBoard() {
        const keyboard = createDomNode('div', '', 'keyboard');
        const container = createDomNode('div', '', 'keyboard-container');
        this.languageCheck();
        for (let i = 0; i < keyData.length; i += 1) {
            const row = createDomNode('div', '', 'keyboard-row');
            keyData[i].forEach((e) => {
                const keyLabel = (e.key.ru && e.key.en) ? e.key[this.lang] : e.key;
                const key = createDomNode('div', keyLabel, 'key');
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

    // CHECKING LANG \

    languageCheck() {
        if (localStorage.getItem('lang')) {
            this.lang = localStorage.getItem('lang')
        } else {
            localStorage.setItem('lang', this.lang)
        }
    }

    // WITH SHIFT

    languageChange(event) {
        if (this.lang === 'en') {
            this.lang = 'ru'
        }
        else {
            this.lang = 'en'
        }
        localStorage.setItem('lang', this.lang)
        this.updateKeyboard(event)
    }

    // CAPS 
    capsLockIcon() {
        if (this.caps === 'on') {
            document.querySelector('.caps_icon').classList.add('caps_on');
        } else {
            document.querySelector('.caps_icon').classList.remove('caps_on');
        }
    }

    changeCapsLock(event) {
        if (this.caps === 'on') {
            this.caps = 'off'
        } else {
            this.caps = 'on'
        }
        this.capsLockIcon()
        this.updateKeyboard(event)
    }

    // UPDATING 

    updateKeyboard(event) {
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

    removeShift(event) {
        if (this.shift) {
            this.shift = !this.shift;
            document.querySelector('.key_leftshift').classList.remove('active');
            document.querySelector('.key_rightshift').classList.remove('active');
            this.updateKeyboard(event);
        }
    }


    logF() {
        console.log('BIIIIII');
    }


}

const title = 'Keyboard'
const { body } = document
const textField = createDomNode('textarea', '', 'textfield')
const keyboard = new KeyBoard()

const keyPress = (event, button, code) => {
    let text = ''
    let cursor = textField.selectionStart;
    event.preventDefault()
    textField.focus()

    if (code === 'CapsLock') {
        keyboard.changeCapsLock(event)
    }
    if ((code === 'AltLeft' && (event.shiftKey || keyboard.shift))
        || (code === 'AltRight' && (event.shiftKey || keyboard.shift))
        || (code === 'ShiftLeft' && event.altKey)
        || (code === 'ShiftRight' && event.altKey)
        || (code === 'Lang')) {
        keyboard.languageChange(event)
        keyboard.removeShift(event)
    }

    if (code === 'ShiftLeft' || code === 'ShiftRight') {
        keyboard.updateKeyboard(event);
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

//  CREATING
const createHeader = () => {
    const header = createDomNode('div', '', 'header')
    header.append(createDomNode('h1', title, 'header__text'));
    header.append(createDomNode('div', '', 'subheading'));
    body.append(header);
    const subheading = document.querySelector('.subheading');
    subheading.textContent = 'For switching lang use Shift-Alt or Button below'
}

window.onload = () => {
    createHeader()
    body.append(textField)

    body.append(keyboard.generateKeyBoard())


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
                keyboard.updateKeyboard(event);
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





