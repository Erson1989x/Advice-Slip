import './FavoriteAdvicesModal.css';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import {deleteAdvice } from '../../initialAdvice';


// FavoriteAdvicesModal component
const FavoriteAdvicesModal = (props) => {
    return (
        <div className="favorite-advices-modal-container">
            <div className="favorite-advices-modal-card">
                <div className="favorite-advices-modal-title">
                    <AutoAwesomeIcon />
                    <h2> Favorited advices </h2>
                </div>
                <div>
                    {props.advices.map((advice) => (
                        <div key={advice.id}>
                        <p key={advice.id}> {advice.content} - {advice.addedAt} </p>
                        <button onClick = { () => props.deleteAdvice(advice.id) } className='delete-advice-button'> Delete </button>
                        </div>
                    ))}
                </div>
            </div>
            <div onClick={props.closeModal} className='favorite-advices-overlay'></div>
        </div>
    )
};

export default FavoriteAdvicesModal;