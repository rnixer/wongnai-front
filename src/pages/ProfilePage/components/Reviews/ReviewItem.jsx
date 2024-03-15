import React from "react";
import { CrossIcon, StarIcon } from "../../../../icons/icon";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../../../feature/user/contexts/UserContext";
import { Link } from "react-router-dom";

export default function ReviewItem({
  otherUser,
  review,
  myReview,
  setMyReviews,
}) {
  const { user, deleteReviewById } = useUser();
  const { userId } = useParams();

  const [isToggle, setIsToggle] = useState(false);
  // console.log("myReview", myReview);
  // console.log("review", review);

  const agoTime = () => {
    let reviewPostTime;
    if (review) {
      reviewPostTime = new Date(review?.createdAt);
    } else if (myReview) {
      reviewPostTime = new Date(myReview?.createdAt);
    }
    const currentTime = new Date();
    const timeDifferenceInHours = Math.round(
      (currentTime - reviewPostTime) / (1000 * 60 * 60)
    );
    // console.log("timeDifferenceInHours", timeDifferenceInHours);
    if (timeDifferenceInHours < 24) {
      return `เมื่อ ${timeDifferenceInHours} ชั่วโมงที่แล้ว`;
    } else {
      return `เมื่อ ${Math.round(timeDifferenceInHours / 24)} วันที่แล้ว`;
    }
  };

  const otherUserStarIcon = [];
  for (let i = 0; i < review?.star; i++) {
    otherUserStarIcon.push(
      <StarIcon key={i} className="w-4 h-4 fill-red_primary" />
    );
  }

  const myUserStarIcon = [];
  for (let i = 0; i < myReview?.star; i++) {
    myUserStarIcon.push(
      <StarIcon key={i} className="w-4 h-4 fill-red_primary" />
    );
  }
  console.log(review, "review");
  return (
    <div className="w-1/2 mx-auto bg-white rounded-lg min-h-[300px] p-4 mb-10">
      {userId ? (
        <Link
          to={`/restaurants/${myReview?.restaurantId}`}
          className="font-bold text-xl mb-5 cursor-pointer"
        >
          รีวิว {review.restaurant?.restaurantName}
        </Link>
      ) : (
        <div className="flex justify-between">
          <Link
            className="font-bold text-xl mb-5 cursor-pointer"
            to={`/restaurants/${myReview?.restaurantId}`}
          >
            รีวิว {myReview.restaurant?.restaurantName}
          </Link>
          <div
            className="cursor-pointer"
            onClick={() => {
              setMyReviews((r) => r.filter((item) => item.id != myReview.id));
              deleteReviewById(myReview.id);
            }}
          >
            <CrossIcon />
          </div>
        </div>
      )}
      <div className="flex gap-4">
        {userId ? (
          <img
            className="h-[50px] w-[50px] object-cover rounded-full"
            src={otherUser?.imgProfile}
          />
        ) : (
          <img
            className="h-[50px] w-[50px] object-cover rounded-full"
            src={user?.imgProfile}
          />
        )}
        <div>
          <div className="text-sm">
            {userId ? (
              <>
                <span className="font-bold">{otherUser?.name}</span> รีวิว{" "}
              </>
            ) : (
              <>
                <span className="font-bold">{user?.name}</span> รีวิว{" "}
              </>
            )}
            {userId ? (
              <span className="font-bold">
                <Link to={`/restaurants/${myReview?.restaurantId}`}>
                  {review.restaurant?.restaurantName}{" "}
                </Link>
              </span>
            ) : (
              <span className="font-bold">
                <Link to={`/restaurants/${myReview?.restaurantId}`}>
                  {myReview.restaurant?.restaurantName}{" "}
                </Link>
              </span>
            )}
          </div>
          <div className="text-xs text-gray_secondary pr-3  mt-1.5">
            {agoTime()}
          </div>
        </div>
      </div>
      <div className="flex gap-0.5 mt-2">
        {userId ? <>{otherUserStarIcon}</> : <>{myUserStarIcon}</>}
      </div>
      <div>
        {userId ? (
          <div className="text-sm font-bold mt-3">{review?.title}</div>
        ) : (
          <div className="text-sm font-bold mt-3">{myReview?.title}</div>
        )}
        {/* <div className="text-sm mt-3">ราคาต่อหัว : 501 - 1,000 บาท </div> */}
        {userId ? (
          <div className="text-sm mt-3">{review?.description}</div>
        ) : (
          <div className="text-sm mt-3">{myReview?.description}</div>
        )}
        {/* <div className="flex justify-around mt-5 pb-2"> */}
        <div className="relative grid grid-cols-3 gap-4 mt-5 ">
          {userId ? (
            <>
              {!isToggle ? (
                <>
                  {review.reviewImgs.slice(0, 3).map((a) => (
                    <img
                      className=" aspect-video object-cover h-full w-full "
                      src={a.img}
                      alt="Review Image"
                    />
                  ))}{" "}
                  {review.reviewImgs.length >= 3 ? (
                    <div
                      className="absolute right-0 flex justify-center items-center bg-black opacity-70 aspect-video h-full w-1/3 text-white text-4xl  cursor-pointer"
                      onClick={() => setIsToggle((c) => !c)}
                    >
                      <div>+{review.reviewImgs?.length - 3}</div>
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  {review.reviewImgs.map((a) => (
                    <img
                      className="aspect-video object-cover h-full w-full"
                      src={a.img}
                      alt="Review Image"
                    />
                  ))}{" "}
                </>
              )}
            </>
          ) : (
            <>
              {!isToggle ? (
                <>
                  {myReview.reviewImgs.slice(0, 3).map((a, index) => (
                    <img
                      key={index}
                      className=" aspect-video object-cover h-full w-full"
                      src={a.img}
                      alt="Review Image"
                    />
                  ))}{" "}
                  {myReview.reviewImgs.length >= 3 ? (
                    <div
                      className="absolute right-0 flex justify-center items-center  bg-black opacity-70 aspect-video h-full w-1/3 text-white text-4xl cursor-pointer"
                      onClick={() => setIsToggle((c) => !c)}
                    >
                      <div>+{myReview.reviewImgs?.length - 3}</div>
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  {myReview.reviewImgs.map((a) => (
                    <img
                      className="aspect-video object-cover h-full w-full"
                      src={a.img}
                      alt="Review Image"
                    />
                  ))}{" "}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
