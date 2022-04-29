import { useQuery } from 'react-query';
import api from '../utils/api';

const getMember = async (id: string) => {
  const {
    data: { community },
  } = await api.get(`/members/${id}`);

  return community;
};

export const useMember = (id: string) => useQuery(['member', id], () => getMember(id));

const getMemberInCommunity = async (communityId: string, discordHandle: string) => {
  const {
    data: { member },
  } = await api.get(`/communities/${communityId}/member?discordHandle=${discordHandle}`);

  return member;
};

export const useMemberInCommunity = (communityId: string, discordHandle: string) =>
  useQuery(['community/member', communityId, discordHandle], () => getMemberInCommunity(communityId, discordHandle));
