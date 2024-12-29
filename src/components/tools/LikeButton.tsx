import { FunctionComponent, useEffect, useState } from "react";
import { cardLikes } from "../../services/cardsServices";
import { liked, useCardContext } from "../../contex/useCardContext";
import { FaHeart } from "react-icons/fa";

interface LikeButtonProps {
    cardId: string;

    userId: string;
}

const LikeButton: FunctionComponent<LikeButtonProps> = ({ cardId, userId }) => {
    const [asLike, setAsLike] = useState<boolean>(false);
    // const { updateCardLikes } = useCardContext();

    useEffect(() => {
        const fetchLikes = async () => {
            console.log(cardId, "cardId");
            const likes = await cardLikes(cardId);

            setAsLike(likes.includes(userId));
        };
        fetchLikes();
    }, [cardId, userId]);

    const handleLikeClick = async () => {
        // updateCardLikes(cardId, userId);
        setAsLike(!asLike);
        await liked(cardId, userId);
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
