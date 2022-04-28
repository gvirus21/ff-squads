import { Box, Fade, FormHelperText, InputAdornment, InputLabel, TextField } from '@mui/material';
import Image from 'next/image';
import { Control, Controller } from 'react-hook-form';
import { SOCIAL_NAME_MAP } from '../../config/constants';

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
export const FormSocialLinks = ({ label, parentName, control, required, socialIds }: FormSocialLinksProps) => {
  return (
    <>
      {label ? (
        <Box display="block" mb={1}>
          <InputLabel required={required}>{label}</InputLabel>
        </Box>
      ) : (
        <></>
      )}
      {socialIds.map((socialId) => (
        <Box key={socialId}>
          <Controller
            name={`${parentName}[${socialId}]`}
            control={control}
            render={({ field: { value, onChange, ...field }, fieldState: { invalid, error } }) => (
              <>
                <TextField
                  {...field}
                  size="small"
                  error={invalid}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{
                          height: '40px',
                          width: '40px',
                          position: 'absolute',
                          left: 0,
                          maxHeight: '40px',
                          display: 'flex',
                          justifyContent: 'center',
                          background: '#FAFAFA',
                          border: '1px solid #E2E8F0',
                          borderWidth: '0 1px 0 0',
                        }}
                      >
                        <Image
                          src={SOCIAL_NAME_MAP[socialId as keyof typeof SOCIAL_NAME_MAP].image}
                          alt={SOCIAL_NAME_MAP[socialId as keyof typeof SOCIAL_NAME_MAP].label}
                          width={20}
                          height={20}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <Fade in={invalid}>
                  <FormHelperText error>{error?.message || ' '}</FormHelperText>
                </Fade>
              </>
            )}
          />
        </Box>
      ))}
    </>
  );
};
