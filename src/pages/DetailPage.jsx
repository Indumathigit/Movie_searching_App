import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_KEY = "a6048468";

function DetailPage() {

  const { id } = useParams();
  const navigate = useNavigate();
  const movie = useRef(null);

  // fetch movie when page loads
  useEffect(function() {
    let url = "https://www.omdbapi.com/?apikey=" + API_KEY + "&i=" + id + "&plot=full";

    fetch(url)
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        if (data.Response === "True") {
          movie.current = data;
          showMovieDetails(data);
        } else {
          document.getElementById("error-msg").style.display = "block";
          document.getElementById("loading-msg").style.display = "none";
        }
      })
      .catch(function() {
        document.getElementById("error-msg").style.display = "block";
        document.getElementById("loading-msg").style.display = "none";
      });
  }, []);

  // show movie details on screen
  function showMovieDetails(data) {
    document.getElementById("loading-msg").style.display = "none";
    document.getElementById("movie-detail").style.display = "flex";

    // check poster
    let poster = "https://via.placeholder.com/300x400";
    if (data.Poster !== "N/A") {
      poster = data.Poster;
    }

    document.getElementById("movie-poster").src = poster;
    document.getElementById("movie-title").textContent = data.Title;
    document.getElementById("movie-year").textContent = "Year: " + data.Year;
    document.getElementById("movie-genre").textContent = "Genre: " + data.Genre;
    document.getElementById("movie-rating").textContent = "IMDB Rating: " + data.imdbRating + " / 10";
    document.getElementById("movie-plot").textContent = data.Plot;
    document.getElementById("movie-cast").textContent = "Cast: " + data.Actors;
    document.getElementById("movie-director").textContent = "Director: " + data.Director;
    document.getElementById("movie-language").textContent = "Language: " + data.Language;
    document.getElementById("movie-runtime").textContent = "Runtime: " + data.Runtime;
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>

      <button
        onClick={function() { navigate("/"); }}
        style={{ background: "#e94560", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", marginBottom: "20px" }}
      >
        Go Back
      </button>

      <p id="loading-msg" style={{ textAlign: "center", color: "gray" }}>
        loading please wait...
      </p>

      <p id="error-msg" style={{ textAlign: "center", color: "red", display: "none" }}>
        sorry movie not found!
      </p>

      <div id="movie-detail" style={{ display: "none", gap: "30px", flexWrap: "wrap" }}>

        <img id="movie-poster" style={{ width: "250px", borderRadius: "10px" }} />

        <div style={{ flex: 1, minWidth: "250px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <h2 id="movie-title" style={{ fontSize: "26px", fontWeight: "bold" }}></h2>
          <p id="movie-year" style={{ color: "gray" }}></p>
          <p id="movie-genre" style={{ color: "gray" }}></p>
          <p id="movie-rating" style={{ color: "orange", fontWeight: "bold" }}></p>
          <p id="movie-runtime" style={{ color: "gray" }}></p>
          <p id="movie-language" style={{ color: "gray" }}></p>
          <p id="movie-plot" style={{ lineHeight: "1.6" }}></p>
          <p id="movie-cast" style={{ color: "gray" }}></p>
          <p id="movie-director" style={{ color: "gray" }}></p>
        </div>

      </div>

    </div>
  );
}

export default DetailPage;