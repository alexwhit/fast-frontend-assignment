import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import "./CheckoutPage.css";
import MovieShape from "./shapes/MovieShape";
import MoviePoster from "./MoviePoster";

type Props = {
  selectedMovies: MovieShape[];
  setSelectedMovies: React.Dispatch<React.SetStateAction<MovieShape[]>>;
};

function CheckoutPage({ selectedMovies, setSelectedMovies }: Props) {
  const history = useHistory();

  const onMovieClick = useCallback(
    (movie: MovieShape) => {
      const newSelectedMovies = selectedMovies.filter((selectedMovie) => {
        return selectedMovie.imdbID !== movie.imdbID;
      });
      setSelectedMovies(newSelectedMovies);
    },
    [selectedMovies, setSelectedMovies]
  );

  const onMovieKeyPress = useCallback(
    (e: React.KeyboardEvent, movie: MovieShape) => {
      if (e?.key === "Enter") {
        onMovieClick(movie);
      }
    },
    [onMovieClick]
  );

  return (
    <>
      <div className="navBar">
        <h2>Confirm Selections</h2>
        <button onClick={() => history.goBack()}>{"< Back"}</button>
      </div>
      <div className="contentContainer">
        {selectedMovies && selectedMovies.length > 0 && (
          <div className="movieGrid">
            {selectedMovies.map((movie) => {
              return (
                <MoviePoster
                  key={movie.Title}
                  movie={movie}
                  isSelected={true}
                  onClick={() => onMovieClick(movie)}
                  onKeyPress={(e) => onMovieKeyPress(e, movie)}
                />
              );
            })}
          </div>
        )}
      </div>
      <footer>
        <button
          disabled={selectedMovies.length === 0}
          onClick={() =>
            console.log("Successfully submitted movie selections!")
          }
        >
          Submit
        </button>
      </footer>
    </>
  );
}

export default CheckoutPage;
