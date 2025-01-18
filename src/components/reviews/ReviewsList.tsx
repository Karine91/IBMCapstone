import React, { useState } from "react";
import { ReviewedDoctor } from "../../types";
import DoctorDetails from "../InstantConsultationBooking/DoctorCardIC/DoctorDetails";

import ReviewForm from "./ReviewForm";

import "./styles.scss";
import { useUser } from "../../providers/auth";

const visitedDoctorsData = [
  {
    doctor: {
      name: "Dr. Jiao Yang",
      ratings: "⭐⭐⭐⭐⭐",
      experience: 9,
      speciality: "Dentist",
    },
    review: null,
  },
  {
    doctor: {
      name: "Dr. Jessica White",
      ratings: "⭐⭐⭐⭐",
      experience: 18,
      speciality: "Dentist",
    },
    review: {
      content: "Good doctor!",
      userName: "Test user",
    },
  },
];

const ReviewsList = () => {
  const [visitedDoctors, setVisitedDoctors] =
    useState<ReviewedDoctor[]>(visitedDoctorsData);

  const { isLoggedIn } = useUser();

  const handleSubmitReview = (data: ReviewedDoctor) => {
    setVisitedDoctors((state) => {
      const _state = state.filter(
        (item) => item.doctor.name !== data.doctor.name
      );
      return [..._state, data];
    });
  };

  return (
    <div>
      <h1>Reviews</h1>
      {isLoggedIn ? (
        <div className="reviews">
          {visitedDoctors.map((item, ind) => (
            <div className="review-item" key={ind}>
              <DoctorDetails {...item.doctor} />
              {item.review ? (
                <div>
                  <p>{item.review.content}</p>
                  <span>- {item.review.userName}</span>
                </div>
              ) : (
                <ReviewForm
                  onSubmitCb={handleSubmitReview}
                  doctor={item.doctor}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>To left review please login.</p>
      )}
    </div>
  );
};

export default ReviewsList;
