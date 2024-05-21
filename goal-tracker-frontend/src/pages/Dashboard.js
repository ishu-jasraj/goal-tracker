import { useState } from 'react';
import React from 'react';
import '../styles/Dashboard.css';
import { useNavigate, useLocation } from 'react-router-dom';
import CreateModal from './CreateModal';

const Dashboard = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { username, _id } = location.state || {};

    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleLogout() {
        navigate('/login');
    }

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    return (
        <div>
            <header className='dashboard-header'>
                <h2>Hi, Welcome <em>{username}</em> to the Dashboard</h2>
                <div>
                    <button onClick={openModal}>Create Goals</button>
                    <button className='logout-btn' onClick={handleLogout}>Logout</button>
                </div>
            </header>
            {
                isModalOpen && <CreateModal closeModal={closeModal} title='Create Goal' />
            }
        </div>
    );
};

export default Dashboard;