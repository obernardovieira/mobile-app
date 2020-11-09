import { useNavigation } from '@react-navigation/native';
import i18n from 'assets/i18n';
import Card from 'components/core/Card';
import Header from 'components/Header';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { decrypt, encrypt } from 'helpers/encryption';
import {
    amountToCurrency,
    getCountryFromPhoneNumber,
    getCurrencySymbol,
    humanifyNumber,
    iptcColors,
} from 'helpers/index';
import {
    resetUserApp,
    resetNetworkContractsApp,
    setUserInfo,
    setUserExchangeRate,
    setUserIsBeneficiary,
    setUserIsCommunityManager,
    setUserLanguage,
    setUserWalletBalance,
} from 'helpers/redux/actions/ReduxActions';
import {
    CONSENT_ANALYTICS,
    IRootState,
    IStoreCombinedActionsTypes,
    IStoreCombinedState,
    STORAGE_USER_FIRST_TIME,
} from 'helpers/types';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { AsyncStorage, RefreshControl, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
    Button,
    Paragraph,
    Portal,
    Dialog,
    RadioButton,
    Text,
    Headline,
} from 'react-native-paper';
import { batch, useDispatch, useSelector, useStore } from 'react-redux';
import Api from 'services/api';
import Login from './Login';
import * as Linking from 'expo-linking';
import Input from 'components/core/Input';
import Select from 'components/core/Select';
import { BigNumber } from 'bignumber.js';

