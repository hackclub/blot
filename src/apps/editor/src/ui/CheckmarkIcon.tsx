// taken from https://carbondesignsystem.com/guidelines/icons/library/

export default function CheckmarkIcon(props: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={props.className}>
            <polygon points="13 24 4 15 5.414 13.586 13 21.171 26.586 7.586 28 9 13 24" />
        </svg>
    );
}
