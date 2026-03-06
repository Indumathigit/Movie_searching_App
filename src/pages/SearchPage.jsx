import { useRef } from "react";
import { useNavigate } from "react-router-dom";

// my api key from omdb
const API_KEY = "a6048468";

function SearchPage() {

  // storing data using useRef
  const moviesRef = useRef([]);
  const pageRef = useRef(1);
  const totalRef = useRef(0);

  // this function shows movies on screen
  function showMovies() {
    const container = document.getElementById("movies-container");
    const errorMsg = document.getElementById("error-msg");
    const pageInfo = document.getElementById("page-info");

    if (!container) return;

    // if no movies found
    if (moviesRef.current.length === 0) {
      container.innerHTML = "";
      errorMsg.style.display = "block";
      return;
    }

    errorMsg.style.display = "none";
    container.innerHTML = "";

    // loop through movies and create cards
    for (let i = 0; i < moviesRef.current.length; i++) {
      const movie = moviesRef.current[i];

      const card = document.createElement("div");
      card.style.background = "white";
      card.style.borderRadius = "10px";
      card.style.overflow = "hidden";
      card.style.cursor = "pointer";
      card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";

      // check if poster exists
      let posterUrl = "https://via.placeholder.com/300x400";
      if (movie.Poster !== "N/A") {
        posterUrl = movie.Poster;
      }

      card.innerHTML = `
        <img src="${posterUrl}" style="width:100%; height:280px; object-fit:cover;" />
        <div style="padding:10px;">
          <p style="font-weight:bold; font-size:14px;">${movie.Title}</p>
          <p style="color:gray; font-size:13px;">${movie.Year}</p>
          <p style="color:#e94560; font-size:12px;">${movie.Type}</p>
        </div>
      `;

      // go to detail page when clicked
      card.addEventListener("click", function() {
        window.location.href = "/movie/" + movie.imdbID;
      });

      container.appendChild(card);
    }

    // show page number
    let totalPages = Math.ceil(totalRef.current / 10);
    pageInfo.textContent = "Page " + pageRef.current + " of " + totalPages;
  }

  // search function
  function searchMovies(page) {
    const query = document.getElementById("search-input").value;
    const type = document.getElementById("type-select").value;

    // dont search if empty
    if (!query) {
      alert("Please enter a movie name!");
      return;
    }

    pageRef.current = page;

    // build the url
    let url = "https://www.omdbapi.com/?apikey=" + API_KEY;
    url = url + "&s=" + query;
    url = url + "&type=" + type;
    url = url + "&page=" + page;

    document.getElementById("loading-msg").style.display = "block";
    document.getElementById("error-msg").style.display = "none";

    fetch(url)
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        document.getElementById("loading-msg").style.display = "none";

        if (data.Response === "True") {
          moviesRef.current = data.Search;
          totalRef.current = parseInt(data.totalResults);
          showMovies();
        } else {
          moviesRef.current = [];
          showMovies();
        }
      })
      .catch(function() {
        document.getElementById("loading-msg").style.display = "none";
        document.getElementById("error-msg").style.display = "block";
      });
  }

  // next page
  function nextPage() {
    let totalPages = Math.ceil(totalRef.current / 10);
    if (pageRef.current < totalPages) {
      let newPage = pageRef.current + 1;
      searchMovies(newPage);
    }
  }

  // previous page
  function prevPage() {
    if (pageRef.current > 1) {
      let newPage = pageRef.current - 1;
      searchMovies(newPage);
    }
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>

      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#1a1a2e" }}>
        Search Movies 🎬
      </h2>

      {/* search area */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", justifyContent: "center", flexWrap: "wrap" }}>

        <input
          id="search-input"
          type="text"
          placeholder="Search movies ex: Batman, Titanic..."
          style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", width: "280px", fontSize: "14px" }}
          onKeyDown={function(e) {
            if (e.key === "Enter") {
              searchMovies(1);
            }
          }}
        />

        {/* filter dropdown */}
        <select
          id="type-select"
          style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px" }}
        >
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>

        <button
          onClick={function() { searchMovies(1); }}
          style={{ padding: "10px 20px", background: "#e94560", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
        >
          Search
        </button>

      </div>

      {/* loading text */}
      <p id="loading-msg" style={{ textAlign: "center", color: "gray", display: "none" }}>
        please wait...
      </p>

      {/* error text */}
      <p id="error-msg" style={{ textAlign: "center", color: "red", display: "none" }}>
        no movies found! try something else
      </p>

      {/* movies will show here */}
      <div id="movies-container" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "20px",
        marginBottom: "20px"
      }}>
      </div>

      {/* pagination buttons */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", marginTop: "20px" }}>
        <button
          onClick={prevPage}
          style={{ padding: "8px 16px", background: "#1a1a2e", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
        >
          Prev
        </button>

        <span id="page-info" style={{ fontWeight: "bold" }}></span>

        <button
          onClick={nextPage}
          style={{ padding: "8px 16px", background: "#1a1a2e", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
        >
          Next
        </button>
      </div>

    </div>
  );
}

export default SearchPage;