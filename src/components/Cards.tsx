import {
    FunctionComponent,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ThemeContext } from "../services/darkLightTheme";
import { getAllCards } from "../services/cardsServices";
import { Cards } from "../interface/Crards";
import Pagination from "react-bootstrap/Pagination";
import { FaHeart, FaTrashAlt } from "react-icons/fa";
import DeleteModal from "./DeleteModal";
import Loading from "./Loading";
import { useUserContext } from "../contex/UserContext";
import { errorMsg } from "../services/toastify";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
    const navigate: NavigateFunction = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { isAdmin, isLogedIn, isBusiness } = useUserContext();
    const theme = useContext(ThemeContext);
    const [cards, setCards] = useState<Cards[]>([]);
    const [render, setRender] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const cardsPerPage = 6;

    // Fetch cards from the server
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

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

    const totalPages = Math.ceil(cards.length / cardsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => handlePageChange(number)}>
                {number}
            </Pagination.Item>
        );
    }

    // LikeButton component (local to Home)
    const LikeButton = () => {
        const [isLiked, setIsLiked] = useState(false);

        const handleLike = () => {
            if (!isLogedIn) {
                errorMsg("You need to log in as a user"); 
                return;
            }
            setIsLiked((prev) => !prev); // Toggle like state
        };

        return (
            <button
                onClick={handleLike}
                className="likeBtn"
                style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                }}>
                <FaHeart
                    style={{
                        color: isLiked ? "red" : "gray", // Toggle color
                        fontSize: "20px",
                    }}
                />
            </button>
        );
    };

    return (
        <main
            style={{
                backgroundColor: theme.background,
                color: theme.color,
                minHeight: "100vh",
            }}>
            <div className="container">
                <div className="row sm-auto">
                    {cards.length > 0 ? (
                        currentCards.map((card: Cards) => (
                            <div
                                className="col-12 col-md-6 col-xl-4 my-3"
                                key={card._id}>
                                <div
                                    className="card"
                                    style={{
                                        maxWidth: "24rem",
                                        height: "70vh",
                                    }}>
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
                                            description:
                                        </strong>
                                        <p
                                            style={{
                                                marginLeft: "7px",
                                                textAlign: "justify",
                                                fontSize: "10pt",
                                                width: "19rem",
                                            }}>
                                            {card.description.length > 100
                                                ? `${card.description.slice(0, 150)}...`
                                                : card.description}
                                        </p>
                                        {/* TODO:don't display if logged out */}
                                        <div className="card-footer d-flex justify-content-around">
                                            <LikeButton />
                                            {isAdmin && (
                                                <button
                                                    onClick={onshow}
                                                    className="btn btn-danger"
                                                    key={card._id}>
                                                    <FaTrashAlt />
                                                </button>
                                            )}
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
