// Validation Rules and Error Messages
export const VALIDATION_RULES = {
  MIN_AMOUNT: 1,
  MAX_AMOUNT: 1000000,
  MIN_AGE: 18,
  PHONE_REGEX: /^\+?[1-9]\d{1,14}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  ID_NUMBER_MIN_LENGTH: 6
};

export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_AMOUNT: 'Amount must be between 1 and 1,000,000',
  INVALID_AGE: 'You must be at least 18 years old',
  INVALID_ID: 'Please enter a valid ID number'
};

export const ID_TYPES = [
  { value: 'passport', label: 'Passport' },
  { value: 'national_id', label: 'National ID' },
  { value: 'drivers_license', label: 'Driver\'s License' }
];