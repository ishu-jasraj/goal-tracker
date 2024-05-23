import React, { useState } from 'react';
import '../styles/Task.css'; // Ensure this path is correct

export default function Task({ task, handleInputChange, handleTaskInputChange }) {
    const [isReminderSet, setIsReminderSet] = useState(false);

    const handleCheckboxChange = (id, e) => {
        setIsReminderSet(!isReminderSet);
        e.target.value = !isReminderSet;
        handleTaskInputChange(id, e);
    };
    console.log("task incoming ===", task);
    return (
        <div className="task-container">
            <div className="task-input">
                <label htmlFor='Task'>Task:</label>
                <input
                    type="text"
                    id={task.value}
                    name={task.value}
                    value={task.value}
                    onChange={(e) => handleInputChange(task.id, e)}
                />
            </div>
            <div className="task-details">
                <div className="task-select">
                    <label htmlFor={`quantity-${task.id}`}>Quantity:</label>
                    <select id={`quantity-${task.id}`} name="quantity"
                        value={task.quantity || ''}
                        onChange={(e) => handleTaskInputChange(task.id, e)}>
                        <option disabled defaultValue>Select Qty</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                    </select>
                </div>
                <div className="task-frequency">
                    <label htmlFor={`frequency-${task.id}`}>Frequency:</label>
                    <select id={`frequency-${task.id}`}
                        name="frequency"
                        value={task.frequency || ''}
                        onChange={(e) => handleTaskInputChange(task.id, e)}>
                        <option disabled defaultValue>Select Frequency</option>
                        <option value="day">day</option>
                        <option value="week">week</option>
                    </select>
                </div>
            </div>
            <div className="task-reminder-container">
                <div className="task-reminder">
                    <input
                        type="checkbox"
                        id={`reminder-${task.id}`}
                        name="reminder"
                        value={task.reminder || ''}
                        checked={isReminderSet}
                        onChange={(e) => handleCheckboxChange(task.id, e)}
                    />
                    <label htmlFor={`reminder-${task.id}`}>Set Reminder</label>
                </div>
                <div className="task-reminder">
                    <label htmlFor={`time-${task.id}`} className="time-label">Time:</label>
                    <input
                        type="time"
                        id={`time-${task.id}`}
                        name="time"
                        value={task.time || ''}
                        onChange={(e) => handleTaskInputChange(task.id, e)}
                        disabled={!isReminderSet}
                    />
                </div>
            </div>
        </div>
    );
}


