import React, { useCallback, useEffect, useState } from "react"
import { ethers } from "ethers"

import { useQuery } from "@apollo/react-hooks"

import { Body, Button, Header, Image, Link } from "./components"
import { web3Modal, logoutOfWeb3Modal } from './utils/web3Modal'
import logo from "./ethereumLogo.png"

import { addresses, abis } from "./contracts/src"
import GET_TRANSFERS from "./graphql/subgraph"

async function testContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner(0)
  const counter = new ethers.Contract(addresses.counter, abis.counter, signer)
  counter.countUp()
  const count = await counter.getCount()
  console.log(count)
}

function WalletButton({ provider, loadWeb3Modal }: any) {
  return (
    <Button
      onClick={() => {
        if (!provider) {
          loadWeb3Modal()
        } else {
          logoutOfWeb3Modal()
        }
      }}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  )
}

function App() {
  const { loading, error, data } = useQuery(GET_TRANSFERS)
  const [provider, setProvider] = useState<any | any>()

  /* Open wallet selection modal. */
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect()
    setProvider(new ethers.providers.Web3Provider(newProvider))
  }, [])

  /* If user has loaded a wallet before, load it automatically. */
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal()
    }
  }, [loadWeb3Modal])

  React.useEffect(() => {
    if (!loading && !error && data && data.transfers) {
      console.log({ transfers: data.transfers })
    }
  }, [loading, error, data])

  return (
    <div>
      <Header>
        <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} />
      </Header>
      <Body>
        <Image src={logo} alt="react-logo" />
        <p>
          Edit <code>packages/react-app/src/App.tsx</code> and save to reload.
        </p>
        <Button onClick={() => testContract()}>
          Test your contract
        </Button>
        <Link
          href="https://ethereum.org/developers/#getting-started"
          style={{ marginTop: "8px" }}
        >
          Learn Ethereum
        </Link>
        <Link href="https://reactjs.org">Learn React</Link>
        <Link href="https://thegraph.com/docs/quick-start" >Learn The Graph</Link>
      </Body>
    </div>
  )
}

export default App
