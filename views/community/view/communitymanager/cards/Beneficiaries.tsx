import React from 'react';
import {
    connect,
    ConnectedProps
} from 'react-redux';
import {
    IRootState,
    ICommunityInfo,
} from '../../../../../helpers/types';
import {
    Card,
    Headline,
    Button,
} from 'react-native-paper';
import {
    getCommunityByContractAddress,
} from '../../../../../services';
import AddBeneficiary from '../components/AddBeneficiary';
import { useNavigation } from '@react-navigation/native';


interface IBeneficiariesProps {
    community: ICommunityInfo;
    updateCommunity: (community: ICommunityInfo) => void;
}
const mapStateToProps = (state: IRootState) => {
    const { user, network } = state
    return { user, network }
};
const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & IBeneficiariesProps

function Beneficiaries(props: Props) {
    const navigation = useNavigation();
    return (
        <Card>
            <Card.Content>
                <Headline
                    style={{
                        opacity: 0.48,
                        fontFamily: "Gelion-Bold",
                        fontSize: 13,
                        fontWeight: "500",
                        fontStyle: "normal",
                        lineHeight: 12,
                        letterSpacing: 0.7,
                    }}
                >
                    BENEFICIARIES
            </Headline>
                <Button
                    mode="outlined"
                    disabled={props.community.beneficiaries.added.length === 0}
                    style={{ marginVertical: 5 }}
                    onPress={() => navigation.navigate('AddedScreen', { beneficiaries: props.community.beneficiaries.added })}
                    >
                    Added ({props.community.beneficiaries.added.length})
                </Button>
                <Button
                    mode="outlined"
                    disabled={props.community.beneficiaries.removed.length === 0}
                    style={{ marginVertical: 5 }}
                    onPress={() => navigation.navigate('RemovedScreen', { beneficiaries: props.community.beneficiaries.removed })}
                >
                    Removed ({props.community.beneficiaries.removed.length})
                </Button>
                <AddBeneficiary
                    addBeneficiaryCallback={() => {
                        const { _address } = props.network.contracts.communityContract;
                        getCommunityByContractAddress(_address)
                            .then((community) => props.updateCommunity(community!));
                    }}
                />
            </Card.Content>
        </Card>
    );
}

export default connector(Beneficiaries);