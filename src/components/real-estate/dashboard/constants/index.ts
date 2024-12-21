export const PROPERTY_STATUSES = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  MAINTENANCE: 'maintenance'
} as const;

export const MAINTENANCE_PRIORITIES = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
} as const;

export const MAINTENANCE_STATUSES = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed'
} as const;

export const DEFAULT_CURRENCY = 'SFM';

export const REFRESH_INTERVAL = 60000; // 1 minute