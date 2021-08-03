import NetInfo from '@react-native-community/netinfo';
import i18n from 'assets/i18n';
import { showMessage } from 'react-native-flash-message';
import { OFFLINE, ONLINE } from 'redux-offline-queue';
import { eventChannel } from 'redux-saga';
import { put, take } from 'redux-saga/effects';

export function* startWatchingNetworkConnectivity(): any {
    const channel = eventChannel((emitter) => {
        const unsubscribe = NetInfo.addEventListener(emitter);
        return () => unsubscribe();
    });

    try {
        for (;;) {
            // This channel only get's initialized after the first connection state change has been detected.
            // After this event, the channel will remain listening for further connection state changes.
            const netStatus = yield take(channel);

            // Signal strength is only present in the wifi network and varies between 0..100.
            // In this case we are showing the toast only when the strength is lower than 40.
            if (netStatus.type === 'wifi' && netStatus.details.strength <= 40) {
                showMessage({
                    message: i18n.t('sagas.messages.yourNetworkisWeak'),
                    type: 'warning',
                });
            } else if (
                // in order to check the "strength" of wifi network we check if the connection is a 4g generation.
                netStatus.type === 'cellular' &&
                netStatus.details.cellularGeneration !== '4g'
            ) {
                showMessage({
                    message: i18n.t('sagas.messages.yourNetworkisWeak'),
                    type: 'warning',
                });
            }

            if (netStatus.isConnected) {
                yield put({ type: ONLINE });
                showMessage({
                    message: i18n.t('sagas.messages.yourNetworkisOnline'),
                    type: 'success',
                });
            } else {
                yield put({ type: OFFLINE });
                showMessage({
                    message: i18n.t('sagas.messages.yourNetworkisOffline'),
                    type: 'danger',
                    autoHide: !netStatus.isConnected,
                });
            }
        }
    } finally {
        channel.close();
    }
}
