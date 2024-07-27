   "use client"
   
   import { useEffect, useState } from 'react';

interface User {
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
  };
  email: string;
  location: {
    city: string;
    country: string;
  };
  phone: string;

}

const Rondom: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=10');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.results);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className='flex justify-center items-center bg-teal-100'>Random Users</h1>
      <ul className='grid grid-cols-4 flex-shrink-0 p-5 m-3 space-x-2 bg-slate-500'>
        {users.map((user, index) => (
          <li key={index}>
            <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
            <p className='text-white'>{user.name.first} {user.name.last}</p>
            <p className='text-green-500'>{user.location.city}, {user.location.country}</p>
            <p className='text-blue-950'>{user.phone}</p>
       
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rondom;
