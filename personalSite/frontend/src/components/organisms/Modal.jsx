import styles from './Modal.module.scss';
import closeIcon from '../../assets/icons/close.svg'

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, apiResponseStatus, children, onToggleModal }) => {
    return isOpen && (
        <div className={styles.modal}>
            <div className={styles.modalWrapper}>
                <div className={styles.modalClose} onClick={() => onToggleModal()}>
                    <img src={closeIcon} alt="" />
                </div>
                {apiResponseStatus == 201 && (<h4 className='api-response-status'>Success</h4>)}
                {apiResponseStatus == 404 && (<h4 className='api-response-status'>Error</h4>)}
                {!apiResponseStatus && (children)}
            </div>
        </div>
    )
}

export default Modal;
