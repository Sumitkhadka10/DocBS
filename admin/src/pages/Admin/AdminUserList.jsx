import React, { useContext, useEffect, useState, useMemo } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { Search, X, Filter, ChevronDown, Users } from 'lucide-react';

const AdminUserList = () => {
  const { users, aToken, getAllUsers } = useContext(AdminContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterGender, setFilterGender] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (aToken) {
      getAllUsers();
    }
  }, [aToken, getAllUsers]);

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    
    let result = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    );
    
    if (filterGender) {
      result = result.filter(user => user.gender.toLowerCase() === filterGender.toLowerCase());
    }
    
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name': comparison = a.name.localeCompare(b.name); break;
        case 'email': comparison = a.email.localeCompare(b.email); break;
        case 'dob': comparison = new Date(a.dob) - new Date(b.dob); break;
        default: comparison = a.name.localeCompare(b.name);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    return result;
  }, [searchTerm, users, sortBy, sortOrder, filterGender]);

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterGender('');
    setSortBy('name');
    setSortOrder('asc');
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-screen-2xl mx-auto max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <div className="h-12 w-12 rounded-lg bg-blue-500 flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">User Directory</h1>
              <p className="text-sm text-gray-600">Manage and review registered users</p>
            </div>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-sm shadow-sm"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 shadow-sm ${showFilters ? 'bg-blue-50 border-blue-500' : ''}`}
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className={`h-4 w-4 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white p-5 rounded-lg mb-6 border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 text-sm bg-white"
                >
                  <option value="name">Name</option>
                  <option value="email">Email</option>
                  <option value="dob">Date of Birth</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                <select 
                  value={sortOrder} 
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 text-sm bg-white"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select 
                  value={filterGender} 
                  onChange={(e) => setFilterGender(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 text-sm bg-white"
                >
                  <option value="">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <button 
              onClick={clearFilters}
              className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex-grow overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {Math.min(50, filteredUsers.length)} of {filteredUsers.length} users
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => handleSortChange('name')}
                className={`px-3 py-1 text-sm rounded-md font-medium ${sortBy === 'name' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button 
                onClick={() => handleSortChange('email')}
                className={`px-3 py-1 text-sm rounded-md font-medium ${sortBy === 'email' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Email {sortBy === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button 
                onClick={() => handleSortChange('dob')}
                className={`px-3 py-1 text-sm rounded-md font-medium ${sortBy === 'dob' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                DOB {sortBy === 'dob' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>
          
          <div className="overflow-y-auto max-h-[60vh]">
            {filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-5">
                {filteredUsers.slice(0, 50).map((user, index) => (
                  <div 
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow min-w-[250px]"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        className="h-12 w-12 rounded-full object-cover border-2 border-blue-100"
                        src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3B82F6&color=fff`}
                        alt={user.name}
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3B82F6&color=fff`;
                        }}
                      />
                      <div>
                        <h3 className="text-base font-semibold text-gray-800">{user.name}</h3>
                        <p className="text-xs text-gray-500 capitalize">{user.gender}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 space-y-2">
                      <p className="flex items-center gap-2">
                        <span className="text-blue-600 font-medium">Email:</span> 
                        <span className="truncate">{user.email}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-blue-600 font-medium">Phone:</span> 
                        {user.phone}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-blue-600 font-medium">DOB:</span> 
                        {user.dob}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-3">No users found</p>
                <p className="text-sm text-gray-500 mb-4">Try adjusting your search or filters</p>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserList;