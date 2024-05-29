import React, { useEffect, useState } from 'react';
import './CostumAdvice.css';



// CustomAdvices component
const CustomAdvices = ({ addCustomAdvice }) => {
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [adviceId, setAdviceId] = useState('');
  const [adviceText, setAdviceText] = useState('');



  // Toggle visibility
  const toggleVisibility = () => {
   setIsVisible(!isVisible);
    };

// Validate input
  const validateInput = (adviceText) => {
    const validationErrors = {};

    if (adviceText.trim().length < 3) {
      validationErrors.content = 'Content must be at least 3 characters long.';
    }

    setErrors(validationErrors);

    // If there are no properties in the errors object, validation passed
    return Object.keys(validationErrors).length === 0;
  };

// Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const adviceText = formData.get('new-advice-text');
    const adviceId = formData.get('new-advice-id');

    // Validate the ID and content
    if (!validateInput(adviceText)) {
      return;
    }

    // If validation passes, call the addCustomAdvice function
    addCustomAdvice(adviceId, adviceText);

  };


  return (
    // Render the component
    <div>
      <button className="custom-button" onClick={toggleVisibility}>Custom Advice</button>
      <div className={`custom-advices-container ${isVisible ? 'visible' : ''}`}>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name='new-advice-id' 
            className="id-input"
            type="number"
            value={adviceId}
            placeholder="Advice ID (at least 200)"
            required
            min="200"
            onChange={(e) => setAdviceId(e.target.value)}
          />
        </div>
        <div>
          <textarea
            name='new-advice-text'
            value={adviceText}
            placeholder="Enter your custom advice here"
            required
            minLength="3"
            onChange={(e) => setAdviceText(e.target.value)}
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