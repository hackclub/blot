// taken from https://carbondesignsystem.com/guidelines/icons/library/

export default function CenterToFitIcon(props: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={props.className}>
            <polygon points="8 2 2 2 2 8 4 8 4 4 8 4 8 2"/>
            <polygon points="24 2 30 2 30 8 28 8 28 4 24 4 24 2"/>
            <polygon points="8 30 2 30 2 24 4 24 4 28 8 28 8 30"/>
            <polygon points="24 30 30 30 30 24 28 24 28 28 24 28 24 30"/>
            <path d="M24,24H8a2.0023,2.0023,0,0,1-2-2V10A2.0023,2.0023,0,0,1,8,8H24a2.0023,2.0023,0,0,1,2,2V22A2.0023,2.0023,0,0,1,24,24ZM8,10V22H24V10Z"/>
        </svg>
    );
}
