import axios from 'axios';
import config from '../config';
import { ICommunity, IBeneficiary } from '../helpers/types';


axios.defaults.baseURL = config.baseApiUrl;

async function getAllValidCommunities(): Promise<ICommunity[]> {
    let response = [] as ICommunity[];
    try {
        // handle success
        const result = await axios.get('/community/all/valid')
        response = result.data;
    } catch (error) {
        // handle error
    } finally {
        // always executed
    }
    return response;
}

async function requestCreateCommunity(
    requestByAddress: string,
    name: string,
    description: string,
    location: {
        title: string,
        latitude: number,
        longitude: number,
    },
    coverImage: string,
    txCreationObj: any,
): Promise<boolean> {
    let response = 500;
    try {
        // handle success
        const requestBody = {
            requestByAddress,
            name,
            description,
            location,
            coverImage,
            txCreationObj,
        };
        const requestHeaders = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };
        const result = await axios.post('/community/request', requestBody, requestHeaders);
        response = result.status;
    } catch (error) {
        // handle error
    } finally {
        // always executed
    }
    return response === 200 ? true : false;
}

async function requestJoinAsBeneficiary(
    walletAddress: string,
    communityPublicId: string,
): Promise<boolean> {
    let response = 500;
    try {
        // handle success
        const requestBody = {
            walletAddress,
            communityPublicId
        };
        const requestHeaders = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };
        const result = await axios.post('/beneficiary/request', requestBody, requestHeaders);
        response = result.status;
    } catch (error) {
        // handle error
    } finally {
        // always executed
    }
    return response === 200 ? true : false;
}

async function getBeneficiariesRequestByCommunity(
    communityPublicId: string,
): Promise<IBeneficiary[]> {
    let response = [] as IBeneficiary[];
    try {
        const result = await axios.get(`/beneficiary/${communityPublicId}`);
        response = result.data;
    } catch (error) {
        // handle error
    } finally {
        // always executed
    }
    return response;
}

async function getBeneficiariesByCommunity(
    communityContractAddress: string,
): Promise<IBeneficiary[]> {
    let response = [] as IBeneficiary[];
    try {
        const communityPublicId =
            (await getCommunityByContractAddress(communityContractAddress))!
                .publicId;
        const result = await axios.get(`/transactions/beneficiariesof/${communityContractAddress}`);
        response = result.data.map((b: any) => ({
            walletAddress: b.values._account,
            communityPublicId,
            createdAt: b.createdAt,
            updatedAt: b.updatedAt,
        }));
    } catch (error) {
        // handle error
    } finally {
        // always executed
    }
    return response;
}

async function findComunityToBeneficicary(
    beneficiaryAddress: string,
): Promise<ICommunity | undefined> {
    let response: ICommunity | undefined = undefined;
    try {
        const result = await axios.get(`/transactions/beneficiaryin/${beneficiaryAddress}`);
        if (result.data === "") {
            response = undefined;
        } else {
            response = result.data;
        }
    } catch (error) {
        // handle error
    } finally {
        // always executed
    }
    return response;
}

async function findComunityToManager(
    managerAddress: string,
): Promise<ICommunity | undefined> {
    let response: ICommunity | undefined = undefined;
    try {
        const result = await axios.get(`/transactions/managerin/${managerAddress}`);
        if (result.data === "") {
            response = undefined;
        } else {
            response = result.data;
        }
    } catch (error) {
        // handle error
    } finally {
        // always executed
    }
    return response;
}

async function acceptBeneficiaryRequest(
    acceptanceTransaction: string,
    communityPublicId: string,
): Promise<boolean> {
    let response = 500;
    try {
        // handle success
        const requestBody = {
            acceptanceTransaction,
            communityPublicId
        };
        const requestHeaders = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };
        const result = await axios.post('/beneficiary/accept', requestBody, requestHeaders);
        response = result.status;
    } catch (error) {
        // handle error
    } finally {
        // always executed
    }
    return response === 200 ? true : false;
}

async function getCommunityByContractAddress(
    communityContractAddress: string,
): Promise<ICommunity | undefined> {
    let response: ICommunity = undefined as any;
    try {
        const result = await axios.get(`/community/address/${communityContractAddress}`);
        response = result.data as ICommunity;
    } catch (error) {
        // handle error
    } finally {
        // always executed
    }
    return response;
}

export {
    getAllValidCommunities,
    requestCreateCommunity,
    requestJoinAsBeneficiary,
    getBeneficiariesRequestByCommunity,
    getBeneficiariesByCommunity,
    findComunityToBeneficicary,
    findComunityToManager,
    acceptBeneficiaryRequest,
    getCommunityByContractAddress,
}