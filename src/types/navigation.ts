export type SectionType = 'exchange' | 'messages' | 'groups' | 'sfmbook' | 'sfmpay' | 'sfmwallet' | 'sfmarket' | 'sfmrealestate';

export interface Section {
  id: SectionType;
  label: string;
  icon?: string;
}