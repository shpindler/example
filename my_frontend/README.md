## Getting Started

First, install correct node version specified in .nvmrc file:
1) Install nvm (https://github.com/nvm-sh/nvm/blob/master/README.md#install--update-script).
2) `nvm install`
3) `nvm use`

Then, install dependencies:
```bash
yarn add .
```

Create file `.env` in this directory and specify environment variables from
`.env.example` there. For example:
```
# .env

BASE_URL=http://localhost:8080
```

To run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

To build for production:
```bash
bash build.sh
```

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).
