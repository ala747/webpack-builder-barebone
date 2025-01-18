# Webpack Builder Barebone

This is a barebone codebase using Webpack 5, Babel 7, Eslint 9, Stylelint 16, Autoprefixer 10, SASS 1, Less 4, Express 4 and Vue 2.

Includes both dev server (Express based, includes hot reload, friendly errors, linting and optional HTTPS) and build system. (For development, staging and production evironments.)

## Requirements
* Node >= 23.6.0
* NPM >= 10.9.2

## Available scripts

`npm run dev`
> Starts the dev server and auto open in browser.

`npm run build <env>`
> Builds the code pack in `dist` directory for release. Available `<env>` values: `dev`, `staging` or `prod`.

`npm run lint:js`
> Runs Eslint along all JS and Vue files in the project.

`npm run lint:js:fix`
> Runs Eslint along all JS and Vue files in the project and fix all autofixable stuff.

`npm run lint:css`
> Runs Stylelint along all CSS, SCSS and Vue files in the project.

`npm run lint:css:fix`
> Runs Stylelint along all CSS, SCSS and Vue files in the project and fix all autofixable stuff.

## Considerations

Configs for both dev server and builds can be specified using specific `.env` file or JS module (into `config` directory) for each one. All defined stuff in config will be injected into served or built project into `process.env` ready to be used.

### Config Precedence for Dev Server

`.env.local`

`.env`

`config/local.env.js`

### Config Precedence for Builder

`.env`

`config/<env>.env.js` (one of `dev`, `staging` or `prod`)

### Dev Server Specific Stuff
#### Into the Config File

`LOCAL_DOMAIN` (default: `localhost`)
> Domain to be used to serve the project.

`PORT` (default: `3060`)
> Port to be used to serve the project.

#### HTTPS Support
You may create both self signed SSL Certificate and Key for your local dev server using some tool like `mkcert`.

The dev server will look for both files in the root directory assuming the names will meet the following convention: `<LOCAL_DOMAIN (default or defined in config file)>-key.pem` for the Key and `<LOCAL_DOMAIN (default or defined in config file)>.pem` for the Certificate. (For example: `barebone.test-key.pem` and `barebone.test.pem` or `localhost-key.pem` and `localhost.pem`.)

If the search doesn't find both files or the names don't meet the expected convention the dev server will start in plain HTTP.

## VSCode Dev Help
If you are using VSCode and for your convenience while developing it's recommended to install both Eslint (dbaeumer.vscode-eslint) and Stylelint (stylelint.vscode-stylelint) extensions to be informed of code problems in real time, this codebase comes with specific config for them that not only informs but fix all autofixable problems on file save. All these configs may be changed into `.vscode/settings.json` file.

## Disclaimer
This barebone codebase was made for and meets my own personal coding needs and it's not in its scope to cover others' needs. However, if you have suggestions to make it better (at least as per your own consideration) you may want to share them on Issues to be considered and, of course, you can always fork it and make it meet your needs without any notice.

For all the above I'm not providing support for specific doubts, questions or problems you may encounter while using this codebase.

Be happy! 😊

