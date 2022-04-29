export type SocialLink = {
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
};

export type TokenInfo = {
  network: string;
  symbol: string;
  contract: string;
};

export type Member = {
  username: string;
  email: string;
  bio: string;
  country: string;
  city?: string;
  timezone: string;
  socialIds: string[];
  socialLinks: SocialLink;
  expertise: string[];
  extraExpertise: string[];
  status: number;
  availability: number;
  contribution: string;
  familiarity: number;
  discordHandle: string;
  community: Community;
};

export type Community = {
  shortId: string;
  name: string;
  logoUrl: string;
  description: string;
  socialIds: string[];
  socialLinks: SocialLink;
  tokenInfo: TokenInfo;
  members: Member[];
};
