import Button from 'components/core/Button';
import Card from 'components/core/Card';
import { IRootState } from 'helpers/types/state';
// import ListManagers from 'components/ListManagers';
import React from 'react';
import { View } from 'react-native';
import { Headline } from 'react-native-paper';
import i18n from 'assets/i18n';
import { useNavigation } from '@react-navigation/native';

interface IManagersProps {
    managers: number;
}
function Managers(props: IManagersProps) {
    const navigation = useNavigation();

    const { managers } = props;

    return (
        <View>
            <Card style={{ marginTop: 16 }}>
                <Card.Content>
                    <Headline
                        style={{
                            opacity: 0.48,
                            fontFamily: 'Gelion-Bold',
                            fontSize: 13,
                            fontWeight: '500',
                            lineHeight: 12,
                            letterSpacing: 0.7,
                        }}
                    >
                        {i18n.t('beneficiaries').toUpperCase()}
                    </Headline>
                    <Button
                        modeType="gray"
                        bold={true}
                        disabled={managers === 0}
                        style={{ marginVertical: 5 }}
                        // onPress={() =>
                        //     navigation.navigate(Screens.AddedBeneficiary)
                        // }
                    >
                        {i18n.t('added')} ({managers})
                    </Button>
                    <Button
                        modeType="green"
                        bold={true}
                        style={{
                            marginVertical: 5,
                        }}
                        // onPress={() =>
                        //     navigation.navigate(Screens.AddBeneficiary)
                        // }
                    >
                        {i18n.t('addBeneficiary')}
                    </Button>
                </Card.Content>
            </Card>
        </View>
    );
}

export default Managers;
