import { Cards } from "../interface/Crards";
import { updateLikeStatus } from "../services/cardsServices";

export const handleLike_Cards = (
	cardId: string,
	cards: Cards[],
	userId: string,
	cardsSetter: Function,
) => {
	const updatedCards = cards.map((card: any) => {
		if (card._id === cardId) {
			const isLiked = card.likes.includes(userId);

			if (isLiked) {
				
				card.likes = card.likes.filter((id: string) => id !== userId);
			} else {
			
				card.likes.push(userId);
			}

			// Update like status on the server
			updateLikeStatus(cardId, userId as string).catch((err) => {
				console.log("Failed to update like status:", err);
			});
		}
		return card;
	});
	cardsSetter(updatedCards);
};