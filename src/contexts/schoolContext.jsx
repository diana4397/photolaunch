import {createContext, useEffect, useState} from 'react'
export const SchoolContext = createContext();

export const SchoolProvider = ({children}) => {
    const [schoolList, setSchoolList] = useState([]);

    useEffect(() => {

    }, [])

    return(
        <SchoolContext.Provider value={{
            schoolList,
            setSchoolList,
        }}>
            {children}
        </SchoolContext.Provider>
    )
}