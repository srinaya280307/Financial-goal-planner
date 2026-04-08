import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from './AuthContext';

export const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGoals = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await api.get('/goals');
      setGoals(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchGoals();
    } else {
      setGoals([]);
    }
  }, [user]);

  const addGoal = async (goalData) => {
    const res = await api.post('/goals', goalData);
    setGoals([res.data, ...goals]);
  };

  const updateGoal = async (id, goalData) => {
    const res = await api.put(`/goals/${id}`, goalData);
    setGoals(goals.map(g => g._id === id ? res.data : g));
  };

  const deleteGoal = async (id) => {
    await api.delete(`/goals/${id}`);
    setGoals(goals.filter(g => g._id !== id));
  };

  return (
    <GoalContext.Provider value={{ goals, loading, fetchGoals, addGoal, updateGoal, deleteGoal }}>
      {children}
    </GoalContext.Provider>
  );
};
