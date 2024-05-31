// taken from https://carbondesignsystem.com/guidelines/icons/library/

export default function BrightnessContrastIcon(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={props.className}>
      <rect x="15" y="2" width="2" height="3" />
      <rect x="27" y="15" width="3" height="2" />
      <rect x="15" y="27" width="2" height="3" />
      <rect x="2" y="15" width="3" height="2" />
      <rect
        x="6.22"
        y="5.73"
        width="2"
        height="3"
        transform="translate(-3 7.23) rotate(-45)"
      />
      <rect
        x="23.27"
        y="6.23"
        width="3"
        height="2"
        transform="translate(2.14 19.63) rotate(-45)"
      />
      <rect
        x="23.77"
        y="23.27"
        width="2"
        height="3"
        transform="translate(-10.26 24.77) rotate(-45)"
      />
      <polygon points="5.47 25.13 7.59 23 9 24.42 6.88 26.54 5.47 25.13" />
      <path d="M16,8a8,8,0,1,0,8,8A8,8,0,0,0,16,8Zm0,14a6,6,0,0,1,0-12Z" />
    </svg>
  )
}
