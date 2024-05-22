import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

function NotificationComponent({ goals }) {
    useEffect(() => {
        const scheduleNotifications = () => {
            goals.forEach(goal => {
                goal.tasks.forEach(task => {
                    const { value, time } = task;
                    const currentTime = new Date();
                    // const targetTime = new Date(time);
                    const targetTime = new Date();

                    const timeDifference = targetTime - currentTime;

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
