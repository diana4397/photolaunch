import {createContext, useState} from 'react'

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [email, setEmail] = useState("");
    const [thumbLength, setThumbLength] = useState(0);

    return(
        <UserContext.Provider value={{
            firstName,
            setFirstName,
            lastName,
            setLastName,
            address1,
            setAddress1,
            address2,
            setAddress2,
            city,
            setCity,
            state,
            setState,
            zipCode,
            setZipCode,
            email,
            setEmail,
            thumbLength,
            setThumbLength
        }}>
            {children}
        </UserContext.Provider>
    )
}