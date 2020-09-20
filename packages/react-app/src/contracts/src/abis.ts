import erc20Abi from './abis/erc20.json'
import ownableAbi from './abis/ownable.json'
import Counter from './artifacts/Counter.json'

const abis = {
  erc20: erc20Abi,
  ownable: ownableAbi,
  counter: Counter.abi
}

export default abis
