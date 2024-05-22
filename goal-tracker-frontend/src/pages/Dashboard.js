import { useState } from 'react';
import React from 'react';
import '../styles/Dashboard.css';
import { useNavigate, useLocation } from 'react-router-dom';
import CreateModal from './CreateModal';

const Dashboard = () => {
    const [goals, setGoals] = useState([]);

    const navigate = useNavigate();

    const location = useLocation();
    const { username, _id } = location.state || {};

    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleLogout() {
        navigate('/login');
    }

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    const handleModify = (index) => {
    };

    const handleDelete = (index) => {
        setGoals((prevGoals) => prevGoals.filter((_, i) => i !== index));
    };


    function handleGoalCreation(createdGoal) {
        setGoals((prevGoals) => {
            const curr_goals = [...prevGoals, createdGoal];
            return curr_goals;
        })
    }

    return (
        <div>
            <header className='dashboard-header'>
                <h2>Hi, Welcome <em>{username}</em> to the Dashboard</h2>
                <div>
                    <button
                        className='add-btn'
                        onClick={openModal}
                        disabled={goals.length == 2}
                    >Create Goals</button>
                    <button className='logout-btn' onClick={handleLogout}>Logout</button>
                </div>
            </header>
            {/* create goals card */}
            <div className="goals-container">
                {goals.map((currentGoal, index) => (
                    <div className="goal-card" key={index}>
                        <h3>{currentGoal.title}</h3>
                        <ul>
                            {currentGoal.tasks.map((task, idx) => (
                                <li key={idx}>{task.value}</li>
                            ))}
                        </ul>
                        <p>Min Time: {new Date(currentGoal.minTime).toLocaleDateString()}</p>
                        <p>Max Time: {new Date(currentGoal.maxTime).toLocaleDateString()}</p>
                        <div className="goal-actions">
                            <button onClick={() => handleModify(index)}>Modify</button>
                            <button onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {
                isModalOpen && <CreateModal createGoal={handleGoalCreation} closeModal={closeModal} title='Create Goal' />
            }
        </div>
    );
};

export default Dashboard;