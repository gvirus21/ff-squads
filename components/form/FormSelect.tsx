import { Box, Fade, FormHelperText, InputLabel } from '@mui/material';
import Select, { Props as SelectProps } from 'react-select';
import { Control, Controller } from 'react-hook-form';

type Option = {
  label: string;
  value: string;
};

export type FormSelectProps = {
  control?: Control<any, object>;
  label?: string;
  name: string;
  required?: boolean;
  options: Option[];
} & SelectProps<Option>;

type SelectedOption = readonly Option[] | Option | null;

/**
 * FormSelect
 * Important: Only use this component inside the form with react-hook-form
 * Here, you can pass `control` param from useForm() in react-hook-form
 * Other parameters are based on FormSelectProps.
 */
export const FormSelect = ({ id, label, name, control, options, required, isMulti, ...props }: FormSelectProps) => (
  <>
    {label ? (
      <Box display="block" mb={1}>
        <InputLabel htmlFor={id ?? `select-${name}`} required={required}>
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
          <Select
            options={options}
            value={
              isMulti
                ? options?.filter((option) => value?.includes(option?.value))
                : options?.find((option) => value === option.value)
            }
            onChange={(selectedOption: SelectedOption) =>
              Array.isArray(selectedOption)
                ? onChange(selectedOption?.map((option) => option.value))
                : onChange((selectedOption as Option | null)?.value)
            }
            {...field}
            {...props}
            id={id ?? `select-${name}`}
            isMulti={isMulti}
          />
          <Fade in={invalid}>
            <FormHelperText error>{error?.message || ' '}</FormHelperText>
          </Fade>
        </>
      )}
    />
  </>
);
