import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch('https://dummyjson.com/users?limit=100');
      const data = await res.json();
      if (data && data.users) {
        setUsers(data.users);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const selectedPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= users.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div>
      {loading && <p className="text-red-600">Loading....!</p>}
      <div className="grid grid-cols-3">
        {users.slice(page * 9 - 9, page * 9).map((user) => (
          <div
            key={user.id}
            className="bg-slate-100 text-black text-lg font-semibold flex flex-col border-2 border-red-400 m-2 rounded-xl hover:border-5 hover:border-blue-400 cursor-pointer"
          >
            {loading || <img src={user.image} alt="no" />}
            <p>{user.firstName}</p>
          </div>
        ))}
      </div>

      {users.length > 0 && (
        <div>
          <button
            disabled={page <= 1 || loading}
            className={`${page <= 1 || loading ? 'bg-gray-400' : ''}`}
            onClick={() => selectedPageHandler(page - 1)}
          >
            ◀
          </button>
          {[...Array(users.length / 10)].map((_, i) => {
            return (
              <span
                className={`p-3 border-2 mx-[1px] border-gray-400 cursor-pointer ${
                  i + 1 === page ? 'bg-blue-500 text-white' : ''
                }`}
                key={i}
                onClick={() => selectedPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <button
            className={`${
              page < users.length / 10 || loading ? '' : 'bg-gray-400'
            }`}
            disabled={page < users.length / 12 || loading ? false : true}
            onClick={() => selectedPageHandler(page + 1)}
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
