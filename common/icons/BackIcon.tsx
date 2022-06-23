import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function BackIcon(props: SvgIconProps) {
	return (
		<SvgIcon {...props}>
			<path
				d='M17 6.75C17.4142 6.75 17.75 6.41421 17.75 6C17.75 5.58579 17.4142 5.25 17 5.25V6.75ZM1 5.25C0.585787 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585787 6.75 1 6.75V5.25ZM4.47204 11.5327C4.76624 11.8243 5.24111 11.8222 5.53269 11.528C5.82427 11.2338 5.82216 10.7589 5.52796 10.4673L4.47204 11.5327ZM3.23703 9.25269L3.76499 8.72H3.76499L3.23703 9.25269ZM3.23703 2.74731L2.70907 2.21462H2.70907L3.23703 2.74731ZM5.52796 1.53269C5.82216 1.24111 5.82428 0.766238 5.53269 0.472041C5.24111 0.177844 4.76624 0.175726 4.47204 0.467309L5.52796 1.53269ZM1.01989 6.31333L0.275909 6.40816L0.275909 6.40816L1.01989 6.31333ZM1.01989 5.68667L0.275909 5.59184L0.275909 5.59184L1.01989 5.68667ZM17 5.25H1V6.75H17V5.25ZM5.52796 10.4673L3.76499 8.72L2.70907 9.78538L4.47204 11.5327L5.52796 10.4673ZM3.76499 3.28L5.52796 1.53269L4.47204 0.467309L2.70907 2.21462L3.76499 3.28ZM3.76499 8.72C3.0495 8.01086 2.55869 7.52282 2.22659 7.10929C1.904 6.7076 1.79332 6.44958 1.76387 6.2185L0.275909 6.40816C0.354695 7.02628 0.649627 7.54122 1.05706 8.04854C1.45498 8.54403 2.01863 9.10108 2.70907 9.78538L3.76499 8.72ZM2.70907 2.21462C2.01863 2.89892 1.45498 3.45597 1.05706 3.95146C0.649628 4.45878 0.354695 4.97372 0.275909 5.59184L1.76387 5.7815C1.79332 5.55042 1.904 5.2924 2.22659 4.89071C2.55869 4.47718 3.0495 3.98914 3.76499 3.28L2.70907 2.21462ZM1.76387 6.2185C1.74538 6.07341 1.74538 5.92659 1.76387 5.7815L0.275909 5.59184C0.241364 5.86286 0.241364 6.13714 0.275909 6.40816L1.76387 6.2185Z'
				fill='white'
			/>
		</SvgIcon>
	);
}