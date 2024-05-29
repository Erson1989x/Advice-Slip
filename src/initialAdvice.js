export const initialAdvice = {
    id: 117,
    content: `It is easy to sit up and take notice, what's difficult is getting up and taking action.`
} 

// Delete advice function
  
  export  const deleteAdvice = (adviceId) => {
        const updatedAdvices = favoriteAdvices.filter(advice => advice.id !== adviceId);
        setFavoriteAdvices(updatedAdvices);
      };

