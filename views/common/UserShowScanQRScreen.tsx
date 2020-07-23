import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    View
} from 'react-native';
import {
    connect,
    ConnectedProps
} from 'react-redux';
import {
    IRootState
} from '../../helpers/types';
import SvgQRCode from 'react-native-qrcode-svg';
import {
    Headline,
    Subheading,
    Card,
    Button,
    Text,
    Avatar
} from 'react-native-paper';
import { getCountryFromPhoneNumber } from '../../helpers';
import { getUser } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import i18n from '../../assets/i18n';


const mapStateToProps = (state: IRootState) => {
    const { user, network } = state
    return { user, network }
};
const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

function UserShowScanQRScreen(props: PropsFromRedux) {
    const navigation = useNavigation();
    const [name, setName] = useState('');

    useEffect(() => {
        getUser(props.user.celoInfo.address).then((user) => {
            if (user !== undefined) {
                if (user.username !== null) {
                    setName(user.username);
                }
            }
        });
    });
    return (
        <>
            <Header
                title={i18n.t('yourQRCode')}
                navigation={navigation}
                hasBack={true}
            />
            <ScrollView>
                <Headline style={styles.headingSubHeading}>
                    {i18n.t('scanToPay')}
                </Headline>
                <Subheading style={styles.headingSubHeading}>
                    {i18n.t('showQRToScan')}
                </Subheading>
                <Card elevation={8} style={styles.card}>
                    <Card.Content>
                        <View style={styles.cardHeadView}>
                            <View style={{
                                flex:1,
                                flexDirection: 'column',
                                alignItems: 'flex-start'
                            }}>
                                <Subheading>{name}</Subheading>
                                <Subheading style={{ color: 'grey' }}>
                                    {getCountryFromPhoneNumber(props.user.celoInfo.phoneNumber)}
                                </Subheading>
                            </View>
                            <Avatar.Image
                                style={styles.avatar}
                                size={58}
                                source={require('../../assets/images/hello.png')}
                            />
                        </View>
                        <View style={styles.qrView}>
                            <SvgQRCode
                                value={props.user.celoInfo.address}
                                size={200}
                            />
                        </View>
                        <Button
                            mode="outlined"
                            disabled={true}
                        >
                            {i18n.t('scanToPay')}
                        </Button>
                    </Card.Content>
                </Card>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    headingSubHeading: {
        paddingHorizontal: 20,
    },
    card: {
        margin: 20
    },
    cardHeadView: {
        flex: 1,
        flexDirection: 'row'
    },
    avatar: {
        alignSelf: 'center',
        marginLeft: 'auto'
    },
    qrView: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    }
});

export default connector(UserShowScanQRScreen);