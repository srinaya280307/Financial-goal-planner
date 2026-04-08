import React, { useContext, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { GoalContext } from '../context/GoalContext';

const Charts = () => {
  const { goals } = useContext(GoalContext);

  const data = useMemo(() => {
    return goals.map(goal => ({
      name: goal.title.length > 10 ? goal.title.substring(0, 10) + '...' : goal.title,
      'Current Savings': goal.currentSavings,
      'Target': goal.targetAmount,
    }));
  }, [goals]);

  if (!goals || goals.length === 0) return null;

  return (
    <div className="chart-container">
      <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>Savings Progress Overview</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
          <Tooltip 
            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
            itemStyle={{ color: '#f8fafc' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey="Current Savings" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Target" fill="rgba(236, 72, 153, 0.3)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
