import React, { useEffect } from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
  const {currency, backendUrl} = useContext(AppContext)

  useEffect (()=>{
    if (dToken) {
      getProfileData()
      
    }},[dToken])
  return profileData && (
    <div>
      <div>
        <div>
          <img src={profileData.image} alt="" />
        </div>
        <div>
          {/* Doc info */}
          <p>{profileData.name}</p>
          <div>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button>{profileData.experience}</button>

          </div>
          {/* Doctors About */}
          <div>
            <p>About:</p>
            <p>{profileData.about}</p>
          </div>
          <p>Appointment Fee : <span>{currency} {profileData.fee}</span></p>

          <div>
            <p>Address:</p>
            <p>{profileData.address.line1} <br />{profileData.address.line2}</p>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Available</label>
          </div>
          <button>Edit Profile</button>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile