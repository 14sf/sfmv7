@@ .. @@
 import { motion } from 'framer-motion';
-import { Send, Mail, Phone } from 'lucide-react';
+import { Send, Mail, Phone, Flag, DollarSign } from 'lucide-react';
 import { EAST_AFRICAN_CURRENCIES } from '../../../types/payment/currencies';
+import { useTransferCalculator } from '../../../hooks/payment/useTransferCalculator';
 import { useToast } from '../../../hooks/useToast';
 
 const TransferForm: React.FC = () => {
   const [formData, setFormData] = useState({
     amount: 0,
     currency: EAST_AFRICAN_CURRENCIES[0],
+    isReverse: false,
     recipientEmail: '',
     recipientPhone: ''
   });
+  const { calculateTransferAmount, isCalculating } = useTransferCalculator();
   const { showToast } = useToast();
+
+  const transferDetails = calculateTransferAmount(
+    formData.amount,
+    formData.currency,
+    formData.isReverse
+  );

@@ .. @@
       <div className="space-y-4">
+        <div className="flex items-center justify-between mb-4">
+          <span className="text-sm text-gray-600 dark:text-gray-400">Transfer Type</span>
+          <div className="flex items-center gap-2">
+            <button
+              onClick={() => setFormData({ ...formData, isReverse: false })}
+              className={`px-3 py-1 rounded-lg text-sm ${
+                !formData.isReverse
+                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
+                  : 'text-gray-600 dark:text-gray-400'
+              }`}
+            >
+              SFM → Currency
+            </button>
+            <button
+              onClick={() => setFormData({ ...formData, isReverse: true })}
+              className={`px-3 py-1 rounded-lg text-sm ${
+                formData.isReverse
+                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
+                  : 'text-gray-600 dark:text-gray-400'
+              }`}
+            >
+              Currency → SFM
+            </button>
+          </div>
+        </div>

         <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
-            Amount
+            {formData.isReverse ? 'Amount to Convert' : 'SFM Amount'}
           </label>
           <div className="relative">
             <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
             <input
               type="number"
               value={formData.amount}
               onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
               className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
               placeholder="0.00"
               min="0"
               step="0.01"
             />
           </div>
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
             Currency
           </label>
           <div className="relative">
             <Flag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
             <select
               value={formData.currency.code}
               onChange={(e) => {
                 const currency = EAST_AFRICAN_CURRENCIES.find(c => c.code === e.target.value);
                 if (currency) setFormData({ ...formData, currency });
               }}
               className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
             >
               {EAST_AFRICAN_CURRENCIES.map(currency => (
                 <option key={currency.code} value={currency.code}>
                   {currency.flag} {currency.name} ({currency.code})
                 </option>
               ))}
             </select>
           </div>
         </div>

+        {/* Transfer Details */}
+        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
+          <div className="flex justify-between text-sm">
+            <span className="text-gray-600 dark:text-gray-400">Exchange Rate</span>
+            <span className="font-medium text-gray-900 dark:text-white">
+              1 {formData.isReverse ? formData.currency.code : 'SFM'} = {' '}
+              {formData.isReverse 
+                ? (1 / formData.currency.exchangeRate).toFixed(6)
+                : formData.currency.exchangeRate
+              } {formData.isReverse ? 'SFM' : formData.currency.code}
+            </span>
+          </div>
+          <div className="flex justify-between text-sm">
+            <span className="text-gray-600 dark:text-gray-400">Transfer Fee</span>
+            <span className="font-medium text-gray-900 dark:text-white">
+              {formData.currency.transferFee} SFM
+            </span>
+          </div>
+          {formData.isReverse && (
+            <div className="flex justify-between text-sm">
+              <span className="text-gray-600 dark:text-gray-400">Commission ({(formData.currency.reverseCommission * 100).toFixed(1)}%)</span>
+              <span className="font-medium text-gray-900 dark:text-white">
+                {transferDetails.commission.toFixed(6)} SFM
+              </span>
+            </div>
+          )}
+          <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
+            <div className="flex justify-between text-sm font-medium">
+              <span className="text-gray-900 dark:text-white">You'll Receive</span>
+              <span className="text-gray-900 dark:text-white">
+                {transferDetails.amount.toFixed(6)} {formData.isReverse ? 'SFM' : formData.currency.code}
+              </span>
+            </div>
+          </div>
+        </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
               Recipient Email
             </label>
             <div className="relative">
               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
               <input
                 type="email"
                 value={formData.recipientEmail}
                 onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                 className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                 placeholder="recipient@example.com"
               />
             </div>
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
               Recipient Phone
             </label>
             <div className="relative">
               <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
               <input
                 type="tel"
                 value={formData.recipientPhone}
                 onChange={(e) => setFormData({ ...formData, recipientPhone: e.target.value })}
                 className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                 placeholder="+250789123456"
               />
             </div>
           </div>
         </div>

         <motion.button
           whileHover={{ scale: 1.02 }}
           whileTap={{ scale: 0.98 }}
           disabled={isCalculating || formData.amount <= 0}
           className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
         >
           <Send className="w-5 h-5" />
           Send Money
         </motion.button>
       </div>