import { FormEvent, useState } from "react";
import { useUser } from "../../providers/auth";
import "./styles.scss";
import { IDoctor, ReviewedDoctor } from "../../types";

interface IProps {
  onSubmit: (data: ReviewedDoctor) => void;
  doctor: IDoctor;
}

const ReviewForm = ({ onSubmit, doctor }: IProps) => {
  const user = useUser();

  const [content, setContent] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      doctor,
      review: {
        userName: user.user!.name || "Anonym",
        content,
      },
    });
  };
  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <textarea
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="review-content-input"
        placeholder="Type here..."
        rows={10}
      ></textarea>
      <button className="btn" type="submit">
        Submit review
      </button>
    </form>
  );
};

export default ReviewForm;
