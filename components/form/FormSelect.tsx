import { Box, Fade, FormHelperText, InputLabel } from '@mui/material'
import Image from 'next/image'
import { ReactNode, useMemo } from 'react'
import { Control, Controller } from 'react-hook-form'
import Select, { Props as SelectProps, components, OptionProps } from 'react-select'

export type SelectOption = {
  label: string
  value: string
  icon?: any
}

export interface GroupedOption {
  label: string
  options: readonly SelectOption[]
}

export type FormSelectProps = {
  control?: Control<any, object>
  label?: string
  name: string
  required?: boolean
  options: GroupedOption[] | SelectOption[]
} & Omit<SelectProps<SelectOption>, 'options'>

type SelectedOption = readonly SelectOption[] | SelectOption | null

function isGroupedOption(option: GroupedOption | SelectOption): option is GroupedOption {
  return (option as GroupedOption).options !== undefined
}

const isGroupedOptionsArray = (arr: any) => arr.every((item: any) => isGroupedOption(item))

const { Option: OptionComponent } = components

const IconOption = (props: OptionProps<SelectOption>) => {
  const { data } = props
  const { icon: IconComponent, label } = data

  return (
    <OptionComponent {...props}>
      <Box display="flex" alignItems="center">
        <Box marginRight={1} display="flex" alignItems="center">
          {IconComponent && <IconComponent />}
        </Box>
        {label}
      </Box>
    </OptionComponent>
  )
}

/**
 * FormSelect
 * Important: Only use this component inside the form with react-hook-form
 * Here, you can pass `control` param from useForm() in react-hook-form
 * Other parameters are based on FormSelectProps.
 */
export const FormSelect = ({ id, label, name, control, options, required, isMulti, ...props }: FormSelectProps) => {
  const flattenOptions: SelectOption[] | null = useMemo(
    () =>
      isGroupedOptionsArray(options)
        ? (options as GroupedOption[]).flatMap((item) => item.options)
        : (options as SelectOption[]),
    [options]
  )

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
            <Select
              options={options}
              value={
                isMulti
                  ? flattenOptions?.filter((option) => value?.includes(option?.value))
                  : flattenOptions?.find((option) => value === option.value)
              }
              onChange={(selectedOption: SelectedOption) =>
                Array.isArray(selectedOption)
                  ? onChange(selectedOption?.map((option) => option.value))
                  : onChange((selectedOption as SelectOption | null)?.value)
              }
              {...field}
              {...props}
              id={id ?? `select-${name}`}
              isMulti={isMulti}
              components={{ Option: IconOption }}
              styles={{
                control: (styles) => ({
                  ...styles,
                  backgroundColor: 'transparent',
                  color: '#F5FFF4',
                }),
                
                multiValue: (styles, { data }) => ({
                  ...styles,
                  backgroundColor: '#8C79E2',
                  color: '#11151F',
                  borderRadius: '8px',
                  boxShadow : '0px 3.17565px 3.17565px rgba(0, 0, 0, 0.25)'
                }),
                multiValueLabel: (styles, { data }) => ({
                  ...styles,
                  color: '#F5FFF4',
                  fontSize: 16,
                  fontWeight: 600,
                }),
                multiValueRemove: (styles, { data }) => ({
                  ...styles,
                  color: '#F5FFF4',
                  ':hover': {
                    cursor: 'pointer',
                  },
                }),
                menu: (styles) => ({
                  ...styles,
                  backgroundColor: '#11151F',
                  border: '1px solid #F5FFF4',
                  
                }),
                input: (styles) => ({
                  ...styles,   
                       color: '#F5FFF4',
                }),
                
              }}
            />
            <Fade in={invalid}>
              <FormHelperText error>{error?.message || ' '}</FormHelperText>
            </Fade>
          </>
        )}
      />
    </>
  )
}
