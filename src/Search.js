import { useState } from "react";
import List from "./List";

const API_URL = "https://randomuser.me/api/";

const Search = () => {
  const [gender, setGender] = useState("");
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const requestList = async () => {
    fetch(`${API_URL}?results=20&gender=${gender}&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setList([...list, ...data.results]);
        setIsLoading(false);
        // console.log(data)
        // console.log(gender)
        // console.log(age)
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestList();
        }}
      >
        <h2>Search By</h2>
        <label htmlFor="gender">
          Gender
          <select
            id="gender"
            className="select-box"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="all">All</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </label>
        <button>Search</button>
      </form>
      <List isLoading={isLoading} list={list} setList={setList} />
      {list.length > 0 ? (
        <button
          onClick={(e) => {
            setPage(page + 1);
            requestList();
          }}
        >
          Load More
        </button>
      ) : null}
    </div>
  );
};

export default Search;
