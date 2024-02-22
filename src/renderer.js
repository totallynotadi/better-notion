window.electronAPI.onProxyAddress((hostname, port) => {
    console.log('got proxy details', hostname, port)
    const dialogMessage = document.querySelector('code');
    dialogMessage.innerText = `${hostname}:${port}`;
})

function handOnSubmit(submitEvent) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    window.electronAPI.gotCreds(username, password);
}
