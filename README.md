# Space - mkv25

An experiment in creating a cross-platform application using [Electron JS](https://www.electronjs.org/docs/latest/tutorial/quick-start).

## Quick Start for Local Development

Run:
- `npm install`
- `npm start`

This should open up an electron window, running the application using `mainui` hosted from a local server. You should use this when making extensive edits to the user interface - although you may need to do hard restarts to clear any local caching.

## Test Local Distribution

Run:
- `npm run start:predist`

This is an intermediary step that, that will open an electron window, running the application based on a packaged distribution of the `mainui` project, sourced from `mainui/dist`. You should use this to test the application before packaging.

## Packaging

Run: 
- `npm run make`

Produces outputs releasable versions in `out/`.

Find a compatable build based on your local platform, and launch to test.

## TODO

- Introduce Font Awesome
- Replace default image assets
- Add Start, Game, and End screens
- Save, and Load screens

## Done

- Add current game context to Home and Universe pages
- Introduce concept of Save and Load
- Build a debug page that can be enabled from settings
- Allow developer console to be enabled from settings page
- Tidy up the UI and CSS
- Link persistent storage model to vuex store
- Build a persistent storage model
- Add a Settings page to the router
- Implement build automation, and document commands in README
- Set up basic Electron wrapper
- Set up basic Vue application with Routing
- Build a full page interactive application
- Configure Electron to work with the file based version of the compiled Vue application