import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CommunitiesSvg(props: { focused: boolean }) {
    return (
        <Svg width={36} height={32} viewBox="0 0 36 32" fill="none">
            <Path
                d="M5.606 21.935l3.901-4.42c1.36-.827 2.646-.973 3.86-.438 1.822.802 3.905 1.459 6.09 2.069 1.457.406 2.635.572 3.535.497 1.643.076 2.464.542 2.464 1.398 0 .856-1.143 1.432-3.429 1.73h-4.734 8.492c1.29-.222 2.275-.798 2.954-1.73.68-.932 2.065-2.253 4.155-3.964 1.299-.439 1.74.004 1.325 1.33-.622 1.986-2.835 5.732-4.46 7.423-1.625 1.69-4.053 3.683-7.732 3.683-3.678 0-5.47-1.458-8.995-1.458-2.35 0-5 .815-7.95 2.446L1 25.32"
                stroke={props.focused ? '#5E72E4' : '#7E8DA6'}
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M23.609 14.236l-.55.712a.9.9 0 001.45-.712h-.9zm-.042-.032l.553-.71a.9.9 0 00-1.112.005l.56.705zm.042-.033l-.56-.705a.9.9 0 00-.34.705h.9zm3.333-2.72l-.593-.676.593.677zM29.76 8.49l.767.47-.767-.47zm.082-.134l-.767-.472.767.472zm.61-5.405l.76-.481-.76.481zm-4.544-1.796l.273.858-.273-.858zm-2.34 2.939l-.89.125a.9.9 0 001.782 0l-.892-.125zm-2.339-2.939L21.5.298l-.272.857zm-4.543 1.796l-.76-.481.76.481zm.609 5.405l.767-.472-.767.472zm.082.134l-.767.47.767-.47zm6.15 5.682h.9a.9.9 0 00-.346-.71l-.554.71zm0 .064h-.9a.9.9 0 001.46.706l-.56-.706zm.083 0l.55-.712-.002-.001-.007-.006-.03-.023-1.106 1.42.033.025.008.007.002.002h.001l.55-.712zm-.9-.065v.065h1.8v-.065h-1.8zm1.46.704c.43-.342 2.517-2.002 3.366-2.746l-1.186-1.354c-.808.708-2.853 2.336-3.3 2.69l1.12 1.41zm3.366-2.746c1.443-1.263 2.475-2.328 2.991-3.169l-1.534-.94c-.361.587-1.207 1.498-2.643 2.755l1.186 1.354zm2.991-3.169l.082-.133-1.534-.943-.082.135 1.534.941zm.082-.133c.506-.823 1.095-1.763 1.326-2.804.25-1.115.083-2.28-.724-3.553l-1.52.963c.57.9.625 1.582.488 2.199-.155.69-.56 1.367-1.104 2.252l1.534.943zm.602-6.357C30.407 1.203 29.444.484 28.407.19 27.39-.1 26.416.05 25.634.297l.546 1.715c.583-.185 1.175-.252 1.734-.093.54.154 1.166.55 1.776 1.513l1.52-.963zM25.634.298c-1.561.496-2.71 1.907-2.958 3.67l1.783.25c.16-1.137.875-1.936 1.72-2.205L25.636.298zm-4.678 1.715c.846.269 1.56 1.068 1.72 2.206l1.783-.25C24.212 2.205 23.062.794 21.5.298l-.544 1.715zm-3.511 1.42c.61-.962 1.236-1.359 1.776-1.513.56-.159 1.15-.092 1.735.093L21.5.298c-.78-.248-1.755-.399-2.772-.109-1.037.295-2 1.014-2.803 2.28l1.52.964zm.616 4.451c-.545-.885-.95-1.561-1.104-2.252-.137-.617-.083-1.299.488-2.199l-1.52-.963c-.807 1.272-.973 2.438-.725 3.553.233 1.04.821 1.98 1.327 2.804l1.534-.943zm.082.135l-.082-.135-1.534.943.082.133 1.534-.94zm5.937 5.443a79.289 79.289 0 01-2.914-2.394 38.08 38.08 0 01-1.865-1.713c-.566-.563-.968-1.026-1.158-1.336l-1.534.941c.31.507.845 1.097 1.422 1.671a39.768 39.768 0 001.957 1.797 81.115 81.115 0 002.984 2.453l1.108-1.419zm-1.454.71v.064h1.8v-.064h-1.8zm.9.064l.56.706.002-.002.008-.007.03-.024-1.118-1.41-.03.024-.008.006-.002.002.558.705z"
                fill={props.focused ? '#5E72E4' : '#7E8DA6'}
            />
        </Svg>
    );
}

export default CommunitiesSvg;
