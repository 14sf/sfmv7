import React, { useState } from 'react';
import { Users, UserPlus, Mail, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Book } from '../../types/book';
import { TeamRole } from '../../types/team';
import { useToast } from '../../hooks/useToast';

interface BookTeamSectionProps {
  book: Book;
  onUpdateTeam: (bookId: string, members: Book['team']['members']) => void;
}

const BookTeamSection: React.FC<BookTeamSectionProps> = ({ book, onUpdateTeam }) => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<TeamRole>('editor');
  const { showToast } = useToast();

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newInvitation = {
      id: Date.now().toString(),
      email: inviteEmail,
      role: inviteRole,
      invitedBy: 'current-user',
      invitedAt: Date.now(),
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
    };

    book.team.invitations = [...book.team.invitations, newInvitation];
    setShowInviteForm(false);
    setInviteEmail('');
    showToast(`Invitation sent to ${inviteEmail}`, 'success');
  };

  const handleUpdateRole = (memberId: string, newRole: TeamRole) => {
    const updatedMembers = book.team.members.map(member =>
      member.id === memberId ? { ...member, role: newRole } : member
    );
    onUpdateTeam(book.id, updatedMembers);
    showToast('Member role updated successfully', 'success');
  };

  const handleRemoveMember = (memberId: string) => {
    const updatedMembers = book.team.members.filter(member => member.id !== memberId);
    onUpdateTeam(book.id, updatedMembers);
    showToast('Member removed successfully', 'success');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Team Members</h3>
        </div>
        <button
          onClick={() => setShowInviteForm(true)}
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
        >
          <UserPlus className="w-4 h-4" />
          Invite
        </button>
      </div>

      <div className="space-y-2">
        {book.team.members.map(member => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{member.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={member.role}
                onChange={(e) => handleUpdateRole(member.id, e.target.value as TeamRole)}
                className="text-xs border-none bg-transparent focus:ring-0"
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
              {member.role !== 'owner' && (
                <button
                  onClick={() => handleRemoveMember(member.id)}
                  className="text-xs text-red-600 hover:text-red-700 dark:text-red-400"
                >
                  Remove
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {showInviteForm && (
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleInviteMember}
          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Role
            </label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as TeamRole)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowInviteForm(false)}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Send Invitation
            </button>
          </div>
        </motion.form>
      )}
    </div>
  );
};

export default BookTeamSection;