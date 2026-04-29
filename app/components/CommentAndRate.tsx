"use client";

import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { commentBook, rateBook } from "../(root)/book-details/[bookID]/actions";

const CommentAndRate = ({ bookID }: { bookID: string }) => {
  const [star1Hovered, setStar1Hovered] = useState(faStarRegular);
  const [star2Hovered, setStar2Hovered] = useState(faStarRegular);
  const [star3Hovered, setStar3Hovered] = useState(faStarRegular);
  const [star4Hovered, setStar4Hovered] = useState(faStarRegular);
  const [star5Hovered, setStar5Hovered] = useState(faStarRegular);

  const [rating, setRating] = useState(0);

  const [icon1, setIcon1] = useState(faStarRegular);
  const [icon2, setIcon2] = useState(faStarRegular);
  const [icon3, setIcon3] = useState(faStarRegular);
  const [icon4, setIcon4] = useState(faStarRegular);
  const [icon5, setIcon5] = useState(faStarRegular);

  const [commentResponse, setCommentResponse] = useState<string>();
  const [commentResponseColor, setCommentResponseColor] = useState<string>();

  const [ratingResponse, setRatingResponse] = useState<string>();
  const [ratingResponseColor, setRatingResponseColor] = useState<string>();

  function rate(rating: number) {
    switch (rating) {
      case 0:
        setIcon1(faStarRegular);
        setIcon2(faStarRegular);
        setIcon3(faStarRegular);
        setIcon4(faStarRegular);
        setIcon5(faStarRegular);
        break;
      case 1:
        if (icon1 === faStarSolid && icon2 === faStarRegular) {
          setRating(0);
          setIcon1(faStarRegular);
        } else {
          setIcon1(faStarSolid);
          setIcon2(faStarRegular);
          setIcon3(faStarRegular);
          setIcon4(faStarRegular);
          setIcon5(faStarRegular);
        }
        break;
      case 2:
        if (icon2 === faStarSolid && icon3 === faStarRegular) {
          setRating(0);
          setIcon1(faStarRegular);
          setIcon2(faStarRegular);
        } else {
          setRating(2);
          setIcon1(faStarSolid);
          setIcon2(faStarSolid);
          setIcon3(faStarRegular);
          setIcon4(faStarRegular);
          setIcon5(faStarRegular);
        }
        break;
      case 3:
        if (icon3 === faStarSolid && icon4 === faStarRegular) {
          setRating(0);
          setIcon1(faStarRegular);
          setIcon2(faStarRegular);
          setIcon3(faStarRegular);
        } else {
          setRating(3);
          setIcon1(faStarSolid);
          setIcon2(faStarSolid);
          setIcon3(faStarSolid);
          setIcon4(faStarRegular);
          setIcon5(faStarRegular);
        }
        break;
      case 4:
        if (icon4 === faStarSolid && icon5 === faStarRegular) {
          setRating(0);
          setIcon1(faStarRegular);
          setIcon2(faStarRegular);
          setIcon3(faStarRegular);
          setIcon4(faStarRegular);
        } else {
          setRating(4);
          setIcon1(faStarSolid);
          setIcon2(faStarSolid);
          setIcon3(faStarSolid);
          setIcon4(faStarSolid);
          setIcon5(faStarRegular);
        }
        break;
      case 5:
        if (icon5 === faStarRegular) {
          setRating(5);
          setIcon1(faStarSolid);
          setIcon2(faStarSolid);
          setIcon3(faStarSolid);
          setIcon4(faStarSolid);
          setIcon5(faStarSolid);
        } else {
          setRating(0);
          setIcon1(faStarRegular);
          setIcon2(faStarRegular);
          setIcon3(faStarRegular);
          setIcon4(faStarRegular);
          setIcon5(faStarRegular);
        }
        break;
    }
  }

  useEffect(() => {
    if (star2Hovered === faStarSolid) {
      setStar1Hovered(faStarSolid);
    } else {
      setStar1Hovered(faStarRegular);
    }
  }, [star2Hovered]);

  useEffect(() => {
    if (star3Hovered == faStarSolid) {
      setStar1Hovered(faStarSolid);
      setStar2Hovered(faStarSolid);
    } else {
      setStar1Hovered(faStarRegular);
      setStar2Hovered(faStarRegular);
    }
  }, [star3Hovered]);

  useEffect(() => {
    if (star4Hovered == faStarSolid) {
      setStar1Hovered(faStarSolid);
      setStar2Hovered(faStarSolid);
      setStar3Hovered(faStarSolid);
    } else {
      setStar1Hovered(faStarRegular);
      setStar2Hovered(faStarRegular);
      setStar3Hovered(faStarRegular);
    }
  }, [star4Hovered]);

  useEffect(() => {
    if (star5Hovered == faStarSolid) {
      setStar1Hovered(faStarSolid);
      setStar2Hovered(faStarSolid);
      setStar3Hovered(faStarSolid);
      setStar4Hovered(faStarSolid);
    } else {
      setStar1Hovered(faStarRegular);
      setStar2Hovered(faStarRegular);
      setStar3Hovered(faStarRegular);
      setStar4Hovered(faStarRegular);
    }
  }, [star5Hovered]);

  async function handleCommentSubmit(formData: FormData) {
    const comment = formData.get("comment") as string;

    const response = await commentBook(bookID, comment);

    if (response?.error) {
      setCommentResponse(response.error);
      setCommentResponseColor("text-red-500");
    } else {
      setCommentResponse(response.success);
      setCommentResponseColor("text-green-500");
    }
  }

  async function handleRateSubmit(formData: FormData) {
    const rating = Number(formData.get("rating"));

    const response = await rateBook(bookID, rating);

    if (response?.error) {
      setRatingResponse(response.error);
      setRatingResponseColor("text-red-500");
    } else {
      setRatingResponse(response.success);
      setRatingResponseColor("text-green-500");
    }
  }

  return (
    <div className="book-details text-left!">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);

          handleCommentSubmit(formData);

          e.currentTarget.reset();
        }}
        className="space-y-5"
      >
        <div className="sm:h-2/3">
          <label htmlFor="comment" className="text-lg">
            Komentiraj knjigo:
          </label>

          <textarea
            name="comment"
            id="comment"
            rows={3}
            required
            className="form-text-input w-full"
          ></textarea>
        </div>

        <div className="flex-col sm:flex sm:flex-row justify-end items-center gap-3">
          {commentResponse && (
            <p className={`text-center ${commentResponseColor}`}>
              {commentResponse}
            </p>
          )}
          <button className="btn w-full sm:w-auto">Komentiraj</button>
        </div>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);

          handleRateSubmit(formData);

          e.currentTarget.reset();
          rate(0);
        }}
        className="space-y-5"
      >
        <div className="sm:h-2/3">
          <label className="text-lg">Oceni knjigo:</label>

          <div className="rate-outer">
            <div className="rate-inner">
              <FontAwesomeIcon
                icon={icon1 === faStarSolid ? icon1 : star1Hovered}
                onMouseEnter={() => setStar1Hovered(faStarSolid)}
                onMouseLeave={() => setStar1Hovered(faStarRegular)}
                onClick={() => {
                  rate(1);
                }}
                className="size-10! hover:cursor-pointer"
              />
              <FontAwesomeIcon
                icon={icon2 === faStarSolid ? icon2 : star2Hovered}
                onMouseEnter={() => setStar2Hovered(faStarSolid)}
                onMouseLeave={() => setStar2Hovered(faStarRegular)}
                onClick={() => {
                  rate(2);
                }}
                className="size-10! hover:cursor-pointer"
              />
              <FontAwesomeIcon
                icon={icon3 === faStarSolid ? icon3 : star3Hovered}
                onMouseEnter={() => setStar3Hovered(faStarSolid)}
                onMouseLeave={() => setStar3Hovered(faStarRegular)}
                onClick={() => {
                  rate(3);
                }}
                className="size-10! hover:cursor-pointer"
              />
              <FontAwesomeIcon
                icon={icon4 === faStarSolid ? icon4 : star4Hovered}
                onMouseEnter={() => setStar4Hovered(faStarSolid)}
                onMouseLeave={() => setStar4Hovered(faStarRegular)}
                onClick={() => {
                  rate(4);
                }}
                className="size-10! hover:cursor-pointer"
              />
              <FontAwesomeIcon
                icon={icon5 === faStarSolid ? icon5 : star5Hovered}
                onMouseEnter={() => setStar5Hovered(faStarSolid)}
                onMouseLeave={() => setStar5Hovered(faStarRegular)}
                onClick={() => {
                  rate(5);
                }}
                className="size-10! hover:cursor-pointer"
              />
            </div>
          </div>
        </div>

        <input
          type="number"
          name="rating"
          id="rating"
          readOnly
          value={rating}
          className="hidden"
        />

        <div className="flex-col sm:flex sm:flex-row justify-end items-center gap-3">
          {ratingResponse && (
            <p className={`text-center ${ratingResponseColor}`}>
              {ratingResponse}
            </p>
          )}
          <button className="btn w-full sm:w-auto">Oceni</button>
        </div>
      </form>
    </div>
  );
};
export default CommentAndRate;
