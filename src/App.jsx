import { useState, useEffect } from 'react';
import './App.css';
import { initialAdvice,} from './initialAdvice';
import FavoriteAdvicesModal from './components/FavoriteAdvicesModal/FavoriteAdvicesModal';
import { deleteAdvice } from './initialAdvice';
import CustomAdvices from '../src/components/CostumAdvices/CostumAdvices';
import AdviceCard from './components/AdviceCard/AdviceCard';

const App = () => {
  const [advice, setAdvice] = useState(initialAdvice); // hook
  const [isLoading, setIsLoading] = useState(false);

  const favoriteAdvicesFromLocalStorage = JSON.parse(localStorage.getItem('favoriteAdvicesLS'));
  const initialFavoriteAdvices = favoriteAdvicesFromLocalStorage === null ? [] : favoriteAdvicesFromLocalStorage;

  const [favoriteAdvices, setFavoriteAdvices] = useState(initialFavoriteAdvices);
  const [modalIsOpen, setModalIsOpen] = useState(false);
;



  const addCustomAdvice = (customAdviceId, customAdviceContent) => {
    const newAdvice = {
      id: customAdviceId.toString(),
      content: customAdviceContent,
      addedAt: new Date().toLocaleDateString('en-RO', { day: '2-digit', month: 'long', year: 'numeric' }),
    };
    setAdvice(newAdvice);
    setFavoriteAdvices((prevAdvices) => [...prevAdvices, newAdvice]);
    }
  

  //handleDeleteAdvice 

  const handleDeleteAdvice = (adviceId) => {
    const updatedAdvices = favoriteAdvices.filter(advice => advice.id !== adviceId);
    setFavoriteAdvices(updatedAdvices);
  };

  const currentAdviceIsAddedToFavorites = favoriteAdvices.findIndex((favoriteAdvice) => favoriteAdvice.id === advice.id) === -1 ? false : true;

  const generateAdvice = async () => {
    setIsLoading(true);
    console.log('generateAdvice');
    
    try {
      // block-scoped variables
      const serverResponse = await fetch('https://api.adviceslip.com/advice');
      const { slip: { id, advice } } = await serverResponse.json();

      setAdvice({
        id,
        content: advice
      });
    } catch(e) {
      alert('An error occured, try again later.');
    } finally {
      setIsLoading(false);
    }

  };

  const handleAddToFavorites = () => {
    const indexOfCurrentAdvice = favoriteAdvices.findIndex((favoriteAdvice) => favoriteAdvice.id === advice.id);

    if (indexOfCurrentAdvice === -1) {
      // adaugam advice-ul la favorite
      // mereu cand avem in state o variabila egala cu un obiect sau un array trebuie sa:
      // 1. cream un nou obiect / array in care copiem continutul variabilei
      const newFavoriteAdvices = [ ...favoriteAdvices ];
      // 2. modificam noul obiect / array cum vrem noi
      const currentDate = new Date();
      // to do: formateaza currentDate la ceva de genul '24 May 2024 21:23'
      const formattedDate = currentDate.toDateString('en-RO', { day: '2-digit', month: 'long', year: 'numeric' });
      const newAdvice = {
        ...advice,
        addedAt: formattedDate
      };
      newFavoriteAdvices.push(newAdvice);
      // 3. adaugam noul obiect / array in state
      setFavoriteAdvices(newFavoriteAdvices);
      localStorage.setItem('favoriteAdvicesLS', JSON.stringify(newFavoriteAdvices));
    } else {
      // eliminam advice-ul de la favorite
      const newFavoriteAdvices = [ ...favoriteAdvices ];
      newFavoriteAdvices.splice(indexOfCurrentAdvice, 1);
      setFavoriteAdvices(newFavoriteAdvices);
      localStorage.setItem('favoriteAdvicesLS', JSON.stringify(newFavoriteAdvices));
    }
  }

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  // cand o functie este creata intr-o componenta, ea nu poate fi exportata
  // cand o functie contine ceva din state-ul componentei atunci nu putem o scoatem din componenta
  const handleCloseModal = () => {
    setModalIsOpen(false);
  }

  return (
    <div className='app-container'>
        <button onClick={handleOpenModal} className='show-favorites-button'> Show favorites </button>

        {modalIsOpen === true ? (<FavoriteAdvicesModal closeModal={handleCloseModal} advices={favoriteAdvices} deleteAdvice={handleDeleteAdvice} />) : null}
        <CustomAdvices addCustomAdvice={addCustomAdvice} />
        <AdviceCard generateAdvice={generateAdvice} handleAddToFavorites={handleAddToFavorites} advice={advice} currentAdviceIsAddedToFavorites={currentAdviceIsAddedToFavorites} isLoading={isLoading} />
    </div>
  );
}

export default App