// taken from https://carbondesignsystem.com/guidelines/icons/library/

export default function ThreeDCurveManualIcon(props: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={props.className}>
                <path d="M15,21a3,3,0,0,1-3,3h-.1a5,5,0,1,0,0,2H12a5,5,0,0,0,5-5ZM7,28a3,3,0,1,1,3-3A3,3,0,0,1,7,28Z"/>
                <rect x="15" y="13" width="2" height="6"/>
                <path
                    d="M25,2a5,5,0,0,0-4.9,4H20a5,5,0,0,0-5,5h2a3,3,0,0,1,3-3h.1A5,5,0,1,0,25,2Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,25,10Z"/>
            </svg>
    );
}
