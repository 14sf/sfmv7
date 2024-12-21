import React from 'react';
import { Briefcase, Clock, Shield } from 'lucide-react';

const FreelancePayment = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Freelance Payment</h3>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Project Name
            </label>
            <input
              type="text"
              name="projectName"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
              placeholder="Enter project name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Payment Type
            </label>
            <select
              name="paymentType"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
            >
              <option value="milestone">Milestone Payment</option>
              <option value="hourly">Hourly Rate</option>
              <option value="fixed">Fixed Price</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Payment Schedule
          </label>
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <div className="flex-1">
              <select
                name="schedule"
                className="w-full bg-transparent border-none focus:ring-0"
              >
                <option value="upfront">30% Upfront</option>
                <option value="milestone">Pay per Milestone</option>
                <option value="completion">Pay upon Completion</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Secure escrow payment for project milestones
          </p>
        </div>
      </form>
    </div>
  );
};

export default FreelancePayment;