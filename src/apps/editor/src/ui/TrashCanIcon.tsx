// taken from https://carbondesignsystem.com/guidelines/icons/library/

export default function TrashCanIcon(props: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={props.className}>
            <rect x="12" y="12" width="2" height="12"/><rect x="18" y="12" width="2" height="12"/><path d="M4,6V8H6V28a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V8h2V6ZM8,28V8H24V28Z"/>
        </svg>
    );
}
