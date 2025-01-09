import { useState } from "react";
import Star, { type IStarProps } from "./Star";

import "./styles.scss";

const RatingStars = ({
  rating: initRating,
  edit = false,
  onClick,
}: Pick<IStarProps, "onClick" | "rating"> & { edit?: boolean }) => {
  const [rating, setRating] = useState(initRating);

  const onMouseOver = (star: number) => {
    if (edit) {
      setRating(star);
    }
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
    onClick?.(value);
  };

  return (
    <div onMouseLeave={() => edit && setRating(initRating)}>
      <Star
        star={1}
        rating={rating}
        onMouseOver={onMouseOver}
        onClick={handleRatingChange}
      />
      <Star
        star={2}
        rating={rating}
        onMouseOver={onMouseOver}
        onClick={handleRatingChange}
      />
      <Star
        star={3}
        rating={rating}
        onMouseOver={onMouseOver}
        onClick={handleRatingChange}
      />
      <Star
        star={4}
        rating={rating}
        onMouseOver={onMouseOver}
        onClick={handleRatingChange}
      />
      <Star
        star={5}
        rating={rating}
        onMouseOver={onMouseOver}
        onClick={handleRatingChange}
      />
    </div>
  );
};

export default RatingStars;
