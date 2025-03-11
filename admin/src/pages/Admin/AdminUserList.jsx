import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext'

const AdminUserList = () => {
  const { users, aToken, getAllUsers } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllUsers();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-semibold">All Registered Users</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {users.map((user, index) => (
          <div
            className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
            key={index}
          >
            <img
              className="bg-indigo-50 group-hover:bg-primary transition-all duration-500"
              src={user.image}
              alt={`${user.name}'s profile`}
            />
            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium">{user.name}</p>
              <p className="text-zinc-600 text-sm">{user.email}</p>
              <p className="text-zinc-600 text-sm">{user.phone}</p>
              <div className="mt-2 flex items-center gap-1 text-sm">
                <span className="text-zinc-600">Gender: {user.gender}</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-sm">
                <span className="text-zinc-600">DOB: {user.dob}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUserList;