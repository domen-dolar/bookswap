import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faStar as faStarSolid,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";

const CurrentRating = ({ averageRating }: { averageRating: number }) => {
  let icon1 = faStarRegular;
  let icon2 = faStarRegular;
  let icon3 = faStarRegular;
  let icon4 = faStarRegular;
  let icon5 = faStarRegular;

  switch (averageRating) {
    case 1:
      icon1 = faStarSolid;
      break;
    case 1.5:
      icon1 = faStarSolid;
      icon2 = faStarHalfAlt;
      break;
    case 2:
      icon1 = faStarSolid;
      icon2 = faStarSolid;
      break;
    case 2.5:
      icon1 = faStarSolid;
      icon2 = faStarSolid;
      icon3 = faStarHalfAlt;
      break;
    case 3:
      icon1 = faStarSolid;
      icon2 = faStarSolid;
      icon3 = faStarSolid;
      break;
    case 3.5:
      icon1 = faStarSolid;
      icon2 = faStarSolid;
      icon3 = faStarSolid;
      icon4 = faStarHalfAlt;
      break;
    case 4:
      icon1 = faStarSolid;
      icon2 = faStarSolid;
      icon3 = faStarSolid;
      icon4 = faStarSolid;
      break;
    case 4.5:
      icon1 = faStarSolid;
      icon2 = faStarSolid;
      icon3 = faStarSolid;
      icon4 = faStarSolid;
      icon5 = faStarHalfAlt;
      break;
    case 5:
      icon1 = faStarSolid;
      icon2 = faStarSolid;
      icon3 = faStarSolid;
      icon4 = faStarSolid;
      icon5 = faStarSolid;
      break;
  }

  return (
    <div className="current-rating-stars">
      <FontAwesomeIcon icon={icon1} className="size-10!" />
      <FontAwesomeIcon icon={icon2} className="size-10!" />
      <FontAwesomeIcon icon={icon3} className="size-10!" />
      <FontAwesomeIcon icon={icon4} className="size-10!" />
      <FontAwesomeIcon icon={icon5} className="size-10!" />
    </div>
  );
};
export default CurrentRating;
