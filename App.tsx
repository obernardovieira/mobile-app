import React from 'react';
import './global';
import Web3 from 'web3'
import { newKitFromWeb3 } from "@celo/contractkit";
import {
    Image,
    View,
    YellowBox,
    AsyncStorage,
    StatusBar,
} from 'react-native';
import * as Font from 'expo-font';

import {
    AppLoading,
    SplashScreen,
} from 'expo';
import { Asset } from 'expo-asset';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    PayStackScreen,
    WalletStackScreen,
    CommunitiesStackScreen,
    CommunityManagerStackSreen,
} from './views/Stacks';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/Login';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import userReducer from './helpers/redux/reducers/ReduxReducers';
import {
    setUserCeloInfo,
    setCeloKit,
    setImpactMarketContract,
    setCommunityContract,
    setUserFirstTime,
    setUserIsBeneficiary,
    setUserIsCommunityManager,
} from './helpers/redux/actions/ReduxActions';
import {
    STORAGE_USER_ADDRESS,
    STORAGE_USER_PHONE_NUMBER,
    STORAGE_USER_FIRST_TIME,
} from './helpers/types';
import {
    DefaultTheme,
    Provider as PaperProvider,
    configureFonts,
} from 'react-native-paper';
import { ContractKit } from '@celo/contractkit';
import { ethers } from 'ethers';
import { ImpactMarketInstance } from './contracts/types/truffle-contracts';
import ImpactMarketContractABI from './contracts/ImpactMarketABI.json'
import CommunityContractABI from './contracts/CommunityABI.json'
import config from './config';
import {
    findComunityToBeneficicary,
    findComunityToManager,
} from './services';
import BigNumber from 'bignumber.js';
import BeneficiaryView from './views/community/view/beneficiary';
import { iptcColors } from './helpers';


const kit = newKitFromWeb3(new Web3(config.jsonRpc));
const Tab = createBottomTabNavigator();
const store = createStore(userReducer);
const theme = {
    ...DefaultTheme,
    roundness: 4,
    colors: {
        ...DefaultTheme.colors,
        primary: iptcColors.softBlue,
    },
    fonts: configureFonts({
        default: {
            regular: {
                fontFamily: 'Gelion-Regular',
            },
            medium: {
                fontFamily: 'Gelion-Regular',
            },
            light: {
                fontFamily: 'Gelion-Light',
            },
            thin: {
                fontFamily: 'Gelion-Thin',
            },
        }
    })
};


YellowBox.ignoreWarnings(['Warning: The provided value \'moz', 'Warning: The provided value \'ms-stream']);


interface IAppState {
    isSplashReady: boolean;
    isAppReady: boolean;
    firstTimeUser: boolean;
    // loggedIn is not used anywhere, only forces update!
    loggedIn: boolean;
}
export default class App extends React.Component<{}, IAppState> {

    constructor(props: any) {
        super(props);
        this.state = {
            isSplashReady: false,
            isAppReady: false,
            firstTimeUser: true,
            loggedIn: false,
        }
        store.subscribe(() => {
            const previousFirstTimeUser = this.state.firstTimeUser;
            const previousLoggedIn = this.state.loggedIn;
            const currentFirstTimeUser = store.getState().user.firstTime;
            const currentLoggedIn = store.getState().user.celoInfo.address.length > 0;

            if (previousFirstTimeUser !== currentFirstTimeUser) {
                if (currentFirstTimeUser === false &&
                    store.getState().user.celoInfo.address.length > 0
                ) {
                    this._authUser();
                }
                this.setState({ firstTimeUser: currentFirstTimeUser });
            }
            if (previousLoggedIn !== currentLoggedIn) {
                this.setState({ loggedIn: currentLoggedIn });
            }
        })
    }

    render() {
        const { isAppReady, isSplashReady, firstTimeUser } = this.state;
        if (!isSplashReady) {
            return (
                <AppLoading
                    startAsync={this._cacheSplashResourcesAsync}
                    onFinish={() => this.setState({ isSplashReady: true })}
                    onError={console.warn}
                    autoHideSplash={false}
                />
            );
        }

        if (!isAppReady) {
            return (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Image
                        source={require('./assets/splash.png')}
                        onLoad={this._cacheResourcesAsync}
                    />
                </View>
            );
        }

        if (firstTimeUser) {
            return <PaperProvider theme={theme}>
                <Provider store={store}>
                    <Login />
                </Provider>
            </PaperProvider>
        }

        const tabsToUser = () => {
            const user = store.getState().user;
            if (user.community.isBeneficiary === false && user.community.isCoordinator === false) {
                return <Tab.Screen
                    name="Communities"
                    component={CommunitiesStackScreen}
                    options={{
                        tabBarIcon: (props: any) => (
                            <Image
                                source={require(`./assets/tab/communities.png`)}
                                style={{ width: props.size, height: props.size - 3 }}
                            />
                        ),
                    }}
                />;
            }
            if (store.getState().user.community.isBeneficiary) {
                return <Tab.Screen
                    name="Claim"
                    component={BeneficiaryView}
                    options={{
                        tabBarIcon: (props: any) => (
                            <Image
                                source={require('./assets/tab/claim.png')}
                                style={{ width: props.size + 2, height: props.size - 5 }}
                            />
                        ),
                    }}
                />;
            } else if (store.getState().user.community.isCoordinator) {
                return <Tab.Screen
                    name="Manage"
                    component={CommunityManagerStackSreen}
                    options={{
                        tabBarIcon: (props: any) => (
                            <Image
                                source={require('./assets/tab/manage.png')}
                                style={{ width: props.size, height: props.size - 5 }}
                            />
                        ),
                    }}
                />;
            }
        }

        return (
            <PaperProvider theme={theme}>
                <Provider store={store}>
                    <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
                    <NavigationContainer>
                        <Tab.Navigator>
                            {tabsToUser()}
                            {store.getState().user.celoInfo.address.length > 0 && <Tab.Screen
                                name="Pay"
                                component={PayStackScreen}
                                options={{
                                    tabBarIcon: (props: { focused: boolean, color: string, size: number }) => (
                                        <Image
                                            source={require(`./assets/tab/pay.png`)}
                                            style={{ width: props.size + 3, height: props.size + 3 }}
                                        />
                                    ),
                                }}
                            />}
                            <Tab.Screen
                                name="Wallet"
                                component={WalletStackScreen}
                                options={{
                                    tabBarIcon: (props: any) => (
                                        <Image
                                            source={require(`./assets/tab/wallet.png`)}
                                            style={{ width: props.size - 5, height: props.size - 5 }}
                                        />
                                    ),
                                }}
                            />
                        </Tab.Navigator>
                    </NavigationContainer>
                </Provider>
            </PaperProvider>
        );
    }

