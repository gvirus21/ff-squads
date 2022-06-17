import DiscordIcon from 'components/icons/DiscordIcon'
import FoundationIcon from 'components/icons/FoundationIcon'
import GithubIcon from 'components/icons/GithubIcon'
import InstagramIcon from 'components/icons/InstagramIcon'
import LinkedinIcon from 'components/icons/LinkedinIcon'
import MirrorIcon from 'components/icons/MirrorIcon'
import OpenseaIcon from 'components/icons/OpenseaIcon'
import TwitterIcon from 'components/icons/TwitterIcon'
import WebsiteIcon from 'components/icons/WebsiteIcon'
import ZoraIcon from 'components/icons/ZoraIcon'

export const SOCIAL_ICON_MAP = {
  twitter: { label: 'Twitter', icon: TwitterIcon },
  linkedin: { label: 'Linkedin', icon: LinkedinIcon },
  instagram: { label: 'Instagram', icon: InstagramIcon },
  mirror: { label: 'Mirror', icon: MirrorIcon },
  zora: { label: 'Zora', icon: ZoraIcon },
  opensea: { label: 'Opensea', icon: OpenseaIcon },
  foundation: { label: 'Foundation', icon: FoundationIcon },
  website: { label: 'Website/Portfolio', icon: WebsiteIcon },
  github: { label: 'Github', icon: GithubIcon },
  other: { label: 'Other', icon: WebsiteIcon },
  discord: { label: 'Discord', icon: DiscordIcon },
}

export const EXPERTISE_CATEGORY = {
  Strategy: ['Founder', 'Investor', 'Product Manager', 'Web3 Expert / Strategist'],
  Creatiive: ['Curator', 'Artist', 'Musician', 'Writer', 'Designer', 'Photographer', 'Filmmaker', 'Producer'],
  'DAO / Community Ops': ['Accountant', 'Project Manager', 'Lawyer', 'Marketer', 'Community Manager'],
  Development: ['Backend developer', 'Frontend developer', 'Smart Contract developer'],
  Other: ['Student', 'Degen', 'Educator / Mentor', 'Still working it out'],
}

export const STATUS_LIST = [
  { value: 0, displayValue: 'Open to new projects' },
  { value: 1, displayValue: 'Not open new to projects' },
]

export const AVAILABILITY_LIST = [
  { value: 0, displayValue: 'Full-time (5-8 hrs)' },
  { value: 1, displayValue: 'Part-time (1-4 hrs)' },
  { value: 2, displayValue: 'Volunteer' },
]
