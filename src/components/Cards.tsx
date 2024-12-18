import {
    FunctionComponent,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { data, NavigateFunction, useNavigate } from "react-router-dom";
import { ThemeContext } from "../services/darklightTeme";
import { getAllCards } from "../services/cardsServices";
import { Cards } from "../interface/Crards";
import Pagination from "react-bootstrap/Pagination";
import { FaPenFancy, FaTrash, FaTrashAlt } from "react-icons/fa";
import DeleteProductModal from "./DeleteModal";
import DeleteModal from "./DeleteModal";
interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
    const navigate: NavigateFunction = useNavigate();
    const theme = useContext(ThemeContext);
    const [cards, setCards] = useState<Cards[]>([]);
    const [render, setRender] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        try {
            getAllCards()
                .then((res) => {
                    setCards(res.reverse());
                })
                .catch();
        } catch (error) {}
    }, [render]);
    const refresh = () => {
        setRender(!render);
    };

    const onHide = useCallback(() => {
        setShow(false);
    }, []);

    const onshow = useCallback(() => {
        setShow(true);
    }, []);

    return (
        <main
            style={{
                backgroundColor: theme.background,
                color: theme.color,
                minHeight: "100vh",
            }}>
            <div className="container">
                <div className="row sm-auto">
                    {cards ? (
                        cards.map((card: Cards) => (
                            <div className="col-12 col-md-6 col-xl-4 my-3"  key={card._id}>
                                <div
                                    className="card"
                                    key={card._id}
                                    style={{ maxWidth: "26rem" }}>
                                    <div className="card-body">
                                        <img
                                            style={{ height: "200px" }}
                                            className="img-card-top"
                                            src={card.image.url}
                                            alt={card.image.alt}
                                        />
                                    </div>
                                    <div className="card-title text-center">
                                        <h4>{card.title}</h4>
                                    </div>
                                    <div className="card-subtitle text-center">
                                        <h6>{card.subtitle}</h6>
                                    </div>
                                    <div className="card-text">
                                        <strong>description:</strong>
                                        <p> {card.description}</p>
                                        <div className="card-footer d-flex justify-content-around">
                                            <button className="btn btn-warning">
                                                <FaPenFancy />
                                            </button>
                                            <button
                                                onClick={() => onshow}
                                                className="btn btn-danger"
                                                key={card._id}>
                                                <FaTrashAlt />
                                            </button>
                                            <DeleteModal
                                                show={show}
                                                onHide={onHide}
                                                refresh={refresh}
                                                productId={card._id}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="lilita-one-regular">data was not found 👀 </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Home;
