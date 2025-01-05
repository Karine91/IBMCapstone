import React, { useState } from "react";
import { ReviewedDoctor } from "../../types";
import DoctorDetails from "../InstantConsultationBooking/DoctorCardIC/DoctorDetails";

import ReviewForm from "./ReviewForm";

import "./styles.scss";

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
              <ReviewForm onSubmit={handleSubmitReview} doctor={item.doctor} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;
