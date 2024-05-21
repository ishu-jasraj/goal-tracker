// import React from 'react';

// const CreateModal = ({ closeModal, title }) => {
//     const handleSubmit = async (e) => {
//         console.log("clicked....")
//         e.preventDefault();
//     }
//     return (
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <h2>{title}</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label htmlFor="title">Title:</label>
//                         <input
//                             type="text"
//                             id="title"
//                             name="title"
//                             // value={formData.email}
//                             // onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <button className='submit-btn' type="submit">Save</button>
//                 </form>
//                 <button className='submit-btn close-btn' onClick={closeModal}>Close</button>
//             </div>
//         </div>
//     );
// };

// export default CreateModal;

import React, { useState } from 'react';

const CreateModal = ({ closeModal, title }) => {
    const [inputs, setInputs] = useState([{ id: 1, name: 'title', value: '' }]);
    const [formData, setFormData] = useState({});

    const handleAddInput = () => {
        setInputs([...inputs, { id: inputs.length + 1, name: `Task-${inputs.length}`, value: '' }]);
    };

    const handleInputChange = (id, event) => {
        const newInputs = inputs.map(input =>
            input.id === id ? { ...input, value: event.target.value } : input
        );
        setInputs(newInputs);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(e.);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <form onSubmit={handleSubmit}>
                    {inputs.map(input => (
                        <div className="form-group" key={input.id}>
                            <label htmlFor={input.name}>{input.name.charAt(0).toUpperCase() + input.name.slice(1)}:</label>
                            <input
                                type="text"
                                id={input.name}
                                name={input.name}
                                value={input.value}
                                onChange={(e) => handleInputChange(input.id, e)}
                                required
                            />
                        </div>
                    ))}
                    <button type="button" className="add-btn" onClick={handleAddInput}>Add Task+</button>
                    <div className="form-group">
                        <label htmlFor="min-time">Minimum Time:</label>
                        <input
                            type="text"
                            id="min-time"
                            name="min-time"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="max-time">Maximum Time:</label>
                        <input
                            type="text"
                            id="max-time"
                            name="max-time"
                            required
                        />
                    </div>
                    <button className="submit-btn" type="submit" onClick={handleSubmit}>Save</button>
                </form>
                <button className="submit-btn close-btn" onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default CreateModal;
