import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../../hooks/useToast';

interface Category {
  id: string;
  name: string;
  color: string;
}

const CategoryManager = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Business', color: '#3B82F6' },
    { id: '2', name: 'Personal', color: '#10B981' },
    { id: '3', name: 'Investment', color: '#8B5CF6' }
  ]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const { showToast } = useToast();

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;

    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    showToast('Category added successfully!', 'success');
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
  };

  const handleUpdateCategory = () => {
    if (!editingCategory) return;

    setCategories(categories.map(cat => 
      cat.id === editingCategory.id ? editingCategory : cat
    ));
    setEditingCategory(null);
    showToast('Category updated successfully!', 'success');
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
    showToast('Category deleted successfully!', 'success');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New category name"
          className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
        />
        <button
          onClick={handleAddCategory}
          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      <div className="space-y-2">
        {categories.map(category => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              {editingCategory?.id === category.id ? (
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  onBlur={handleUpdateCategory}
                  onKeyDown={(e) => e.key === 'Enter' && handleUpdateCategory()}
                  autoFocus
                />
              ) : (
                <span className="text-gray-900 dark:text-white">{category.name}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEditCategory(category)}
                className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;