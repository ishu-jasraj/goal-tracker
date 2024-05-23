import React, { useState, useEffect } from 'react';
import '../styles/Task.css';

export default function Task({ uKey, task, handleInputChange, handleTaskInputChange }) {
    // const [isReminderSet, setIsReminderSet] = useState(false);
    const [reminders, setReminders] = useState({});
    // task.reminder = task.reminder == 'true' ? true : false;

    // const handleCheckboxChange = (id, e) => {
    //     setIsReminderSet(!isReminderSet);
    //     e.target.value = !isReminderSet;
    //     handleTaskInputChange(id, e);
    // };

    useEffect(() => {
        setReminders(prevState => ({
            ...prevState,
            [uKey]: task.reminder || false
        }));
    }, [task.reminder, uKey]);


    const handleCheckboxChange = (id, e) => {
        setReminders(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
        e.target.value = !reminders[id];
        handleTaskInputChange(id, e);
    };

    const handleSuggestedTimeClick = (id, time) => {
        const event = { target: { name: 'time', value: time } };
        handleInputChange(id, event);
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
                    id={`Task-${uKey}`}
                    name="value"
                    value={task.value || ''}
                    onChange={(e) => handleInputChange(uKey, e)}
                />
            </div>
            <div className="task-details">
                <div className="task-select">
                    <label htmlFor={`quantity-${uKey}`}>Quantity:</label>
                    <select id={`quantity-${uKey}`} name="quantity"
                        value={task.quantity || ''}
                        onChange={(e) => handleInputChange(uKey, e)}>
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
                    <label htmlFor={`frequency-${uKey}`}>Frequency:</label>
                    <select id={`frequency-${uKey}`}
                        name="frequency"
                        value={task.frequency || ''}
                        onChange={(e) => handleInputChange(uKey, e)}>
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
                        id={`reminder-${uKey}`}
                        name="reminder"
                        value={task.reminder || ''}
                        checked={!reminders[uKey]}
                        onChange={(e) => handleCheckboxChange(uKey, e)}
                    />
                    <label htmlFor={`reminder-${uKey}`}>Set Reminder</label>
                </div>
                <div className="task-reminder">
                    <label htmlFor={`time-${uKey}`} className="time-label">Time:</label>
                    <input
                        type="time"
                        id={`time-${uKey}`}
                        name="time"
                        value={task.time || ''}
                        onChange={(e) => handleInputChange(uKey, e)}
                        disabled={reminders[uKey]}
                    />
                </div>
            </div>
            {(!reminders[uKey]) && (
                <div className="suggested-times">
                    <label>Suggested Times:</label>
                    <div className="suggested-time-tabs">
                        {suggestedTimes.map((time, index) => (
                            <div
                                key={index}
                                id={`suggested-time-${index}`}
                                className="suggested-time-tab"
                                onClick={() => handleSuggestedTimeClick(uKey, formatTimeForInput(time))}
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
