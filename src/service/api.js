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
    const { name, address_line_1, address_line_2, city, state, zip_code, contact_name, contact_email, start_date, end_date } = data;
    const concateUrl = url + 'school/add-school';
    const params = new URLSearchParams();
    params.append('name', name);
    params.append('address_line_1', address_line_1);
    params.append('address_line_2', address_line_2);
    params.append('city', city);
    params.append('state', state);
    params.append('zip_code', zip_code);
    params.append('contact_name', contact_name);
    params.append('contact_email', contact_email);
    params.append('start_date', start_date);
    params.append('end_date', end_date);
    return axios.post(concateUrl, params);
};

export const UpdateSchool = (data) => {
    const { name, address_line_1, address_line_2, city, state, zip_code, contact_name, contact_email, start_date, end_date, _id } = data;
    const concateUrl = url + 'school/update';
    const params = new URLSearchParams();
    params.append('name', name);
    params.append('address_line_1', address_line_1);
    params.append('address_line_2', address_line_2);
    params.append('city', city);
    params.append('state', state);
    params.append('zip_code', zip_code);
    params.append('contact_name', contact_name);
    params.append('contact_email', contact_email);
    params.append('start_date', start_date);
    params.append('end_date', end_date);
    params.append('_id', _id);
    return axios.post(concateUrl, params);
};

export const AdminLogin = (data) => {
    const { email, password } = data;
    const concateUrl = url + 'admin/login';
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);
    return axios.post(concateUrl, params);
};

export const RegisterUser = (data) => {
    const { thumb, firstName, lastName, address1, address2, state, city, zipCode, email, amount, tokenId, promoCode } = data;
    const concateUrl = url + 'user/register';
    const bodyFormData = new FormData();
    thumb.map((img) => {
        bodyFormData.append('images', img);
    })
    bodyFormData.append('first_name', firstName);
    bodyFormData.append('last_name', lastName);
    bodyFormData.append('address_line_1', address1);
    bodyFormData.append('address_line_2', address2);
    bodyFormData.append('state', state);
    bodyFormData.append('city', city);
    bodyFormData.append('zipcode', zipCode);
    bodyFormData.append('email', email);
    bodyFormData.append('amount', amount);
    if (tokenId) bodyFormData.append('token_id', tokenId);
    if (promoCode) bodyFormData.append('promo_code', promoCode);
    const headers = {
        "Content-Type": "multipart/form-data"
    };
    return axios.post(concateUrl, bodyFormData, headers)
}

export const PromoCodeGenerate = (data) => {
    const { email, schoolCode } = data;
    const concateUrl = url + 'user/login-via-code';
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('code', schoolCode);
    return axios.post(concateUrl, params);
}

export const UploadedImages = (page) => {
    const concateUrl = url + `user/all-uploaded-images?page=${page}`;
    return axios.get(concateUrl);
}