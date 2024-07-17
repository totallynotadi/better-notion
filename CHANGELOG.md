### v1.1.6
- Fix issues from last version (v1.1.5) over js execution timeout.


### v1.1.5
- Fix UI issues from new updates to Notion website.
  - revised sidebar looked ugly.
  - removed unnecessary 'Upgrade Notion' subscription call to action button.
  - fixed draggle region breadking due to new UI.
  - misc UI changes

### v1.1.4
- Add code signing with self signed certificate
  - Not signing builds triggers windows defender which causes app startup to take >10 seconds.

### v1.1.3
- first release with setting up Github Actions
- Implement Basic Proxy Authentication.
   - proxy auth is required for institutional networks and apps wont work without explicitly providing credentials.
   - spawns a new `BrowserWindow` as a prompt with a webpage for user input.
- Remove 32-bit windows build for reducing installer size.