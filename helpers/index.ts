import { ICommunityInfo } from "./types";
import config from "../config";
import BigNumber from "bignumber.js";


export function claimFrequencyToText(frequency: BigNumber | string): string {
    const f = new BigNumber(frequency);
    if (f.eq(86400)) return 'day';
    if (f.eq(604800)) return 'week';
    return 'month';
}

// cUSD has 18 zeros!
export function humanifyNumber(inputNumber: BigNumber | string): string {
    const decimals = new BigNumber(10).pow(config.cUSDDecimals);
    return new BigNumber(inputNumber).div(decimals).toString();
}

export function calculateCommunityProgress(
    toCalculte: string /*'raised' | 'claimed'*/,
    community: ICommunityInfo
): number {
    const m = new BigNumber(community.vars._claimHardCap)
        .multipliedBy(community.beneficiaries.length);
    // in theory, it's the total claimed is relative to the total raised.
    // But to draw the progress bar, it's relative to the progress bar size.
    const result = new BigNumber(
        toCalculte === 'raised' ? community.totalRaised : community.totalClaimed
    ).div(m.eq(0) ? 1 : m);
    return parseFloat(result.toFixed(2));
}

export function getCountryFromPhoneNumber(phoneNumber: string) {
    console.log(phoneNumber);
    if (phoneNumber.slice(0, 4) === '+351') {
        return '🇵🇹 Portugal'
    }
}

export var iptcColors = {
    greenishTeal: "#2dce89",
    softBlue: "#5e72e4"
}