const ListDetails = ({
  id,
  name,
  picture,
  city,
  gender,
  age,
  deletePerson
}) => {
  return (
    <tr>
      <td>
        <img src={picture} id={id} onClick={(e) => deletePerson(e.target.id)} />
      </td>
      <td>
        {name.first} {name.last}
      </td>
      <td>{city}</td>
      <td>{gender}</td>
      <td>{age}</td>
    </tr>
  );
};

export default ListDetails;
