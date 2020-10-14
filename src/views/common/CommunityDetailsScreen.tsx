import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import i18n from 'assets/i18n';
import CommuntyStatus from 'components/CommuntyStatus';
import Header from 'components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import { humanifyNumber, getCurrencySymbol, iptcColors } from 'helpers/index';
import {
    ICommunityInfo,
    IStoreCombinedActionsTypes,
    IStoreCombinedState,
} from 'helpers/types';
import React, { useState } from 'react';
import { Text, View, StyleSheet, RefreshControl, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Paragraph, Card, Divider, Headline } from 'react-native-paper';

import config from '../../../config';
import Donate from '../communities/actions/Donate';
import Api from 'services/api';
import { useStore } from 'react-redux';
import Button from 'components/Button';

import { LineChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

interface ICommunityDetailsScreen {
    route: {
        params: {
            community: ICommunityInfo;
        };
    };
}
export default function CommunityDetailsScreen(props: ICommunityDetailsScreen) {
    const store = useStore<IStoreCombinedState, IStoreCombinedActionsTypes>();
    const navigation = useNavigation();
    const rates = store.getState().app.exchangeRates;

    const [refreshing, setRefreshing] = useState(false);
    const [seeFullDescription, setSeeFullDescription] = useState(false);
    const [community, setCommunity] = useState<ICommunityInfo>(
        props.route.params.community
    );

    const onRefresh = () => {
        Api.getCommunityByContractAddress(community.contractAddress).then((c) =>
            setCommunity(c!)
        );
        setRefreshing(false);
    };

    const renderSSI = () => {
        if (community.ssi.values.length > 1) {
            return (
                <>
                    <Divider
                        style={{
                            marginLeft: -16,
                            marginRight: -16,
                            marginTop: 16,
                        }}
                    />
                    <View style={styles.chartView}>
                        <LineChart
                            style={{ flex: 2, height: 100, width: 200 }}
                            data={community.ssi.values}
                            contentInset={{ top: 20, bottom: 20 }}
                            curve={shape.curveMonotoneX}
                            svg={{
                                strokeWidth: 4,
                                stroke: 'rgba(45,206,137,1)',
                            }}
                        ></LineChart>
                        <View
                            style={{
                                ...styles.ssiView,
                                // backgroundColor: 'blue',
                            }}
                        >
                            <View
                                style={{
                                    // backgroundColor: 'red',
                                    // flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Headline style={styles.ssiHeadline}>
                                    {
                                        community.ssi.values[
                                            community.ssi.values.length - 1
                                        ]
                                    }
                                </Headline>
                                <Text
                                    style={{
                                        textAlignVertical: 'center',
                                        fontSize: 18,
                                        lineHeight: 18,
                                        padding: 3,
                                    }}
                                >
                                    %
                                </Text>
                            </View>
                            <Paragraph
                                style={{
                                    textAlign: 'right',
                                    fontSize: 14,
                                    lineHeight: 17,
                                }}
                            >
                                {i18n.t('ssi')}
                            </Paragraph>
                        </View>
                    </View>
                    <Paragraph style={styles.ssiExplained}>
                        {i18n.t('ssiDescription')}
                    </Paragraph>
                </>
            );
        }
    };

    let description;
    const cDescription =
        store.getState().user.user.language === community.language
            ? community.description
            : community.descriptionEn === null
            ? community.description
            : community.descriptionEn;
    if (seeFullDescription || community.description.indexOf('\n') === -1) {
        description = cDescription;
    } else {
        description = cDescription.slice(0, cDescription.indexOf('\n'));
    }
    const amountInDollars = parseFloat(community.vars._claimAmount);
    const amountInCommunityCurrency =
        amountInDollars * rates[community.currency].rate;

    return (
        <>
            <Header title="" hasBack hasHelp navigation={navigation} />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View
                    style={{
                        width: '100%',
                        height: 500,
                        position: 'absolute',
                    }}
                >
                    <Image
                        style={styles.imageBackground}
                        source={{ uri: community.coverImage }}
                    />
                    <LinearGradient
                        colors={[
                            'rgba(0,0,0,0.15)',
                            'rgba(0,0,0,0.15)',
                            'transparent',
                        ]}
                        style={styles.darkerBackground}
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(246,246,246,1)']}
                        style={styles.linearGradient}
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        width: '100%',
                        height: 202,
                    }}
                >
                    <Text style={styles.communityName}>{community.name}</Text>
                    <Text style={styles.communityLocation}>
                        <Entypo name="location-pin" size={14} />{' '}
                        {community.city}, {community.country}
                    </Text>
                </View>
                <View style={styles.container}>
                    <Card elevation={3}>
                        <Card.Content>
                            <Paragraph
                                style={{
                                    fontSize: 17,
                                    lineHeight: 22,
                                }}
                            >
                                {description}
                            </Paragraph>
                            {community.description.indexOf('\n') !== -1 && (
                                <Button
                                    modeType="gray"
                                    onPress={() =>
                                        setSeeFullDescription(
                                            !seeFullDescription
                                        )
                                    }
                                >
                                    {seeFullDescription
                                        ? i18n.t('seeLess')
                                        : i18n.t('seeMore')}
                                </Button>
                            )}
                        </Card.Content>
                    </Card>
                    <Card elevation={3} style={{ marginTop: 16 }}>
                        <Card.Content>
                            <Paragraph
                                style={{
                                    fontSize: 17,
                                    lineHeight: 22,
                                }}
                            >
                                {i18n.t('eachBeneficiaryCanClaimXUpToY', {
                                    communityCurrency: getCurrencySymbol(
                                        community.currency
                                    ),
                                    claimXCCurrency: humanifyNumber(
                                        amountInCommunityCurrency.toString()
                                    ),
                                    claimX: humanifyNumber(
                                        community.vars._claimAmount
                                    ),
                                    upToY: humanifyNumber(
                                        community.vars._maxClaim
                                    ),
                                    minIncrement:
                                        parseInt(
                                            community.vars._incrementInterval
                                        ) / 60,
                                })}
                            </Paragraph>
                            {renderSSI()}
                        </Card.Content>
                    </Card>
                    <CommuntyStatus community={community}>
                        <Button
                            modeType="gray"
                            bold={true}
                            style={{ marginTop: '5%' }}
                            onPress={() =>
                                WebBrowser.openBrowserAsync(
                                    config.blockExplorer +
                                        community.contractAddress +
                                        '/token_transfers'
                                )
                            }
                        >
                            {i18n.t('exploreCommunityContract')}
                        </Button>
                    </CommuntyStatus>
                </View>
            </ScrollView>
            <Donate community={community} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 16,
    },
    imageBackground: {
        width: '100%',
        height: 500,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 155,
    },
    darkerBackground: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 500,
    },
    communityName: {
        zIndex: 5,
        fontSize: 30,
        lineHeight: 36,
        fontWeight: 'bold',
        fontFamily: 'Gelion-Bold',
        color: 'white',
        textAlign: 'center',
    },
    communityLocation: {
        zIndex: 5,
        fontSize: 15,
        lineHeight: 15,
        letterSpacing: 0.25,
        color: 'white',
        textAlign: 'center',
    },
    ssiExplained: {
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: 0.25,
        color: iptcColors.textGray,
    },
    ssiHeadline: {
        fontFamily: 'Gelion-Bold',
        fontWeight: 'bold',
        fontSize: 36,
        lineHeight: 36,
        textAlign: 'right',
    },
    ssiView: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: 0,
    },
    chartView: {
        flex: 3,
        flexDirection: 'row',
        margin: 0,
    },
});
