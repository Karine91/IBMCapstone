import { useUser } from "../../providers/auth";
import "./styles.scss";
import { IDoctor, ReviewedDoctor } from "../../types";
import RatingStars from "../rating/RatingStars";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface IProps {
  onSubmitCb: (data: ReviewedDoctor) => void;
  doctor: IDoctor;
}

interface Inputs {
  rating: number;
  content: string;
}

const ReviewForm = ({ onSubmitCb, doctor }: IProps) => {
  const user = useUser();

  const {
    register,
    handleSubmit,
    control,
    //formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onSubmitCb({
      doctor,
      review: {
        userName: user.user!.name || "Anonym",
        content: data.content,
        rating: data.rating,
      },
    });
  };

  return (
    <form className="review-form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="rating"
        control={control}
        render={({ field }) => (
          <RatingStars
            edit
            rating={field.value}
            onClick={(val: number) => {
              field.onChange(val);
            }}
          />
        )}
      />

      <textarea
        className="review-content-input"
        placeholder="Type here..."
        rows={10}
        {...register("content")}
      />
      <button className="btn" type="submit">
        Submit review
      </button>
    </form>
  );
};

export default ReviewForm;
