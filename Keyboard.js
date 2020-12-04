"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PropTypes = require("prop-types");
var bind_decorator_1 = require("bind-decorator");
var Dialog_1 = require("material-ui/Dialog");
var MuiThemeProvider_1 = require("material-ui/styles/MuiThemeProvider");
var KeyboardKey_1 = require("./KeyboardKey");
var layouts_1 = require("./layouts");
var getMuiTheme_1 = require("material-ui/styles/getMuiTheme");
var event_listener_service_1 = require("event-listener-service");
var ActiveElement_1 = require("./ActiveElement");
var objectAssign = require("object-assign");
var deepEqual = require("deep-equal");
;
var constants;
(function (constants) {
    constants.minusOne = -1;
    constants.zero = 0;
    constants.one = 1;
    constants.two = 2;
    constants.three = 3;
    constants.four = 4;
    constants.sixteen = 16;
    constants.twentyFour = 24;
    constants.fourtyEight = 48;
    constants.seventyTwo = 72;
    constants.emptyString = '';
    constants.space = ' ';
    constants.keydown = 'keydown';
    constants.resize = 'resize';
    constants.input = 'input';
    constants.fullWidth = '100%';
    constants.typeofString = 'string';
    constants.typeofNumber = 'number';
    constants.typeofFunction = 'function';
    constants.boolTrue = true;
    constants.boolFalse = false;
    constants.isSpaceBar = /^\ +$/;
    constants.strictCompare = { strict: constants.boolTrue };
})(constants || (constants = {}));
function allwaysTruePredicate() {
    return constants.boolTrue;
}
event_listener_service_1.default.setImplementation({
    addListener: window.addEventListener.bind(window),
    removeListener: window.removeEventListener.bind(window)
});
ActiveElement_1.default.isInput = function () { return document.activeElement.tagName.toLowerCase() === constants.input; };
ActiveElement_1.default.blur = function () { return document.activeElement.blur(); };
var Keyboard = (function (_super) {
    __extends(Keyboard, _super);
    function Keyboard(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            value: constants.emptyString,
            layout: constants.zero,
            capsLock: constants.boolFalse,
            open: constants.boolFalse
        };
        _this.context = context;
        return _this;
    }
    Keyboard.calculatedTextFieldHeight = function (props) {
        var rows = props.rows, floatingLabelText = props.floatingLabelText;
        var normalHeight = floatingLabelText ? constants.seventyTwo : constants.fourtyEight;
        return (rows ? ((rows - constants.one) * constants.twentyFour) : constants.zero) + normalHeight;
    };
    Keyboard.getSupportedSpecialKeys = function () {
        return Keyboard.supportedSpecialKeys;
    };
    Keyboard.prototype.onInputValueChange = function () {
        if (typeof this.props.onInputValueChange === constants.typeofFunction) {
            this.props.onInputValueChange(this.state.value);
        }
    };
    Keyboard.prototype.setValue = function (value) {
        if (this.state.value !== value) {
            this.setState({ value: value }, this.onInputValueChange);
        }
    };
    Keyboard.prototype.syncValue = function (value) {
        if (value !== this.state.value) {
            this.setValue(value);
        }
    };
    Keyboard.prototype.setAutomaitcOpen = function (open) {
        this.setState({ open: open });
    };
    Keyboard.prototype.requestClose = function () {
        var _a = this.props, automatic = _a.automatic, onRequestClose = _a.onRequestClose;
        if (automatic) {
            this.setAutomaitcOpen(constants.boolFalse);
        }
        else if (onRequestClose) {
            onRequestClose();
        }
    };
    Keyboard.prototype.onFocus = function () {
        if (Keyboard.automaitcOpenPredicate()) {
            this.setAutomaitcOpen(constants.boolTrue);
        }
    };
    Keyboard.prototype.onKeyboard = function (key) {
        var supportedSpecialKeys = Keyboard.supportedSpecialKeys;
        var _a = this, props = _a.props, state = _a.state;
        var onInput = props.onInput, propsLayout = props.layouts;
        var capsLock = state.capsLock, layout = state.layout;
        var value = state.value+'';
        switch (key) {
            case supportedSpecialKeys[constants.zero]:
                if (onInput) {
                    onInput(value);
                }
                return this.requestClose();
            case supportedSpecialKeys[constants.one]:
                return this.setValue(value.substring(constants.zero, value.length - constants.one));
            case supportedSpecialKeys[constants.two]:
                return this.requestClose();
            case supportedSpecialKeys[constants.three]: return this.setState({ capsLock: !capsLock });
            case supportedSpecialKeys[constants.four]:
                return this.setState({
                    layout: (layout === (propsLayout.length - constants.one))
                        ? constants.zero : layout + constants.one
                });
            default: return this.setValue(value + key);
        }
    };
    Keyboard.prototype.onKeyDown = function (event) {
        var key = event.key;
        event.stopImmediatePropagation();
        event.stopPropagation();
        if ((key.length === constants.one) || (Keyboard.getSupportedSpecialKeys().indexOf(key) !== constants.minusOne)) {
            event.preventDefault();
            this.onKeyboard(key);
        }
    };
    Keyboard.prototype.onResize = function () {
        this.forceUpdate();
    };
    Keyboard.prototype.makeCorrection = function (value) {
        this.setValue(value);
    };
    Keyboard.prototype.componentWillMount = function () {
        var corrector = this.props.corrector;
        if (typeof corrector === constants.typeofFunction) {
            this.corrector = corrector.bind(this);
        }
    };
    Keyboard.prototype.componentDidMount = function () {
        event_listener_service_1.default.addListener(constants.resize, this.onResize, constants.boolFalse);
        this.syncValue(this.props.textField.props.value);
    };
    Keyboard.prototype.shouldComponentUpdate = function (props, state) {
        var textField = props.textField;
        var thisTextField = this.props.textField;
        if (this.state.value !== state.value) {
            return constants.boolTrue;
        }
        if (this.state.open !== state.open) {
            return constants.boolTrue;
        }
        if (this.state.capsLock !== state.capsLock) {
            return constants.boolTrue;
        }
        if (this.state.layout !== state.layout) {
            return constants.boolTrue;
        }
        if (this.props.open !== props.open) {
            return constants.boolTrue;
        }
        if (this.props.keyboardKeyHeight !== props.keyboardKeyHeight) {
            return constants.boolTrue;
        }
        if (this.props.keyboardKeySymbolSize !== props.keyboardKeySymbolSize) {
            return constants.boolTrue;
        }
        if (this.props.keyboardKeyWidth !== props.keyboardKeyWidth) {
            return constants.boolTrue;
        }
        if (this.props.automatic !== props.automatic) {
            return constants.boolTrue;
        }
        if (this.props.disableEffects !== props.disableEffects) {
            return constants.boolTrue;
        }
        if (this.props.correctorName !== props.correctorName) {
            return constants.boolTrue;
        }
        if (this.props.corrector !== props.corrector) {
            return constants.boolTrue;
        }
        if (this.props.onInput !== props.onInput) {
            return constants.boolTrue;
        }
        if (this.props.onRequestClose !== props.onRequestClose) {
            return constants.boolTrue;
        }
        if (thisTextField.type !== textField.type) {
            return constants.boolTrue;
        }
        if (!deepEqual(this.props.layouts, props.layouts, constants.strictCompare)) {
            return constants.boolTrue;
        }
        if (!deepEqual(thisTextField.props, textField.props, constants.strictCompare)) {
            return constants.boolTrue;
        }
        return constants.boolFalse;
    };
    Keyboard.prototype.componentWillReceiveProps = function (props) {
        this.syncValue(props.textField.props.value);
        if (this.props.corrector !== props.corrector) {
            this.corrector = props.corrector.bind(this);
        }
    };
    Keyboard.prototype.componentDidUpdate = function (props, state) {
        var automatic = this.props.automatic;
        var open = automatic ? this.state.open : this.props.open;
        var prev = automatic ? state.open : props.open;
        if (open !== prev) {
            if (open) {
                if (ActiveElement_1.default.isInput()) {
                    ActiveElement_1.default.blur();
                }
                event_listener_service_1.default.addListener(constants.keydown, this.onKeyDown, constants.boolTrue);
            }
            else {
                event_listener_service_1.default.removeListener(constants.keydown, this.onKeyDown, constants.boolTrue);
            }
        }
    };
    Keyboard.prototype.componentWillUnmount = function () {
        event_listener_service_1.default.removeListener(constants.resize, this.onResize, constants.boolFalse);
    };
    Keyboard.prototype.render = function () {
        var _a = this, props = _a.props, state = _a.state, context = _a.context;
        var textField = props.textField, layouts = props.layouts, keyboardKeyHeight = props.keyboardKeyHeight, keyboardKeyWidth = props.keyboardKeyWidth, keyboardKeySymbolSize = props.keyboardKeySymbolSize, automatic = props.automatic, correctorName = props.correctorName, disableEffects = props.disableEffects;
        var value = state.value, stateLayout = state.layout, capsLock = state.capsLock;
        var muiTheme = context.muiTheme;
        var open = automatic ? state.open : (props.open ? constants.boolTrue : constants.boolFalse);
        var theme = muiTheme ? muiTheme : getMuiTheme_1.default();
        var styles = textField.props.style;
        var keyboardFieldProps = objectAssign({}, textField.props);
        var inputTextFieldProps = objectAssign({}, textField.props, { readOnly: open });
        if (automatic || open) {
            inputTextFieldProps.onFocus = automatic ? this.onFocus : undefined;
        }
        keyboardFieldProps.style = objectAssign({}, styles);
        keyboardFieldProps.style.minWidth = constants.fullWidth;
        keyboardFieldProps.style.width = constants.fullWidth;
        keyboardFieldProps.style.maxWidth = constants.fullWidth;
        keyboardFieldProps.readOnly = constants.boolTrue;
        keyboardFieldProps.value = value;
        if (typeof correctorName === constants.typeofString) {
            keyboardFieldProps[correctorName] = this.corrector;
        }
        var overwrittenProps = Keyboard.overwrittenProps;
        var overwrittenPropsLength = overwrittenProps.length;
        var propIndex;
        var prop;
        for (propIndex = constants.zero; propIndex < overwrittenPropsLength; ++propIndex) {
            prop = overwrittenProps[propIndex];
            if (keyboardFieldProps.hasOwnProperty(prop)) {
                keyboardFieldProps[prop] = undefined;
            }
        }
        var inputTextField = React.cloneElement(textField, inputTextFieldProps);
        var keyboardTextField = React.createElement(textField.type, keyboardFieldProps);
        var keyboardLayout = layouts_1.kyeboardCapsLockLayout(layouts[stateLayout], capsLock);
        var keyboardRowLength = keyboardLayout.length;
        var keyboardRowLengths = [];
        var rowIndex;
        var keyIndex;
        var spacebar;
        var rowLength;
        var row;
        var key;
        for (rowIndex = constants.zero; rowIndex < keyboardRowLength; ++rowIndex) {
            spacebar = constants.one;
            row = keyboardLayout[rowIndex];
            rowLength = row.length;
            for (keyIndex = constants.zero; keyIndex < rowLength; ++keyIndex) {
                key = row[keyIndex];
                if (key.match(constants.isSpaceBar)) {
                    spacebar = key.length;
                }
            }
            keyboardRowLengths.push(rowLength + spacebar - constants.one);
        }
        var maxKeyboardRowLength = Math.max.apply(Math, keyboardRowLengths);
        var keyHeight = typeof keyboardKeyHeight === constants.typeofNumber ? keyboardKeyHeight : theme.button.height;
        var keyWidth = typeof keyboardKeyWidth === constants.typeofNumber ? keyboardKeyWidth : theme.button.minWidth;
        var keySymbolSize = typeof keyboardKeySymbolSize === constants.typeofNumber ? keyboardKeySymbolSize : theme.flatButton.fontSize;
        var _b = theme.baseTheme.spacing, desktopGutter = _b.desktopGutter, desktopKeylineIncrement = _b.desktopKeylineIncrement;
        var innerHeight = window.innerHeight, innerWidth = window.innerWidth;
        var _c = (styles ? styles : Keyboard.noStyleHeight), minHeight = _c.minHeight, height = _c.height, maxHeight = _c.maxHeight;
        var dialogGutter = constants.two * desktopGutter;
        var styleHeight = minHeight ? minHeight : (height ? height : (maxHeight ? maxHeight : constants.zero));
        var textFieldHeight = styleHeight > constants.zero ? styleHeight : Keyboard.calculatedTextFieldHeight(inputTextFieldProps);
        var transformTop = desktopKeylineIncrement;
        var dialogWidth = (maxKeyboardRowLength * keyWidth) + dialogGutter;
        var dialogHeight = (keyboardRowLength * keyHeight) + textFieldHeight + dialogGutter;
        var maxDialogHeight = innerHeight - constants.sixteen;
        var dialogSpacingTop = maxDialogHeight - dialogHeight;
        var overwriteWidth = dialogWidth > innerWidth;
        var overwriteHeight = dialogSpacingTop < transformTop;
        if (overwriteWidth || overwriteHeight) {
            if (overwriteWidth) {
                dialogWidth = innerWidth;
                keyWidth = (innerWidth - dialogGutter) / maxKeyboardRowLength;
            }
            if (overwriteHeight) {
                if (dialogSpacingTop >= constants.zero) {
                    transformTop = dialogSpacingTop;
                }
                else {
                    transformTop = constants.zero;
                    dialogHeight = maxDialogHeight;
                    keyHeight = (dialogHeight - textFieldHeight - dialogGutter) / keyboardRowLength;
                }
            }
            var smallerSymbolSize = (keyHeight < keyWidth ? keyHeight : keyWidth) - constants.four;
            if (smallerSymbolSize < keySymbolSize) {
                keySymbolSize = smallerSymbolSize;
            }
        }
        var dialogContentStyle = {
            width: dialogWidth,
            maxWidth: innerWidth,
            height: dialogHeight,
            maxHeight: maxDialogHeight,
            transform: "translate(0, " + transformTop + "px)"
        };
        var keyboardRows = [];
        var keyboardRowKeys;
        var notSpacebar;
        for (var rowIndex_1 = constants.zero; rowIndex_1 < keyboardRowLength; ++rowIndex_1) {
            keyboardRowKeys = [];
            row = keyboardLayout[rowIndex_1];
            rowLength = row.length;
            for (keyIndex = constants.zero; keyIndex < rowLength; ++keyIndex) {
                key = row[keyIndex];
                notSpacebar = key.match(constants.isSpaceBar) === null;
                keyboardRowKeys.push(React.createElement(KeyboardKey_1.KeyboardKey, { keyboardKey: notSpacebar ? key : constants.space, key: rowIndex_1 + "." + keyIndex + "." + key, onKeyPress: this.onKeyboard, keyboardKeyHeight: keyHeight, keyboardKeyWidth: keyWidth * (notSpacebar ? constants.one : key.length), keyboardKeySymbolSize: keySymbolSize, disableEffects: disableEffects ? constants.boolTrue : constants.boolFalse }));
            }
            keyboardRows.push(React.createElement("div", { key: rowIndex_1 }, keyboardRowKeys));
        }
        var keyboard = (React.createElement("div", { style: styles },
            inputTextField,
            React.createElement(Dialog_1.default, { open: open, modal: true, autoDetectWindowHeight: constants.boolFalse, contentStyle: dialogContentStyle },
                React.createElement("div", null,
                    keyboardTextField,
                    keyboardRows))));
        return muiTheme ? keyboard : React.createElement(MuiThemeProvider_1.default, null, keyboard);
    };
    Keyboard.supportedSpecialKeys = ['Enter', 'Backspace', 'Escape', 'CapsLock', 'Keyboard'];
    Keyboard.overwrittenProps = ['onChange', 'onFocus', 'onBlur', 'onKeyUp', 'onKeyDown', 'onKeyPress'];
    Keyboard.noStyleHeight = {
        minHeight: constants.zero,
        height: constants.zero,
        maxHeight: constants.zero
    };
    Keyboard.propTypes = {
        open: PropTypes.bool,
        automatic: PropTypes.bool,
        layouts: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))).isRequired,
        keyboardKeyWidth: PropTypes.number,
        keyboardKeyHeight: PropTypes.number,
        keyboardKeySymbolSize: PropTypes.number,
        textField: PropTypes.element.isRequired,
        onRequestClose: PropTypes.func,
        onInput: PropTypes.func,
        onInputValueChange: PropTypes.func,
        correctorName: PropTypes.string,
        corrector: PropTypes.func,
        disableEffects: PropTypes.bool
    };
    Keyboard.contextTypes = { muiTheme: PropTypes.object };
    Keyboard.automaitcOpenPredicate = allwaysTruePredicate;
    __decorate([
        bind_decorator_1.default
    ], Keyboard.prototype, "onInputValueChange", null);
    __decorate([
        bind_decorator_1.default
    ], Keyboard.prototype, "onFocus", null);
    __decorate([
        bind_decorator_1.default
    ], Keyboard.prototype, "onKeyboard", null);
    __decorate([
        bind_decorator_1.default
    ], Keyboard.prototype, "onKeyDown", null);
    __decorate([
        bind_decorator_1.default
    ], Keyboard.prototype, "onResize", null);
    return Keyboard;
}(React.Component));
exports.Keyboard = Keyboard;
;
exports.default = Keyboard;
