import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Trash2, Plus, Save, X, ChevronDown, ChevronUp } from 'lucide-react';

const DataCard = ({ item, onDelete, onUpdate, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({ ...item });
  const [isExpanded, setIsExpanded] = useState(false);
  const [newFieldKey, setNewFieldKey] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');
  const [showAddField, setShowAddField] = useState(false);
  const [editingField, setEditingField] = useState(null);

  const itemEntries = Object.entries(editedItem);
  const visibleEntries = isExpanded ? itemEntries : itemEntries.slice(0, 3);
  const hasMoreFields = itemEntries.length > 3;

  const handleSave = () => {
    onUpdate(index, editedItem);
    setIsEditing(false);
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditedItem({ ...item });
    setIsEditing(false);
    setEditingField(null);
    setShowAddField(false);
  };

  const handleFieldChange = (key, value) => {
    if (key === 'id') return; 
    setEditedItem(prev => ({ ...prev, [key]: value }));
  };

  const handleDeleteField = (keyToDelete) => {
    if (keyToDelete === 'id') return; 
    const { [keyToDelete]: deleted, ...rest } = editedItem;
    setEditedItem(rest);
  };

  const handleAddField = () => {
    if (newFieldKey.trim().toLowerCase() === 'id') return; 
    if (newFieldKey.trim() && newFieldValue.trim()) {
      setEditedItem(prev => ({
        ...prev,
        [newFieldKey.trim()]: newFieldValue.trim(),
      }));
      setNewFieldKey('');
      setNewFieldValue('');
      setShowAddField(false);
    }
  };

  const handleFieldRename = (oldKey, newKey) => {
    if (oldKey === 'id' || newKey === 'id') return;
    const { [oldKey]: value, ...rest } = editedItem;
    setEditedItem({ ...rest, [newKey]: value });
    setEditingField(newKey);
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const formatValue = (value) => {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 group"
    >

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
          <span className="text-white/60 text-sm font-medium">
            Item #{index + 1}
          </span>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-white/60 hover:text-blue-400 hover:bg-white/10 rounded-lg transition-all duration-200"
                title="Edit card"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(index)}
                className="p-2 text-white/60 hover:text-red-400 hover:bg-white/10 rounded-lg transition-all duration-200"
                title="Delete card"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="p-2 text-white/60 hover:text-green-400 hover:bg-white/10 rounded-lg transition-all duration-200"
                title="Save changes"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 text-white/60 hover:text-red-400 hover:bg-white/10 rounded-lg transition-all duration-200"
                title="Cancel editing"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {visibleEntries.map(([key, value]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="group/field"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {isEditing && key !== 'id' && editingField === key ? (
                      <input
                        type="text"
                        value={key}
                        onChange={(e) => handleFieldRename(key, e.target.value)}
                        onKeyDown={(e) => handleKeyPress(e, () => setEditingField(null))}
                        className="bg-white/10 border border-white/30 rounded-lg px-3 py-1 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                        autoFocus
                      />
                    ) : (
                      <span
                        className={`text-sm font-medium text-purple-300 ${isEditing && key !== 'id' ? 'cursor-pointer hover:text-purple-200' : ''}`}
                        onClick={() => isEditing && key !== 'id' && setEditingField(key)}
                      >
                        {key}
                      </span>
                    )}

                    {isEditing && key !== 'id' && (
                      <button
                        onClick={() => handleDeleteField(key)}
                        className="opacity-0 group-hover/field:opacity-100 p-1 text-red-400 hover:text-red-300 transition-all duration-200"
                        title="Delete field"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <textarea
                      value={formatValue(value)}
                      onChange={(e) => handleFieldChange(key, e.target.value)}
                      className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 resize-none min-h-[60px]"
                      rows={Math.min(Math.max(formatValue(value).split('\n').length, 2), 6)}
                    />
                  ) : (
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <pre className="text-sm text-white/80 whitespace-pre-wrap break-words font-mono">
                        {formatValue(value)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {hasMoreFields && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white/80 transition-colors duration-200"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show {itemEntries.length - 3} More Fields
              </>
            )}
          </button>
        )}

        {isEditing && (
          <AnimatePresence>
            {showAddField ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-white/20 pt-4 space-y-3"
              >
                <input
                  type="text"
                  placeholder="Field name"
                  value={newFieldKey}
                  onChange={(e) => setNewFieldKey(e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, handleAddField)}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                />
                <textarea
                  placeholder="Field value"
                  value={newFieldValue}
                  onChange={(e) => setNewFieldValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && e.ctrlKey && handleAddField()}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 resize-none"
                  rows="2"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddField}
                    className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors duration-200"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowAddField(false);
                      setNewFieldKey('');
                      setNewFieldValue('');
                    }}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            ) : (
              <button
                onClick={() => setShowAddField(true)}
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white/80 transition-colors duration-200 mt-4 p-2 border border-dashed border-white/30 rounded-lg w-full justify-center hover:border-white/50"
              >
                <Plus className="w-4 h-4" />
                Add New Field
              </button>
            )}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default DataCard;