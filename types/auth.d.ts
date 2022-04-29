import 'next-auth';

declare module 'next-auth' {
  interface DiscordProfile extends Record<string, any> {
    accent_color: number;
    avatar: string;
    banner: string;
    banner_color: string;
    discriminator: string;
    email: string;
    flags: number;
    id: string;
    image_url: string;
    locale: string;
    mfa_enabled: boolean;
    premium_type: number;
    public_flags: number;
    username: string;
    verified: boolean;
  }

  interface User {
    email: string;
    name: string;
    picture: string;
    profile: DiscordProfile;
  }

  interface Session {
    user?: User;
    expires: string;
  }
}
