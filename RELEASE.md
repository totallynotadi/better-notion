### v1.1.4
- Add code signing with self signed certificate
  - Not signing builds triggers windows defender which causes app startup to take >10 seconds.

### v1.1.3
- Implement Basic Proxy Authentication.
  - proxy auth is required for institutional networks and apps wont work without explicitly providing credentials.
  - spawns a new `BrowserWindow` as a prompt with a webpage for user input.
- Faster startup from implementing login handler.
- Remove 32-bit windows build.