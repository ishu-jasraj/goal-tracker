import { useState, useEffect } from 'react';
import React from 'react';
import '../styles/Dashboard.css';
import { useNavigate, useLocation } from 'react-router-dom';
import CreateModal from './CreateModal';
import Delete from '../components/Delete';
import { toast } from 'react-toastify';
import Notification from '../components/Notification';

const initialFormData = {
    _id: '',
    title: '',
    tasks: [{ id: 1, name: `Task-1`, value: '' }],
    minTime: '',
    maxTime: '',
};

function formatTime(time) {
    const date = new Date(time);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}


const Dashboard = () => {
    const [goals, setGoals] = useState([]);
    const [formData, setFormData] = useState(initialFormData);
    const [isModify, setModify] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(-1);

    const navigate = useNavigate();
    const location = useLocation();

    const { username, token } = location.state || {};

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/goals/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Assuming you're using Bearer token for authorization
                        'Access-Control-Allow-Origin': '*'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch goals');
                }

                const fetchedGoals = await response.json();
                console.log("fetchedGoals--->>>>>", fetchedGoals)
                if (fetchedGoals && fetchedGoals.length > 0) {
                    setGoals(fetchedGoals);
                }
            } catch (error) {
                console.error('Error fetching goals:', error);
            }
        };

        fetchGoals();
    }, [token]);



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
        setModify(false);
    }

    const handleModify = (index) => {
        setIsModalOpen(true);
        setModify(true);
        setFormData({
            ...goals[index]
        });
    };

    const handleDelete = (index) => {
        setIsDelete(index);
        setModify(false);
        console.log("is delete index---", isDelete)

    };
    const onDeleteGoal = async () => {
        console.log('!!!!---->>>', goals)
        console.log('!!!! is del---->>>', isDelete)
        console.log('!!!! is del---->>>', goals[isDelete])
        console.log(JSON.stringify(goals[setIsDelete]))
        try {
            console.log("deleteing-----")

            const response = await fetch('http://localhost:5000/api/goals/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Assuming you're using Bearer token for authorization
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(goals[isDelete]),
            });

            if (!response.ok) {
                throw new Error('Failed to delete goal');
            }

            setGoals((prevGoals) => prevGoals.filter((_, i) => i !== isDelete));
            setIsDelete(-1);
            toast.success('Goal Deleted Successfully')
        }
        catch (e) {
            setIsDelete(-1);
            toast.error('Delete failed')
        }
    }
    const handleAddInput = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            tasks: [...prevFormData.tasks, { id: prevFormData.tasks.length + 1, name: `Task-${prevFormData.tasks.length + 1}`, value: '' }],
        }));
    };

    const handleInputChange = (id, event) => {
        const { name, value } = event.target;
        const newTasks = formData.tasks.map(task =>
            task.id === id ? { ...task, value: event.target.value } : task
        );
        setFormData({ ...formData, tasks: newTasks });
    };

    const handleTaskInputChange = (id, event) => {
        console.log("event.target---", event.target)
        // console.log("event.target.value---", event.target.value)
        const { name, value, type, checked } = event.target;
        console.log("name----", name)
        console.log("value----", value)
        console.log("type----", type)
        console.log("checked----", checked)
        const newTasks = formData.tasks.map(task => {
            if (task.id === id) {
                const obj = {
                    ...task,
                    [name]: value,
                }
                console.log("check it ====", task.time);
                if (!task.time) {
                    obj.checked = name === 'time' ? true : false;
                }
                console.log("obj----", obj)
                return obj;
            }
            return task;
        });
        setFormData({
            ...formData,
            tasks: newTasks
        });
    };


    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const closeDeleteModal = () => { }



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
            {/* <div className="goals-container">
                {goals.map((currentGoal, index) => (
                    <div className="goal-card" key={index}>
                        <h3>{currentGoal.title}</h3>
                        <ol>
                            {currentGoal.tasks && currentGoal.tasks.map((task, idx) => (
                                <li key={idx}>{task.value}</li>
                            ))}
                        </ol>
                        <p>Min Time: {formatTime(currentGoal.minTime)}</p>
                        <p>Max Time: {formatTime(currentGoal.maxTime)}</p>
                        <div className="goal-actions">
                            <button onClick={() => handleModify(index)}>Modify</button>
                            <button onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div> */}
            <div className="goals-container">
                {goals.map((currentGoal, index) => (
                    <div className="goal-card" key={index}>
                        <h2 className="goal-title">{currentGoal.title}</h2>
                        <h4>Tasks:</h4>
                        <ol className="task-list">
                            {currentGoal.tasks && currentGoal.tasks.map((task, idx) => (
                                <li key={idx} className="task-item">{task.value}</li>
                            ))}
                        </ol>
                        <div className="time-details">
                            <p><strong>Min Time:</strong> {formatTime(currentGoal.minTime)}</p>
                            <p><strong>Max Time:</strong> {formatTime(currentGoal.maxTime)}</p>
                        </div>
                        <div className="goal-actions">
                            <button className="modify-btn" onClick={() => handleModify(index)}>Modify</button>
                            <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>


            <Notification goals={goals} />
            {
                isDelete >= 0 && <Delete onDeleteGoal={onDeleteGoal} closeDeleteModal={closeDeleteModal} />
            }
            {
                isModalOpen &&
                <CreateModal
                    isModify={isModify}
                    formData={formData}
                    createGoal={handleGoalCreation}
                    closeModal={closeModal}
                    handleInputChange={handleInputChange}
                    handleFieldChange={handleFieldChange}
                    handleTaskInputChange={handleTaskInputChange}
                    handleAddInput={handleAddInput}
                    token={token}
                    setModify={setModify}
                    title='Create Goal' />
            }
        </div>
    );
};

export default Dashboard;