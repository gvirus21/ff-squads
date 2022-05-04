import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'

export default function FoundationIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect width="20" height="20" rx="3" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.56052 7.27674C7.75142 7.7045 7.05865 8.77827 7.05865 9.6043C7.05865 10.7615 7.98357 11.9587 9.1145 12.2653C10.0227 12.5115 10.8683 12.2949 11.6082 11.6263C13.0581 10.3165 12.7425 8.08081 10.9866 7.22343C10.0973 6.78913 9.45578 6.80321 8.56052 7.27674ZM3.17121 9.55955C2.37552 10.935 1.76807 12.1042 1.82137 12.1577C1.97374 12.31 7.59604 12.2708 7.53351 12.1178C7.4482 11.9089 4.68163 7.05833 4.64777 7.05833C4.63152 7.05833 3.96707 8.18389 3.17121 9.55955ZM13.0006 7.27137C12.9538 7.39357 12.9366 8.54595 12.9622 9.8321L13.0091 12.1707H15.5234H18.0377V9.65643V7.14214L15.5618 7.09571C13.6278 7.0595 13.0673 7.09789 13.0006 7.27137Z"
      />
    </SvgIcon>
  )
}
