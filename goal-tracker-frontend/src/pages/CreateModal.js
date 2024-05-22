import React, { useState } from 'react';
import '../styles/CreateModal.css';
import { toast } from 'react-toastify';

const CreateModal = ({ closeModal, title, createGoal, formData, handleAddInput, handleFieldChange, handleInputChange, isModify }) => {
    // console.log("modalData---->>>>", modalData)
    // const [formData, setFormData] = useState({
    //     title: modalData.title ?? '',
    //     tasks: modalData.tasks ?? [{ id: 1, name: `Task-1`, value: '' }],
    //     minTime: modalData.minTime ?? '',
    //     maxTime: modalData.maxTime ?? '',
    // });
    console.log("formData--->>>>", formData)

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
            let goalData = {};
            let response;
            if (isModify) {
                console.log("modifyyyyyyy-->>>>", finalFormData)
                response = await fetch('http://localhost:5000/api/goals/update', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': true
                    },
                    body: JSON.stringify(finalFormData),
                });
                // console.log("response data->", await response.json())
                if (response && response.status === 400) {
                    toast.error('Failed to update the goal');
                    throw new Error('Unable to update the goal');
                }
                toast.success('Goal Modified Successfully');
            }
            else {
                delete finalFormData._id;
                response = await fetch('http://localhost:5000/api/goals/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': true
                    },
                    body: JSON.stringify(finalFormData),
                });
                // console.log("response data->", await response.json())
                if (response && response.status === 400) {
                    toast.error('Failed to create the goal');
                    throw new Error('Unable to create the goal');
                }
                toast.success('Goal Created Successfully');
            }
            goalData = await response.json();
            goalData.minTime = goalData.minTime.split('T')[0];
            goalData.maxTime = goalData.maxTime.split('T')[0];
            console.log("modified goal data--->>>>", goalData)
            createGoal(goalData);
            closeModal();

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
                    {formData.tasks && formData.tasks.map(task => (
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
                    {formData.tasks.length === 5 && <p>button disabled</p>}
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
