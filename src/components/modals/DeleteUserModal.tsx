<<<<<<< HEAD
import { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BiSolidErrorCircle } from "react-icons/bi";

interface DeleteModalProps {
    show: boolean;
    onHide: Function;
    onDelete: Function;
    render: Function;
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({
    onHide,
    show,
    onDelete,
    render,
}) => {
    const navigate = useNavigate();
    return (
        <>
            <Modal
                show={show}
                onHide={() => onHide()}
                backdrop="static"
                keyboard={false}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="h5 text-danger fw-bold">
                        <p className=" fs-1">
                            <BiSolidErrorCircle />
                        </p>
                        warning you sure want to delete this ?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        onClick={() => {
                            onDelete();
                            render();
                            onHide()
                        }}>
                        DELETE
                    </Button>
                    <Button variant="secondary" onClick={() => onHide()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
=======
import {FunctionComponent} from "react";
import {Button, Modal} from "react-bootstrap";
import {errorCircle} from "../../fontAwesome/Icons";
import { useNavigate } from "react-router-dom";

interface DeleteModalProps {
	show: boolean;
	onHide: Function;
	onDelete: Function;
	render: Function;
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({
	onHide,
	show,
	onDelete,
	render,
}) => {
	const navigate = useNavigate();
	return (
		<>
			<Modal
				show={show}
				onHide={() => onHide()}
				backdrop='static'
				keyboard={false}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Delete User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='h5 text-danger fw-bold'>
						<p className=' fs-1'>{errorCircle}</p>
						warning you sure want to delet this ?
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='danger'
						onClick={() => {
							onDelete();
							render();
							navigate(-1);
						}}
					>
						DELETE
					</Button>
					<Button variant='secondary' onClick={() => onHide()}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
>>>>>>> 25ab92bfa90e1d50fda1c4a26e8d13b63fd5af50
};

export default DeleteModal;
