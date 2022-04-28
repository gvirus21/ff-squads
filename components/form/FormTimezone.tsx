import { Box, Fade, FormHelperText, InputLabel } from '@mui/material';
import TimezoneSelect, { Props as TimezoneSelectProps, allTimezones } from 'react-timezone-select';
import { Control, Controller } from 'react-hook-form';

export type FormTimezoneProps = {
  control?: Control<any, object>;
  label?: string;
  name: string;
  required?: boolean;
} & Omit<TimezoneSelectProps, 'value'>;

/**
 * FormTimezone
 * Important: Only use this component inside the form with react-hook-form
 * Here, you can pass `control` param from useForm() in react-hook-form
 * Other parameters are based on FormTimezoneProps.
 */
export const FormTimezone = ({ label, name, control, required, ...props }: FormTimezoneProps) => (
  <>
    {label ? (
      <Box display="block" mb={1}>
        <InputLabel htmlFor={`timezone-${name}`} required={required}>
          {label}
        </InputLabel>
      </Box>
    ) : (
      <></>
    )}
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...field }, fieldState: { invalid, error } }) => (
        <>
          <TimezoneSelect
            value={value}
            onChange={(selectedOption) => onChange(selectedOption.value)}
            {...field}
            {...props}
            id={`timezone-${name}`}
          />
          <Fade in={invalid}>
            <FormHelperText error>{error?.message || ' '}</FormHelperText>
          </Fade>
        </>
      )}
    />
  </>
);
