import React, { useState } from 'react';
import './CostumAdvice.css';


// CustomAdvices component
const CustomAdvices = ({ addCustomAdvice }) => {
  const [adviceText, setAdviceText] = useState('');
  const [adviceId, setAdviceId] = useState('');
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  // Toggle visibility
  const toggleVisibility = () => {
    setIsVisible(preIsVisible => {
      console.log('toggleVisibility', !preIsVisible);
      return !preIsVisible;
    });

  };

  // Add custom advice
  const handleAdd = (event) => {
    event.preventDefault();
    addCustomAdvice(adviceId, adviceText);

    if(!validateInput()) {
      return;
    }
    addCustomAdvice(adviceText);
  };

// Validate input
  const validateInput = () => {
    const validationErrors = {};

    if (!adviceId.trim() || isNaN(adviceId) || parseInt(adviceId, 10) < 200) {
      validationErrors.id = 'ID must be a number and at least 200.';
    }
    if (!adviceText.trim() || adviceText.trim().length < 3) {
      validationErrors.content = 'Content must be at least 3 characters long.';
    }

    setErrors(validationErrors);

    // If there are no properties in the errors object, validation passed
    return Object.keys(validationErrors).length === 0;
  };


  // Handle input changes
  const handleInputChange = (event) => {
    setAdviceText(event.target.value);
  };

  // Handle ID changes
  const handleIdChange = (event) => {
    setAdviceId(event.target.value);
  };


// Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the ID and content
    if (!validateInput()) {
      return;
    }

    // If validation passes, call the addCustomAdvice function
    addCustomAdvice(adviceId, adviceText);
    setAdviceText('');
    setAdviceId('');
    setErrors({}); // Clear errors
  };

  return (
    // Render the component
    <div>
      <button className="custom-button" onClick={toggleVisibility}>Custom Advice</button>
      <div className={`custom-advices-container ${isVisible ? 'visible' : ''}`}>
      <form onSubmit={handleSubmit}>
        <div>
          <input className="id-input"
            type="number"
            value={adviceId}
            onChange={handleIdChange}
            placeholder="Advice ID (at least 200)"
            required
            min="200"
          />
        </div>
        <div>
          <textarea
            value={adviceText}
            onChange={handleInputChange}
            placeholder="Enter your custom advice here"
            required
            minLength="3"
          />
          {errors.content && <p className="error">{errors.content}</p>}
        </div>
        <button type="submit" className="custom-advices-button">Add Custom Advice</button>
      </form>
    </div>
    </div>
  );
};

export default CustomAdvices;