import Cookie from 'js-cookie';



const setCookie = (cookieName, cookieValue, daysToExpire) => {
    Cookie.set(cookieName, cookieValue, {
        expires: daysToExpire, // days
        path: '/'
    })
}

export default setCookie;