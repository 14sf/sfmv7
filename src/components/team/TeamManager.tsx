import React, { useState } from 'react';
import { Users, Mail, Phone, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { TeamMember, TeamInvitation, TeamRole } from '../../types/team';
import TeamMemberList from './TeamMemberList';
import InviteMemberForm from './InviteMemberForm';
import { useToast } from '../../hooks/useToast';

const TeamManager = () => {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: '1',
      email: 'john@example.com',
      name: 'John Doe',
      role: 'admin',
      phone: '+250789123456',
      status: 'active',
      joinedAt: Date.now()
    }
  ]);

  const [invitations, setInvitations] = useState<TeamInvitation[]>([]);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const { showToast } = useToast();

  const handleInviteMember = (email: string, role: TeamRole) => {
    const newInvitation: TeamInvitation = {
      id: Date.now().toString(),
      email,
      role,
      invitedBy: 'current-user',
      invitedAt: Date.now(),
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
    };

    setInvitations([...invitations, newInvitation]);
    setShowInviteForm(false);
    showToast(`Invitation sent to ${email}`, 'success');
  };

  const handleUpdateMemberRole = (memberId: string, newRole: TeamRole) => {
    setMembers(members.map(member =>
      member.id === memberId ? { ...member, role: newRole } : member
    ));
    showToast('Member role updated successfully', 'success');
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers(members.filter(member => member.id !== memberId));
    showToast('Member removed successfully', 'success');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Team Management</h3>
        </div>
        <button
          onClick={() => setShowInviteForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Invite Member
        </button>
      </div>

      <TeamMemberList
        members={members}
        onUpdateRole={handleUpdateMemberRole}
        onRemoveMember={handleRemoveMember}
      />

      {showInviteForm && (
        <InviteMemberForm
          onSubmit={handleInviteMember}
          onClose={() => setShowInviteForm(false)}
        />
      )}

      {invitations.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Pending Invitations
          </h4>
          <div className="space-y-2">
            {invitations.map(invitation => (
              <motion.div
                key={invitation.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {invitation.email}
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Expires in {Math.ceil((invitation.expiresAt - Date.now()) / (1000 * 60 * 60 * 24))} days
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManager;