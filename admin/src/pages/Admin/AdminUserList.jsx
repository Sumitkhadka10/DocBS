import React, { useContext, useEffect, useState, useMemo } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { Search, X, Filter, ChevronDown, Activity, Calendar, Phone, Mail, Users } from 'lucide-react';

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
    
    // Filter by search term
    let result = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    );
    
    // Filter by gender if filter is applied
    if (filterGender) {
      result = result.filter(user => user.gender.toLowerCase() === filterGender.toLowerCase());
    }
    
    // Sort users
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'email':
          comparison = a.email.localeCompare(b.email);
          break;
        case 'dob':
          comparison = new Date(a.dob) - new Date(b.dob);
          break;
        default:
          comparison = a.name.localeCompare(b.name);
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
    <div className="max-h-[90vh] overflow-hidden flex flex-col w-full px-4 py-4 bg-gradient-to-br from-indigo-50/50 to-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 mt-1">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-indigo-900 flex items-center">
            Registered Users List
            </h1>
            <p className="text-sm text-indigo-600/80">View and monitor registered users only.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0 w-full sm:w-auto">
          <div className="relative w-full sm:w-64 group">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border-none bg-white rounded-xl shadow-sm shadow-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm transition-all duration-300 group-hover:shadow-md group-hover:shadow-indigo-200"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-indigo-400" />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white hover:bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm transition-all duration-300 font-medium shadow-sm shadow-indigo-100 hover:shadow-md hover:shadow-indigo-200"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
            <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
      
      {showFilters && (
        <div className="bg-white rounded-xl border border-indigo-100/50 p-5 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fadeIn shadow-lg shadow-indigo-100/20">
          <div>
            <label className="block text-xs font-medium text-indigo-800 mb-2 uppercase tracking-wider">Sort By</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-lg border-indigo-200 text-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-indigo-50/50 py-2.5"
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="dob">Date of Birth</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-indigo-800 mb-2 uppercase tracking-wider">Sort Order</label>
            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full rounded-lg border-indigo-200 text-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-indigo-50/50 py-2.5"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-indigo-800 mb-2 uppercase tracking-wider">Filter by Gender</label>
            <select 
              value={filterGender} 
              onChange={(e) => setFilterGender(e.target.value)}
              className="w-full rounded-lg border-indigo-200 text-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-indigo-50/50 py-2.5"
            >
              <option value="">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="sm:col-span-3 flex justify-end">
            <button 
              onClick={clearFilters}
              className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg transition-colors duration-300 font-medium flex items-center gap-2"
            >
              <X className="h-3.5 w-3.5" /> Reset all filters
            </button>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-md border border-indigo-100/30 p-4 mb-6 w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
            <Activity className="h-4 w-4 text-indigo-600" />
          </div>
          <div>
            <p className="text-indigo-900 text-sm font-medium">
              <span className="font-bold">{filteredUsers.length}</span> users found
            </p>
            <p className="text-xs text-indigo-600/70">
              {filteredUsers.length > 0 && `Showing ${Math.min(50, filteredUsers.length)} of ${filteredUsers.length}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 bg-indigo-50/50 p-1 rounded-lg">
            <button 
              onClick={() => handleSortChange('name')}
              className={`text-xs px-3 py-1.5 rounded-md transition-all duration-300 font-medium ${sortBy === 'name' ? 'bg-indigo-600 text-white shadow-md' : 'text-indigo-700 hover:bg-indigo-100'}`}
            >
              Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button 
              onClick={() => handleSortChange('email')}
              className={`text-xs px-3 py-1.5 rounded-md transition-all duration-300 font-medium ${sortBy === 'email' ? 'bg-indigo-600 text-white shadow-md' : 'text-indigo-700 hover:bg-indigo-100'}`}
            >
              Email {sortBy === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button 
              onClick={() => handleSortChange('dob')}
              className={`text-xs px-3 py-1.5 rounded-md transition-all duration-300 font-medium ${sortBy === 'dob' ? 'bg-indigo-600 text-white shadow-md' : 'text-indigo-700 hover:bg-indigo-100'}`}
            >
              Age {sortBy === 'dob' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-y-auto flex-grow w-full pb-4">
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 w-full">
            {filteredUsers.slice(0, 50).map((user, index) => (
              <div
                className="bg-white border border-indigo-100/50 rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200 transition-all duration-300 w-full group"
                key={index}
              >
                <div className="bg-gradient-to-r from-indigo-600 to-violet-600 h-24 flex items-center justify-center group-hover:from-indigo-700 group-hover:to-violet-700 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,0 L100,0 L100,100 Z" fill="white" />
                    </svg>
                  </div>
                  <img
                    className="h-16 w-16 rounded-full object-cover border-4 border-white group-hover:border-indigo-200 group-hover:scale-105 transition-all duration-300 shadow-lg z-10"
                    src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`}
                    alt={`${user.name}'s profile`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`;
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-indigo-900 font-bold text-sm truncate group-hover:text-indigo-600 transition-colors duration-300 text-center mb-2">{user.name}</h3>
                  <div className="flex items-center justify-center mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.gender.toLowerCase() === 'male' ? 'bg-blue-100 text-blue-700' : 
                      user.gender.toLowerCase() === 'female' ? 'bg-pink-100 text-pink-700' : 
                      'bg-purple-100 text-purple-700'
                    } font-medium`}>{user.gender}</span>
                  </div>
                  <div className="space-y-2.5 text-xs text-zinc-600 bg-indigo-50/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-indigo-500" />
                      <span className="truncate text-indigo-900">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-indigo-500" />
                      <span className="text-indigo-900">{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-indigo-500" />
                      <span className="text-indigo-900">{user.dob}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center bg-indigo-50/50 rounded-lg border border-dashed border-indigo-200">
            <div className="text-indigo-300 text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-medium text-indigo-800 mb-1">No users found</h3>
            <p className="text-zinc-500 text-sm mb-3">Try adjusting your search terms or filters</p>
            <button 
              onClick={clearFilters}
              className="text-xs bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1.5 rounded-lg transition-colors duration-300"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserList;