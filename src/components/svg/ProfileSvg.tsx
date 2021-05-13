import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { ipctColors } from 'styles/index';

function ProfileSvg(props: { focused: boolean }) {
    return (
        <Svg width={30} height={30} viewBox="0 0 30 30" {...props}>
            <G
                fill={
                    props.focused ? ipctColors.blueRibbon : ipctColors.darBlue
                }
                fillRule="nonzero"
            >
                <Path d="M15 0C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15zm0 1.338c7.546 0 13.662 6.116 13.662 13.662 0 7.546-6.116 13.662-13.662 13.662-7.546 0-13.662-6.116-13.662-13.662C1.338 7.454 7.454 1.338 15 1.338z" />
                <Path d="M15.129 6c-2.16 0-3.928 1.815-3.928 4a3.933 3.933 0 003.928 3.928A3.933 3.933 0 0019.056 10c0-2.185-1.768-4-3.927-4zm0 1.364c1.397 0 2.563 1.206 2.563 2.636a2.566 2.566 0 01-2.563 2.564A2.566 2.566 0 0112.565 10c0-1.43 1.166-2.636 2.564-2.636zM11.176 18.715c.29 0 .54.187.63.457l.025.105.008.1v4.489l-.132.095a10.519 10.519 0 01-.762-.28l-.372-.162-.059-.09v-4.06l.009-.1a.662.662 0 01.653-.554zm7.625 0c.29 0 .54.187.629.457l.026.105.007.1v4.04l-.058.09c-.246.114-.496.217-.75.311l-.385.134-.13-.095v-4.489l.008-.099a.662.662 0 01.653-.554zM11.176 14.9h7.625l.217.005a4.483 4.483 0 014.237 4.043l.016.214.005.214-.022 1.12c-.26.323-.538.632-.833.924l-.302.285-.167-.073v-2.253l-.006-.182a3.157 3.157 0 00-2.781-2.954l-.183-.015-.18-.005h-7.623l-.181.005a3.156 3.156 0 00-2.951 2.784l-.016.182-.005.182v2.28l-.168.073a8.9 8.9 0 01-.935-.98l-.223-.286.002-1.09.005-.213a4.483 4.483 0 014.041-4.24l.214-.015.214-.005z" />
            </G>
        </Svg>
    );
}

export default ProfileSvg;
