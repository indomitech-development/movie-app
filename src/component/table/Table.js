import React from "react";
import Data from "../../constant/data.json";
import Table from "react-bootstrap/Table";
import Paginate from "../pagination/Paginate";
import { useGenreDataContext } from "../../context/ActiveGenreContext";
export default function MovieTable() {
  const [data, setData] = React.useState(Data);
  const [{ activeGenre }] = useGenreDataContext();
  const [order, setOrder] = React.useState("dsc");
  const [title, setTitle] = React.useState("");
  const [genre, setGenre] = React.useState("");
  const [stock, setStock] = React.useState("");
  const [rate, setRate] = React.useState("");
  const [bool, setBoll] = React.useState(false);
  const [errorMessage, setMessage] = React.useState("");
  const [moviesPerPage, setMoviesPerPage] = React.useState(3);
  const [currentPage, setCurrentPage] = React.useState(1);

  // Add data into the table
  const handleData = () => {
    if (title != "" && genre != "" && stock != "" && rate != "") {
      let Movie = {
        _id: Math.random(),
        title: title,
        genre: { _id: Math.random(), name: genre },
        numberInStock: stock,
        dailyRentalRate: rate,
      };
      setData([...data, Movie]);
      setTitle("");
      setGenre("");
      setStock("");
      setRate("");
    } else {
      setMessage("Params can't be empty");
    }
  };

  // select active genre
  const genreData = data.filter((movie) => {
    if (activeGenre._id === "1213") {
      // active genre.name because show movie in the table through name
      return movie.genre.name !== activeGenre.name;
    }
    return movie.genre.name === activeGenre.name;
  });
  // Delete movie in the table
  const handleDelete = (id) => {
    const selectedData = data.filter((movie) => {
      return movie._id !== id;
    });
    setData(selectedData);
  };

  // Update handler
  const updateHandler = (movie) => {
    setTitle(movie.title);
    setGenre(movie.genre);
    setStock(movie.stock);
    setRate(movie.rate);
  };

  // sort data in click on table heading

  const handleSort = (columnPath) => {
    order === "dsc" ? setOrder("asc") : setOrder("dsc");
    if (columnPath === "genre") {
      order == "asc"
        ? data.sort((a, b) => {
            return a.genre.name > b.genre.name ? 1 : -1;
          })
        : data.sort((a, b) => {
            return a.genre.name < b.genre.name ? 1 : -1;
          });

      setData(data);
      return;
    }
    if (order == "asc") {
      data.sort((a, b) => {
        return a[columnPath] > b[columnPath] ? 1 : -1;
      });
    } else {
      data.sort((a, b) => {
        return a[columnPath] < b[columnPath] ? 1 : -1;
      });
    }
    setData(data);
  };

  // Pagination
  const startIndex = currentPage * moviesPerPage - moviesPerPage;
  const endIndex = startIndex + moviesPerPage - 1;
  const totalMovies = genreData.length;
  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const movieToShow = genreData.filter((movie, index) => {
    if (index >= startIndex && index <= endIndex) {
      return true;
    }
    return false;
  });

  // click this button show the form
  const handleForm = (item) => {
    setBoll(item);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-5">
            <button className="btn btn-danger" onClick={() => handleForm(true)}>
              ADD DATA
            </button>
          </div>
        </div>
      </div>
      {bool === true ? (
        <div className="container shadow-lg p-3 mb-5 section my-3 w-50">
          <div className="row">
            <div className="col-md-6 my-2">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="col-md-6 my-2">
              <input
                type="text"
                className="form-control"
                placeholder="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </div>
            <div className="col-md-6 my-2">
              <input
                type="number"
                className="form-control"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="col-md-6 my-2">
              <input
                type="number"
                className="form-control"
                placeholder="Rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button className="btn btn-success w-50" onClick={handleData}>
                Add Data
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <p>{errorMessage}</p>
      {genreData.length === 0 ? (
        <p>No Movie in the Table</p>
      ) : (
        <div>
          <span>Show {genreData.length} Movies in the Table </span>
          <Table striped bordered hover size="sm" className="my-2">
            <thead className="text-center">
              <tr>
                <th onClick={() => handleSort("title")}>Title</th>
                <th onClick={() => handleSort("genre")}>Genre</th>
                <th onClick={() => handleSort("stock")}>Stock</th>
                <th onClick={() => handleSort("rate")}>Rate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {movieToShow.map((movie, index) => {
                return (
                  <tr key={index}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <span>
                        <button
                          className="btn btn-success"
                          onClick={() => handleDelete(movie._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-info ms-2"
                          onClick={() => updateHandler(movie)}
                        >
                          Edit
                        </button>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Paginate
            handlePaginate={handlePaginate}
            totalMovies={totalMovies}
            moviesPerPage={moviesPerPage}
            currentPage={currentPage}
          />
        </div>
      )}
    </>
  );
}
