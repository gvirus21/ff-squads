import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function FilterChipDeleteIcon(props: SvgIconProps) {
	return (
		<SvgIcon {...props}>
			<path
				d='M14.6516 10.6516C14.9445 10.3588 14.9445 9.88388 14.6516 9.59099C14.3588 9.2981 13.8839 9.2981 13.591 9.59099L12 11.182L10.409 9.59099C10.1161 9.2981 9.64124 9.2981 9.34835 9.59099C9.05546 9.88388 9.05546 10.3588 9.34835 10.6517L10.9393 12.2426L9.34835 13.8336C9.05546 14.1265 9.05546 14.6014 9.34835 14.8943C9.64124 15.1872 10.1161 15.1872 10.409 14.8943L12 13.3033L13.591 14.8943C13.8839 15.1872 14.3588 15.1872 14.6517 14.8943C14.9445 14.6014 14.9445 14.1265 14.6517 13.8336L13.0607 12.2426L14.6516 10.6516Z'
				fill='#9C9C9C'
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z'
				fill='#9C9C9C'
			/>
		</SvgIcon>
	);
}
