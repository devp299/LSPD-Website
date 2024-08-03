import React, { useState } from 'react';
import '../../css/ApplyFormModal.css';
import { apply } from '../../api';

const ApplyForm = ({ job, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    degree: '',
    experience: '', 
    jobTitle: `${job.title}`,
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData({
      ...formData,
      [name] : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.degree) newErrors.degree = 'Degree is required';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    // if (!formData.jobTitle) newErrors.jobTitle = 'Job Title is required';

    // if (!formData.resume) newErrors.resume = 'Resume is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('email', formData.email);
      formDataObj.append('age', formData.age);
      formDataObj.append('phone', formData.phone);
      formDataObj.append('degree', formData.degree);
      formDataObj.append('experience', formData.experience);
      formDataObj.append('jobTitle', formData.jobTitle);
      // formDataObj.append('resume', formData.resume); // Adding file to FormData
      // formDataObj.append('job', job._id); // Assuming `job` prop contains job details

      try {
        const response = await apply(formDataObj);
        if (response.success) {
          setSubmitStatus('Application submitted successfully!');
          setTimeout(() => {
            setSubmitStatus(null);
            onClose();
          }, 3000);
        } else {
          setSubmitStatus('Failed to submit application.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitStatus('Failed to submit application.');
      }
    }
  };

  return (
    <div className="apply-form-container">
      <h1 className="career-form-title">Apply for {job.title}</h1>
      {submitStatus && <p className="submit-status">{submitStatus}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "row",gap: "30px" }}>
        <label>
          Full Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <label>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
          {errors.age && <span className="error">{errors.age}</span>}
        </label>
        </div>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        <div style={{ display: "flex",flexDirection: "row",justifyContent: "center", gap: "30px"}}>
        <label>
          Phone Number:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </label>
        <label>
          Highest Degree:
          <input type="text" name="degree" value={formData.degree} onChange={handleChange} />
          {errors.degree && <span className="error">{errors.degree}</span>}
        </label>
        </div>
        <div style={{ display: "flex",flexDirection: "row",justifyContent: "center", gap: "30px"}}>
        <label>
          Years of Experience:
          <input type="number" name="experience" value={formData.experience} onChange={handleChange} />
          {errors.experience && <span className="error">{errors.experience}</span>}
        </label>
        </div>
        <button className="career-button" type="submit">Submit Application</button>
        <button className="career-button" type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default ApplyForm;
