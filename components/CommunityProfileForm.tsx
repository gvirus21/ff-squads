import UploadFile from '@mui/icons-material/UploadFile'
import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { LoadingButton } from '@mui/lab'
import { Community } from '../types'
import { SOCIALS } from '../config/constants'
import { useForm } from 'react-hook-form'
import MultipleSelect from './MultipleSelect'
import { FormSocialLinks } from './form/FormSocialLinks'
import { FormTextInput } from './form/FormTextInput'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {  SOCIAL_ICON_MAP } from '../config/constants'
import { FormSelect, GroupedOption, SelectOption } from './form/FormSelect'
import { useRouter } from 'next/router'


const socialOptions: SelectOption[] = Object.keys(SOCIAL_ICON_MAP).map((socialKey) => ({
  value: socialKey,
  label: SOCIAL_ICON_MAP[socialKey as keyof typeof SOCIAL_ICON_MAP].label,
  icon: SOCIAL_ICON_MAP[socialKey as keyof typeof SOCIAL_ICON_MAP].icon,
}))

export const communityProfileFormDefault: Community = {
  name: '',
  logoUrl: '',
  coverUrl: '',
  description: '',
  socialIds: [],
  socialLinks: {},
  tokenInfo: {
    network: '',
    symbol: '',
    contract: ''
  },
  members: [],
  shortId : ''
}

const communityProfileSchema = yup.object().shape({
   
  name: yup.string().required('This field is required'),
  description: yup.string().required('This field is required'),
  socialLinks: yup.object().shape({
    twitter: yup.string().test('socialId-check', 'This field is required', function (val) {
      return !(this.options as any).from[1].value.socialIds?.includes('twitter') || val?.length ? true : false
    }),
    linkedin: yup.string().test('socialId-check', 'This field is required', function (val) {
      return !(this.options as any).from[1].value.socialIds?.includes('linkedin') || val?.length ? true : false
    }),
    instagram: yup.string().test('socialId-check', 'This field is required', function (val) {
      return !(this.options as any).from[1].value.socialIds?.includes('instagram') || val?.length ? true : false
    }),
    mirror: yup.string().test('socialId-check', 'This field is required', function (val) {
      return !(this.options as any).from[1].value.socialIds?.includes('mirror') || val?.length ? true : false
    }),
    zora: yup.string().test('socialId-check', 'This field is required', function (val) {
      return !(this.options as any).from[1].value.socialIds?.includes('zora') || val?.length ? true : false
    }),
    opensea: yup.string().test('socialId-check', 'This field is required', function (val) {
      return !(this.options as any).from[1].value.socialIds?.includes('opensea') || val?.length ? true : false
    }),
    foundation: yup.string().test('socialId-check', 'This field is required', function (val) {
      return !(this.options as any).from[1].value.socialIds?.includes('foundation') || val?.length ? true : false
    }),
    website: yup.string().test('socialId-check', 'This field is required', function (val) {
      return !(this.options as any).from[1].value.socialIds?.includes('website') || val?.length ? true : false
    }),
    github: yup.string().test('socialId-check', 'This field is required', function (val) {
      return !(this.options as any).from[1].value.socialIds?.includes('github') || val?.length ? true : false
    }),
    other: yup.string().test('socialId-check', 'This field is required', function (val) {
      return !(this.options as any).from[1].value.socialIds?.includes('other') || val?.length ? true : false
    }),
  }),
})

const Input = styled('input')({
  display: 'none',
})

interface CommunityProfileFormProps {
  community?: Community
  onSubmit: (payload: Community) => void
  submitting: boolean
  submitText?: string
}

interface LogoUploadProps {
  logo?: string
  cover?: string
}

const LogoUpload = ({ logo,cover }: LogoUploadProps) => {
   
  return (
    <Box sx={{ position: 'relative' }} mb={7}>
      <Box sx={{ width: '100%', height: '96px', background: cover?`url('${cover}')`:'#616D6C', borderRadius: '6px' }} />
      <Box mt={-4} sx={{ position: 'absolute', right: 4 }}>
        <Input id="banner-upload-button" accept="image/*" type="file" />
        <UploadFile />
      </Box>
      <label
        htmlFor="logo-upload-button"
        style={{
          display: 'flex',
          position: 'absolute',
          bottom: '-50%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '80px',
          background: '#e2e8f0',
          borderRadius: '100%',
        }}
      >
        <Input id="logo-upload-button" accept="image/*" type="file" />
        <IconButton
   
          aria-label="upload picture"
          component="span"
          sx={{ width: '80px', height: '80px', background: logo?`url('${logo}')`:'#616D6C', border: '4px solid #11151F' }}
        >
          <UploadFile />
        </IconButton>
      </label>
    </Box>
  )
}

export default function CommunityProfileForm({ community , submitting , onSubmit, submitText = 'Save' }: CommunityProfileFormProps) {
  
   const { handleSubmit, control, watch } = useForm<Community>({
    mode: 'all',
    defaultValues: {
      ...communityProfileFormDefault,
      ...community,
    },
    resolver: yupResolver(communityProfileSchema),
   })
  
  const socialIdsValue:any[] = []
  //const socialIdsValue = watch('socialIds')
  
  const router = useRouter()
  
  return (
    <>
       
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container justifyContent="space-between" rowSpacing={1} columnSpacing={4}>
          <Grid item xs={12} sm={12}>
            <LogoUpload logo={community?.logoUrl} cover={community?.coverUrl}/>
          </Grid>
          
       
          <Grid item xs={12} sm={12}>
            <FormTextInput control={control} name="name" label="Community Name" placeholder="Name Of community" required />
          </Grid>
          <Grid item xs={12} sm={12}>
             <FormTextInput
              control={control}
              name="description"
              label="Tell us about your community"
              placeholder="Tell us about your community"
              required
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormSelect
              control={control}
              name="socialIds"
              options={socialOptions}
              label="Where can we find your community online?"
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

          <Grid item xs={12} sm={6}>
            <FormTextInput control={control} name="network" label="Network" placeholder="Ethereum" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextInput control={control} name="token" label="Token symbol" placeholder="Token symbol" required />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormTextInput control={control} name="contract" label="Token contract address" placeholder="Token contract address" required />
          </Grid>
          
          <Grid item xs={12} sm={12}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={submitting}
              sx={{
                mb: { xs: 5, sm: 5, md: 8 },
                background: '#3E41BB',
                ':hover': {
                  opacity: 0.7,
                  background: '#3E41BB',
                },
              }}
            >
              {submitText}
            </LoadingButton>
            <Button
              variant="contained"
              onClick={() => router.back()}
              sx={{
                mb: { xs: 5, sm: 5, md: 8 },
                ml: 2,
              }}
              color="secondary"
            >
              Cancel
            </Button>
          </Grid>    

        </Grid>
      </form>
     
      
       
      
      
    </>
  )
}
