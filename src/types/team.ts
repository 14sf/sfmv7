export type TeamRole = 'owner' | 'admin' | 'editor' | 'viewer';

export interface TeamMember {
  id: string;
  email: string;
  name: string;
  role: TeamRole;
  phone?: string;
  phone?: string;
  status: 'active' | 'pending';
  joinedAt: number;
}

export interface TeamInvitation {
  id: string;
  email: string;
  role: TeamRole;
  invitedBy: string;
  invitedAt: number;
  expiresAt: number;
}