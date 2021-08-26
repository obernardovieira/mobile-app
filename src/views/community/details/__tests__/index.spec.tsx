import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { act, render } from '@testing-library/react-native';
import combinedReducer from 'helpers/redux/reducers';
import { CommunityAttributes } from 'helpers/types/models';
import React from 'react';
import { Host } from 'react-native-portalize';
import * as reactRedux from 'react-redux';
import { createStore } from 'redux';

import CommunityDetailsScreen from '../';

// TODO: why is useDispatch behaving different from create community?
jest.mock('react-redux', () => ({
    ...(jest.requireActual('react-redux') as any),
    useSelector: jest.fn(),
    // useDispatch: jest.fn(),
    batch: jest.fn(),
}));

const community: CommunityAttributes = {
    id: 1,
    publicId: '3f49b131-e097-4155-8f28-46c95590d42f',
    requestByAddress: '0xb10199414d158a264e25a5ec06b463c0cd8457bb',
    contractAddress: '0xd48466ffc8b6190d33fb6b27035a032658d392ee',
    name: 'Example Community',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis interdum justo, nec sollicitudin lectus. Quisque malesuada metus lacinia facilisis pretium. Maecenas semper lacus id ante porttitor, non ultricies nunc suscipit. Vestibulum hendrerit eros vel mollis blandit. Nam tincidunt libero nunc, sed gravida tortor vulputate ut. Donec ullamcorper dui erat, vitae consectetur neque auctor sit amet. Aliquam a lacus congue, scelerisque orci vitae, accumsan tellus. Nunc ultrices convallis euismod.',
    city: 'Lauro de Freitas',
    country: 'BR',
    gps: { latitude: 1, longitude: 2 },
    email: 'eu@amigos.txt',
    visibility: 'public',
    status: 'valid',
    createdAt: new Date(),
    updatedAt: new Date(),
    currency: 'BRL',
    descriptionEn: null,
    language: 'pt',
    started: new Date(),
    coverMediaId: 260,
    contract: {
        claimAmount: '750000000000000000',
        maxClaim: '400000000000000000000',
        baseInterval: 86400,
        incrementInterval: 300,
        createdAt: new Date(),
        updatedAt: new Date(),
        communityId: 1,
    },
    state: {
        claimed: '61942500000000000000000',
        claims: 55405,
        beneficiaries: 656,
        raised: '62151145240504400207738',
        backers: 37,
        createdAt: new Date(),
        updatedAt: new Date(),
        removedBeneficiaries: 668,
        managers: 4,
        communityId: 1,
    },
    cover: {
        id: 2,
        url: 'https://dzrx8kf1cwjv9.cloudfront.net/cover/1620119094527.jpeg',
        width: 800,
        height: 800,
        thumbnails: [
            {
                id: 1,
                mediaContentId: 2,
                url:
                    'https://dzrx8kf1cwjv9.cloudfront.net/cover/330x330/1620119095297.jpeg',
                width: 330,
                height: 330,
                pixelRatio: 1,
            },
        ],
    },
};

/**
 * NOTE: we are testing the component individually, but need the header
 * "submit button", so the entire navigator can be faked.
 */
function FakeCreateCommunityScreen() {
    const Stack = createStackNavigator();
    const store = createStore(combinedReducer);
    return (
        <Host>
            <reactRedux.Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Home"
                            component={CommunityDetailsScreen}
                            initialParams={{
                                route: {
                                    params: {
                                        communityId: 1,
                                    },
                                },
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </reactRedux.Provider>
        </Host>
    );
}

describe('details [snapshot]', () => {
    const useSelectorMock = reactRedux.useSelector as jest.Mock<any, any>;

    beforeAll(() => {
        useSelectorMock.mockImplementation((callback) => {
            return callback({
                app: {
                    exchangeRates: { USD: 1 },
                },
                user: {
                    metadata: {
                        currency: 'USD',
                        avatar: 'something.jpg',
                    },
                    wallet: {
                        address: '0xd7632B7588DF8532C0aBA55586167C2a315Fd768',
                    },
                },
                communities: {
                    community,
                },
            });
        });
    });

    it('renders correctly', async () => {
        const tree = render(<FakeCreateCommunityScreen />);
        await act(async () => {});
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
