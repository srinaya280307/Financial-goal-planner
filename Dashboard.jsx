import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { GoalContext } from '../context/GoalContext';
import GoalCard from '../components/GoalCard';
import GoalForm from '../components/GoalForm';
import Charts from '../components/Charts';
import { Plus } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { goals, fetchGoals, loading } = useContext(GoalContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState(null);

  useEffect(() => {
    fetchGoals();
    // eslint-disable-next-line
  }, []);

  const totalSaved = goals.reduce((acc, curr) => acc + curr.currentSavings, 0);
  const totalTarget = goals.reduce((acc, curr) => acc + curr.targetAmount, 0);
  const overallPercentage = totalTarget > 0 ? Math.min(100, Math.round((totalSaved / totalTarget) * 100)) : 0;

  const handleOpenModal = (goal = null) => {
    setGoalToEdit(goal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setGoalToEdit(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '5rem' }}>Loading dashboard...</div>;
  }

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Overview</h1>
          <p style={{ color: 'var(--text-muted)' }}>Track and manage your financial goals.</p>
        </div>
        <button className="btn-primary" onClick={() => handleOpenModal()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> New Goal
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Overall Progress</h3>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{overallPercentage}%</h2>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${overallPercentage}%` }}></div>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
            ${totalSaved.toLocaleString()} saved out of ${totalTarget.toLocaleString()} goal.
          </p>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <Charts />
        </div>
      </div>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Your Goals</h2>
      
      {goals.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>You don't have any goals yet.</p>
          <button className="btn-primary" onClick={() => handleOpenModal()}>Create Your First Goal</button>
        </div>
      ) : (
        <div className="dashboard-grid">
          {goals.map(goal => (
            <GoalCard key={goal._id} goal={goal} onEdit={handleOpenModal} />
          ))}
        </div>
      )}

      {isModalOpen && <GoalForm onClose={handleCloseModal} goalToEdit={goalToEdit} />}
    </div>
  );
};

export default Dashboard;
