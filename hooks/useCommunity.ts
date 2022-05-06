import { MutationOptions, useMutation, useQuery, useQueryClient } from 'react-query'
import { Community } from '../types'
import api from '../utils/api'

const getCommunity = async (shortId: string | string[] | undefined) => {
  const {
    data: { community },
  } = await api.get(`/communities/${shortId}`)

  return community
}

export const useCommunity = (shortId: string | string[] | undefined) =>
  useQuery<Community>(['community', shortId], () => getCommunity(shortId))

const getCommunities = async () => {
  const {
    data: { communities },
  } = await api.get(`/communities`)
  return communities
}

export const useCommunities = () => useQuery('communities', getCommunities)

const createCommunity = async (payload: FormData) => {
  const {
    data: { community },
  } = await api.post(`/communities`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return community
}

export const useCreateCommunity = ({ onSuccess, ...options }: MutationOptions<Community, any, FormData, any> = {}) => {
  const queryClient = useQueryClient()

  return useMutation(createCommunity, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries('communities')
      onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

const updateCommunity = async (id: string, payload: FormData) => {
  const {
    data: { status },
  } = await api.put(`/communities/${id}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return status
}

export const useUpdateCommunity = (
  id: string,
  { onSuccess, ...options }: MutationOptions<boolean, any, FormData, any> = {}
) => {
  const queryClient = useQueryClient()

  return useMutation((payload) => updateCommunity(id, payload), {
    onSuccess(data, variables, context) {
      if (data) {
        queryClient.invalidateQueries('communities')
        queryClient.invalidateQueries('community')
        onSuccess?.(data, variables, context)
      }
    },
    ...options,
  })
}
