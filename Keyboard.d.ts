/// <reference types="react" />
/// <reference types="material-ui" />
import * as React from 'react';
import { KeyboardKeyProps } from './KeyboardKey';
import { KeyboardLayout } from './layouts';
import { MuiTheme } from 'material-ui/styles';
export { KeyboardLayout };
export declare type RequestCloseHandler = () => void;
export declare type InputHandler = (input: string) => void;
export interface TextFieldRequiredProps {
    style?: React.CSSProperties;
    readOnly: boolean;
    value: string;
    onFocus?: React.FocusEventHandler<string>;
}
export interface TextFieldAccessedProps extends TextFieldRequiredProps {
    rows?: number;
    floatingLabelText?: string;
}
export declare type TextFieldElement = React.ReactElement<TextFieldRequiredProps>;
export declare type CreatableTextField = React.ComponentClass<TextFieldRequiredProps>;
export declare type KeyboardRow = React.ReactElement<void>;
export declare type KeyboardRowKey = React.ReactElement<KeyboardKeyProps>;
export interface KeyboardProps {
    open?: boolean;
    automatic?: boolean;
    layouts: Array<KeyboardLayout>;
    keyboardKeyWidth?: number;
    keyboardKeyHeight?: number;
    keyboardKeySymbolSize?: number;
    textField: TextFieldElement;
    onRequestClose?: RequestCloseHandler;
    onInput?: InputHandler;
    onInputValueChange?: InputHandler;
    correctorName?: string;
    corrector?: Function;
    disableEffects?: boolean;
}
export interface KeyboardState {
    value?: string;
    layout?: number;
    capsLock?: boolean;
    open?: boolean;
}
export interface KeyboardContext {
    muiTheme?: MuiTheme;
}
export declare type AutomaitcOpenPredicate = () => boolean;
export declare class Keyboard extends React.Component<KeyboardProps, KeyboardState> {
    private static calculatedTextFieldHeight(props);
    static getSupportedSpecialKeys(): Array<string>;
    private static supportedSpecialKeys;
    private static overwrittenProps;
    private static noStyleHeight;
    static propTypes: React.ValidationMap<KeyboardProps>;
    static contextTypes: any;
    static automaitcOpenPredicate: AutomaitcOpenPredicate;
    context: KeyboardContext;
    private corrector;
    private onInputValueChange();
    private setValue(value);
    private syncValue(value);
    private setAutomaitcOpen(open);
    private requestClose();
    private onFocus();
    private onKeyboard(key);
    private onKeyDown(event);
    private onResize();
    makeCorrection(value: string): void;
    constructor(props: KeyboardProps, context: KeyboardContext);
    componentWillMount(): void;
    componentDidMount(): void;
    shouldComponentUpdate(props: KeyboardProps, state: KeyboardState): boolean;
    componentWillReceiveProps(props: KeyboardProps): void;
    componentDidUpdate(props: KeyboardProps, state: KeyboardState): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default Keyboard;
