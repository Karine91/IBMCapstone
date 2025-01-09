import { FaRegStar } from "react-icons/fa";
import { FaRegStarHalf } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

import "./styles.scss";

export interface IStarProps {
  rating: number;
  star: number;

  onMouseOver?: (star: number) => void;
  onClick?: (rating: number) => void;
}

const Star = ({ rating, star, onMouseOver, onClick }: IStarProps) => {
  const part = rating > star - 1 && rating < star;

  const handleMouseOver = () => {
    onMouseOver?.(star);
  };

  const handleClick = () => {
    onClick?.(star);
  };

  return part ? (
    <FaRegStarHalf className="star" />
  ) : rating >= star ? (
    <FaStar
      className={"active star"}
      onMouseOver={handleMouseOver}
      onClick={handleClick}
    />
  ) : (
    <FaRegStar
      className="star"
      onMouseOver={handleMouseOver}
      onClick={handleClick}
    />
  );
};

export default Star;
