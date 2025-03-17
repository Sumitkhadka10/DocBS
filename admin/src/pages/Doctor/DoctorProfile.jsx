import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)

  const [isEdit, setisEdit] = useState(false)
  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fee: profileData.fee,
        available: profileData.available
      }
      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile',updateData,{headers:{dToken}})
      if (data.success) {
        toast.success(data.message)
        setisEdit(false)
        getProfileData()
        
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
      console.log(error);
      
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])
  
  return profileData && (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="flex flex-col md:flex-row">
          {/* Left sidebar */}
          <div className="md:w-1/3 bg-primary text-white p-6">
            <div className="flex flex-col items-center">
              <div className="w-36 h-36 rounded-full bg-white p-1 mb-4">
                <img className="w-full h-full object-cover rounded-full" src={profileData.image} alt={profileData.name} />
              </div>
              
              <h2 className="text-2xl font-bold text-center">{profileData.name}</h2>
              <p className="text-blue-200 text-center mb-2">{profileData.degree}</p>
              <p className="text-blue-100 text-center font-light mb-4">{profileData.speciality}</p>
              
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="px-3 py-1 bg-cyan-400 rounded-full text-xs">{profileData.experience}</span>
                <span className={`px-3 py-1 ${profileData.available ? 'bg-green-600' : 'bg-red-600'} rounded-full text-xs`}>
                  {profileData.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
              
              <div className="w-full pt-4 border-t border-blue-600">
                <h3 className="text-sm uppercase tracking-wider mb-2">Contact Information</h3>
                <p className="text-sm mb-1 font-light">
                  {profileData.address.line1}
                </p>
                <p className="text-sm font-light">
                  {profileData.address.line2}
                </p>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold text-gray-800">Doctor Profile</h1>
              {isEdit ? (
                <div className="flex gap-2">
                  <button 
                    onClick={() => setisEdit(false)} 
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={updateProfile} 
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setisEdit(true)} 
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 text-sm"
                >
                  Edit Profile
                </button>
              )}
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-800 mb-2">About</h2>
                <p className="text-gray-600 leading-relaxed">{profileData.about}</p>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Professional Details</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-600">Appointment Fee</h3>
                      {isEdit ? (
                        <div className="mt-1 relative w-44">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">{currency}</span>
                          </div>
                          <input 
                            type="number" 
                            className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                            onChange={(e) => setProfileData(prev => ({ ...prev, fee: e.target.value }))} 
                            value={profileData.fee} 
                          />
                        </div>
                      ) : (
                        <p className="text-lg font-medium text-gray-800">{currency} {profileData.fee}</p>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-600">Availability Status</h3>
                      <div className="flex items-center mt-2">
                        <label className="inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={profileData.available}
                            onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
                            disabled={!isEdit}
                            aria-label="Toggle availability status"
                          />
                          <div className={`relative w-14 h-7 bg-gray-300 rounded-full peer 
                            peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300
                            peer-checked:after:translate-x-full peer-checked:after:border-white
                            after:content-[''] after:absolute after:top-0.5 after:left-0.5
                            after:bg-white after:border-gray-300 after:border after:rounded-full
                            after:h-6 after:w-6 after:transition-all dark:border-gray-600
                            ${profileData.available ? 'peer-checked:bg-green-500' : 'peer-checked:bg-red-500'}
                            ${!isEdit ? 'opacity-70' : ''}
                            transition-colors duration-200 ease-in-out`}>
                          </div>
                          <span className={`ml-3 text-sm font-medium ${profileData.available ? 'text-green-700' : 'text-red-700'}`}>
                            {profileData.available ? 'Available' : 'Unavailable'}
                          </span>
                        </label>
                      </div>
                      {isEdit && (
                        <p className="text-xs text-gray-500 mt-1">
                          {profileData.available 
                            ? "Patients can book appointments with you" 
                            : "You won't receive new appointment requests"}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {isEdit && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-1">Address</h3>
                      <div className="space-y-2">
                        <input 
                          type="text" 
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                          onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                          value={profileData.address.line1}
                          placeholder="Address Line 1" 
                        />
                        <input 
                          type="text" 
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                          onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                          value={profileData.address.line2}
                          placeholder="Address Line 2" 
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Qualifications</h2>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">{profileData.degree}</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">{profileData.speciality}</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">{profileData.experience}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile