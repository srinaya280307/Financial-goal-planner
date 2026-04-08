import React, { useState, useContext, useEffect } from 'react';
import { GoalContext } from '../context/GoalContext';

const GoalForm = ({ onClose, goalToEdit }) => {
  const { addGoal, updateGoal } = useContext(GoalContext);
  
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    currentSavings: '0',
    deadline: '',
    category: 'Other'
  });

  useEffect(() => {
    if (goalToEdit) {
      setFormData({
        title: goalToEdit.title,
        targetAmount: goalToEdit.targetAmount,
        currentSavings: goalToEdit.currentSavings,
        deadline: new Date(goalToEdit.deadline).toISOString().split('T')[0],
        category: goalToEdit.category
      });
    }
  }, [goalToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (goalToEdit) {
      await updateGoal(goalToEdit._id, formData);
    } else {
      await addGoal(formData);
    }
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="glass-card modal-content">
        <h2 style={{ marginBottom: '1.5rem' }}>{goalToEdit ? 'Edit Goal' : 'Create New Goal'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Goal Title</label>
            <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Target Amount ($)</label>
              <input type="number" name="targetAmount" className="form-control" value={formData.targetAmount} onChange={handleChange} required min="1" />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Current Savings ($)</label>
              <input type="number" name="currentSavings" className="form-control" value={formData.currentSavings} onChange={handleChange} min="0" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Deadline</label>
              <input type="date" name="deadline" className="form-control" value={formData.deadline} onChange={handleChange} required />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Category</label>
              <select name="category" className="form-control" value={formData.category} onChange={handleChange}>
                {['Travel', 'Education', 'Emergency Fund', 'Retirement', 'Home', 'Vehicle', 'Other'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" className="btn-danger" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" style={{ flex: 1 }}>{goalToEdit ? 'Update' : 'Save'} Goal</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalForm;
