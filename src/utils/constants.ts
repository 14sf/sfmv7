export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
export const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm'];

export const SOCIAL_SECTIONS = {
  FEED: 'feed',
  MESSAGES: 'messages',
  GROUPS: 'groups',
  BOOKS: 'books',
  PAYMENTS: 'payments',
  MARKET: 'market'
} as const;

export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PASSWORD: 'Password must be at least 8 characters long',
  INVALID_USERNAME: 'Username must be 3-20 characters and contain only letters, numbers, and underscores',
  FILE_TOO_LARGE: 'File size exceeds 5MB limit',
  UNSUPPORTED_FILE_TYPE: 'File type not supported'
} as const;