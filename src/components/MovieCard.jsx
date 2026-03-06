import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {

  const navigate = useNavigate();

  function goToDetail() {
    navigate("/movie/" + movie.imdbID);
  }

  return (
    <div
      onClick={goToDetail}
      style={{
        background: "white",
        borderRadius: "10px",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x400?text=No+Image"}
        alt={movie.Title}
        style={{ width: "100%", height: "280px", objectFit: "cover" }}
      />

      <div style={{ padding: "10px" }}>
        <p style={{ fontWeight: "bold", fontSize: "14px" }}>{movie.Title}</p>
        <p style={{ color: "gray", fontSize: "13px" }}>{movie.Year}</p>
        <p style={{ color: "#e94560", fontSize: "12px" }}>{movie.Type}</p>
      </div>

    </div>
  );
}

export default MovieCard;