    _getCurrentUserBalance = async (address: string) => {
        const stableToken = await kit.contracts.getStableToken()

        const [cUSDBalanceBig, cUSDDecimals] = await Promise.all(
            [stableToken.balanceOf(address), stableToken.decimals()]
        )
        const decimals = new BigNumber(10).pow(cUSDDecimals).toString();
        let cUSDBalance = cUSDBalanceBig.div(decimals).toFixed(2)
        return cUSDBalance;
    }

    _cacheSplashResourcesAsync = async () => {
        const gif = require('./assets/splash.png');
        return Asset.fromModule(gif).downloadAsync();
    };

    _cacheResourcesAsync = async () => {
        SplashScreen.hide();
        await Font.loadAsync({
            // Load a font `Montserrat` from a static resource
            // Montserrat: require('./assets/fonts/Montserrat.ttf'),

            // Any string can be used as the fontFamily name. Here we use an object to provide more control
            'Gelion-SemiBold': {
                uri: require('./fonts/FontGelion/Gelion-SemiBold.ttf'),
            },
            'Gelion-Bold': {
                uri: require('./fonts/FontGelion/Gelion-Bold.ttf'),
            },
            'Gelion-Regular': {
                uri: require('./fonts/FontGelion/Gelion-Regular.ttf'),
            },
            'Gelion-Medium': {
                uri: require('./fonts/FontGelion/Gelion-Medium.ttf'),
            },
            'Gelion-Light': {
                uri: require('./fonts/FontGelion/Gelion-Light.ttf'),
            },
            'Gelion-Thin': {
                uri: require('./fonts/FontGelion/Gelion-Thin.ttf'),
            },
        });
        await this._authUser();
        this.setState({ isAppReady: true });
    };

    _authUser = async () => {
        let address: string | null = '';
        let phoneNumber: string | null = '';
        try {
            address = await AsyncStorage.getItem(STORAGE_USER_ADDRESS);
            phoneNumber = await AsyncStorage.getItem(STORAGE_USER_PHONE_NUMBER);
            if (address !== null && phoneNumber !== null) {
                const balance = await this._getCurrentUserBalance(address);
                store.dispatch(setUserCeloInfo({ address, phoneNumber, balance }))
                await this._loadContracts(address, kit);
                // We have data!!
            }
            const firstTime = await AsyncStorage.getItem(STORAGE_USER_FIRST_TIME);
            this.setState({
                firstTimeUser: firstTime === null,
                loggedIn: (address !== null && phoneNumber !== null)
            });
            store.dispatch(setUserFirstTime(firstTime !== 'false'));
        } catch (error) {
            // Error retrieving data
        }
        store.dispatch(setCeloKit(kit))
    }

    _loadContracts = async (address: string, kit: ContractKit) => {
        const isBeneficiary = await findComunityToBeneficicary(address);
        const isCoordinator = await findComunityToManager(address);

        const setCommunity = (address: string) => {
            const communityContract = new kit.web3.eth.Contract(
                CommunityContractABI as any,
                address,
            );
            store.dispatch(setCommunityContract(communityContract));
        };
        if (isBeneficiary !== undefined) {
            store.dispatch(setUserIsBeneficiary(true));
            setCommunity(isBeneficiary.contractAddress);
        }
        else if (isCoordinator !== undefined) {
            store.dispatch(setUserIsCommunityManager(true));
            setCommunity(isCoordinator.contractAddress);
        }

        const provider = new ethers.providers.Web3Provider(kit.web3.currentProvider as any);
        const impactMarketContract = new ethers.Contract(
            config.impactMarketContractAddress,
            ImpactMarketContractABI,
            provider,
        ) as ethers.Contract & ImpactMarketInstance;
        store.dispatch(setImpactMarketContract(impactMarketContract));
    }
}
