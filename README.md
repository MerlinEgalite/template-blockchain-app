This project is based on [Create Eth App](https://github.com/paulrberg/create-eth-app) and this article [The New Solidity Dev Stack: Buidler + Ethers + Waffle + Typescript](https://medium.com/@rahulsethuram/the-new-solidity-dev-stack-buidler-ethers-waffle-typescript-tutorial-f07917de48ae).
It's in Typescript for better maintainability in the long run.
It's a template for a complete Typescript React App running Smart contracts.

## Tech Stack

- Buidler
- Waffle
- Ethers
- Typescript
- GraphQL
- React

## Project Structure

The default template is a monorepo created with [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).

Workspaces makes it possible to setup multiple packages in such a way that we only need to run `yarn install` once to install all of them in
a single pass. Dependencies are hoisted at the root.

```
template-blockchain-app
|──.env
├── README.md
├── node_modules
├── package.json
├── .gitignore
└── packages
    ├── buidler
    │   ├── buidler.config.ts
    │   ├── cache
    │   ├── contracts
    │   │   ├── Counter.sol
    │   │   └── Invest.sol
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── scripts
    │   │   └── deploy.ts
    │   ├── test
    │   │   └── counter.ts
    │   ├── tsconfig.json
    │   └── typechain
    │       └── index.d.ts
    ├── react-app
    │   ├── README.md
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── public
    │   │   ├── favicon.ico
    │   │   ├── index.html
    │   │   ├── logo192.png
    │   │   ├── logo512.png
    │   │   ├── manifest.json
    │   │   └── robots.txt
    │   ├── scripts
    │   │   └── ipfs.ts
    │   ├── src
    │   │   ├── App.test.js
    │   │   ├── App.tsx
    │   │   ├── components
    │   │   │   └── index.ts
    │   │   ├── contracts
    │   │   │   ├── README.md
    │   │   │   ├── package.json
    │   │   │   └── src
    │   │   │       ├── abis
    │   │   │       │   ├── erc20.json
    │   │   │       │   └── ownable.json
    │   │   │       ├── abis.ts
    │   │   │       ├── addresses.ts
    │   │   │       ├── artifacts
    │   │   │       │   ├── Counter.json
    │   │   │       │   ├── Invest.json
    │   │   │       │   └── console.json
    │   │   │       └── index.ts
    │   │   ├── ethereumLogo.png
    │   │   ├── graphql
    │   │   │   └── subgraph.ts
    │   │   ├── index.css
    │   │   ├── index.tsx
    │   │   ├── react-app-env.d.ts
    │   │   ├── setupTests.js
    │   │   ├── tsconfig.json
    │   │   └── utils
    │   │       └── web3Modal.ts
    │   └── tsconfig.json
    └── subgraph
        ├── README.md
        ├── abis
        │   └── erc20.json
        ├── package.json
        ├── schema.graphql
        ├── src
        │   └── mappings
        │       ├── tokens.ts
        │       └── transfers.ts
        └── subgraph.yaml
```

Owing to this dependency on Yarn Workspaces, Create Eth App can't be used with npm.

## Available Scripts and steps to run the project

### Builder

In the ```buidler``` directory you can write your Smart Contracts in Solidty.
I use Infura to deploy the contracts.

So first in a ```.env``` file you can set your INFURA_ID, INFURA_API_KEY (you get from Infura) and your ROPSTEN_PRIVATE_KEY (which is the secret key of wallet account - never disclose it!!). Use Metamask for simplicity.
When your have written your smart contracts you can deploy them by running:

```npx buidler run scripts/deploy.ts --network ropsten```

You can verify their adress by running:
```npx buidler verify-contract --contract-name theNameOfYourContract --address```

Now, you have deployed your contracts on Infura's network. In the ```react-app folder/contracts/src```, it should have created a ```artifacts``` folder, it doesn't exist already. That's where we will get the contract's abi to use in our React App.
So you just have to copy the adresses of you smart contracts in the ```adresses.ts``` file and update ```abis.ts``` file with the right abis.

Now all is set, you can go to the next step!!

### React App

#### `yarn react-app:start`

Runs the React app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

#### `yarn react-app:test`

Runs the React test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

[Read more about testing React.](https://facebook.github.io/create-react-app/docs/running-tests)

#### `yarn react-app:build`

Builds the React app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the React documentation on [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn react-app:eject`

**Note: this is a one-way operation. Once you `react-app:eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` the React app at any time. This command will
remove the single build dependency from your React package.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right
into the `react-app` package so you have full control over them. All of the commands except `react-app:eject` will still work,
but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `react-app:eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Subgraph

The Graph is a tool for for indexing events emitted on the Ethereum blockchain. It provides you with an easy-to-use GraphQL API. <br/>

To learn more, check out the [The Graph documentation](https://thegraph.com/docs).

#### `yarn subgraph:codegen`

Generates AssemblyScript types for smart contract ABIs and the subgraph schema.

#### `yarn subgraph:build`

Compiles the subgraph to WebAssembly.

#### `yarn subgraph:auth`

Before deploying your subgraph, you need to sign up on the
[Graph Explorer](https://thegraph.com/explorer/). There, you will be given an access token. Drop it in the command
below:

```sh
GRAPH_ACCESS_TOKEN=your-access-token-here yarn subgraph:auth
```

#### `yarn subgraph:deploy`

Deploys the subgraph to the official Graph Node.<br/>

Replace `paulrberg/create-eth-app` in the package.json script with your subgraph's name.

You may also want to [read more about the hosted service](https://thegraph.com/docs/quick-start#hosted-service).
# template-blockchain-app
