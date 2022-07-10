//* import the sauce model
const Sauce = require('../models/sauce');

//* define and export the function allowing to manage likes
exports.likeSauce = (req, res, next) => {
    //* the user like the sauce and his id is not in the DB
    if (req.body.like === 1) {
        Sauce.updateOne(
            { _id: req.params.id },
            {
                $inc: { likes: req.body.like++ },
                $push: { usersLiked: req.body.userId },
            }
        )
            .then(() => res.status(200).json({ message: "Sauce liked" }))
            .catch((error) => res.status(400).json({ error }));
    }
    //* the user disliked the sauce and his id is not in the DB
    else if (req.body.like === -1) {
        Sauce.updateOne(
            { _id: req.params.id },
            {
                $inc: { dislikes: req.body.like++ * -1 },
                $push: { usersDisliked: req.body.userId },
            }
        )
            .then(() => res.status(200).json({ message: "Sauce disliked" }))
            .catch((error) => res.status(400).json({ error }));
    }
    //* the user liked the sauce preivously and decides to delete his like
    else {
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $inc: { likes: -1 },
                            $pull: { usersLiked: req.body.userId }
                        }
                    )
                        .then(() => res.status(200).json({ message: "Like deleted" }))
                        .catch((error) => res.status(400).json({ error }));
                }
                //* the user disliked the sauce preivously and decides to delete his dislike 
                else if (sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $inc: { dislikes: -1 },
                            $pull: { usersDisliked: req.body.userId }
                        }
                    )
                        .then(() => res.status(200).json({ message: "Dislike deleted" }))
                        .catch((error) => res.status(400).json({ error }));
                }
            }
            )
            .catch((error) => res.status(400).json({ error }));
    }
};