function ProfileScreen() {
    const store = useStore<IStoreCombinedState, IStoreCombinedActionsTypes>();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state: IRootState) => state.user.user);
    const userWallet = useSelector((state: IRootState) => state.user.celoInfo);
    const app = useSelector((state: IRootState) => state.app);

    const rates = app.exchangeRates;

    const [isConsentAnalytics, setIsConsentAnalytics] = React.useState(true);
    const [name, setName] = useState('');
    const [logingOut, setLogingOut] = useState(false);
    const [currency, setCurrency] = useState('usd');
    const [language, setLanguage] = useState('en');
    const [isDialogCurrencyOpen, setIsDialogCurrencyOpen] = useState(false);
    const [isDialogLanguageOpen, setIsDialogLanguageOpen] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (userWallet.address.length > 0) {
            if (user.name !== null && user.name.length > 0) {
                setName(decrypt(user.name));
            }
            setCurrency(user.currency);
            setLanguage(user.language);
            AsyncStorage.getItem(CONSENT_ANALYTICS).then((c) =>
                setIsConsentAnalytics(c === null || c === 'true' ? true : false)
            );
        }
    }, [userWallet]);

    const onRefresh = () => {
        const updateBalance = async () => {
            const stableToken = await app.kit.contracts.getStableToken();
            const cUSDBalanceBig = await stableToken.balanceOf(
                userWallet.address
            );
            const balance = new BigNumber(cUSDBalanceBig.toString());
            dispatch(setUserWalletBalance(balance.toString()));
            setRefreshing(false);
        };
        updateBalance();
    };

    const onToggleSwitch = () => {
        AsyncStorage.setItem(CONSENT_ANALYTICS, `${!isConsentAnalytics}`);
        setIsConsentAnalytics(!isConsentAnalytics);
    };

    const handleLogout = async () => {
        setLogingOut(true);
        await AsyncStorage.clear();
        await AsyncStorage.setItem(STORAGE_USER_FIRST_TIME, 'false');
        const unsubscribe = store.subscribe(() => {
            const state = store.getState();
            if (
                state.user.celoInfo.address.length > 0 &&
                !state.user.community.isBeneficiary &&
                !state.user.community.isManager
            ) {
                unsubscribe();
                setLogingOut(false);
                // navigation.goBack();
                navigation.navigate('communities', { previous: 'profile' });
            }
        });
        batch(() => {
            dispatch(setUserIsBeneficiary(false));
            dispatch(setUserIsCommunityManager(false));
            dispatch(resetUserApp());
            dispatch(resetNetworkContractsApp());
        });
    };

    const handleChangeCurrency = async (text: string) => {
        setCurrency(text);
        Api.setUserCurrency(userWallet.address, text);
        // update exchange rate!
        const exchangeRate = (rates as any)[text.toUpperCase()].rate;
        batch(() => {
            dispatch(setUserInfo({ ...user, currency: text }));
            dispatch(setUserExchangeRate(exchangeRate));
        });
    };

    const handleChangeLanguage = async (text: string) => {
        setLanguage(text);
        Api.setLanguage(userWallet.address, text);
        dispatch(setUserLanguage(text));
        i18n.changeLanguage(text);
        moment.locale(text);
    };

    if (userWallet.address.length === 0) {
        return <Login />;
    }

    const userBalance = amountToCurrency(
        userWallet.balance,
        user.currency,
        app.exchangeRates
    );

    return (
        <>
            <Header title={i18n.t('profile')} navigation={navigation}>
                <Button
                    mode="text"
                    uppercase={false}
                    labelStyle={{
                        fontFamily: 'Gelion-Bold',
                        fontSize: 22,
                        lineHeight: 26,
                        textAlign: 'center',
                        letterSpacing: 0.366667,
                        color: '#2643E9',
                    }}
                    onPress={handleLogout}
                    loading={logingOut}
                    disabled={logingOut}
                >
                    {i18n.t('logout')}
                </Button>
            </Header>
            <ScrollView
                style={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.container}>
                    <Card
                        elevation={0}
                        style={styles.card}
                        onPress={() => Linking.openURL('celo://wallet')}
                    >
                        <Card.Content>
                            <Text
                                style={{
                                    color: '#FFFFFF',
                                    textAlign: 'center',
                                }}
                            >
                                {i18n.t('balance').toUpperCase()}
                            </Text>
                            <View style={{ alignItems: 'center' }}>
                                <Headline
                                    style={{
                                        fontSize:
                                            userBalance.length > 6 ? 43 : 56,
                                        lineHeight:
                                            userBalance.length > 6 ? 43 : 56,
                                        ...styles.headlineBalance,
                                    }}
                                >
                                    {getCurrencySymbol(user.currency)}
                                    {userBalance}
                                </Headline>
                                <Text style={{ color: '#FFFFFF' }}>
                                    {humanifyNumber(userWallet.balance)} cUSD
                                </Text>
                            </View>
                        </Card.Content>
                    </Card>
                    {/* <ValidatedTextInput
                        label={i18n.t('name')}
                        value={name}
                        maxLength={32}
                        required
                        onEndEditing={(e) => {
                            let eName = '';
                            if (name.length > 0) {
                                eName = encrypt(name);
                            }
                            Api.setUsername(user.celoInfo.address, eName);
                            dispatch(
                                setUserInfo({ ...user.user, name: eName })
                            );
                        }}
                        onChangeText={(value) => setName(value)}
                    /> */}
                    <Input
                        label={i18n.t('name')}
                        style={{
                            backgroundColor: 'rgba(206, 212, 218, 0.27)',
                            borderRadius: 6,
                            fontSize: 20,
                            lineHeight: 24,
                            height: 24,
                            color: iptcColors.almostBlack,
                            paddingVertical: 9,
                            paddingHorizontal: 14,
                        }}
                        value={name}
                        maxLength={32}
                        onEndEditing={(e) => {
                            let eName = '';
                            if (name.length > 0) {
                                eName = encrypt(name);
                            }
                            Api.setUsername(userWallet.address, eName);
                            dispatch(setUserInfo({ ...user, name: eName }));
                        }}
                        onChangeText={(value) => setName(value)}
                    />
                    <Select
                        label={i18n.t('currency')}
                        value={currency}
                        onPress={() => setIsDialogCurrencyOpen(true)}
                    />
                    <Select
                        label={i18n.t('language')}
                        value={language === 'en' ? 'English' : ' Português'}
                        onPress={() => setIsDialogLanguageOpen(true)}
                    />
                    <Input
                        label={i18n.t('country')}
                        style={{ marginVertical: 3 }}
                        value={getCountryFromPhoneNumber(
                            userWallet.phoneNumber
                        )}
                        editable={false}
                    />
                    <Input
                        label={i18n.t('phoneNumber')}
                        style={{ marginVertical: 3 }}
                        value={userWallet.phoneNumber}
                        editable={false}
                    />
                    {/* <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginVertical: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                paddingVertical: 5,
                            }}
                        >
                            {i18n.t('consentAnonymousAnalytics')}
                        </Text>
                        <Switch
                            value={isConsentAnalytics}
                            onValueChange={onToggleSwitch}
                        />
                    </View> */}
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            marginBottom: 31,
                        }}
                    >
                        <Paragraph>
                            Build: {Constants.manifest.version}
                        </Paragraph>
                        <Paragraph>OS version: {Device.osVersion}</Paragraph>
                    </View>
                </View>
            </ScrollView>
            <Portal>
                <Dialog
                    visible={isDialogCurrencyOpen}
                    onDismiss={() => setIsDialogCurrencyOpen(false)}
                >
                    <Dialog.Content>
                        <RadioButton.Group
                            onValueChange={(value) => {
                                setIsDialogCurrencyOpen(false);
                                handleChangeCurrency(value);
                            }}
                            value={currency}
                        >
                            {Object.entries(rates).map((rate) => (
                                <RadioButton.Item
                                    key={rate[0]}
                                    label={`${(rate[1] as any).name} (${
                                        rate[0]
                                    })`}
                                    value={rate[0]}
                                />
                            ))}
                        </RadioButton.Group>
                    </Dialog.Content>
                </Dialog>
                <Dialog
                    visible={isDialogLanguageOpen}
                    onDismiss={() => setIsDialogLanguageOpen(false)}
                >
                    <Dialog.Content>
                        <RadioButton.Group
                            onValueChange={(value) => {
                                setIsDialogLanguageOpen(false);
                                handleChangeLanguage(value);
                            }}
                            value={language}
                        >
                            <RadioButton.Item
                                key="en"
                                label="English"
                                value="en"
                            />
                            <RadioButton.Item
                                key="pt"
                                label="Português"
                                value="pt"
                            />
                        </RadioButton.Group>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </>
    );
}

const styles = StyleSheet.create({
    scrollView: {},
    card: {
        backgroundColor: iptcColors.softBlue,
        marginTop: 10,
        marginBottom: 45,
    },
    headlineBalance: {
        fontFamily: 'Gelion-Bold',
        color: 'white',
        letterSpacing: 0,
        marginTop: 20,
    },
    container: {
        marginHorizontal: 20,
    },
    picker: {
        height: 50,
        width: '100%',
        fontFamily: 'Gelion-Regular',
    },
    pickerBorder: {
        marginVertical: 10,
        borderStyle: 'solid',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
    },
    inputTextFieldLabel: {
        fontSize: 17,
        lineHeight: 17,
        letterSpacing: 0.245455,
        color: iptcColors.textGray,
        marginVertical: 8,
    },
});

export default ProfileScreen;