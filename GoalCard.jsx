import React, { useContext } from 'react';
import { Target, Calendar, Trash2, Edit2, TrendingUp } from 'lucide-react';
import { GoalContext } from '../context/GoalContext';

const GoalCard = ({ goal, onEdit }) => {
  const { deleteGoal } = useContext(GoalContext);

  const percentage = Math.min(100, Math.round((goal.currentSavings / goal.targetAmount) * 100)) || 0;
  
  const timeDiff = new Date(goal.deadline).getTime() - new Date().getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const isExpired = daysLeft < 0;

  return (
    <div className="glass-card">
      <div className="goal-header">
        <div>
          <div className="goal-title">{goal.title}</div>
          <span className="goal-category">{goal.category}</span>
        </div>
        <div className="goal-actions">
          <button onClick={() => onEdit(goal)} style={{ background: 'transparent', color: 'var(--text-main)', padding: '0.25rem' }}>
            <Edit2 size={16} />
          </button>
          <button onClick={() => deleteGoal(goal._id)} style={{ background: 'transparent', color: 'var(--danger)', padding: '0.25rem' }}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div style={{ margin: '1.5rem 0' }}>
        <h3 style={{ fontSize: '2rem', margin: 0, background: 'linear-gradient(to right, #10b981, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          ${goal.currentSavings.toLocaleString()}
        </h3>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Goal: ${goal.targetAmount.toLocaleString()}
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
      </div>
      
      <div className="goal-meta">
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: percentage >= 100 ? 'var(--success)' : 'inherit' }}>
          <TrendingUp size={14} /> {percentage}% achieved
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: isExpired ? 'var(--danger)' : 'inherit' }}>
          <Calendar size={14} /> 
          {percentage >= 100 ? 'Completed!' : (isExpired ? 'Expired' : `${daysLeft} days left`)}
        </span>
      </div>
    </div>
  );
};

export default GoalCard;
