import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./StudentForm.css";
import toast, {Toaster} from 'react-hot-toast';


const StudentForm = () => {
    const [formData, setFormData] = useState({
        studentName: "",
        applyClass: "",
        dob: "",
        guardianName: "",
        address: "",
        phone: "",
        email: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert("Application submitted successfully!");
        navigate('/admission');
    };
    const isFormInvalid = () => {
        return (
            formData.studentName.trim() === "" ||
            formData.address.trim() === "" ||
            formData.dob.trim() === "" ||
            formData.email.trim() === "" ||
            formData.guardianName.trim() === "" ||
            formData.applyClass.trim() === "" ||
            formData.phone.trim() === ""
        );
    };

    const disabledState = isFormInvalid();
    return (
        <div className="form-container">
            <form className="admission-form" onSubmit={handleSubmit}>
                <h2>Admission Form</h2>

                <input
                    type="text"
                    name="studentName"
                    placeholder="Student's Name"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="applyClass"
                    placeholder="Class You Want to Apply For"
                    value={formData.applyClass}
                    onChange={handleChange}
                    required
                />

                <label>Date of Birth</label>
                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="guardianName"
                    placeholder="Parent/Guardian Full Name"
                    value={formData.guardianName}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="address"
                    placeholder="Current Address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    required
                />

                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    disabled={disabledState}
                    style={{ cursor: disabledState ? "not-allowed" : "pointer" }}
                >
                    Submit Application
                </button>

            </form>
            </div>
    );
};

export default StudentForm;