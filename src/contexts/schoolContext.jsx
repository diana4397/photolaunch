import {createContext, useState} from 'react'

export const SchoolContext = createContext();

const schoolData = [
    {
        id: 0,
        schoolName: 'Abc',
        address1: 'It is a long established fact that a reader will be distracted by the',
        address2: 'It has survived not only five centuries',
        city: 'Ahmedabad',
        state: 'Gujarat',
        zip: '956785',
        contactName: 'Kartik',
        email: 'abc@gmail.com',
        code: '45DFE9',
    },
    {
        id: 1,
        schoolName: 'Pqr',
        address1: 'It is a long established fact that a reader will be distracted by the',
        address2: 'It has survived not only five centuries',
        city: 'Ahmedabad',
        state: 'Gujarat',
        zip: '956785',
        contactName: 'Kartik',
        email: 'abc@gmail.com',
        code: 'GHI92K',
    },
    {
        id: 2,
        schoolName: 'Pqr',
        address1: 'It is a long established fact that a reader will be distracted by the',
        address2: 'It has survived not only five centuries',
        city: 'Ahmedabad',
        state: 'Gujarat',
        zip: '956785',
        contactName: 'Kartik',
        email: 'abc@gmail.com',
        code: 'GHI92K',
    }
]


export const SchoolProvider = ({children}) => {
    const [schoolList, setSchoolList] = useState(schoolData);

    return(
        <SchoolContext.Provider value={{
            schoolList,
            setSchoolList,
        }}>
            {children}
        </SchoolContext.Provider>
    )
}