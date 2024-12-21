import React from 'react';
import { motion } from 'framer-motion';
import { Tool, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface MaintenanceActionsProps {
  onRequest: () => void;
  onEmergency: () => void;
  onViewHistory: () => void;
  onSchedule: () => void;
}

const MaintenanceActions: React.FC<MaintenanceActionsProps> = ({
  onRequest,
  onEmergency,
  onViewHistory,
  onSchedule
}) => {
  const actions = [
    {
      id: 'request',
      label: 'Request Service',
      icon: Tool,
      onClick: onRequest,
      color: 'blue'
    },
    {
      id: 'emergency',
      label: 'Emergency',
      icon: AlertTriangle,
      onClick: onEmergency,
      color: 'red'
    },
    {
      id: 'history',
      label: 'View History',
      icon: CheckCircle,
      onClick: onViewHistory,
      color: 'green'
    },
    {
      id: 'schedule',
      label: 'Schedule',
      icon: Clock,
      onClick: onSchedule,
      color: 'purple'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {actions.map(({ id, label, icon: Icon, onClick, color }) => (
        <motion.button
          key={id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClick}
          className={`flex flex-col items-center gap-2 p-4 rounded-lg bg-${color}-50 dark:bg-${color}-900/20 text-${color}-600 dark:text-${color}-400 hover:bg-${color}-100 dark:hover:bg-${color}-900/30`}
        >
          <Icon className="w-6 h-6" />
          <span className="text-sm font-medium text-center">{label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default MaintenanceActions;