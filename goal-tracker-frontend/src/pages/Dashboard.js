import { useState } from 'react';
import React from 'react';
import '../styles/Dashboard.css';
import { useNavigate, useLocation } from 'react-router-dom';
import CreateModal from './CreateModal';

const initialFormData = {
    _id: '',
    title: '',
    tasks: [{ id: 1, name: `Task-1`, value: '' }],
    minTime: '',
    maxTime: '',
};

// function formatTime(time) {
//     return new Date(time.getTime() + 24 * 60 * 60 * 1000).toLocaleDateString();
// }

const Dashboard = () => {
    const [goals, setGoals] = useState([]);
    const [formData, setFormData] = useState(initialFormData);
    const [isModify, setModify] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();
    const { username, _id } = location.state || {};

    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleLogout() {
        navigate('/login');
    }

    function openModal() {
        setIsModalOpen(true);
        setFormData({
            ...initialFormData
        });
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    const handleModify = (index) => {
        setIsModalOpen(true);
        setModify(true);
        setFormData({
            ...goals[index]
        });
    };

    const handleDelete = (index) => {
        setGoals((prevGoals) => prevGoals.filter((_, i) => i !== index));
    };

    const handleAddInput = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            tasks: [...prevFormData.tasks, { id: prevFormData.tasks.length + 1, name: `Task-${prevFormData.tasks.length + 1}`, value: '' }],
        }));
    };

    const handleInputChange = (id, event) => {
        const newTasks = formData.tasks.map(task =>
            task.id === id ? { ...task, value: event.target.value } : task
        );
        setFormData({ ...formData, tasks: newTasks });
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };



    function handleGoalCreation(createdGoal) {
        if (isModify) {
            const modifiedGoalId = createdGoal._id;
            const index = goals.findIndex(goal => goal._id == modifiedGoalId);
            setGoals((prevGoals) => {
                const newGoals = [...prevGoals.map(prevGoal => {
                    return { ...prevGoal };
                })]
                newGoals[index] = createdGoal;
                return newGoals;
            });
            setModify(false);
        }
        else {
            setGoals((prevGoals) => {
                const curr_goals = [...prevGoals, createdGoal];
                return curr_goals;
            });
        }
    }

    return (
        <div>
            <header className='dashboard-header'>
                <h2>Hi, Welcome <em>{username}</em> to the Dashboard</h2>
                <div>
                    <button
                        className='add-btn'
                        onClick={openModal}
                        disabled={goals.length === 2}
                    >Create Goals</button>
                    <button className='logout-btn' onClick={handleLogout}>Logout</button>
                </div>
            </header>
            {/* create goals card */}
            <div className="goals-container">
                {goals.map((currentGoal, index) => (
                    <div className="goal-card" key={index}>
                        <h3>{currentGoal.title}</h3>
                        <ol>
                            {currentGoal.tasks && currentGoal.tasks.map((task, idx) => (
                                <li key={idx}>{task.value}</li>
                            ))}
                        </ol>
                        {/* <p>Min Time: {formatTime(currentGoal.minTime)}</p>
                        <p>Max Time: {formatTime(currentGoal.maxTime)}</p> */}
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
                isModalOpen &&
                <CreateModal
                    isModify={isModify}
                    formData={formData}
                    createGoal={handleGoalCreation}
                    closeModal={closeModal}
                    handleInputChange={handleInputChange}
                    handleFieldChange={handleFieldChange}
                    handleAddInput={handleAddInput}
                    title='Create Goal' />
            }
        </div>
    );
};

export default Dashboard;