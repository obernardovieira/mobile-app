import i18n from 'assets/i18n';
import Button from 'components/core/Button';
import Modal from 'components/Modal';
import { getCurrencySymbol } from 'helpers/currency';
import React, { Component, Dispatch } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { Trans } from 'react-i18next';
import { batch, connect, ConnectedProps } from 'react-redux';
import { IRootState } from 'helpers/types/state';
import { BigNumber } from 'bignumber.js';
import { analytics } from 'services/analytics';
import * as Device from 'expo-device';
import { celoWalletRequest } from 'services/celoWallet';
import Api from 'services/api';
import { modalDonateAction, Screens } from 'helpers/constants';
import { ModalActionTypes } from 'helpers/types/redux';
import { navigationRef } from 'helpers/rootNavigation';

interface IConfirmModalProps {}
interface IConfirmModalState {
    donating: boolean;
}
class ConfirmModal extends Component<
    IConfirmModalProps & PropsFromRedux,
    IConfirmModalState
> {
    constructor(props: any) {
        super(props);
        this.state = {
            donating: false,
        };
    }

    donateWithCeloWallet = async () => {
        const { kit, userAddress, amountInDollars, community } = this.props;
        if (community === undefined) {
            return;
        }
        this.setState({ donating: true });
        const stableToken = await this.props.kit.contracts.getStableToken();
        const cUSDDecimals = await stableToken.decimals();
        const txObject = stableToken.transfer(
            community.contractAddress!,
            new BigNumber(amountInDollars)
                .multipliedBy(new BigNumber(10).pow(cUSDDecimals))
                .toString()
        ).txo;
        batch(() => {
            this.props.setInProgress(true);
            this.props.dismissModal();
        });
        navigationRef.current?.navigate(Screens.WaitingTx);
        celoWalletRequest(
            userAddress,
            stableToken.address,
            txObject,
            'donatetocommunity',
            kit
        )
            .then((tx) => {
                console.log('tx', tx);
                if (tx === undefined) {
                    return;
                }
                // TODO: wait for tx confirmation and request UI update
                // update donated values
                this.props.setInProgress(false);
                analytics('donate', { device: Device.brand, success: 'true' });
            })
            .catch((e) => {
                Api.uploadError(userAddress, 'donate', e);
                analytics('donate', { device: Device.brand, success: 'false' });
                // TODO: 'nonce too low' have happened here!
                navigationRef.current?.goBack();
                Alert.alert(
                    i18n.t('failure'),
                    i18n.t('errorDonating'),
                    [{ text: 'OK' }],
                    { cancelable: false }
                );
            })
            .finally(() => this.setState({ donating: false }));
    };

    render() {
        const {
            visible,
            dismissModal,
            // user,
            community,
            // confirmAmount,
            // goBack,
            // donateWithCeloWallet,
            amountDonate,
            amountInDollars,
            goBackToDonateModal,
            userCurrency,
        } = this.props;
        const { donating } = this.state;

        // const amountInDollars =
        //     parseFloat(formatInputAmountToTransfer(confirmAmount)) /
        //     this.props.user.exchangeRate;

        if (community === undefined) {
            return null;
        }

        return (
            <Modal
                title={i18n.t('donateSymbol', {
                    symbol: userCurrency,
                })}
                visible={visible}
                buttons={
                    <View
                        style={{
                            height: 42 /** TODO: this is currently th buttons height */,
                        }}
                    >
                        <View
                            style={{
                                flex: 2,
                                flexDirection: 'row',
                            }}
                        >
                            <Button
                                modeType="gray"
                                bold={true}
                                style={{
                                    marginRight: 14.48,
                                    flex: 1,
                                }}
                                labelStyle={styles.donateLabel}
                                onPress={goBackToDonateModal}
                            >
                                {i18n.t('backWithSymbol')}
                            </Button>
                            <Button
                                modeType="default"
                                bold={true}
                                style={{ flex: 1 }}
                                loading={donating}
                                labelStyle={styles.donateLabel}
                                onPress={this.donateWithCeloWallet}
                            >
                                {i18n.t('donate')}
                            </Button>
                        </View>
                    </View>
                }
                onDismiss={dismissModal}
            >
                <Paragraph
                    style={{
                        marginHorizontal: 44,
                        marginVertical: 50,
                        fontSize: 19,
                        lineHeight: 23,
                        textAlign: 'center',
                    }}
                >
                    <Trans
                        i18nKey="donateConfirmMessage"
                        values={{
                            symbol: getCurrencySymbol(userCurrency),
                            amount: amountDonate
                                .trim()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                            amountInDollars: amountInDollars.toFixed(2),
                            to: community.name,
                        }}
                        components={{
                            bold: (
                                <Text
                                    style={{
                                        fontFamily: 'Gelion-Bold',
                                    }}
                                />
                            ),
                        }}
                    />
                </Paragraph>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    donate: {
        borderRadius: 0,
        height: 69,
    },
    donateLabel: {
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: 0.3,
    },
});

const mapStateToProps = (state: IRootState) => {
    const { kit } = state.app;
    const { address, currency } = state.user.metadata;
    const { inputAmount, amountInDollars } = state.modalDonate.donationValues;
    const { modalConfirmOpen, community } = state.modalDonate;
    return {
        kit,
        amountDonate: inputAmount,
        amountInDollars,
        userAddress: address,
        userCurrency: currency,
        visible: modalConfirmOpen,
        community: community,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ModalActionTypes>) => {
    return {
        goBackToDonateModal: () =>
            dispatch({ type: modalDonateAction.GO_BACK_TO_DONATE }),
        dismissModal: () => dispatch({ type: modalDonateAction.CLOSE }),
        setInProgress: (inProgress: boolean) =>
            dispatch({
                type: modalDonateAction.IN_PROGRESS,
                payload: inProgress,
            }),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ConfirmModal);
