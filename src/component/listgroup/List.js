import React from "react";
import { ListGroup, Tab } from "react-bootstrap";
import Genre from "../../constant/genre.json";
import { useGenreDataContext } from "../../context/ActiveGenreContext";
export default function List() {
  const [activeGenre, { handleGenreChange }] = useGenreDataContext();
  const handleActiveGenre = (genre) => {
    handleGenreChange({
      name: genre.name,
      _id: genre._id,
    });
  };
  const handleShowAllMovies = () => {
    handleGenreChange({
      name: "All Movies",
      _id: "1213",
    });
  };

  return (
    <div>
      <Tab.Container defaultActiveKey="All Movies">
        <ListGroup>
          <ListGroup.Item
            action
            href="All Movies"
            as="li"
            onClick={handleShowAllMovies}
          >
            All Movies
          </ListGroup.Item>
          {Genre.map((genre, index) => {
            return (
              <ListGroup.Item
                key={index}
                action
                href={genre.name}
                as="li"
                onClick={() => handleActiveGenre(genre)}
              >
                {genre.name}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Tab.Container>
    </div>
  );
}
