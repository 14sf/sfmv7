import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';

interface ScheduleProps {
  frequency: 'weekly' | 'biweekly' | 'monthly';
  amount: number;
  dueDate: string;
  onUpdate: (data: { frequency: string; amount: number; dueDate: string }) => void;
}

const PropertySchedule: React.FC<ScheduleProps> = ({
  frequency,
  amount,
  dueDate,
  onUpdate
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h4 className="font-medium text-gray-900 dark:text-white">
          Payment Schedule
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Frequency
          </label>
          <select
            value={frequency}
            onChange={(e) => onUpdate({ frequency: e.target.value, amount, dueDate })}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
          >
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Amount (SFM)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => onUpdate({ frequency, amount: Number(e.target.value), dueDate })}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Due Date
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => onUpdate({ frequency, amount, dueDate: e.target.value })}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySchedule;