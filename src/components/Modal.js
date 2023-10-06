import classes from './Modal.module.css'
import ReactDom from 'react-dom'

const Backdrop = props =>{
     return <div className={`${classes.backdrop} ${props.isTransparent ? classes.transparent : ''}`} onClick={props.onClose}></div>
}

const ModalOverlay = props =>{
     return <div className={`${classes.modal} ${classes[props.classes]}`}>
         <div className={classes.content}>{props.children}</div>
     </div>
}

const portalElement = document.getElementById('overlays')

const Modal = props => {
    return <>
    {ReactDom.createPortal( <Backdrop onClose={props.onClose} isTransparent={props.isTransparent}/>, portalElement )}
    {ReactDom.createPortal( <ModalOverlay classes={props.classes}>{props.children}</ModalOverlay>, portalElement)}    
    </>
}

export default Modal



// import styles from './Modal.module.css'
// import { useNavigate } from 'react-router-dom';


// function Modal(props){
//   const navigate = useNavigate();
//   function closeHandler(){
//    navigate('../')          //to get one level back, could've used just '/'
//   }
//   return <>
//     <div className={styles.backdrop} onClick={closeHandler}/>
//     <dialog open className={styles.modal}>
//       {props.children}
//     </dialog>
//   </>
// }

// export default Modal;