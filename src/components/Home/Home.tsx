import "./Home.css";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams);
  return (
    <div className="hero">
      <h1>
        Your Health <br />
        <span>Our Responsibility</span>
      </h1>
    </div>
  );
};

export default Home;
