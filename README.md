# React Boilerplate

## Usage

```sh
git clone https://github.com/kurosame/react-boilerplate.git
yarn install
```

## Tasks

```sh
yarn start            # Run webpack-dev-server
yarn start:mock       # Run mock
yarn start:server     # Run server
yarn build            # Build for development
yarn build:production # Build for production
yarn test             # Unit test (jest + enzyme)
yarn test:ci          # Unit test for CI
yarn e2e              # E2E test (jest + puppeteer)
yarn e2e:ci           # E2E test for CI
yarn clean:cache      # Clear cache of webpack
yarn clean:dist       # Clear dist directory
```

## Mock

Mock server is start at port 3000 when the `yarn start`\
You can check the redux-saga sample\
Also, you can edit fixtures/mock.json\
using https://github.com/typicode/json-server

## License

MIT
