export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  status: 'available' | 'occupied' | 'maintenance';
  image: string;
}

export interface PropertyStats {
  totalProperties: number;
  monthlyRevenue: number;
  activeTenants: number;
  maintenanceRequests: number;
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