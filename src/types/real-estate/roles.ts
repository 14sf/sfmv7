export type RoleType = 'Owner' | 'Tenant' | 'Agent';

export interface RolePermissions {
  canAddProperty: boolean;
  canEditProperty: boolean;
  canDeleteProperty: boolean;
  canViewProperties: boolean;
  canAssignTenant: boolean;
  canRequestMaintenance: boolean;
  canManageRequests: boolean;
  canManageDocuments: boolean;
  canViewDocuments: boolean;
  canUploadDocuments: boolean;
  canDeleteDocuments: boolean;
  canManagePayments: boolean;
  canViewPayments: boolean;
}

export const ROLE_PERMISSIONS: Record<RoleType, RolePermissions> = {
  Owner: {
    canAddProperty: true,
    canEditProperty: true,
    canDeleteProperty: true,
    canViewProperties: true,
    canAssignTenant: true,
    canRequestMaintenance: false,
    canManageRequests: true,
    canManageDocuments: true,
    canViewDocuments: true,
    canUploadDocuments: true,
    canDeleteDocuments: true,
    canManagePayments: true,
    canViewPayments: true
  },
  Tenant: {
    canAddProperty: false,
    canEditProperty: false,
    canDeleteProperty: false,
    canViewProperties: true,
    canAssignTenant: false,
    canRequestMaintenance: true,
    canManageRequests: false,
    canManageDocuments: false,
    canViewDocuments: true,
    canUploadDocuments: false,
    canDeleteDocuments: false,
    canManagePayments: false,
    canViewPayments: true
  },
  Agent: {
    canAddProperty: false,
    canEditProperty: true,
    canDeleteProperty: false,
    canViewProperties: true,
    canAssignTenant: true,
    canRequestMaintenance: false,
    canManageRequests: true,
    canManageDocuments: true,
    canViewDocuments: true,
    canUploadDocuments: true,
    canDeleteDocuments: false,
    canManagePayments: false,
    canViewPayments: true
  }
};