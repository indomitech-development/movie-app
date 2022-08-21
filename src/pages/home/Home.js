import React from "react";
import List from "../../component/listgroup/List";
import MovieTable from "../../component/table/Table";

export default function Home() {
  const [boll, setBoll] = React.useState(false);
  return (
    <div>
      {/* <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <button
              className="btn btn-danger ms-5 mt-3 me-auto"
              onClick={() => setBoll(true)}
            >
              ADD DATA
            </button>
          </div>
        </div>
      </div>
      <div>{boll ? <AddForm /> : null}</div> */}
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-3">
            <List />
          </div>
          <div className="col-sm-9">
            <MovieTable />
          </div>
        </div>
      </div>
    </div>
  );
}
