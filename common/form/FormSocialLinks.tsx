/* eslint-disable */
import React from 'react';
import {
	Box,
	Fade,
	FormHelperText,
	InputAdornment,
	InputLabel,
	TextField,
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { SOCIAL_ICON_MAP } from '../../../config/constants';

export type FormSocialLinksProps = {
	control?: Control<any, object>;
	parentName: string;
	socialIds: string[];
	required?: boolean;
	label?: string;
};

/**
 * FormSocialLinks
 * Important: Only use this component inside the form with react-hook-form
 * Here, you can pass `control` param from useForm() in react-hook-form
 * Other parameters are based on FormSocialLinksProps.
 */
export const FormSocialLinks = ({
	label,
	parentName,
	control,
	required,
	socialIds,
}: FormSocialLinksProps) => {
	return (
		<>
			{label ? (
				<Box display='block' mb={1}>
					<InputLabel required={required}>{label}</InputLabel>
				</Box>
			) : (
				<></>
			)}
			{socialIds.map((socialId) => (
				<Box key={socialId}>
					<Controller
						name={`${parentName}.${socialId}`}
						control={control}
						render={({ field, fieldState: { invalid, error } }) => {
							const { icon: IconComponent } =
								SOCIAL_ICON_MAP[socialId as keyof typeof SOCIAL_ICON_MAP];
							return (
								<>
									<TextField
										{...field}
										name={`social-links-${parentName}.${socialId}`}
										size='small'
										error={invalid}
										fullWidth
										placeholder='https://domain.com/handle'
										InputProps={{
											startAdornment: (
												<InputAdornment
													position='start'
													sx={{
														height: '40px',
														width: '40px',
														position: 'absolute',
														left: 0,
														maxHeight: '40px',
														display: 'flex',
														justifyContent: 'center',
														background: '#616D6C',
													}}
												>
													<IconComponent />
												</InputAdornment>
											),
										}}
										sx={{ '& .MuiInputBase-root': { paddingLeft: '56px' } }}
									/>
									<Fade in={invalid}>
										<FormHelperText error>
											{error?.message || ' '}
										</FormHelperText>
									</Fade>
								</>
							);
						}}
					/>
				</Box>
			))}
		</>
	);
};
