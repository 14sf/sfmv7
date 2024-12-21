import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Shield } from 'lucide-react';
import TeamGroupSelector from './TeamGroupSelector';
import TeamMemberList from './TeamMemberList';
import InviteMemberForm from './InviteMemberForm';
import { TeamMember, TeamRole } from '../../types/team';
import { useToast } from '../../hooks/useToast';

const TeamManagement = () => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const { showToast } = useToast();

  const groups = [
    { id: 'all', name: 'All Members' },
    { id: 'admin', name: 'Administrators' },
    { id: 'editor', name: 'Editors' },
    { id: 'viewer', name: 'Viewers' }
  ];

  const handleInviteMember = (email: string, role: TeamRole) => {
    // In a real app, this would make an API call
    showToast(`Invitation sent to ${email}`, 'success');
    setShowInviteForm(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Team Management
          </h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowInviteForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <UserPlus className="w-4 h-4" />
          Invite Member
        </motion.button>
      </div>

      <TeamGroupSelector
        groups={groups}
        selectedGroup={selectedGroup}
        onSelectGroup={setSelectedGroup}
      />

      <TeamMemberList 
        members={[
          {
            id: '1',
            email: 'owner@example.com',
            name: 'Owner',
            role: 'owner',
            status: 'active',
            joinedAt: Date.now()
          }
        ]} 
        selectedGroup={selectedGroup}
      />

      {showInviteForm && (
        <InviteMemberForm
          onSubmit={handleInviteMember}
          onClose={() => setShowInviteForm(false)}
        />
      )}
    </div>
  );
};

export default TeamManagement;