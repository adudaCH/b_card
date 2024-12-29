import { FunctionComponent, useContext, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ThemeContext } from "../services/darkLightTheme";
import { getAllCards } from "../services/cardsServices";
import { Cards } from "../interface/Crards";
import Pagination from "react-bootstrap/Pagination";
import { FaHeart, FaTrashAlt } from "react-icons/fa";
import DeleteModal from "./modals/DeleteModal";
import { useUserContext } from "../contex/UserContext";
import { errorMsg } from "../services/toastify";
import { userDetails } from "../services/userServices";
import LikeButton from "./tools/LikeButton";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
    const navigate: NavigateFunction = useNavigate();
    const { isAdmin, isLogedIn, auth } = useUserContext(); // Ensure `user` is available
    const theme = useContext(ThemeContext);

    const [cards, setCards] = useState<Cards[]>([]);
    const [render, setRender] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
    const cardsPerPage = 6;

    console.log(auth);
    // Fetch user details (if needed)
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                if (!auth) {
                    throw new Error("User ID not found.");
                }
                const userData = await userDetails("67718ac600b4d006b4364c34");
                console.log("User Details:", userData); // Optional: Handle user details if required
            } catch (error) {
                console.error("Error fetching user details:", error);
                errorMsg("Failed to fetch user details.");
            }
        };

        if (isLogedIn) {
            fetchUserDetails();
        }
    }, [auth, isLogedIn]);

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

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

    const totalPages = Math.ceil(cards.length / cardsPerPage);

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    const paginationItems = Array.from({ length: totalPages }, (_, index) => (
        <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}>
            {index + 1}
        </Pagination.Item>
    ));

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
                                            Description:
                                        </strong>
                                        <p
                                            style={{
                                                marginLeft: "7px",
                                                textAlign: "justify",
                                                fontSize: "10pt",
                                                width: "19rem",
                                            }}>
                                            {card.description.length > 100
                                                ? `${card.description.slice(
                                                    0,
                                                    150
                                                )}...`
                                                : card.description}
                                        </p>
                                        {isLogedIn && (
                                            <div className="card-footer d-flex justify-content-around">
                                                {auth && (
                                                    <div>
                                                        {/* TODO:fix alignment */}
                                                        {/* TODO:fix adding likes*/}
                                                        <LikeButton
                                                            cardId={card._id}
                                                            userId={
                                                                auth._id as string
                                                            }
                                                        />
                                                        <div>
                                                            {card.likes.length}
                                                        </div>
                                                    </div>
                                                )}

                                                {isAdmin && (
                                                    <button
                                                        onClick={() => {
                                                            setOpenDeleteModal(
                                                                true
                                                            );
                                                            setSelectedCardId(
                                                                card._id
                                                            );
                                                        }}
                                                        className="btn btn-danger">
                                                        <FaTrashAlt />
                                                    </button>
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
            {openDeleteModal && selectedCardId && (
                <DeleteModal
                    show={openDeleteModal}
                    onHide={() => setOpenDeleteModal(false)}
                    refresh={refresh}
                    productId={selectedCardId}
                    onDelete={function (): void {
                        throw new Error("Function not implemented.");
                    }}
                />
            )}
        </main>
    );
};

export default Home;
