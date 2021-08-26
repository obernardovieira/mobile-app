import * as React from 'react';
import Svg, { Path, G, SvgProps } from 'react-native-svg';
import { ipctColors } from 'styles/index';

function BeneficiariesSvg(props: SvgProps) {
    return (
        <Svg
            width={props.width || 12}
            height={props.height || 12}
            viewBox="0 0 12 12"
            fill="none"
            {...props}
        >
            <Path
                d="M10.268 6.406H9.34c.094.259.146.538.146.83v3.507c0 .122-.021.238-.06.347h1.535A1.04 1.04 0 0012 10.05V8.138c0-.955-.777-1.732-1.732-1.732zM2.514 7.236c0-.292.052-.571.146-.83h-.928C.777 6.406 0 7.183 0 8.138v1.912c0 .573.466 1.04 1.04 1.04h1.534a1.035 1.035 0 01-.06-.347V7.236zM7.06 5.503H4.94c-.956 0-1.733.778-1.733 1.733v3.507c0 .191.155.347.346.347h4.894a.346.346 0 00.346-.347V7.236c0-.955-.777-1.733-1.732-1.733zM6 .91a2.086 2.086 0 00-2.083 2.084A2.085 2.085 0 007.018 4.81a2.085 2.085 0 001.065-1.817A2.086 2.086 0 006 .91zM2.342 2.852A1.56 1.56 0 00.784 4.41a1.56 1.56 0 002.172 1.432A1.568 1.568 0 003.9 4.41a1.56 1.56 0 00-1.558-1.558zM9.658 2.852a1.56 1.56 0 00-1.375 2.29 1.568 1.568 0 001.375.826 1.56 1.56 0 001.558-1.558 1.56 1.56 0 00-1.558-1.558z"
                fill={ipctColors.blueGray}
            />
        </Svg>
    );
}

export default BeneficiariesSvg;
