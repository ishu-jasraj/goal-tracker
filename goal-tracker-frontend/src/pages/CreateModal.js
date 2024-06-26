import React from 'react';
import '../styles/CreateModal.css';
import { toast } from 'react-toastify';
import Task from '../components/Task'

const CreateModal = ({ closeModal, title, createGoal, formData, handleAddInput, handleFieldChange, handleInputChange, handleTaskInputChange, isModify, token, setModify }) => {
    console.log("formData-->>>", formData)
    console.log("isModify-->>>", isModify)


    const formattedMinTime = formData.minTime ? new Date(formData.minTime).toISOString().split('T')[0] : '';
    const formattedMaxTime = formData.maxTime ? new Date(formData.maxTime).toISOString().split('T')[0] : '';

    //saving goals
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("before submit formData--->>>>", formData)

        //filtering out the empty tasks
        const filteredTasks = formData.tasks.filter(task => {
            console.log("each task---", task)
            return task.value.trim() !== ''
        });
        const finalFormData = {
            ...formData,
            tasks: filteredTasks
        };
        console.log(finalFormData.tasks);
        if (finalFormData.maxTime < finalFormData.minTime) {
            return toast.error('Maxtime should be greater than Mintime');
        }

        try {
            let goalData = {};
            let response;
            if (isModify) {
                setModify(false)
                console.log("modifyyyyyyy finalFormData-->>>>", finalFormData)
                console.log("modifyyyyyyy token-->>>>", token)
                response = await fetch('http://localhost:5000/api/goals/update', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'Access-Control-Allow-Origin': true
                    },
                    body: JSON.stringify(finalFormData),
                });
                if (response && response.status === 400) {
                    toast.error('Failed to update the goal');
                    throw new Error('Unable to update the goal');
                }
                goalData = await response.json();
                toast.success('Goal Modified Successfully');

            }
            else {
                delete finalFormData._id;
                response = await fetch('http://localhost:5000/api/goals/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'Access-Control-Allow-Origin': true
                    },
                    body: JSON.stringify(finalFormData),
                });
                if (response && response.status === 400) {
                    toast.error('Failed to create the goal');
                    throw new Error('Unable to create the goal');
                }
                goalData = await response.json();
                toast.success('Goal Created Successfully');
            }
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
                <div className='modal-body'>
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
                        {formData.tasks && formData.tasks.map((task, index) => (
                            <div className="form-group" key={index}>
                                <Task uKey={index} task={task} handleInputChange={handleInputChange} handleTaskInputChange={handleTaskInputChange} />
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
                                value={formattedMinTime}
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
                                value={formattedMaxTime}
                                onChange={handleFieldChange}
                                required
                            />
                        </div>
                        <button className="submit-btn" type="submit">Save</button>
                    </form>
                    <button className="submit-btn close-btn" onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default CreateModal;


