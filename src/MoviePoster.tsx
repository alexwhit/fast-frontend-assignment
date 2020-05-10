import React from 'react';
import MovieShape from './shapes/MovieShape';

type Props = {
  movie: MovieShape;
  isSelected: boolean;
  onClick: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export default function MoviePoster({ 
  movie, 
  isSelected, 
  onClick = () => {}, 
  onKeyPress = () => {},
}: Props) {
  if (movie && movie.Poster) {
    return (
      <img
        tabIndex={0}
        className={`moviePoster ${
          isSelected ? "moviePosterSelected" : null
        }`}
        src={movie.Poster}
        alt={movie.Title}
        onClick={onClick}
        onKeyPress={onKeyPress}
      />
    );
  }

  return null;
}