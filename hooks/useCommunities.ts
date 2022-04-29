import { useQuery } from 'react-query';
import api from '../utils/api';

const getCommunity = async (shortId: string | string[] | undefined) => {
  const {
    data: { community },
  } = await api.get(`/communities/${shortId}`);

  return community;
};

export const useCommunity = (shortId: string | string[] | undefined) =>
  useQuery(['community', shortId], () => getCommunity(shortId));

const getCommunities = async () => {
  const {
    data: { communities },
  } = await api.get(`/communities`);
  return communities;
};

export const useCommunities = () => useQuery('communities', getCommunities);
