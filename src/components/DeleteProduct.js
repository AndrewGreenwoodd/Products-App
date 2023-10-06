import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { productActions } from "../store";
import styles from '../components/DeleteProduct.module.css'

function DeleteConfirmationModal({ message, onConfirm, onCancel }) {
    const dispatch = useDispatch();
    const closeConfirmationModal = () => {
        dispatch(productActions.clearProductToDelete());
    }
    const modalContent = <div className={styles.deleteModal}>
        <p>{message}</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
    </div>
    return (
        <Modal onClose={closeConfirmationModal}>
            {modalContent}

        </Modal>
    );
}

export default DeleteConfirmationModal;