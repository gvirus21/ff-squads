import { Box, Fade, FormHelperText, TextField, TextFieldProps, InputLabel } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

export type FormTextInputProps = {
  control?: Control<any, object>
  name: string
  required?: boolean
} & TextFieldProps

/**
 * FormTextInput
 * Important: Only use this component inside the form with react-hook-form
 * Here, you can pass `control` param from useForm() in react-hook-form
 * Other parameters are based on TextFieldProps.
 */
export const FormTextInput = ({ id, label, name, control, required, ...props }: FormTextInputProps) => (
  <>
    <Box display="block" mb={1}>
      <InputLabel htmlFor={id ?? `input-${name}`} required={required}>
        {label}
      </InputLabel>
    </Box>
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { invalid, error } }) => (
        <>
          <TextField {...field} {...props} id={id ?? `input-${name}`} size="small" error={invalid} fullWidth />
          <Fade in={invalid}>
            <FormHelperText error>{error?.message || ' '}</FormHelperText>
          </Fade>
        </>
      )}
    />
  </>
)
