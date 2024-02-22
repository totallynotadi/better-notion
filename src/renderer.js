function handOnSubmit(submitEvent) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    window.electronAPI.gotCreds(username, password);
}
