import {
    FunctionComponent,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ThemeContext } from "../services/darkLightTheme";
import { getAllCards, updateCardLikes } from "../services/cardsServices"; // Ensure updateCardLikes exists
import { Cards } from "../interface/Crards";
import Pagination from "react-bootstrap/Pagination";
import { FaHeart, FaTrashAlt } from "react-icons/fa";
import DeleteModal from "./DeleteModal";
import { useUserContext } from "../contex/UserContext";
import { errorMsg, successMsg } from "../services/toastify";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
    const navigate: NavigateFunction = useNavigate();
    const { isAdmin, isLogedIn } = useUserContext();
    const theme = useContext(ThemeContext);

    const [cards, setCards] = useState<Cards[]>([]);
    const [render, setRender] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const cardsPerPage = 6;

    // Fetch cards from the server
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const res = await getAllCards();
                setCards(res.reverse());
            } catch (error) {
                errorMsg("Failed to fetch cards.");
            }
        };
        fetchCards();
    }, [render]);

    const refresh = () => {
        setRender(!render);
    };

    const onHide = useCallback(() => setShow(false), []);
    const onShow = useCallback(() => setShow(true), []);

    const handleLike = async (cardId: string) => {
        try {
            const updatedCards = cards.map((card) =>
                card._id === cardId
                    ? { ...card, likes: [...card.likes, "newLike"] } // Increment likes array
                    : card
            );
            setCards(updatedCards);
    
            // Update on the server
            await updateCardLikes(cardId);
    
            successMsg("You liked the card!");
        } catch (error) {
            errorMsg("Failed to like the card.");
        }
    };
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

    const totalPages = Math.ceil(cards.length / cardsPerPage);

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    const paginationItems = Array.from({ length: totalPages }, (_, index) => (
        <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
        >
            {index + 1}
        </Pagination.Item>
    ));

    return (
        <main
            style={{
                backgroundColor: theme.background,
                color: theme.color,
                minHeight: "100vh",
            }}
        >
            <div className="container">
                <div className="row sm-auto">
                    {cards.length > 0 ? (
                        currentCards.map((card: Cards) => (
                            <div
                                className="col-12 col-md-6 col-xl-4 my-3"
                                key={card._id}
                            >
                                <div
                                    className="card"
                                    style={{
                                        maxWidth: "24rem",
                                        height: "70vh",
                                    }}
                                >
                                    <div className="card-body">
                                        <img
                                            style={{
                                                height: "150px",
                                                width: "200px",
                                            }}
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
                                        <strong style={{ marginLeft: "5px" }}>
                                            Description:
                                        </strong>
                                        <p
                                            style={{
                                                marginLeft: "7px",
                                                textAlign: "justify",
                                                fontSize: "10pt",
                                                width: "19rem",
                                            }}
                                        >
                                            {card.description.length > 100
                                                ? `${card.description.slice(0,150)}...`
                                                : card.description}
                                        </p>
                                        {/* Display footer only if logged in */}
                                        {isLogedIn && (
                                            <div className="card-footer d-flex justify-content-around">
                                                {/* Like button */}
                                                <button
                                                    className="likeBtn"
                                                    style={{
                                                        backgroundColor: "transparent",
                                                        border: "none",
                                                        color: card.likes.length > 0 ? "red" : "black", // Use length
                                                    }}
                                                    onClick={() =>
                                                        handleLike(card._id)
                                                    }
                                                >
                                                    <FaHeart /> {card.likes || 0}
                                                </button>
                                                {/* Show delete button only for admins */}
                                                {isAdmin && (
                                                    <>
                                                        <button
                                                            onClick={onShow}
                                                            className="btn btn-danger"
                                                        >
                                                            <FaTrashAlt />
                                                        </button>
                                                        <DeleteModal
                                                            show={show}
                                                            onHide={onHide}
                                                            refresh={refresh}
                                                            productId={
                                                                card._id
                                                            }
                                                        />
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="lilita-one-regular text-center my-5">
                            Data was not found 👀
                        </div>
                    )}
                </div>
                {cards.length > 0 && (
                    <div className="d-flex justify-content-center my-3">
                        <Pagination>{paginationItems}</Pagination>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Home;
