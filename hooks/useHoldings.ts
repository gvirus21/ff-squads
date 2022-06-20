import { Interface } from '@ethersproject/abi'
import { Contract, utils } from 'ethers'
import { useEffect, useState } from 'react'
import { Community } from 'types'
import { useAccount, useSigner } from 'wagmi'

import ERC20ABI from 'abis/erc20.json'
import MulticallABI from 'abis/multicall2.json'

type CommunityTokenHoldings = {
  communityId: string
  tokenHoldings: number
}

export const useAllCommunityTokenHoldings = (communities: Community[] | undefined) => {
  const { data: account } = useAccount()
  const { data: signer } = useSigner()
  const [holdings, setHoldings] = useState<CommunityTokenHoldings[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const multicallContractSingleData = async (
      addresses: string[],
      contractInterface: Interface,
      methodName: string,
      methodArgs: any
    ) => {
      const multicallContract = new Contract(
        '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
        MulticallABI,
        signer?.provider
      )
      const fragment = contractInterface.getFunction(methodName)
      const results = await multicallContract.callStatic.tryBlockAndAggregate(
        false,
        addresses.map((address) => ({
          target: address,
          callData: contractInterface.encodeFunctionData(fragment, methodArgs),
        }))
      )
      const data = results.returnData.map(({ success, returnData }: any) => {
        if (success && returnData) {
          try {
            return contractInterface.decodeFunctionResult(fragment, returnData)[0]
          } catch {
            return undefined
          }
        }
        return undefined
      })
      return data
    }

    const getHoldings = async (communities: Community[]) => {
      setIsLoading(true)
      const addresses = communities.map((community) => community.tokenInfo.contract)
      const ERC20Interface = new Interface(ERC20ABI)

      try {
        const [balances, decimals] = await Promise.all([
          multicallContractSingleData(addresses, ERC20Interface, 'balanceOf', [account?.address]),
          multicallContractSingleData(addresses, ERC20Interface, 'decimals', undefined),
        ])
        setHoldings(
          communities.map((community, i) => ({
            communityId: community.shortId,
            tokenHoldings: balances[i] && decimals[i] ? Number(utils.formatUnits(balances[i], decimals[i])) : 0,
          }))
        )
      } catch (err) {
        console.log(err)
      }
      setIsLoading(false)
    }
    if (account && communities && signer) {
      getHoldings(communities)
    }
  }, [account, communities])

  return { holdings, isLoading }
}

export const useCommunityTokenHolding = (community: Community | undefined) => {
  const { data: account } = useAccount()
  const { data: signer } = useSigner()
  const [holding, setHolding] = useState<CommunityTokenHoldings | undefined>(undefined)

  useEffect(() => {
    const getHolding = async (community: Community) => {
      const contract = new Contract(community.tokenInfo.contract, ERC20ABI, signer?.provider)
      let tokenHoldings = 0
      try {
        const [balance, decimals] = await Promise.all([contract.balanceOf(account?.address), contract.decimals()])
        if (balance && decimals) {
          tokenHoldings = Number(utils.formatUnits(balance, decimals))
        }
      } catch (err) {
        console.log(err)
      }
      setHolding({ communityId: community.shortId, tokenHoldings })
    }
    if (account && community && signer) {
      getHolding(community)
    }
  }, [account, community])

  return holding
}
