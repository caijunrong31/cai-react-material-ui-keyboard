/// <reference types="material-ui" />
/// <reference types="react" />
import * as React from 'react';
import { MuiTheme } from 'material-ui/styles';
export declare type KeyboardKeyPressHandler = (key: string) => void;
export interface KeyboardKeyProps {
    keyboardKey: string;
    onKeyPress: KeyboardKeyPressHandler;
    keyboardKeyWidth: number;
    keyboardKeyHeight: number;
    keyboardKeySymbolSize: number;
    disableEffects: boolean;
}
export interface KeyboardKeyContext {
    muiTheme: MuiTheme;
}
export declare class KeyboardKey extends React.Component<KeyboardKeyProps> {
    context: KeyboardKeyContext;
    private static specialIcons;
    static propTypes: React.ValidationMap<KeyboardKeyProps>;
    static contextTypes: any;
    private onTouchTap();
    constructor(props: KeyboardKeyProps, context: KeyboardKeyContext);
    shouldComponentUpdate(props: KeyboardKeyProps): boolean;
    render(): JSX.Element;
}
export default KeyboardKey;
