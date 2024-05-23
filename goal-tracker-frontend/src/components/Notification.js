import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment-timezone';
import 'react-toastify/dist/ReactToastify.css';

function NotificationComponent({ goals }) {
    useEffect(() => {
        const scheduleNotifications = () => {
            goals.forEach(goal => {
                goal.tasks.forEach(task => {
                    const { value, time } = task;
                    console.log('Task value and time:', value, time);

                    const currentTime = moment().tz("Asia/Kolkata");
                    const targetTime = moment.tz(time, "HH:mm", "Asia/Kolkata");

                    // If target time is earlier than current time, set it for the next day
                    if (targetTime.isBefore(currentTime)) {
                        targetTime.add(1, 'day');
                    }

                    const timeDifference = targetTime.diff(currentTime);

                    console.log('Current time:', currentTime.format());
                    console.log('Target time:', targetTime.format());
                    console.log('Time difference (ms):', timeDifference);

                    if (timeDifference >= 0) {
                        setTimeout(() => {
                            showNotification(`Reminder - ${value}`);
                        }, timeDifference);
                    } else {
                        console.log(`The target time for "${value}" is in the past`);
                    }
                });
            });
        };

        const showNotification = (value) => {
            // Show in-app toast notification
            toast.info(value, {
                position: "top-right",
                autoClose: 5000,
            });

            // Show desktop notification
            if (!("Notification" in window)) {
                console.error("This browser does not support desktop notification");
            } else if (Notification.permission === "granted") {
                new Notification('Reminder', {
                    body: value,
                    icon: 'path/to/icon.png' // Optional: Add an icon if desired
                });
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        new Notification('Reminder', {
                            body: value,
                            icon: 'path/to/icon.png'
                        });
                    }
                });
            }
        };

        scheduleNotifications();
    }, [goals]);

    return null;
}

export default NotificationComponent;
