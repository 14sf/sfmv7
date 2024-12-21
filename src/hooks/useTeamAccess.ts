import { useMemo } from 'react';
import { Book, TeamRole } from '../types/book';

export const useTeamAccess = (book: Book | null) => {
  const currentUser = 'user@example.com'; // In a real app, this would come from auth context

  const userRole = useMemo(() => {
    if (!book) return null;
    const member = book.team.members.find(m => m.email === currentUser);
    return member?.role || null;
  }, [book?.team.members, currentUser]);

  const permissions = useMemo(() => ({
    canCreateTransaction: userRole ? ['owner', 'admin', 'editor'].includes(userRole as TeamRole) : false,
    canEditBook: userRole ? ['owner', 'admin'].includes(userRole as TeamRole) : false,
    canDeleteBook: userRole ? ['owner'].includes(userRole as TeamRole) : false,
    canManageTeam: userRole ? ['owner', 'admin'].includes(userRole as TeamRole) : false,
    canViewTransactions: userRole ? ['owner', 'admin', 'editor', 'viewer'].includes(userRole as TeamRole) : false
  }), [userRole]);

  return permissions;
};