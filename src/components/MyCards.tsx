import { FaPenFancy, FaTrashAlt } from "react-icons/fa";
import AddNewCardModal from "./modals/AddNewCardModal";
import DeleteModal from "./modals/DeleteModal";
import { Link, useNavigate } from "react-router-dom";
import { Cards } from "../interface/Crards";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { getMyCards } from "../services/cardsServices";
import useToken from "../customeHooks/useToken";
import { ThemeContext } from "../services/darkLightTheme";
import Loading from "./Loading";
import { HandleNvgCard } from "../handelFunctions/cards";
import LikeButton from "./tools/LikeButton";

const MyCards: FunctionComponent = () => {
    const theme = useContext(ThemeContext);
    const navigate = useNavigate();
    const { decodedToken } = useToken();
    const [render, setRender] = useState<boolean>(false);
    const [cards, setCards] = useState<Cards[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [cardToDelete, setCardToDelete] = useState<string>("");

    const onHideDeleteModal = () => setShowDeleteModal(false);
    const onShowDeleteModal = () => setShowDeleteModal(true);
    const onHide = () => setShowAddModal(false);
    const onShow = () => setShowAddModal(true);

    const refresh = () => {
        onHideDeleteModal();
        onHide();
        setRender(true);
    };

    useEffect(() => {
        if (!decodedToken || !decodedToken._id) return;
        getMyCards(decodedToken._id)
            .then((res: Cards[]) => {
                setCards(
                    res.reverse().map((card: Cards) => ({
                        ...card,
                        likes: card.likes || [],
                    }))
                );
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [decodedToken, render]);

    const handleDeleteCard_Cards = (cardId: string) => {
        // Example: Delete card logic here
        setCards((prev) => prev.filter((card) => card._id !== cardId));
        setShowDeleteModal(false);
    };

    if (loading) return <Loading />;

    return (
        <main
            style={{
                backgroundColor: theme.background,
                color: theme.color,
                minHeight: "100vh",
            }}>
            <button className="btn btn-dark" onClick={() => navigate(-1)}>
                Back
            </button>
            <div className="container py-5">
                <h2 className="lead display-5">My Cards</h2>
                <hr className="border-light" />
                <div className="w-100">
                    <button
                        className="w-100 bg-opacity-50"
                        onClick={() => onShow()}>
                        Add Card
                    </button>
                </div>
                <div className="row">
                    {cards.length > 0 ? (
                        cards.map((card: Cards, index: number) => (
                            <div
                                key={index}
                                className="col-12 col-md-6 col-xl-4 my-3">
                                <div className="card w-100 h-100 bg-dark text-light border-0 shadow-lg rounded-lg overflow-hidden">
                                    <Link
                                        to={HandleNvgCard(
                                            "/card-detail",
                                            card._id
                                        )}>
                                        <img
                                            className="card-img-top"
                                            src={
                                                card.image?.url ||
                                                "default-image-url.jpg"
                                            }
                                            alt={
                                                card.image?.alt || "Card Image"
                                            }
                                            style={{
                                                objectFit: "cover",
                                                height: "300px",
                                                transition:
                                                    "transform 0.3s ease",
                                            }}
                                        />
                                    </Link>
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {card.title}
                                        </h5>
                                        <p className="card-subtitle text-center mb-2 text-light-emphasis">
                                            {card.subtitle}
                                        </p>
                                        <hr />
                                        <p className="card-text text-start lead fw-bold">
                                            Phone: {card.phone}
                                        </p>
                                        {/* Address */}
                                        <div className="text-start lead fw-bold">
                                            Address
                                            <hr className="w-25" />
                                            <span>{card.address.state}</span>,{" "}
                                            <span>{card.address.city}</span>
                                            <p>
                                                {card.address.street},{" "}
                                                <span>
                                                    {card.address.houseNumber}
                                                </span>
                                            </p>
                                        </div>
                                        <hr />
                                        <p className="card-subtitle text-center mb-2 text-light lead">
                                            {card.description}
                                        </p>
                                        <hr />
                                        <div className="d-flex justify-content-between align-items-center">
                                            <LikeButton
                                                cardId={card._id}
                                                userId={decodedToken._id}
                                            />
                                            <div className="mt-3 d-flex justify-content-around">
                                                <Link
                                                    to={HandleNvgCard(
                                                        "/card-detail",
                                                        card._id
                                                    )}>
                                                    <button className="mx-3 text-warning">
                                                        <FaPenFancy />
                                                    </button>
                                                </Link>
                                                <button
                                                    className="text-danger"
                                                    onClick={() => {
                                                        onShowDeleteModal();
                                                        setCardToDelete(
                                                            card._id
                                                        );
                                                    }}>
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="lilita-one-regular text-center my-5">Data was not found 👀</div>
                    )}
                </div>
                <DeleteModal
                    show={showDeleteModal}
                    onHide={onHideDeleteModal}
                    onDelete={() => handleDeleteCard_Cards(cardToDelete as string)} refresh={refresh} productId={""}                />
                <AddNewCardModal
                    show={showAddModal}
                    refresh={refresh}
                    onHide={onHide}
                />
            </div>
        </main>
    );
};

export default MyCards;
