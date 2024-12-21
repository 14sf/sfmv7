import React from 'react';
import { Shield, Trash2, Mail, Phone } from 'lucide-react';
import { TeamMember, TeamRole } from '../../types/team';
import { motion } from 'framer-motion';

type TeamMemberListProps = {
  members: TeamMember[];
  selectedGroup?: string | null;
  onUpdateRole?: (memberId: string, role: TeamRole) => void;
  onRemoveMember?: (memberId: string) => void;
};

const TeamMemberList: React.FC<TeamMemberListProps> = ({
  members,
  selectedGroup,
  onUpdateRole,
  onRemoveMember
}) => {
  const roles: TeamRole[] = ['owner', 'admin', 'editor', 'viewer'];

  const filteredMembers = selectedGroup === 'all' || !selectedGroup
    ? members
    : members.filter(member => member.role === selectedGroup);

  return (
    <div className="space-y-3">
      {filteredMembers.map(member => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
        >
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="font-medium text-gray-900 dark:text-white">
                {member.name}
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                {member.email}
                {member.phone && (
                  <>
                    <span className="mx-1">•</span>
                    <Phone className="w-4 h-4" />
                    {member.phone}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <select
                value={member.role}
                onChange={(e) => onUpdateRole?.(member.id, e.target.value as TeamRole)}
                className="text-sm border-none bg-transparent focus:ring-0"
                disabled={member.role === 'owner'}
              >
                {roles.map(role => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {member.role !== 'owner' && onRemoveMember && (
              <button
                onClick={() => onRemoveMember(member.id)}
                className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      ))}

      {members.length === 0 && (
        <div className="text-center py-6">
          <p className="text-gray-500 dark:text-gray-400">
            No team members yet
          </p>
        </div>
      )}
    </div>
  );
};

export default TeamMemberList;