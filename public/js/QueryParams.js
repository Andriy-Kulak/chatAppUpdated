/**
 * Taken from https://gist.github.com/andrewjmead
 *
 * This allows user and chatroom information to be posted in the URI. The information is then used in app.js
 * for 'name' and 'room' variables that used to display the info
 */
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1].replace(/\+/g, ' '));
        }
    }
    
    return undefined;
}

