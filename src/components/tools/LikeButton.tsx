import { FunctionComponent, useEffect, useState } from "react";
import { cardLikes } from "../../services/cardsServices";



interface LikeButtonProps {
    cardId: string;
    userId: string;
}

const LikeButton: FunctionComponent<LikeButtonProps> = ({ cardId, userId }) => {
    const [asLike, setAsLike] = useState<boolean>(false);
    const { updateCardLikes } = useCardContext();


    useEffect(() => {
        const fetchLikes = async () => {


            const likes = await cardLikes(cardId);
            setAsLike(likes.includes(userId));
        };
        fetchLikes();
    }, [cardId, userId]);

    const handleLikeClick = async () => {

        updateCardLikes(cardId, userId);
        setAsLike(!asLike);
        await like(cardId, userId);
    };

    return (
        <>
            {asLike ? (
                <i
                    onClick={handleLikeClick}
                    className="fa-solid fa-heart"
                ></i>
            ) : (
                <i
                    onClick={handleLikeClick}
                    className="fa-regular fa-heart"
                ></i>
            )}
        </>
    );
};

export default LikeButton;

function useCardContext(): { updateCardLikes: any; } {
    throw new Error("Function not implemented.");
}
function like(cardId: string, userId: string) {
    throw new Error("Function not implemented.");
}

