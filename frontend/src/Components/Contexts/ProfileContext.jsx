import { createContext, useEffect, useState } from 'react';

export const ProfileContext = createContext();

function ProfileContextProvider ({ children }) {
  
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [profileUser, setProfileUser] = useState({profileName: null, profilePicture: null})

    function openProfilePage(name, picture){
        console.log('opening')
        setProfileUser({profileName: name, profilePicture: picture})
        setIsProfileOpen(true)
    }

    return(
       <ProfileContext.Provider value={{profileName: profileUser.profileName, profilePicture: profileUser.profilePicture,openProfilePage, isProfileOpen, setIsProfileOpen}}>
            {children}
          </ProfileContext.Provider>
    )
}

export default ProfileContextProvider