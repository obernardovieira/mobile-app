import { RouteProp, useNavigation } from '@react-navigation/native';
import i18n from 'assets/i18n';
import Header from 'components/Header';
import ListActionItem from 'components/ListActionItem';
import BackSvg from 'components/svg/header/BackSvg';
import { amountToCurrency } from 'helpers/currency';
import { IRootState, ICommunityInfoBeneficiary } from 'helpers/types';
import React from 'react';
import { ScrollView } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';

interface IRemovedBeneficiaryScreenProps {
    route: {
        params: {
            beneficiaries: ICommunityInfoBeneficiary[];
        };
    };
}
const mapStateToProps = (state: IRootState) => {
    const { user, network, app } = state;
    return { user, network, app };
};
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & IRemovedBeneficiaryScreenProps;

function RemovedBeneficiaryScreen(props: Props) {
    const navigation = useNavigation();
    const beneficiaries = props.route.params
        .beneficiaries as ICommunityInfoBeneficiary[];

    return (
        <>
            {/* <Header title="Removed" hasBack navigation={navigation} /> */}
            <ScrollView style={{ marginHorizontal: 15 }}>
                {beneficiaries.map((beneficiary) => (
                    <ListActionItem
                        key={beneficiary.address}
                        item={{
                            description: `${amountToCurrency(
                                beneficiary.claimed,
                                props.user.user.currency,
                                props.app.exchangeRates
                            )}`,
                            from: beneficiary,
                            key: beneficiary.address,
                            timestamp: 0,
                        }}
                    />
                ))}
            </ScrollView>
        </>
    );
}
RemovedBeneficiaryScreen.navigationOptions = ({
    route,
}: {
    route: RouteProp<any, any>;
}) => {
    return {
        headerLeft: () => <BackSvg />,
        headerTitle: i18n.t('removed'),
    };
};

export default connector(RemovedBeneficiaryScreen);