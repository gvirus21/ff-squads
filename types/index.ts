export type SocialLink = {
  twitter?: string
  linkedin?: string
  instagram?: string
  mirror?: string
  zora?: string
  opensea?: string
  foundation?: string
  website?: string
  github?: string
  other?: string
}

export type TokenInfo = {
  network: string
  symbol: string
  contract: string
}

export type Member = {
  _id: string
  username: string
  logoUrl: string
  email: string
  bio: string
  country: string
  city?: string
  timezone: string
  socialIds: string[]
  socialLinks: SocialLink
  expertise: string[]
  extraExpertise: string[]
  status: number
  availability: number
  contribution: string
  familiarity: number
  discordHandle: string
  community: Community
  address: string
  isContributor: boolean
  createdAt: string
}

export interface MemberProfileInfo {
  email: string
  username: string
  bio: string
  country: string
  city?: string
  timezone: string
  socialIds: string[]
  socialLinks: SocialLink
  expertise: string[]
  extraExpertise: string[]
  status?: number
  availability?: number
  contribution: string
  familiarity: number
  discordHandle: string
  logoUrl?: string
  address: string
  isContributor: boolean
}

export interface MemberProfileRequest extends MemberProfileInfo {
  communityId: string
}

export type Community = {
  shortId: string
  name: string
  logoUrl?: string
  coverUrl?: string
  description: string
  socialIds: string[]
  socialLinks: SocialLink
  tokenInfo: TokenInfo
  members: Member[]
  ensDomain?: string
  minimumHoldingForMembership: number
}

export type CommunityProfileInfo = {
  name: string
  logoUrl?: string
  coverUrl?: string
  logoFile?: FileList
  coverFile?: FileList
  description: string
  socialIds: string[]
  socialLinks: SocialLink
  tokenInfo: TokenInfo
  ensDomain?: string
  minimumHoldingForMembership: number
}


export type Project = {
  _id: string;
  projectTitle: string;
  thumbnail: string;
  coverUrl: string;
  coverFileType: string;
  creatorName: string;
	isFeatured: boolean;
    profileImageUrl: string;
    openToCollab: boolean,
    expertise: string[];
    extraExpertise: string[];
    socialLinks: {
      website: string;
      discord: string;
      twitter: string;
    },
  createdAt: string;
  about: string;
  contribution: string;
  intrestedToCollab: string[];
}