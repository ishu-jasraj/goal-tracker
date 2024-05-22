import React, { useState } from 'react';
import '../styles/CreateModal.css';

const CreateModal = ({ closeModal, title, createGoal }) => {
    const [formData, setFormData] = useState({
        title: '',
        tasks: [{ id: 1, name: `Task-1`, value: '' }],
        minTime: '',
        maxTime: '',
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        //filtering out the empty tasks
        const filteredTasks = formData.tasks.filter(task => task.value.trim() !== '');
        const finalFormData = {
            ...formData,
            tasks: filteredTasks
        };
        console.log(finalFormData);
        // Handle form submission, e.g., send data to server
        try {
            const response = await fetch('http://localhost:5000/api/goals/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': true
                },
                body: JSON.stringify(finalFormData),
            });
            console.log("response->", response)
            // console.log("response data->", await response.json())
            if (response.status === 400) {
                throw new Error('Unable to create the goal');
            }
            const goalData = await response.json();
            console.log("goalData--", goalData)
            closeModal();
            createGoal(goalData);

        } catch (error) {
            console.log("error-->>>.", error.message)
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleFieldChange}
                            required
                        />
                    </div>
                    {formData.tasks.map(task => (
                        <div className="form-group" key={task.id}>
                            <label htmlFor={task.name}>{task.name.charAt(0).toUpperCase() + task.name.slice(1)}:</label>
                            <input
                                type="text"
                                id={task.name}
                                name={task.name}
                                value={task.value}
                                onChange={(e) => handleInputChange(task.id, e)}
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        className="add-btn"
                        onClick={handleAddInput}
                        disabled={formData.tasks.length === 5}
                    >Add Task+</button>
                    <div className="form-group">
                        <label htmlFor="minTime">Minimum Time:</label>
                        <input
                            type="date"
                            id="minTime"
                            name="minTime"
                            value={formData.minTime}
                            onChange={handleFieldChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="maxTime">Maximum Time:</label>
                        <input
                            type="date"
                            id="maxTime"
                            name="maxTime"
                            value={formData.maxTime}
                            onChange={handleFieldChange}
                            required
                        />
                    </div>
                    <button className="submit-btn" type="submit">Save</button>
                </form>
                <button className="submit-btn close-btn" onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default CreateModal;
