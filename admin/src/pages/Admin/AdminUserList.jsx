import React, { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { Search, X, Filter, ChevronDown, Users } from 'lucide-react';
import { toast } from 'react-toastify';

const AdminUserList = () => {
  const { users, aToken, getAllUsers, appointments, getAllAppointments } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterGender, setFilterGender] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchData = useCallback(async () => {
    if (!aToken) {
      setFetchError("No admin token found. Please log in again.");
      toast.error("No admin token found. Please log in again.");
      return;
    }

    if (hasFetched) {
      console.log("Skipping fetch: Data already loaded.");
      return;
    }

    setIsLoading(true);
    setFetchError(null);
    try {
      console.log("Starting data fetch at:", new Date().toISOString());
      await Promise.all([getAllUsers(), getAllAppointments()]);
      console.log("Data fetch completed at:", new Date().toISOString());
      setHasFetched(true);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Unknown network error";
      console.error("Fetch error:", {
        message: errorMessage,
        status: error.response?.status,
        data: error.response?.data,
        time: new Date().toISOString(),
      });
      setFetchError(`Failed to load data: ${errorMessage}`);
      toast.error(`Failed to load data: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [aToken, getAllUsers, getAllAppointments, hasFetched]);

  useEffect(() => {
    console.log("Component mounted at:", new Date().toISOString());
    fetchData();
    return () => console.log("Component unmounted at:", new Date().toISOString());
  }, [fetchData]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Checking state after", new Date().toISOString(), "- Users:", users?.length, "Appointments:", appointments?.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [users, appointments]);

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

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const userAppointments = selectedUser
    ? appointments.filter(appointment => appointment.userData?._id === selectedUser._id)
    : [];

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-screen-2xl mx-auto max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white p-4 rounded-md shadow-md border border-gray-200">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <div className="h-12 w-12 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">User Directory</h1>
              <p className="text-sm text-gray-500">Manage and review registered users</p>
            </div>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-500 text-sm shadow-md"
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
              className={`flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-blue-50 shadow-md ${showFilters ? 'bg-blue-50 border-blue-600' : ''}`}
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className={`h-4 w-4 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white p-5 rounded-md mb-6 border border-gray-200 shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-600 text-sm bg-white shadow-md"
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
                  className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-600 text-sm bg-white shadow-md"
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
                  className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-600 text-sm bg-white shadow-md"
                >
                  <option value="">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <button 
              onClick={clearFilters}
              className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* User List */}
        <div className="bg-white rounded-md shadow-md border border-gray-200 flex-grow overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-blue-50">
            <p className="text-sm text-gray-500">
              {isLoading ? 'Loading...' : fetchError ? fetchError : `Showing ${Math.min(50, filteredUsers.length)} of ${filteredUsers.length} users`}
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => handleSortChange('name')}
                className={`px-3 py-1 text-sm rounded-md font-medium ${sortBy === 'name' ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'}`}
              >
                Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button 
                onClick={() => handleSortChange('email')}
                className={`px-3 py-1 text-sm rounded-md font-medium ${sortBy === 'email' ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'}`}
              >
                Email {sortBy === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button 
                onClick={() => handleSortChange('dob')}
                className={`px-3 py-1 text-sm rounded-md font-medium ${sortBy === 'dob' ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'}`}
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
                    onClick={() => handleUserClick(user)}
                    className="bg-white border border-gray-200 rounded-md p-4 hover:shadow-md hover:bg-blue-50 transition-all duration-200 min-w-[250px] cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        className="h-12 w-12 rounded-full object-cover border-2 border-gray-200 shadow-md"
                        src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3B82F6&color=fff`}
                        alt={user.name}
                        onError={(e) => {
                          console.log(`Image failed to load for user ${user.name}:`, e);
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3B82F6&color=fff`;
                        }}
                      />
                      <div>
                        <h3 className="text-base font-medium text-gray-700">{user.name}</h3>
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
                <p className="text-base font-medium text-gray-700 mb-3">{isLoading ? 'Loading users...' : fetchError ? 'Error loading users' : 'No users found'}</p>
                {!isLoading && !fetchError && (
                  <>
                    <p className="text-sm text-gray-500 mb-4">Try adjusting your search or filters</p>
                    <button 
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Reset All Filters
                    </button>
                  </>
                )}
                {fetchError && (
                  <button 
                    onClick={() => { setHasFetched(false); fetchData(); }}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-4"
                  >
                    Retry
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal for User Details and Appointments */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-md p-6 w-full max-w-2xl shadow-lg max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-700">User Details</h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    className="h-16 w-16 rounded-full object-cover border-2 border-gray-200"
                    src={selectedUser.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.name)}&background=3B82F6&color=fff`}
                    alt={selectedUser.name}
                    onError={(e) => {
                      console.log(`Modal image failed for user ${selectedUser.name}:`, e);
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.name)}&background=3B82F6&color=fff`;
                    }}
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">{selectedUser.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{selectedUser.gender}</p>
                  </div>
                </div>
                <div className="text-sm font-normal text-gray-700 space-y-2">
                  <p><span className="font-medium text-blue-600">Email:</span> {selectedUser.email}</p>
                  <p><span className="font-medium text-blue-600">Phone:</span> {selectedUser.phone}</p>
                  <p><span className="font-medium text-blue-600">DOB:</span> {selectedUser.dob}</p>
                </div>

                {/* Appointments Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Appointments</h3>
                  {userAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {userAppointments.map((appointment, index) => (
                        <div key={index} className="border border-gray-200 rounded-md p-4 bg-gray-50 flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <img
                              className="h-12 w-12 rounded-full object-cover border-2 border-gray-200 shadow-md"
                              src={appointment.docData?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(appointment.docData?.name || 'Unknown')}&background=3B82F6&color=fff`}
                              alt={appointment.docData?.name || 'Unknown'}
                              onError={(e) => {
                                console.log(`Doctor image failed for ${appointment.docData?.name || 'Unknown'}:`, e);
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(appointment.docData?.name || 'Unknown')}&background=3B82F6&color=fff`;
                              }}
                            />
                          </div>
                          <div className="flex-1 text-sm font-normal text-gray-700 space-y-2">
                            <p><span className="font-medium text-blue-600">Doctor:</span> {appointment.docData?.name || 'Unknown'}</p>
                            <p><span className="font-medium text-blue-600">Date:</span> {slotDateFormat(appointment.slotDate)}</p>
                            <p><span className="font-medium text-blue-600">Time:</span> {appointment.slotTime}</p>
                            <p>
                              <span className="font-medium text-blue-600">Status:</span> 
                              {appointment.cancelled ? 'Cancelled' : appointment.isCompleted ? 'Completed' : 'Active'}
                            </p>
                            {appointment.cancelled && (
                              <p>
                                <span className="font-medium text-blue-600">Cancellation Reason:</span> 
                                {appointment.cancellationReason || 'No reason provided'}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm font-normal text-gray-700">No appointments found for this user.</p>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserList;