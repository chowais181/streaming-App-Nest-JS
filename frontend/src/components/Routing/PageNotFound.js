import { Link } from "react-router-dom";
import "../../assets/pageNotFound.css";
export default function PageNotFound() {
  return (
    <div className="container">
      <h1>Page Not Found</h1>
      <p className="zoom-area"></p>
      <section className="error-container">
        <span>4</span>
        <span>
          <span className="screen-reader-text">0</span>
        </span>
        <span>4</span>
      </section>
      <div className="link-container">
        <Link to="/">Back to original</Link>
      </div>
    </div>
  );
}
