import { MutationOptions, useMutation, useQuery, useQueryClient } from 'react-query'

import { Member, MemberProfileRequest } from 'types'
import api from 'utils/api'

const getMember = async (id: string) => {
  const {
    data: { community },
  } = await api.get(`/members/${id}`)

  return community
}

export const useMember = (id: string) => useQuery(['member', id], () => getMember(id))

const getMemberInCommunity = async (communityId: string | string[] | undefined, discordHandle: string) => {
  const {
    data: { member },
  } = await api.get<{ member: Member }>(
    `/communities/${communityId}/member?discordHandle=${encodeURIComponent(discordHandle)}`
  )

  return member
}

export const useMemberInCommunity = (communityId: string | string[] | undefined, discordHandle: string) =>
  useQuery(['community/member', communityId, discordHandle], () => getMemberInCommunity(communityId, discordHandle))

const createMember = async (payload: MemberProfileRequest) => {
  const {
    data: { member },
  } = await api.post(`/members`, payload)
  return member
}

export const useCreateMember = ({
  onSuccess,
  ...options
}: MutationOptions<Member, any, MemberProfileRequest, any> = {}) => {
  const queryClient = useQueryClient()

  return useMutation(createMember, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(['community/member', data.community.shortId, data.discordHandle])
      onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

const updateMember = async (id: string, payload: MemberProfileRequest) => {
  const {
    data: { status },
  } = await api.put(`/members/${id}`, payload)
  return status
}

export const useUpdateMember = (
  id: string,
  { onSuccess, ...options }: MutationOptions<boolean, any, MemberProfileRequest, any> = {}
) => {
  const queryClient = useQueryClient()

  return useMutation((payload) => updateMember(id, payload), {
    onSuccess(data, variables, context) {
      if (data) {
        queryClient.invalidateQueries(['community/member', variables.communityId, variables.discordHandle])
        onSuccess?.(data, variables, context)
      }
    },
    ...options,
  })
}
