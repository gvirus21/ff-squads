import { useQuery } from 'react-query';
import axios from 'axios';

const getCommunities = async () => {
  const {
    data: { communities },
  } = await axios.get(`${process.env.API_URL}/communities`);
  return communities;
};

export default function useCommunities() {
  return useQuery('communities', getCommunities);
}
