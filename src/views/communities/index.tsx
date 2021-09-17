import { useNavigation } from '@react-navigation/native';
import i18n from 'assets/i18n';
import Button from 'components/core/Button';
import CommunitiesSvg from 'components/svg/CommunitiesSvg';
import ImpactMarketHeaderLogoSVG from 'components/svg/header/ImpactMarketHeaderLogoSVG';
import ProfileSvg from 'components/svg/ProfileSvg';
import { Screens } from 'helpers/constants';
import { ITabBarIconProps } from 'helpers/old-types';
import { fetchCommunitiesListRequest } from 'helpers/redux/actions/communities';
import { CommunityAttributes } from 'helpers/types/models';
import { IRootState } from 'helpers/types/state';
import React, { useEffect, useRef } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    ScrollView,
    View,
    Pressable,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ipctColors, ipctFontSize, ipctLineHeight } from 'styles/index';
import Auth from 'views/profile/auth';

import CommunityCard from './CommunityCard';
import Stories from './Stories';

function CommunitiesScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const walletAddress = useSelector(
        (state: IRootState) => state.user.wallet.address
    );

    const flatListRef = useRef<FlatList<CommunityAttributes> | null>(null);

    const communities = useSelector(
        (state: IRootState) => state.communities.communities
    );

    const communitiesCount = useSelector(
        (state: IRootState) => state.communities.count
    );

    useEffect(() => {
        dispatch(
            fetchCommunitiesListRequest({
                offset: 0,
                limit: 5,
            })
        );
    }, [dispatch]);

    return (
        <ScrollView>
            <View
                style={{
                    marginHorizontal: 18,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 9,
                }}
            >
                <Text style={styles.communityHeader}>
                    {i18n.t('generic.communities')}
                </Text>
                <Pressable
                    hitSlop={10}
                    onPress={() => navigation.navigate(Screens.ListCommunities)}
                >
                    <Text style={styles.viewAll}>
                        {i18n.t('generic.viewAll')} ({communitiesCount})
                    </Text>
                </Pressable>
            </View>
            <FlatList
                data={communities}
                renderItem={({ item }: { item: CommunityAttributes }) => (
                    <CommunityCard community={item} />
                )}
                ref={flatListRef}
                keyExtractor={(item) => item.publicId}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                    marginLeft: 14,
                }}
            />
            <Button
                modeType="default"
                style={{ marginHorizontal: 22, marginBottom: 36 }}
                labelStyle={styles.buttomStoreText}
                onPress={() =>
                    walletAddress.length > 0
                        ? navigation.navigate(Screens.CreateCommunity)
                        : null
                }
            >
                <Text style={styles.buttomStoreText}>
                    {i18n.t('createCommunity.applyCommunity')}
                </Text>
            </Button>
            <Stories />
            <Auth />
        </ScrollView>
    );
}

CommunitiesScreen.navigationOptions = () => {
    return {
        tabBarLabel: i18n.t('generic.communities'),
        tabBarIcon: (props: ITabBarIconProps) => (
            <CommunitiesSvg focused={props.focused} />
        ),
        // lines below need to be here, so when a user only have one tab,
        // the stack is different and this is used to load the header
        headerLeft: () => (
            <ImpactMarketHeaderLogoSVG width={107.62} height={36.96} />
        ),
        headerRight: () => (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginRight: 22,
                }}
            >
                <ProfileSvg />
            </View>
        ),
        headerTitle: '',
    };
};

const styles = StyleSheet.create({
    communityHeader: {
        fontFamily: 'Manrope-Bold',
        fontSize: ipctFontSize.medium,
        lineHeight: ipctLineHeight.xlarge,
        color: ipctColors.almostBlack,
    },
    viewAll: {
        color: ipctColors.blueRibbon,
        fontFamily: 'Inter-Regular',
        fontSize: ipctFontSize.small,
        lineHeight: ipctLineHeight.large,
        textAlign: 'center',
    },
    buttomStoreText: {
        fontSize: ipctFontSize.small,
        // lineHeight: ipctLineHeight.large,
        color: ipctColors.white,
        fontFamily: 'Inter-Regular',
        fontWeight: '500',
    },
});

export default CommunitiesScreen;
