import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import i18n from 'assets/i18n';
import Header from 'components/Header';
import {
    calculateCommunityProgress,
    claimFrequencyToText,
    humanifyNumber,
    iptcColors,
} from 'helpers/index';
import { IRootState, ICommunityInfo } from 'helpers/types';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    RefreshControl,
    Image,
} from 'react-native';
import { ProgressBar, Button } from 'react-native-paper';
import { connect, ConnectedProps } from 'react-redux';
import Api from 'services/api';
import Card from 'components/core/Card';

interface ICommunitiesScreenProps {
    navigation: any;
    route: any;
}
const mapStateToProps = (state: IRootState) => {
    const { user, network } = state;
    return { user, network };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & ICommunitiesScreenProps;

function CommunitiesScreen(props: Props) {
    const navigation = useNavigation();
    const [goWelcomeScreen, setGoWelcomeScreen] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [communities, setCommunities] = useState<ICommunityInfo[]>([]);

    useEffect(() => {
        Api.getAllValidCommunities().then(setCommunities);
    }, []);

    const onRefresh = () => {
        Api.getAllValidCommunities().then(setCommunities);
        setRefreshing(false);
    };

    const communityCard = (community: ICommunityInfo) => (
        <Card
            key={community.name}
            // elevation={8}
            style={styles.card}
            onPress={() =>
                navigation.navigate('CommunityDetailsScreen', {
                    community,
                })
            }
        >
            <Card.Content style={{ margin: -16 }}>
                <View style={{ position: 'relative' }}>
                    <Image
                        style={styles.cardImage}
                        source={{ uri: community.coverImage }}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            zIndex: 5,
                            ...styles.cardImage,
                        }}
                    >
                        <Text style={styles.cardCommunityName}>
                            {community.name}
                        </Text>
                        <Text style={styles.cardLocation}>
                            <Entypo name="location-pin" size={15} />{' '}
                            {community.city}, {community.country}
                        </Text>
                    </View>
                    <View style={styles.darkerBackground} />
                </View>
                <View style={{ margin: 10 }}>
                    <View
                        style={{
                            flex: 3,
                            flexDirection: 'row',
                            marginHorizontal: 15,
                        }}
                    >
                        <View style={{ flex: 1 }}>
                            {/* <View style={{ position: 'absolute' }}> */}
                            <Text style={styles.cellHeader}>
                                {community.beneficiaries.added.length}
                            </Text>
                            <Text style={styles.cellDescription}>
                                {i18n.t('beneficiaries')}
                            </Text>
                            {/* </View> */}
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.cellHeader}>
                                ${humanifyNumber(community.vars._claimAmount)}
                            </Text>
                            <Text style={styles.cellDescription}>
                                {claimFrequencyToText(
                                    community.vars._baseInterval
                                )}
                            </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            {/* <View style={{ position: 'absolute', right: 0 }}> */}
                            <Text style={styles.cellHeader}>
                                {community.backers.length}
                            </Text>
                            <Text style={styles.cellDescription}>
                                {i18n.t('backers')}
                            </Text>
                            {/* </View> */}
                        </View>
                    </View>
                    <View
                        style={{
                            marginTop: 15,
                            // marginBottom: 5,
                            // marginHorizontal: 15,
                        }}
                    >
                        <ProgressBar
                            key="raised"
                            style={{
                                backgroundColor: '#d6d6d6',
                                position: 'absolute',
                                borderRadius: 6.5,
                                height: 6.32,
                            }}
                            progress={calculateCommunityProgress(
                                'raised',
                                community
                            )}
                            color="#5289ff"
                        />
                        <ProgressBar
                            key="claimed"
                            style={{
                                backgroundColor: 'rgba(255,255,255,0)',
                                borderRadius: 6.5,
                                height: 6.32,
                            }}
                            progress={calculateCommunityProgress(
                                'claimed',
                                community
                            )}
                            color="#50ad53"
                        />
                    </View>
                </View>
            </Card.Content>
        </Card>
    );

    if (
        props.user.celoInfo.address.length === 0 &&
        goWelcomeScreen
    ) {
        setGoWelcomeScreen(false);
        navigation.navigate('WelcomeScreen');
    }

    return (
        <>
            <Header title={i18n.t('communities')} navigation={navigation}>
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
                    onPress={() => navigation.navigate('CreateCommunityScreen')}
                >
                    {i18n.t('create')}
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
                {communities.map(communityCard)}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    scrollView: {},
    cardImage: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        width: '100%',
        height: 147,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    darkerBackground: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.15)',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 147,
    },
    cardCommunityName: {
        zIndex: 5,
        marginHorizontal: 15,
        fontSize: 28,
        lineHeight: 34,
        fontFamily: 'Gelion-Bold',
        color: 'white',
        textAlign: 'center',
    },
    cardLocation: {
        zIndex: 5,
        fontFamily: 'Gelion-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: 'white',
    },
    cardInfo: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    card: {
        marginHorizontal: 16,
        marginBottom: 13,
        marginTop: 8,
        padding: 0,
    },
    cellHeader: {
        fontFamily: 'Gelion-Bold',
        fontSize: 24,
        textAlign: 'center',
        color: iptcColors.almostBlack,
    },
    cellDescription: {
        fontFamily: 'Gelion-Regular',
        fontSize: 14,
        lineHeight: 16,
        opacity: 0.7,
        textAlign: 'center',
        color: iptcColors.textGray,
    },
});

export default connector(CommunitiesScreen);