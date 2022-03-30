import axios from "axios";
const url = 'http://localhost:5000/api/';

export const GetSchoolList = () => {
    const concateUrl = url + 'school/list';
    return axios.get(concateUrl);
};

export const DeleteSchoolList = (data) => {
    const concateUrl = url + 'school/delete';
    const params = new URLSearchParams();
    params.append('id', data);
    return axios.post(concateUrl, params);
};

export const AddSchool = (data) => {
    const concateUrl = url + 'school/add-school';
    const params = new URLSearchParams();
    params.append('name', data.name);
    params.append('address_line_1', data.address_line_1);
    params.append('address_line_2', data.address_line_2);
    params.append('city', data.city);
    params.append('state', data.state);
    params.append('zip_code', data.zip_code);
    params.append('contact_name', data.contact_name);
    params.append('contact_email', data.contact_email);
    params.append('start_date', data.start_date);
    params.append('end_date', data.end_date);
    return axios.post(concateUrl, params);
};

export const UpdateSchool = (data) => {
    const concateUrl = url + 'school/update';
    const params = new URLSearchParams();
    params.append('name', data.name);
    params.append('address_line_1', data.address_line_1);
    params.append('address_line_2', data.address_line_2);
    params.append('city', data.city);
    params.append('state', data.state);
    params.append('zip_code', data.zip_code);
    params.append('contact_name', data.contact_name);
    params.append('contact_email', data.contact_email);
    params.append('start_date', data.start_date);
    params.append('end_date', data.end_date);
    params.append('_id', data._id);
    return axios.post(concateUrl, params);
};