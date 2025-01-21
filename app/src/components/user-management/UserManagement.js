import './user-management.scss';
import { useAxios } from 'hooks/useAxios';
import { Table } from 'components/table/Table';
import { TextInput } from 'components/inputs/text-input/TextInput';
import { useEffect, useState } from 'react';
import { searchArray } from 'utils/searchArray';
import { Spinner } from 'components/spinner/Spinner';
import { Button } from 'components/inputs/button/Button';

export const UserManagement = () => {
  const { data, loading, error } = useAxios('http://localhost:8080/users/');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(data);
  }, [loading]);

  const searchUser = (query) => {
    const array = searchArray(data, query);
    setFilteredData(array);
  };

  const handleUserInfo = (userId) => {
    window.open(`/user-profile/${userId}`, '_blank');
  };

  return (
    <div className="user__management">
      {loading ? (
        <Spinner />
      ) : (
        <div className="user__management__table__container">
          <TextInput
            className="user__management__search__input"
            name="search"
            textLabel="Wyszukaj"
            onChange={(e) => searchUser(e.target.value)}
            mediumSize
          />
          <Table
            loading={loading}
            headerArray={[
              'Id',
              'Email',
              'Username',
              'Name',
              'Telefon',
              'Rezerwacji',
              'Data dołączenia',
              'Info'
            ]}>
            {filteredData.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.phone}</td>
                <td>{user.reservations.length}</td>
                <td>{user.dateJoined.slice(0, 10)}</td>
                <td>
                  <Button onClick={() => handleUserInfo(user.id)} isSecondary>
                    Info
                  </Button>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};
