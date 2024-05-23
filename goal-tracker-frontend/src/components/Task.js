import React, { useState } from 'react';
import '../styles/Task.css'; // Ensure this path is correct

export default function Task({ task, handleInputChange, handleTaskInputChange }) {
    const [isReminderSet, setIsReminderSet] = useState(false);
    console.log("isReminderSet", isReminderSet)
    // task.reminder = task.reminder == 'true' ? true : false;

    const handleCheckboxChange = (id, e) => {
        setIsReminderSet(!isReminderSet);
        e.target.value = !isReminderSet;
        handleTaskInputChange(id, e);
    };

    const handleSuggestedTimeClick = (id, time) => {
        const event = { target: { name: 'time', value: time } };
        handleTaskInputChange(id, event);
    };

    const suggestedTimes = ['08:00 AM', '01:52 PM', '04:00 PM'];

    const formatTimeForInput = (time) => {
        const [hour, period] = time.split(' ');
        let [hours, minutes] = hour.split(':').map(Number);
        if (period === 'PM' && hours !== 12) {
            hours += 12;
        }
        if (period === 'AM' && hours === 12) {
            hours = 0;
        }
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };

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
                        checked={task.reminder || isReminderSet}
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
            {(isReminderSet || task.reminder) && (
                <div className="suggested-times">
                    <label>Suggested Times:</label>
                    <div className="suggested-time-tabs">
                        {suggestedTimes.map((time, index) => (
                            <div
                                key={index}
                                className="suggested-time-tab"
                                onClick={() => handleSuggestedTimeClick(task.id, formatTimeForInput(time))}
                            >
                                {time}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
