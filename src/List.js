import { useState, useEffect } from "react";
import ListDetails from "./ListDetails";

const List = ({ list, setList, isLoading }) => {
  const [sortedList, setSortedList] = useState([...list]);
  const [sortKey, setSortKey] = useState("");
  const [sortDirection, setSortDirection] = useState(true);

  useEffect(() => {
    requestSort();
  }, [sortKey, sortDirection, list]);

  const requestSort = () => {
    let newArr = [...list];
    newArr = newArr.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortDirection ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortDirection ? 1 : -1;
      return 0;
    });
    //console.log(newArr);
    setSortedList(newArr);
  };

  const toggleSort = (key) => {
    if (key === sortKey) {
      setSortDirection(!sortDirection);
    }
  };

  const deletePerson = (key) => {
    let newArr = [...sortedList];
    // console.log(newArr);
    newArr = newArr.filter((person) => {
      return person.phone + person.name.last !== key;
    });
    // console.log(key);
    // console.log(newArr);
    setSortedList(newArr);
  };

  return (
    <div>
      <h2>from list</h2>
      <table>
        <thead>
          <tr>
            <th>
              <button>Picture</button>
            </th>
            <th>
              <button
                value="name"
                onClick={(e) => {
                  setSortKey(e.target.value);
                  toggleSort(e.target.value);
                  requestSort();
                }}
              >
                Name
              </button>
            </th>
            <th>
              <button
                value="city"
                onClick={(e) => {
                  setSortKey(e.target.value);
                  toggleSort(e.target.value);
                  requestSort();
                }}
              >
                City
              </button>
            </th>
            <th>
              <button
                value="gender"
                onClick={(e) => {
                  setSortKey(e.target.value);
                  toggleSort(e.target.value);
                  requestSort();
                }}
              >
                Gender
              </button>
            </th>
            <th>
              <button
                value="age"
                onClick={(e) => {
                  setSortKey(e.target.value);
                  toggleSort(e.target.value);
                  requestSort();
                }}
              >
                Age
              </button>
            </th>
          </tr>
        </thead>
        {list.length === 0 ? (
          <h2>No results to show</h2>
        ) : isLoading ? (
          <h2>Loading...</h2>
        ) : (
          <tbody>
            {sortedList.map((person) => (
              <ListDetails
                key={`${person.phone}${person.name.last}`}
                id={`${person.phone}${person.name.last}`}
                name={person.name}
                picture={person.picture.medium}
                city={person.location.city}
                gender={person.gender}
                age={person.dob.age}
                deletePerson={deletePerson}
              />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default List;
