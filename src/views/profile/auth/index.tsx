import { requestAccountAddress, waitForAccountAuth } from '@celo/dappkit';
import { RouteProp, useNavigation } from '@react-navigation/native';
import i18n, { supportedLanguages } from 'assets/i18n';
import { ethers } from 'ethers';
import * as Linking from 'expo-linking';
import { makeDeeplinkUrl } from 'helpers/index';
import { iptcColors } from 'styles/index';
import { setPushNotificationsToken } from 'helpers/redux/actions/ReduxActions';
import {
    STORAGE_USER_ADDRESS,
    STORAGE_USER_PHONE_NUMBER,
    STORAGE_USER_AUTH_TOKEN,
} from 'helpers/types';
import { welcomeUser } from 'helpers/index';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from 'react-redux';
import Api from 'services/api';
import { registerForPushNotifications } from 'services/pushNotifications';
import * as Device from 'expo-device';
import * as Localization from 'expo-localization';
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';
import config from '../../../../config';
import * as Sentry from 'sentry-expo';
import { analytics } from 'services/analytics';
import Button from 'components/core/Button';
import { Screens } from 'helpers/constants';

function Auth() {
    const store = useStore();
    const navigation = useNavigation();
    const [connecting, setConnecting] = useState(false);

    const login = async () => {
        const requestId = 'login';
        const dappName = 'impactmarket';
        const callback = makeDeeplinkUrl();
        setConnecting(true);

        const pushNotificationToken = await registerForPushNotifications();

        let userAddress = '';
        let dappkitResponse: any;
        try {
            requestAccountAddress({
                requestId,
                dappName,
                callback,
            });

            dappkitResponse = await waitForAccountAuth(requestId);
            userAddress = ethers.utils.getAddress(dappkitResponse.address);
        } catch (e) {
            Api.uploadError('', 'login', e);
            analytics('login', { device: Device.brand, success: 'false' });
            Sentry.captureException(e);
            Alert.alert(
                i18n.t('failure'),
                i18n.t('errorConnectToValora'),
                [{ text: i18n.t('close') }],
                { cancelable: false }
            );
            setConnecting(false);
            return;
        }

        let language = Localization.locale;
        if (language.includes('-')) {
            language = language.substr(0, language.indexOf('-'));
        } else if (language.includes('_')) {
            language = language.substr(0, language.indexOf('_'));
        }
        if (!supportedLanguages.includes(language)) {
            language = 'en';
        }

        const user = await Api.userAuth(
            userAddress,
            language,
            pushNotificationToken
        );
        if (user === undefined) {
            Api.uploadError('', 'login', {
                reason: '',
                message: 'undefined user',
            });
            analytics('login', { device: Device.brand, success: 'false' });
            Sentry.captureMessage(
                JSON.stringify({ action: 'login', details: 'undefined user' }),
                Sentry.Severity.Critical
            );
            Alert.alert(
                i18n.t('failure'),
                i18n.t('anErroHappenedTryAgain'),
                [{ text: i18n.t('close') }],
                { cancelable: false }
            );
            setConnecting(false);
            return;
        }
        try {
            await AsyncStorage.setItem(STORAGE_USER_AUTH_TOKEN, user.token);
            await AsyncStorage.setItem(STORAGE_USER_ADDRESS, userAddress);
            await AsyncStorage.setItem(
                STORAGE_USER_PHONE_NUMBER,
                dappkitResponse.phoneNumber
            );

            const unsubscribe = store.subscribe(() => {
                const state = store.getState();
                if (state.user.celoInfo.address.length > 0) {
                    unsubscribe();
                    setConnecting(false);
                    // navigation.goBack();
                    if (state.user.community.isBeneficiary) {
                        navigation.navigate(Screens.Beneficiary);
                    } else if (state.user.community.isManager) {
                        navigation.navigate(Screens.CommunityManager);
                    } else {
                        navigation.navigate(Screens.Communities);
                    }
                }
            });
            await welcomeUser(
                userAddress,
                dappkitResponse.phoneNumber,
                user,
                newKitFromWeb3(new Web3(config.jsonRpc)),
                store as any
            );
            store.dispatch(setPushNotificationsToken(pushNotificationToken));
            analytics('login', { device: Device.brand, success: 'true' });
        } catch (error) {
            Api.uploadError('', 'login', error);
            analytics('login', { device: Device.brand, success: 'false' });
            Sentry.captureMessage(
                JSON.stringify({
                    action: 'login',
                    details: `config user - ${error.message}`,
                }),
                Sentry.Severity.Critical
            );
            Alert.alert(
                i18n.t('failure'),
                i18n.t('anErroHappenedTryAgain'),
                [{ text: i18n.t('close') }],
                { cancelable: false }
            );
            setConnecting(false);
        }
    };

    const buttonStoreLink = () => {
        const androidURL =
            'https://play.google.com/store/apps/details?id=co.clabs.valora';
        const iosURL = 'https://apps.apple.com/app/id1520414263';
        if (Device.osName === 'Android') {
            return (
                <Button
                    modeType="gray"
                    bold={true}
                    style={{ width: '100%' }}
                    labelStyle={styles.buttomStoreText}
                    onPress={() => Linking.openURL(androidURL)}
                >
                    <Text style={{ color: 'black' }}>
                        {i18n.t('installValoraApp')}
                    </Text>
                </Button>
            );
        } else if (Device.osName === 'iOS') {
            return (
                <Button
                    modeType="gray"
                    bold={true}
                    style={{ width: '100%' }}
                    labelStyle={styles.buttomStoreText}
                    onPress={() => Linking.openURL(iosURL)}
                >
                    <Text style={{ color: 'black' }}>
                        {i18n.t('installValoraApp')}
                    </Text>
                </Button>
            );
        }
        return (
            <>
                <Button
                    modeType="gray"
                    bold={true}
                    style={{ width: '100%' }}
                    labelStyle={styles.buttomStoreText}
                    onPress={() => Linking.openURL(iosURL)}
                >
                    iOS
                </Button>
                <Button
                    modeType="gray"
                    bold={true}
                    style={{ width: '100%' }}
                    labelStyle={styles.buttomStoreText}
                    onPress={() => Linking.openURL(androidURL)}
                >
                    <Text style={{ color: 'black' }}>Android</Text>
                </Button>
            </>
        );
    };

    return (
        <View style={styles.mainView}>
            <Text style={styles.descriptionTop}>
                {i18n.t('toContinuePlease')}
            </Text>
            <Text style={styles.title}>{i18n.t('connectWithValora')}</Text>
            <Text style={styles.description}>{i18n.t('loginDescription')}</Text>
            <Text style={styles.stepText1}>{i18n.t('step1')}</Text>
            <Text style={styles.instructionText}>
                {i18n.t('createValoraAccount')}
            </Text>
            <View style={{ width: '100%', marginTop: 16 }}>
                {buttonStoreLink()}
            </View>
            <Text style={styles.stepText2}>{i18n.t('step2')}</Text>
            <Button
                modeType="green"
                bold={true}
                onPress={() => login()}
                loading={connecting}
                style={{
                    width: '100%',
                    marginTop: 16,
                }}
                labelStyle={styles.buttomConnectValoraText}
            >
                {i18n.t('connectWithValora')}
            </Button>
        </View>
    );
}

