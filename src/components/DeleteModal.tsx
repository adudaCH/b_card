import { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";

import { successMsg } from "../services/toastify";
import { deleteCardById } from "../services/cardsServices";


interface DeleteModalProps {
    show: boolean;
    onHide: Function;
    refresh: Function;
    productId: string;
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({
    show,
    onHide,
    refresh,
    productId,
}) => {
    return (
        <>
        <Modal
            show={show}
            onHide={() => onHide()}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Delete 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            are you sure you want to delete dis product?
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={()=>{
            deleteCardById(productId).then(()=>{
                onHide()
                refresh()
                successMsg("item was successfully deleted")
            }).catch((err)=>{
                console.log(err)
            })
            }}>Delete</Button>
            <Button variant="secondary" onClick={()=>{
                onHide()
            }}>Cancel</Button>
            </Modal.Footer>
        </Modal>
        </>
        );
};

export default DeleteModal;
