import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import i18n from 'assets/i18n';
import { IRootState, ITabBarIconProps } from 'helpers/types';
import React from 'react';
import { Image } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';

import CommunitiesScreen from './communities/CommunitiesScreen';
import BeneficiaryView from './community/view/beneficiary';
import CommunityManagerView from './community/view/communitymanager';
import PayScreen from './pay';
import WalletScreen from './wallet';

const ActiveClaimIcon = require('assets/images/tab/active/claim.png');
const ActiveCommunitiesIcon = require('assets/images/tab/active/communities.png');
const ActiveManageIcon = require('assets/images/tab/active/manage.png');
const ActivePayIcon = require('assets/images/tab/active/pay.png');
const ActiveWalletIcon = require('assets/images/tab/active/wallet.png');
const InactiveClaimIcon = require('assets/images/tab/claim.png');
const InactiveCommunitiesIcon = require('assets/images/tab/communities.png');
const InactiveManageIcon = require('assets/images/tab/manage.png');
const InactivePayIcon = require('assets/images/tab/pay.png');
const InactiveWalletIcon = require('assets/images/tab/wallet.png');

const mapStateToProps = (state: IRootState) => {
    const { user, network } = state;
    return { user, network };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;
const Tab = createBottomTabNavigator();

function Tabs(props: Props) {
    const selectTabBarIcon = (focused: boolean, tab: string) => {
        switch (tab) {
            case 'claim':
                if (focused) return ActiveClaimIcon;
                return InactiveClaimIcon;
            case 'manage':
                if (focused) return ActiveManageIcon;
                return InactiveManageIcon;
            case 'communities':
                if (focused) return ActiveCommunitiesIcon;
                return InactiveCommunitiesIcon;
            case 'pay':
                if (focused) return ActivePayIcon;
                return InactivePayIcon;
            case 'wallet':
                if (focused) return ActiveWalletIcon;
                return InactiveWalletIcon;
        }
    };

    const tabsToUser = () => {
        const user = props.user;
        // console.log('user.community', user.community)
        if (user.community.isBeneficiary) {
            return (
                <Tab.Screen
                    name={i18n.t('claim')}
                    component={BeneficiaryView}
                    options={{
                        tabBarIcon: (props: ITabBarIconProps) => (
                            <Image
                                source={selectTabBarIcon(
                                    props.focused,
                                    'claim'
                                )}
                                style={{
                                    width: props.size + 2,
                                    height: props.size - 5,
                                }}
                            />
                        ),
                    }}
                />
            );
        } else if (user.community.isManager) {
            return (
                <Tab.Screen
                    name={i18n.t('manage')}
                    component={CommunityManagerView}
                    options={{
                        tabBarIcon: (props: ITabBarIconProps) => (
                            <Image
                                source={selectTabBarIcon(
                                    props.focused,
                                    'manage'
                                )}
                                style={{
                                    width: props.size,
                                    height: props.size - 5,
                                }}
                            />
                        ),
                    }}
                />
            );
        }
        return (
            <Tab.Screen
                name={i18n.t('communities')}
                component={CommunitiesScreen}
                options={{
                    tabBarIcon: (props: ITabBarIconProps) => (
                        <Image
                            source={selectTabBarIcon(
                                props.focused,
                                'communities'
                            )}
                            style={{
                                width: props.size,
                                height: props.size - 3,
                            }}
                        />
                    ),
                }}
            />
        );
    };

    return (
        <Tab.Navigator>
            {tabsToUser()}
            {props.user.celoInfo.address.length > 0 && (
                <Tab.Screen
                    name={i18n.t('pay')}
                    component={PayScreen}
                    options={{
                        tabBarIcon: (props: ITabBarIconProps) => (
                            <Image
                                source={selectTabBarIcon(props.focused, 'pay')}
                                style={{
                                    width: props.size + 3,
                                    height: props.size + 3,
                                }}
                            />
                        ),
                    }}
                />
            )}
            <Tab.Screen
                name={i18n.t('wallet')}
                component={WalletScreen}
                options={{
                    tabBarIcon: (props: ITabBarIconProps) => (
                        <Image
                            source={selectTabBarIcon(props.focused, 'wallet')}
                            style={{
                                width: props.size - 5,
                                height: props.size - 5,
                            }}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default connector(Tabs);
