import {
    Dimensions,
    Platform,
    AsyncStorage
} from 'react-native';

export const FIREBASEURL = `https://sellitapp-9f3b6.firebaseio.com`;
export const APIKEY = `AIzaSyCb6yXpvYtu3A2G_oYE7fx6Wy-pnuTr-uw`;
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`
export const SIGNIN= `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`


export const getOrientation = (value) => {
    return Dimensions.get("window").height > value ? "portrait" : "landscape";
}

export const setOrientationListener = (cb) => {
    return Dimensions.addEventListener("change",cb)
}

export const removeOrientationListener = () => {
    return Dimensions.removeEventListener("change");
}

export const getPlatform = () => {
    if(Platform.OS === 'ios'){
        return "ios";
    }else {
        return "android";
    }
}

export const navigatorDrawer = (event, $this) => {
    if(event.type === 'NavBarButtonPress' && event.id === "DrawerButton"){
        $this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true
        })
    }
}

export const navigatorDeepLink = (event, $this) => {
    if(event.type === 'DeepLink'){
        $this.props.navigator.toggleDrawer({
            side:'left',
            animated: true
        });

        if(event.payload.typeLink === 'tab'){
            $this.props.navigator.switchToTab({
                tabIndex: event.payload.indexLink
            });
        } else {
            $this.props.navigator.showModal({
                screen: event.link,
                animationType: 'slide-horizontal',
                navigatorStyle:{
                    navBarBackgroundColor: '#00ADA9',
                    screenBackgroundColor: '#ffffff'
                },
                backButtonHidden: false
            })
        }
    }
}

export const getTokens = (cb) => {
    AsyncStorage.multiGet([
        '@sellitApp@token',
        '@sellitApp@refreshToken',
        '@sellitApp@expireToken',
        '@sellitApp@uid'
    ]).then((value)=>{
        cb(value)
    })
}

export const setTokens = (values, cb) => {
    const dateNow = new Date();
    const expiration = dateNow.getTime() + (3600 * 1000);

    AsyncStorage.multiSet([
        ['@sellitApp@token', values.token],
        ['@sellitApp@refreshToken', values.refToken],
        ['@sellitApp@expireToken',expiration.toString()],
        ['@sellitApp@uid', values.uid]
    ]).then( response => {
        cb();
    })
}