import {createContext, useEffect, useState} from 'react'
import {GetSchoolList} from '../service/api';
export const SchoolContext = createContext();

export const SchoolProvider = ({children}) => {
    const [schoolList, setSchoolList] = useState([]);

    useEffect(() => {
        (async function() {
            try {
                const schoolList = await GetSchoolList();
                const {data: {data}} = schoolList;
                setSchoolList(data);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    return(
        <SchoolContext.Provider value={{
            schoolList,
            setSchoolList,
        }}>
            {children}
        </SchoolContext.Provider>
    )
}