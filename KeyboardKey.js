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
var FlatButton_1 = require("material-ui/FlatButton");
var backspace_1 = require("material-ui/svg-icons/content/backspace");
var keyboard_return_1 = require("material-ui/svg-icons/hardware/keyboard-return");
var exit_to_app_1 = require("material-ui/svg-icons/action/exit-to-app");
var keyboard_1 = require("material-ui/svg-icons/hardware/keyboard");
var keyboard_capslock_1 = require("material-ui/svg-icons/hardware/keyboard-capslock");
var space_bar_1 = require("material-ui/svg-icons/editor/space-bar");
var warning_1 = require("material-ui/svg-icons/alert/warning");
var constants;
(function (constants) {
    constants.one = 1;
    constants.spacebar = ' ';
    constants.none = 'none';
    constants.notFound = 'notFound';
    constants.boolTrue = true;
    constants.boolFalse = false;
})(constants || (constants = {}));
var KeyboardKey = (function (_super) {
    __extends(KeyboardKey, _super);
    function KeyboardKey(props, context) {
        var _this = _super.call(this, props) || this;
        _this.context = context;
        return _this;
    }
    KeyboardKey.prototype.onClick = function () {
        var _a = this.props, onKeyPress = _a.onKeyPress, keyboardKey = _a.keyboardKey;
        if ((keyboardKey.length === 1) || KeyboardKey.specialIcons.hasOwnProperty(keyboardKey)) {
            onKeyPress(keyboardKey);
        }
    };
    KeyboardKey.prototype.shouldComponentUpdate = function (props) {
        if (this.props.keyboardKey !== props.keyboardKey) {
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
        if (this.props.onKeyPress !== props.onKeyPress) {
            return constants.boolTrue;
        }
        if (this.props.disableEffects !== props.disableEffects) {
            return constants.boolTrue;
        }
        return constants.boolFalse;
    };
    KeyboardKey.prototype.render = function () {
        var _a = this.props, key = _a.keyboardKey, height = _a.keyboardKeyHeight, width = _a.keyboardKeyWidth, size = _a.keyboardKeySymbolSize, disableEffects = _a.disableEffects;
        var flatButtonProps = {
            style: {
                height: height,
                width: width,
                minWidth: width
            },
            primary: constants.boolTrue,
            onClick: this.onClick,
            disableFocusRipple: disableEffects,
            disableKeyboardFocus: disableEffects,
            disableTouchRipple: disableEffects
        };
        if (disableEffects) {
            flatButtonProps.hoverColor = this.context.muiTheme.flatButton.color;
        }
        if ((key.length <= constants.one) && (key !== constants.spacebar)) {
            if (key.length) {
                flatButtonProps.label = key;
            }
            else {
                flatButtonProps.disabled = constants.boolTrue;
                flatButtonProps.label = constants.spacebar;
            }
            flatButtonProps.labelStyle = { fontSize: size, textTransform: constants.none };
        }
        else {
            var specialIcons = KeyboardKey.specialIcons;
            var icon = specialIcons[specialIcons.hasOwnProperty(key) ? key : constants.notFound];
            flatButtonProps.icon = React.createElement(icon, { style: { width: size, height: size } });
        }
        return React.createElement(FlatButton_1.default, flatButtonProps);
    };
    KeyboardKey.specialIcons = {
        'Enter': keyboard_return_1.default,
        'Backspace': backspace_1.default,
        'Escape': exit_to_app_1.default,
        'CapsLock': keyboard_capslock_1.default,
        'Keyboard': keyboard_1.default,
        ' ': space_bar_1.default,
        'notFound': warning_1.default
    };
    KeyboardKey.propTypes = {
        keyboardKey: PropTypes.string.isRequired,
        onKeyPress: PropTypes.func.isRequired,
        keyboardKeyWidth: PropTypes.number.isRequired,
        keyboardKeyHeight: PropTypes.number.isRequired,
        keyboardKeySymbolSize: PropTypes.number.isRequired,
    };
    KeyboardKey.contextTypes = { muiTheme: PropTypes.object.isRequired };
    __decorate([
        bind_decorator_1.default
    ], KeyboardKey.prototype, "onClick", null);
    return KeyboardKey;
}(React.Component));
exports.KeyboardKey = KeyboardKey;
;
exports.default = KeyboardKey;
