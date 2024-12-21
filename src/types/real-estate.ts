export interface Property {
  propertyId: string;
  address: string;
  rentPrice: number;
  salePrice?: number;
  ownerId: string;
  tenantId?: string;
  status: 'available' | 'rented' | 'sold';
  maintenanceRequests: MaintenanceRequest[];
}

export interface MaintenanceRequest {
  id: string;
  title: string;
  property: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
}

export interface PaymentOverview {
  monthlyRevenue: number;
  pendingPayments: number;
  overduePayments: number;
  changePercentage: number;
}