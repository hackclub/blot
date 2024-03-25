// taken from https://carbondesignsystem.com/guidelines/icons/library/

export default function KeyboardIcon(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={props.className}>
      <path d="M28,26H4a2,2,0,0,1-2-2V10A2,2,0,0,1,4,8H28a2,2,0,0,1,2,2V24A2,2,0,0,1,28,26ZM4,10V24H28V10Z" />
      <rect x="10" y="20" width="11" height="2" />
      <rect x="6" y="12" width="2" height="2" />
      <rect x="10" y="12" width="2" height="2" />
      <rect x="14" y="12" width="2" height="2" />
      <rect x="18" y="12" width="2" height="2" />
      <rect x="6" y="20" width="2" height="2" />
      <rect x="6" y="16" width="2" height="2" />
      <rect x="10" y="16" width="2" height="2" />
      <rect x="14" y="16" width="2" height="2" />
      <rect x="22" y="12" width="4" height="2" />
      <rect x="22" y="16" width="4" height="2" />
      <rect x="18" y="16" width="2" height="2" />
      <rect x="23" y="20" width="3" height="2" />
    </svg>
  )
}
