import React, { useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCur, removeCur, startCur } from "../../rdx/features/Fav/favourite";

const ContentItem = ({ props }) => {
  const { cc, txt, rate, r030 } = props;
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const favCur = useSelector((state) => state.favourite.favCur);
  const sortMode = useSelector((state) => state.favourite.sort);

  useEffect(() => {
    dispatch(startCur());
  }, [dispatch]);

  useEffect(() => {
    if (favCur.includes(cc)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favCur, cc]);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      dispatch(addCur({ cur: cc }));
    } else {
      dispatch(removeCur({ cur: cc }));
    }
  };

  const sortFunc = () => {
    if (sortMode == "Favorite" && isFavorite == true) {
      return (
        <div className="ContentItem">
          <div className="currencySymbol">{r030}</div>
          <div className="currencyCode">{cc}</div>
          <div>{txt}</div>

          <div>{rate}</div>
          <div className="Buttons">
            <button onClick={handleToggleFavorite}>
              {isFavorite ? (
                <StarIcon style={{ fill: "#E5E201" }} />
              ) : (
                <StarIcon style={{ fill: "gray" }} />
              )}
            </button>
            <Link to={`/${cc}`} className="seeMoreButton">
              <button type="button">See More</button>
            </Link>
          </div>
        </div>
      );
    } else if (sortMode == "All") {
      return (
        <>
          <div className="ContentItem">
            <div className="currencySymbol">{r030}</div>
            <div className="currencyCode">{cc}</div>
            <div>{txt}</div>

            <div>{rate}</div>
            <div className="Buttons">
              <button onClick={handleToggleFavorite}>
                {isFavorite ? (
                  <StarIcon style={{ fill: "#E5E201" }} />
                ) : (
                  <StarIcon style={{ fill: "gray" }} />
                )}
              </button>
              <Link to={`/${cc}`} className="seeMoreButton">
                <button type="button">See More</button>
              </Link>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    // <div className="ContentItemConteiner">
    sortFunc()
    // </div>
  );
};

export default ContentItem;
