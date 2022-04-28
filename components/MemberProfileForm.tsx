import { Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormTextInput } from './form/FormTextInput';
import { FormTimezone } from './form/FormTimezone';
import { FormSelect, GroupedOption, Option } from './form/FormSelect';
import { useMemo } from 'react';
import { EXPERTISE_CATEGORY, SOCIAL_NAME_MAP } from '../config/constants';

interface SocialInfo {
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  mirror?: string;
  zora?: string;
  opensea?: string;
  foundation?: string;
  website?: string;
  github?: string;
  other?: string;
}

interface MemberProfileInfo {
  email: string;
  username: string;
  bio: string;
  country: string;
  city?: string;
  timezone: string;
  socialIds: string[];
  socialLinks: SocialInfo;
  expertise: string[];
  extraExpertise: string[];
  status: number;
  availability: number;
  contribution: string;
  familiarity: number;
}

const formDefault: MemberProfileInfo = {
  email: '',
  username: '',
  bio: '',
  country: '',
  city: '',
  timezone: '',
  socialIds: [],
  socialLinks: {},
  expertise: [],
  extraExpertise: [],
  status: 0,
  availability: 0,
  contribution: '',
  familiarity: 0,
};

const memberProfileSchema = yup.object().shape({
  email: yup.string().email('Must be a valid email').required('This field is required'),
  username: yup.string().required('This field is required'),
  bio: yup.string().required('This field is required'),
  country: yup.string().required('This field is required'),
  city: yup.string(),
  timezone: yup.string().required('This field is required'),
  socialIds: yup.array().of(yup.string()),
  socialLinks: yup.object(),
  expertise: yup.array().of(yup.string()).min(1, 'Select at least 1 expertise'),
  extraExpertise: yup.array().of(yup.string()),
  status: yup.number().required('This field is required'),
  availability: yup.string().required('This field is required'),
  contribution: yup.string().required('This field is required'),
  familiarity: yup.number(),
});

const socialOptions: Option[] = Object.keys(SOCIAL_NAME_MAP).map((socialKey) => ({
  value: socialKey,
  label: SOCIAL_NAME_MAP[socialKey as keyof typeof SOCIAL_NAME_MAP].label,
}));

const expertiseOptions: GroupedOption[] = Object.keys(EXPERTISE_CATEGORY).map((category) => ({
  label: category,
  options: EXPERTISE_CATEGORY[category as keyof typeof EXPERTISE_CATEGORY].map((item) => ({
    label: item,
    value: item,
  })),
}));

const MemberProfileForm = () => {
  const { handleSubmit, control, watch, formState } = useForm<MemberProfileInfo>({
    mode: 'all',
    defaultValues: formDefault,
    resolver: yupResolver(memberProfileSchema),
  });

  return (
    <Grid container justifyContent="space-between" rowSpacing={1} columnSpacing={4}>
      <Grid item xs={12} sm={6}>
        <FormTextInput control={control} name="username" label="Username" placeholder="Username" required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormTextInput control={control} name="email" label="Email" placeholder="Email address" required />
      </Grid>
      <Grid item xs={12} sm={12}>
        <FormTextInput
          control={control}
          name="bio"
          label="Tell us a bit about yourself and what you're excited about"
          placeholder="I'm currently a community manager and I'm excited to onboard more members to Web3!"
          required
          multiline
          rows={2}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <FormTimezone control={control} name="timezone" label="Time zone" required />
      </Grid>
      <Grid item xs={12} sm={12}>
        <FormSelect
          control={control}
          name="socialIds"
          options={socialOptions}
          label="Where can we find you online?"
          isMulti
        />
      </Grid>

      <Grid item xs={12} sm={12}>
        <FormSelect control={control} name="expertise" options={expertiseOptions} label="I'm a ..." isMulti required />
      </Grid>

      <Grid item xs={12} sm={12}>
        <FormTextInput
          control={control}
          name="contribution"
          label="How would you like to contribute to our community?"
          placeholder="I would like to help build Web3 tools for aspiring creators!"
          required
          multiline
          rows={2}
        />
      </Grid>

      <Grid item xs={12} sm={12}>
        <Button type="submit" variant="contained">
          Complete Profile
        </Button>
      </Grid>
    </Grid>
  );
};

export default MemberProfileForm;
