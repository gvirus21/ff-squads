/* eslint-disable */
import React from 'react';
import {
	Box,
	FormControl,
	FormLabel,
	Rating,
	RatingProps,
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';

export type FormFamiliarityProps = {
	control?: Control<any, object>;
	label?: string;
	name: string;
} & RatingProps;

const labels = {
	1: 'Useless',
	2: 'Poor',
	3: 'Fairly well',
	4: 'Good',
	5: 'Excellent',
};

/**
 * FormFamiliarity
 * Important: Only use this component inside the form with react-hook-form
 * Here, you can pass `control` param from useForm() in react-hook-form
 * Other parameters are based on FormFamiliarityProps.
 */
export const FormFamiliarity = ({
	label,
	name,
	control,
	...props
}: FormFamiliarityProps) => (
	<Controller
		name={name}
		control={control}
		render={({ field: { value, ...field } }) => (
			<>
				<FormControl>
					<Box display='block' mb={1}>
						<FormLabel id={`rating-${name}`}>{label}</FormLabel>
					</Box>
					<Rating
						value={value}
						{...field}
						{...props}
						getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
						icon={
							<img src='/images/Rated.svg' alt='Rated' width={15} height={25} />
						}
						emptyIcon={
							<img
								src='/images/UnRated.svg'
								alt='Rated'
								width={15}
								height={25}
							/>
						}
						sx={{ '& .MuiRating-icon': { marginRight: '15px' } }}
					/>
					{value ? (
						<Box sx={{ mt: 1, color: '#C6C6C6' }}>
							{labels[value as keyof typeof labels]}
						</Box>
					) : (
						<></>
					)}
				</FormControl>
			</>
		)}
	/>
);
