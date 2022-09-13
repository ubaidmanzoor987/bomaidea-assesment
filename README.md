# Getting Started

## Backend

In the project directory, go to backend folder

### `sudo docker-compose up`

Create .env file and copy content from example.env.txt to .env

Run:
### `npm run push`
### `npm run start`

## Front End

In the project directory, go to front end folder:

To launch frontend app

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

Builds the app for production to the `build` folder.\
### `npm run build`

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run format`

To format the files with prettier

### `Configuring prettier`

Prettier will be installed as dev dependecy but you have to ensure that you set your default formatter to be prettier
Update settings.json to format on Save with this key:
`"formatOnSave": true`
See this link for the configurations: [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
