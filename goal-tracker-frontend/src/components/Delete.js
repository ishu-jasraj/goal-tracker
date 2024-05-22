import '../styles/DeleteModal.css'

export default function Delete({ onDeleteGoal, closeDeleteModal }) {
    return (
        <div className="delete-modal-overlay">
            <div className="delete-modal-content">
                <p>Are you sure you want to delete this goal?</p>
                <div className="delete-modal-actions">
                    <button className="delete-modal-button yes-button" onClick={onDeleteGoal}>Yes</button>
                    <button className="delete-modal-button no-button" onClick={closeDeleteModal}>No</button>
                </div>
            </div>
        </div>
    )
}