import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function MirrorIcon(props: SvgIconProps) {
	return (
		<SvgIcon viewBox='0 0 15 20' {...props}>
			<path d='M14.375 7.8125C14.375 12.1272 11.157 15.625 7.1875 15.625C3.21795 15.625 0 12.1272 0 7.8125C0 3.49778 3.21795 0 7.1875 0C11.157 0 14.375 3.49778 14.375 7.8125Z' />
			<path d='M0.000625825 7.70833H14.3744L14.3756 20H0.000625825V7.70833Z' />
		</SvgIcon>
	);
}
