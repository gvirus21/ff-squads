import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function TwitterIcon(props: SvgIconProps) {
	return (
		<SvgIcon viewBox='0 0 20 20' {...props}>
			<path d='M19.9608 2.80832C19.2121 3.138 18.4188 3.35561 17.6067 3.45416C18.4618 2.9402 19.102 2.1342 19.4092 1.18499C18.6167 1.64749 17.7383 1.98416 16.8033 2.17166C16.1865 1.51202 15.3691 1.07451 14.478 0.927076C13.587 0.779643 12.6722 0.930533 11.8758 1.35632C11.0793 1.7821 10.4457 2.45895 10.0734 3.28176C9.70104 4.10457 9.6108 5.0273 9.81667 5.90666C6.40833 5.74582 3.38917 4.10832 1.36667 1.63499C0.998995 2.25984 0.80722 2.97251 0.811667 3.69749C0.811667 5.12249 1.53667 6.37499 2.635 7.11082C1.98405 7.0901 1.34748 6.9141 0.778333 6.59749V6.64749C0.777964 7.59448 1.10522 8.51244 1.70459 9.24562C2.30395 9.9788 3.13851 10.4821 4.06667 10.67C3.46525 10.8311 2.83534 10.8553 2.22333 10.7408C2.48677 11.5558 2.99805 12.2683 3.68585 12.7787C4.37364 13.2892 5.20363 13.5722 6.06 13.5883C4.60961 14.7266 2.81873 15.3444 0.975 15.3425C0.65 15.3425 0.325833 15.3233 0 15.2867C1.87976 16.4903 4.06543 17.1292 6.2975 17.1275C13.8417 17.1275 17.9625 10.8808 17.9625 5.47332C17.9625 5.29832 17.9625 5.12332 17.95 4.94832C18.755 4.36904 19.4494 3.64984 20 2.82499L19.9608 2.80832Z' />
		</SvgIcon>
	);
}
