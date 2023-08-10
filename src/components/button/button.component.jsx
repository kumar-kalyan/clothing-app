import { BaseButton, GoogleSignInButton, InvertedButton } from './button.styles'

// export const BUTTON_TYPE_CLASSES = {
//     base: 'base',
//     google: 'google-sign-in',
//     inverted: 'inverted'
// }

// const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => (
//     {
//         [BUTTON_TYPE_CLASSES.base]: BaseButton,
//         [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
//         [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,

//     }[buttonType]
// )
// Returns appropriate button styles 
const getButtonStyle = (buttonType) => {
    switch (buttonType) {
        case 'google':
            return GoogleSignInButton;
            break;
        case 'inverted':
            return InvertedButton;
            break;
        default:
            return BaseButton
    }
}
const Button = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getButtonStyle(buttonType)
    return (<CustomButton  {...otherProps}>
        {children}
    </CustomButton>)
}
export default Button