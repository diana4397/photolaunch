export const GetCookie = (cName) => {
    const name = `${cName}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
};

export const SetCookie = (cname, cvalue) => {
    const d = new Date();
    d.setTime(d.getTime() + (5 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const RemoveCookie = (cname) => {
    document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}