Auth.navigationOptions = ({ route }: { route: RouteProp<any, any> }) => {
    return {
        headerShown: false,
    };
};

export default Auth;

const styles = StyleSheet.create({
    mainView: {
        // flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'space-around',
        // alignItems: 'center',
        marginHorizontal: 32,
        marginVertical: 20,
    },
    buttomStoreText: {
        fontSize: 18,
        lineHeight: 22,
        letterSpacing: 0.3,
    },
    buttomConnectValoraText: {
        fontSize: 20,
        lineHeight: 24,
    },
    title: {
        fontFamily: 'Gelion-Bold',
        fontSize: 30,
        lineHeight: 31,
        letterSpacing: 0.7,
        textAlign: 'center',
        color: iptcColors.almostBlack,
        marginTop: 16,
    },
    descriptionTop: {
        fontFamily: 'Gelion-Regular',
        fontSize: 19,
        lineHeight: 19,
        textAlign: 'center',
        color: iptcColors.baliHai,
        marginTop: 16,
    },
    description: {
        fontFamily: 'Gelion-Regular',
        fontSize: 19,
        lineHeight: 23,
        textAlign: 'center',
        color: iptcColors.baliHai,
        marginTop: 27,
    },
    stepText1: {
        fontFamily: 'Gelion-Bold',
        fontSize: 19,
        lineHeight: 23,
        textAlign: 'center',
        color: iptcColors.nileBlue,
        marginTop: 73,
    },
    stepText2: {
        fontFamily: 'Gelion-Bold',
        fontSize: 19,
        lineHeight: 23,
        textAlign: 'center',
        color: iptcColors.nileBlue,
        marginTop: 40,
    },
    instructionText: {
        fontFamily: 'Gelion-Regular',
        fontSize: 19,
        lineHeight: 23,
        textAlign: 'center',
        color: iptcColors.nileBlue,
        marginTop: 8,
    },
});
