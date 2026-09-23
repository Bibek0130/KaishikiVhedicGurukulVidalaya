import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./StudentForm.css";
import toast, { Toaster } from 'react-hot-toast';
import { sendWhatsAppMessage } from '../../api/whatsapp';
import { useTranslation } from '../../hooks/useTranslation';


const StudentForm = () => {
    const { t } = useTranslation();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            await sendWhatsAppMessage(
                `Application From\nStudent Name: ${formData.studentName}\n` +
                `Apply Class: ${formData.applyClass}\nDOB: ${formData.dob}\n` +
                `Address: ${formData.address}\nGuardian Name: ${formData.guardianName}\n` +
                `Phone: ${formData.phone}\nEmail: ${formData.email}`
            );
            alert(t('forms.studentForm.successAlert'));
            navigate('/admission');
        } catch (error) {
            alert(error.message);
        }
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
                <h2>{t('forms.studentForm.title')}</h2>

                <input
                    type="text"
                    name="studentName"
                    placeholder={t('forms.studentForm.studentName')}
                    aria-label={t('forms.studentForm.studentName')}
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="applyClass"
                    placeholder={t('forms.studentForm.applyClass')}
                    aria-label={t('forms.studentForm.applyClass')}
                    value={formData.applyClass}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="dob">{t('forms.studentForm.dob')}</label>
                <input
                    id="dob"
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="guardianName"
                    placeholder={t('forms.studentForm.guardianName')}
                    aria-label={t('forms.studentForm.guardianName')}
                    value={formData.guardianName}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="address"
                    placeholder={t('forms.studentForm.address')}
                    aria-label={t('forms.studentForm.address')}
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    required
                />

                <input
                    type="tel"
                    name="phone"
                    placeholder={t('forms.studentForm.phone')}
                    aria-label={t('forms.studentForm.phone')}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder={t('forms.studentForm.email')}
                    aria-label={t('forms.studentForm.email')}
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    disabled={disabledState}
                    style={{ cursor: disabledState ? "not-allowed" : "pointer" }}
                >
                    {t('forms.studentForm.submit')}
                </button>

            </form>
            </div>
    );
};

export default StudentForm;