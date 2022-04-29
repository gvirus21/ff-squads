import { Box, Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormTextInput } from './form/FormTextInput';
import { FormTimezone } from './form/FormTimezone';
import { FormSelect, GroupedOption, SelectOption } from './form/FormSelect';
import { useCallback, useMemo } from 'react';
import countryList from 'react-select-country-list';
import { EXPERTISE_CATEGORY, SOCIAL_NAME_MAP } from '../config/constants';
import { FormCreatableSelect } from './form/FormCreatableSelect';
import { FormRadioGroup } from './form/FormRadioGroup';
import { FormSocialLinks } from './form/FormSocialLinks';
import { FormFamiliarity } from './form/FormFamiliarity';

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
  status?: number;
  availability?: number;
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
  status: undefined,
  availability: undefined,
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
  socialLinks: yup.object().shape({
    twitter: yup.string().test('socialId-check', 'This field is required', function (val) {
      return !(this.options as any).from[1].value.socialIds?.includes('twitter') || val?.length ? true : false;
    }),
    linkedin: yup.string().test('socialId-check', 'This field is required', function (val) {
      return !(this.options as any).from[1].value.socialIds?.includes('linkedin') || val?.length ? true : false;
    }),
    instagram: yup.string().test('socialId-check', 'This field is required', function (val) {
      return !(this.options as any).from[1].value.socialIds?.includes('instagram') || val?.length ? true : false;
    }),
    mirror: yup.string().test('socialId-check', 'This field is required', function (val) {
      return !(this.options as any).from[1].value.socialIds?.includes('mirror') || val?.length ? true : false;
    }),
    zora: yup.string().test('socialId-check', 'This field is required', function (val) {
      return !(this.options as any).from[1].value.socialIds?.includes('zora') || val?.length ? true : false;
    }),
    opensea: yup.string().test('socialId-check', 'This field is required', function (val) {
      return !(this.options as any).from[1].value.socialIds?.includes('opensea') || val?.length ? true : false;
    }),
    foundation: yup.string().test('socialId-check', 'This field is required', function (val) {
      return !(this.options as any).from[1].value.socialIds?.includes('foundation') || val?.length ? true : false;
    }),
    website: yup.string().test('socialId-check', 'This field is required', function (val) {
      return !(this.options as any).from[1].value.socialIds?.includes('website') || val?.length ? true : false;
    }),
    github: yup.string().test('socialId-check', 'This field is required', function (val) {
      return !(this.options as any).from[1].value.socialIds?.includes('github') || val?.length ? true : false;
    }),
    other: yup.string().test('socialId-check', 'This field is required', function (val) {
      return !(this.options as any).from[1].value.socialIds?.includes('other') || val?.length ? true : false;
    }),
  }),
  expertise: yup.array().of(yup.string()).min(1, 'Select at least 1 expertise'),
  extraExpertise: yup.array().of(yup.string()),
  status: yup.number().required('This field is required'),
  availability: yup.string().required('This field is required'),
  contribution: yup.string().required('This field is required'),
  familiarity: yup.number(),
});

const socialOptions: SelectOption[] = Object.keys(SOCIAL_NAME_MAP).map((socialKey) => ({
  value: socialKey,
  label: SOCIAL_NAME_MAP[socialKey as keyof typeof SOCIAL_NAME_MAP].label,
  icon: SOCIAL_NAME_MAP[socialKey as keyof typeof SOCIAL_NAME_MAP].image,
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
  const socialIdsValue = watch('socialIds');
  const countryOptions = useMemo(() => countryList().getData(), []);

  const onSubmit = useCallback(async (payload: MemberProfileInfo) => {
    console.log('payload: ', payload);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            rows={3}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormSelect control={control} name="country" options={countryOptions} label="Country" required />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormCreatableSelect control={control} name="city" label="City" />
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

        {socialIdsValue.length ? (
          <Grid item xs={12} sm={12}>
            <FormSocialLinks
              control={control}
              parentName="socialLinks"
              socialIds={socialIdsValue}
              label="Social link or handle"
              required
            />
          </Grid>
        ) : (
          <></>
        )}

        <Grid item xs={12} sm={12}>
          <FormSelect
            control={control}
            name="expertise"
            options={expertiseOptions}
            label="I'm a ..."
            isMulti
            required
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormCreatableSelect
            control={control}
            name="extraExpertise"
            label="Any other you like to share that is not listed?"
            isMulti
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormRadioGroup
            control={control}
            name="status"
            label="Status"
            options={[
              { label: 'Open to new projects', value: 0 },
              { label: 'Not open to new projects', value: 1 },
            ]}
            required
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormRadioGroup
            control={control}
            name="availability"
            label="How much time do you have to contribute per week?"
            options={[
              { label: 'Full-time (5-8 hrs)', value: 0 },
              { label: 'Part-time (1-4 hrs)', value: 1 },
              { label: 'Volunteer', value: 2 },
            ]}
            required
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormTextInput
            control={control}
            name="contribution"
            label="How would you like to contribute to our community?"
            placeholder="I would like to help build Web3 tools for aspiring creators!"
            required
            multiline
            rows={3}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Box marginBottom={4}>
            <FormFamiliarity control={control} name="familiarity" label="How much do you know about crypto?" />
          </Box>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Button type="submit" variant="contained">
            Complete Profile
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default MemberProfileForm;
