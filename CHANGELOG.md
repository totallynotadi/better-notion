### v1.1.3

- first release with setting up Github Actions
- Implement Basic Proxy Authentication.
   - proxy auth is required for institutional networks and apps wont work without explicitly providing credentials.
   - spawns a new `BrowserWindow` as a prompt with a webpage for user input.
- Remove 32-bit windows build for reducing installer size.