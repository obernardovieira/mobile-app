import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function WaitingRedSvg() {
    return (
        <Svg width={62} height={62} viewBox="0 0 62 62" fill="none">
            <Path
                d="M52.92 9.08C47.065 3.225 39.28 0 31 0 22.72 0 14.935 3.225 9.08 9.08S0 22.72 0 31c0 8.28 3.225 16.065 9.08 21.92S22.72 62 31 62a30.95 30.95 0 0016.04-4.468 2.422 2.422 0 10-2.51-4.142A26.108 26.108 0 0131 57.155C16.577 57.156 4.844 45.423 4.844 31 4.844 16.577 16.577 4.844 31 4.844c14.423 0 26.156 11.733 26.156 26.156 0 5.157-1.533 10.177-4.435 14.517a2.422 2.422 0 004.027 2.692C60.184 43.07 62 37.12 62 31c0-8.28-3.225-16.065-9.08-21.92z"
                fill="#EB5757"
            />
            <Path
                d="M31 9.203a2.422 2.422 0 00-2.422 2.422v18.372l-8.88 8.88a2.422 2.422 0 103.424 3.426l9.59-9.59c.455-.455.71-1.07.71-1.713V11.625A2.422 2.422 0 0031 9.203z"
                fill="#EB5757"
            />
        </Svg>
    );
}

export default WaitingRedSvg;