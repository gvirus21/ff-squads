import { Box, Fade, FormHelperText, InputLabel } from '@mui/material';
import CreatableSelect from 'react-select/creatable';
import { Props as SelectProps } from 'react-select';
import { Control, Controller } from 'react-hook-form';
import { useMemo } from 'react';

export type Option = {
  label: string;
  value: string;
};

export interface GroupedOption {
  label: string;
  options: readonly Option[];
}

export type FormCreatableSelectProps = {
  control?: Control<any, object>;
  label?: string;
  name: string;
  required?: boolean;
  options?: GroupedOption[] | Option[];
} & Omit<SelectProps<Option>, 'options'>;

type SelectedOption = readonly Option[] | Option | null;

function isGroupedOption(option: GroupedOption | Option): option is GroupedOption {
  return (option as GroupedOption).options !== undefined;
}

const isGroupedOptionsArray = (arr: any) => arr.every((item: any) => isGroupedOption(item));

/**
 * FormCreatableSelect
 * Important: Only use this component inside the form with react-hook-form
 * Here, you can pass `control` param from useForm() in react-hook-form
 * Other parameters are based on FormCreatableSelectProps.
 */
export const FormCreatableSelect = ({
  id,
  label,
  name,
  control,
  options,
  required,
  isMulti,
  ...props
}: FormCreatableSelectProps) => {
  const flattenOptions: Option[] | null = useMemo(
    () =>
      options
        ? isGroupedOptionsArray(options)
          ? (options as GroupedOption[]).flatMap((item) => item.options)
          : (options as Option[])
        : null,
    [options]
  );

  return (
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
            <CreatableSelect
              options={options}
              value={
                isMulti
                  ? flattenOptions?.filter((option) => value?.includes(option?.value))
                  : flattenOptions?.find((option) => value === option.value)
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
};