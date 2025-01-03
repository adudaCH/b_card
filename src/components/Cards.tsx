import { FunctionComponent, useContext, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ThemeContext } from "../services/darkLightTheme";
import { getAllCards } from "../services/cardsServices";
import { Cards } from "../interface/Crards";
import Pagination from "react-bootstrap/Pagination";
import { FaTrashAlt } from "react-icons/fa";
import DeleteModal from "./modals/DeleteModal";
import { useUserContext } from "../contex/UserContext";
import { errorMsg } from "../services/toastify";
import { getUserDetails } from "../services/userServices";
import LikeButton from "./tools/LikeButton";
import CustomPagination from "./tools/CustomPagination";
import { useUser } from "../customeHooks/useUser";
// import { useFavCardsContext } from "../contex/favCardsContext";

interface HomeProps { }

const Home: FunctionComponent<HomeProps> = () => {
    const navigate: NavigateFunction = useNavigate();
    const { isAdmin, isLogedIn, auth } = useUserContext();
    const theme = useContext(ThemeContext);
    const [like, setLike] = useState<boolean>(false);
    const [cards, setCards] = useState<Cards[]>([]);
    const [selectedCard, setCard] = useState<Cards | undefined>(undefined);
    const [render, setRender] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
    // const { favoriteCards, setFavoriteCards } = useFavCardsContext();
    const cardsPerPage = 6;
    // TODO: add the token to the arry of likes in the card and clone it and send to arry of likes

    // useEffect(() => {
    //     if (favoriteCards) {
    //         setFavoriteCards(favoriteCards);
    //     } else {
    //         setFavoriteCards([]);
    //     }

    // },[favoriteCards]);
    let { user } = useUser()


    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                if (!auth) {
                    throw new Error("User ID not found.");
                }
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

    return (
        <main
            style={{
                backgroundColor: theme.background,
                color: theme.color,
                minHeight: "100vh",
            }}>
            <div className="container">
                <h1 className="text-center
                pt-3">Cards</h1>
                <div className="row sm-auto">
                    {cards.length > 0 ? (
                        currentCards.map((card: Cards) => (
                            <div
                                className="col-12 col-md-6 col-xl-4 my-3"
                                key={card._id}>
                                <div
                                    className="card"
                                >
                                    <div className="card-body">
                                        <img
                                            className="img-card-top"
                                            src={card.image.url}
                                            alt={card.image.alt}
                                            onError={(e) => {
                                                e.currentTarget.src = '/images/defaultBusinessImage.jpg'
                                            }}
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
                                            <div className="card-footer d-flex justify-content-start align-items-center">
                                                {auth && (
                                                    <div className="d-flex align-items-start me-2">
                                                        {/* TODO:fix adding likes*/}
                                                        <LikeButton cardId={card._id as string} userId={user?._id as string}

                                                        />
                                                        <div className="mx-2">
                                                            {card.likes?.length}
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
                                                                card._id as string
                                                            );
                                                        }}
                                                        className="btn me-2 justify-content-center align-items-end">
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
                        <CustomPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
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
