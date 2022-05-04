import {
  Fade,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from '@mui/material'
import { Control, Controller } from 'react-hook-form'

export type RadioOption = {
  label: string
  value: string | number
}

export type FormRadioGroupProps = {
  control?: Control<any, object>
  label?: string
  name: string
  required?: boolean
  options: RadioOption[]
} & RadioGroupProps

/**
 * FormRadioGroup
 * Important: Only use this component inside the form with react-hook-form
 * Here, you can pass `control` param from useForm() in react-hook-form
 * Other parameters are based on FormRadioGroupProps.
 */
export const FormRadioGroup = ({ id, label, name, control, options, required, ...props }: FormRadioGroupProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { invalid, error } }) => (
      <>
        <FormControl>
          <FormLabel id={`radio-group-${name}`} required={required}>
            {label}
          </FormLabel>
          <RadioGroup aria-labelledby={`radio-group-${name}`} {...field} {...props}>
            {options.map((item, index) => (
              <FormControlLabel value={item.value} control={<Radio color="success" />} label={item.label} key={index} />
            ))}
          </RadioGroup>
        </FormControl>
        <Fade in={invalid}>
          <FormHelperText error>{error?.message || ' '}</FormHelperText>
        </Fade>
      </>
    )}
  />
)
