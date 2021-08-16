import { communitiesAction } from 'helpers/constants';
import {
    createCommunitySuccess,
    createCommunityFailure,
} from 'helpers/redux/actions/communities';
import { CommunityCreationAttributes } from 'helpers/types/endpoints';
import Api from 'services/api';
import { call, put, all, takeEvery } from 'typed-redux-saga';

const _createCommunity = async (
    coverImage: string,
    communityDetails: CommunityCreationAttributes
) => await Api.community.create(coverImage, communityDetails);

export function* createCommunity({ payload }: any) {
    try {
        const { coverImage, communityDetails } = payload;

        const community = yield call(
            _createCommunity,
            coverImage,
            communityDetails
        );

        yield put(createCommunitySuccess(community.data));
    } catch (err) {
        yield put(createCommunityFailure(err));
    }
}

export default all([
    takeEvery(communitiesAction.CREATE_COMMUNITY_REQUEST, createCommunity),
]);
