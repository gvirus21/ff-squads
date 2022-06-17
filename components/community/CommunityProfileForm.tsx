import { yupResolver } from '@hookform/resolvers/yup'
import UploadFile from '@mui/icons-material/UploadFile'
import { Box, Button, Grid, IconButton, Card, CardActionArea } from '@mui/material'
import { styled } from '@mui/material/styles'
import { LoadingButton } from '@mui/lab'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { FormSelect, SelectOption } from 'components/form/FormSelect'
import { FormSocialLinks } from 'components/form/FormSocialLinks'
import { FormTextInput } from 'components/form/FormTextInput'
import { SOCIAL_ICON_MAP } from 'config/constants'
import { CommunityProfileInfo } from 'types'

const socialOptions: SelectOption[] = Object.keys(SOCIAL_ICON_MAP).map((socialKey) => ({
  value: socialKey,
  label: SOCIAL_ICON_MAP[socialKey as keyof typeof SOCIAL_ICON_MAP].label,
  icon: SOCIAL_ICON_MAP[socialKey as keyof typeof SOCIAL_ICON_MAP].icon,
}))

export const communityProfileFormDefault: CommunityProfileInfo = {
  name: '',
  logoUrl: '',
  coverUrl: '',
  logoFile: undefined,
  coverFile: undefined,
  description: '',
  socialIds: [],
  socialLinks: {},
  tokenInfo: {
    network: 'Ethereum',
    symbol: '',
    contract: '',
  },
  ensDomain: '',
  minimumHoldingForMembership: 0,
}

const communityProfileSchema = yup.object().shape({
  name: yup.string().required('This field is required'),
  description: yup.string().required('This field is required'),
  socialIds: yup.array().of(yup.string()).min(1, 'Select at least 1'),
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
  tokenInfo: yup.object().shape({
    symbol: yup.string().required('This field is required'),
    contract: yup.string().required('This field is required'),
  }),
})

const Input = styled('input')({
  display: 'none',
})

interface CommunityProfileFormProps {
  community?: CommunityProfileInfo
  onSubmit: (payload: CommunityProfileInfo) => void
  submitting: boolean
  submitText?: string
}

export default function CommunityProfileForm({
  community,
  submitting,
  onSubmit,
  submitText = 'Save',
}: CommunityProfileFormProps) {
  const [coverImgFile, setCoverImgFile] = React.useState<File>()
  const [logoImgFile, setLogoImgFile] = React.useState<File>()

  const { handleSubmit, control, register, watch } = useForm<CommunityProfileInfo>({
    mode: 'all',
    defaultValues: {
      ...communityProfileFormDefault,
      ...community,
    },
    resolver: yupResolver(communityProfileSchema),
  })

  const socialIdsValue = watch('socialIds')

  const router = useRouter()

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container justifyContent="space-between" rowSpacing={1} columnSpacing={4}>
          <Grid item xs={12} sm={12}>
            <Box sx={{ position: 'relative' }} mb={7}>
              <Card
                sx={{
                  width: '100%',
                  height: '96px',
                  background: coverImgFile
                    ? `center/cover no-repeat url(${URL.createObjectURL(coverImgFile)})`
                    : community?.coverUrl
                    ? `center/cover no-repeat url('${community?.coverUrl}')`
                    : '#616D6C',
                  borderRadius: '6px',
                  boxShadow: 'none',
                }}
              >
                <label htmlFor="cover-upload-button">
                  <Input
                    id="cover-upload-button"
                    accept="image/*"
                    type="file"
                    {...register('coverFile', {
                      onChange: (e: any) => setCoverImgFile(e.target.files[0]),
                    })}
                  />
                  <CardActionArea component="span" sx={{ width: '100%', height: '100%' }}>
                    <UploadFile sx={{ position: 'absolute', bottom: 8, right: 8 }} />
                  </CardActionArea>
                </label>
              </Card>
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
                  background: '#616D6C',
                  borderRadius: '100%',
                }}
              >
                <Input
                  id="logo-upload-button"
                  accept="image/*"
                  type="file"
                  {...register('logoFile', {
                    onChange: (e: any) => setLogoImgFile(e.target.files[0]),
                  })}
                />
                <IconButton
                  aria-label="upload picture"
                  component="span"
                  sx={{
                    width: '80px',
                    height: '80px',
                    background: logoImgFile
                      ? `center/cover no-repeat url(${URL.createObjectURL(logoImgFile)})`
                      : community?.logoUrl
                      ? `center/cover no-repeat url('${community?.logoUrl}')`
                      : '#616D6C',
                    border: '4px solid #11151F',
                  }}
                >
                  <UploadFile />
                </IconButton>
              </label>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormTextInput
              control={control}
              name="name"
              label="Community Name"
              placeholder="Name Of community"
              required
            />
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
              required
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
            <FormTextInput
              control={control}
              name="tokenInfo.network"
              label="Network"
              defaultValue={'Ethereum'}
              placeholder="Ethereum"
              disabled
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextInput
              control={control}
              name="tokenInfo.symbol"
              label="Token symbol"
              placeholder="Token symbol"
              required
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormTextInput
              control={control}
              name="tokenInfo.contract"
              label="Token contract address"
              placeholder="Token contract address"
              required
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormTextInput
              control={control}
              name="ensDomain"
              label="Community ENS Domain"
              placeholder="Community ENS Domain"
              required
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormTextInput
              control={control}
              name="minimumHoldingForMembership"
              label="Minimum Tokens for MemberShip"
              placeholder="Minimum Tokens for MemberShip"
              required
            />
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
