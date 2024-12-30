import { FunctionComponent, useEffect, useState } from "react";
import { cardLikes } from "../../services/cardsServices";
import { liked, useCardContext } from "../../contex/useCardContext";
import { FaHeart } from "react-icons/fa";

interface LikeButtonProps {
    cardId: string;

    userId: string;
    onClickHandler?: (cardId: any, userId: any) => void;
}

const LikeButton: FunctionComponent<LikeButtonProps> = ({
    cardId,
    userId,
    onClickHandler,
}) => {
    const [asLike, setAsLike] = useState<boolean>(false);
    // const { updateCardLikes } = useCardContext();

    useEffect(() => {
        const fetchLikes = async () => {
            const likes = await cardLikes(cardId);

            setAsLike(likes.includes(userId));
        };
        fetchLikes();
    }, [cardId, userId]);

    const handleLikeClick = async () => {
        setAsLike(!asLike);
        await liked(cardId, userId);
        if (onClickHandler) onClickHandler(cardId, userId);
    };

    return (
        <>
            {asLike ? (
                <i
                    style={{ width: "20px", height: "20px", color: "red" }}
                    onClick={handleLikeClick}
                    className="fa-solid fa-heart">
                    {" "}
                    <FaHeart />
                </i>
            ) : (
                <i
                    style={{ width: "20px", height: "20px" }}
                    onClick={handleLikeClick}
                    className="fa-regular fa-heart">
                    <FaHeart />
                </i>
            )}
        </>
    );
};

export default LikeButton;
