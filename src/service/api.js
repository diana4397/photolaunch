import axios from "axios";
const url = 'http://localhost:5000/api/';

export const GetSchoolList = () => {
    const concateUrl = url + 'school/list';
    return axios.get(concateUrl);
};

export const DeleteSchoolList = (data) => {
    const concateUrl = url + 'school/delete';
    const params = new URLSearchParams();
    params.append('_id', data);
    return axios.post(concateUrl, params);
};