import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment-timezone';
import 'react-toastify/dist/ReactToastify.css';

function NotificationComponent({ goals }) {
    const timeoutsRef = useRef([]);

    useEffect(() => {
        // Clear previous timeouts
        timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
        timeoutsRef.current = [];

        goals.forEach(goal => {
            goal.tasks.forEach(task => {
                const { value, time } = task;
                console.log('Task value and time:', value, time);

                const currentTime = moment().tz("Asia/Kolkata");
                const targetTime = moment.tz(time, "HH:mm", "Asia/Kolkata");

                if (targetTime.isBefore(currentTime)) {
                    targetTime.add(1, 'day');
                }

                const timeDifference = targetTime.diff(currentTime);

                console.log('Current time:', currentTime.format());
                console.log('Target time:', targetTime.format());
                console.log('Time difference (ms):', timeDifference);

                if (timeDifference >= 0) {
                    const timeout = setTimeout(() => {
                        showNotification(`Reminder - ${value}`);
                    }, timeDifference);
                    timeoutsRef.current.push(timeout);
                } else {
                    console.log(`The target time for "${value}" is in the past`);
                }
            });
        });

        // Cleanup function to clear timeouts on component unmount
        return () => {
            timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
        };
    }, [goals]);

    const showNotification = (value) => {

        toast.info(value, {
            position: "top-right",
            autoClose: 5000,
        });


        if (!("Notification" in window)) {
            console.error("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
            new Notification('Reminder', {
                body: value,
                icon: 'path/to/icon.png' // This is optional
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

    return null;
}

export default NotificationComponent;
