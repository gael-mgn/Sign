// setLoginCookie.js

function setLoginCookie(email, code) {
    const expirationDays = 7; // durée du cookie (modifie si besoin)
    const date = new Date();
    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));

    const expires = "expires=" + date.toUTCString();
    const cookieValue = JSON.stringify({ email: email, code: code });

    document.cookie = `loginData=${cookieValue}; ${expires}; path=/; SameSite=Lax`;
}
// checkLoginCookie.js

function getLoginCookie() {
    const name = "loginData=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(";");

    for (let c of cookies) {
        c = c.trim();
        if (c.indexOf(name) === 0) {
            return JSON.parse(c.substring(name.length, c.length));
        }
    }
    return null;
}


