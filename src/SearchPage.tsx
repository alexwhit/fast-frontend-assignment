import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./SearchPage.css";

import MoviePoster from "./MoviePoster";
import { API_KEY } from "./constants";
import useDebounce from "./utils/useDebounce";
import MovieShape from "./shapes/MovieShape";

type Props = {
  selectedMovies: MovieShape[];
  setSelectedMovies: React.Dispatch<React.SetStateAction<MovieShape[]>>;
};

function SearchPage({ selectedMovies, setSelectedMovies }: Props) {
  const [searchInput, setSearchInput] = useState("");
  const debouncedInput = useDebounce(searchInput, 750);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (debouncedInput && debouncedInput.length > 0) {
      fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${debouncedInput}`)
        .then((response) => response.json())
        .then(
          (response) => {
            if (response && response["Search"]) {
              setSearchSuggestions(response["Search"]);
            }
          },
          (error) => {
            setSearchSuggestions([]);
            console.log(
              `There was an error fetching movies with your current API key and the search query "${debouncedInput}"`
            );
          }
        );
    }
  }, [debouncedInput]);

  const onChangeSearchInput = useCallback((e) => {
    if (e?.target?.value) {
      setSearchInput(e.target.value);
    } else {
      setSearchInput("");
      setSearchSuggestions([]);
    }
  }, []);

  const isMovieSelected = useCallback(
    (movie: MovieShape) => {
      return Boolean(
        selectedMovies.find((selectedMovie) => {
          return movie.imdbID === selectedMovie.imdbID;
        })
      );
    },
    [selectedMovies]
  );

  const onMovieClick = useCallback(
    (movie: MovieShape) => {
      const isSelected = isMovieSelected(movie);

      if (isSelected) {
        const newSelectedMovies = selectedMovies.filter((selectedMovie) => {
          return selectedMovie.imdbID !== movie.imdbID;
        });
        setSelectedMovies(newSelectedMovies);
      } else {
        setSelectedMovies([...selectedMovies, movie]);
      }
    },
    [isMovieSelected, selectedMovies, setSelectedMovies]
  );

  const onMovieKeyPress = useCallback(
    (e: React.KeyboardEvent, movie: MovieShape) => {
      if (e?.key === "Enter") {
        onMovieClick(movie);
      }
    },
    [onMovieClick]
  );

  const numSelectedMovies = selectedMovies.length;
  let selectedMoviesText = `${numSelectedMovies} selected movie`;
  if (numSelectedMovies !== 1) {
    selectedMoviesText += "s";
  }

  const displayMovies =
    searchSuggestions.length > 0 ? searchSuggestions : selectedMovies;

  return (
    <>
      <div className="navBar">
        <h2>
          <em>Fast</em> Movie Database
        </h2>
      </div>
      <div className="contentContainer">
        <input
          id="search-bar"
          className="searchBar"
          aria-label="Search for movies"
          placeholder={'Try "Lady Bird"...'}
          value={searchInput}
          onChange={(e) => onChangeSearchInput(e)}
        />
        <div className="selectedMovieBar">
          <p>{selectedMoviesText}</p>
          <button
            onClick={() => history.push("/checkout")}
            disabled={numSelectedMovies === 0}
          >
            Check out >
          </button>
        </div>
        {displayMovies && displayMovies.length > 0 && (
          <div className="movieGrid">
            {displayMovies.map((movie) => {
              const isSelected = isMovieSelected(movie);
              if (movie && movie.Poster) {
                return (
                  <MoviePoster
                    key={movie.Title}
                    movie={movie}
                    isSelected={isSelected}
                    onClick={() => onMovieClick(movie)}
                    onKeyPress={(e) => onMovieKeyPress(e, movie)}
                  />
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchPage;
