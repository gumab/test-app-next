import {
    isDesktop,
    isMobileOnly,
    isAndroid,
    isIOS,
    isWinPhone,
    deviceDetect,
    isMobileSafari,
} from 'react-device-detect';
import {checkPlatformInterface, OS} from "./check-app-interface";


export const PC = 'pc';
export const MOBILE_WEB = 'mobileWeb';
export const WEBVIEW = 'webview';

export const isPC = isDesktop;
export const isMobileWeb = isMobileOnly;
export const isAos = isAndroid;
export const isIos = isIOS;
export const isMobileDevice = isAos || isIos || isWinPhone;

export const getAppVersion = (): string => {
    const texts = window.navigator.userAgent.match(/Kurly\/(\d+\.\d+\.\d+)/);
    if (!texts) {
        return '';
    }

    return texts[1];
};

const checkAndroidInterface = checkPlatformInterface(OS.ANDROID);
const checkIosInterface = checkPlatformInterface(OS.IOS);

export const isWebview = () =>
    typeof window === 'object' &&
    (!!getAppVersion() || !!checkAndroidInterface('postMessage') || !!checkIosInterface('action'));

export const isPaymentWebview = () =>
    isWebview() || !!checkAndroidInterface('checkoutResult') || !!checkIosInterface('checkoutResult');

export const getDevice = () => {
    const device = {
        [PC]: isPC,
        [MOBILE_WEB]: isMobileWeb,
        [WEBVIEW]: isWebview(),
    };
    type DeviceKey = keyof typeof device;

    const deviceKeys = Object.keys(device) as DeviceKey[];
    return deviceKeys.find((key) => device[key]) ?? PC;
};

export const kakaoSignupGetDevice = () => {
    const device = {
        I: isIos,
        A: isAos,
        MW: isMobileWeb,
        PC: isPC,
    };
    type DeviceKey = keyof typeof device;

    const deviceKeys = Object.keys(device) as DeviceKey[];
    return deviceKeys.find((key) => device[key]) ?? 'MW';
};

export const getReplaceUrl = (url: string) => {
    return url.replace(/(\/m\/)/g, '/');
};

export const checkSafari = () => {
    try {
        const {browserName} = deviceDetect(window.navigator.userAgent);
        return browserName?.toLowerCase() === 'safari' || isMobileSafari;
    } catch (error) {
        return false;
    }
};
