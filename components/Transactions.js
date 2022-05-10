/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useMoralisWeb3Api } from 'react-moralis'
import { Link, Text, Divider } from '@chakra-ui/react'

import CustomContainer from './CustomContainer'

export default function Transactions({ user }) {
    const [transactions, setTransactions] = useState([])
    const Web3Api = useMoralisWeb3Api()

    const BASE_URL = 'https://rinkeby.etherscan.io/tx/'

    const fetchTransactions = async () => {
        const data = await Web3Api.account.getTransactions({
            chain: 'rinkeby',
            address: user.get('ethAddress'),
            limit: 5,
        })
        if (data) {
            setTransactions(data.result)
        } else {
            return
        }
    }

    useEffect(() => {
        fetchTransactions()
    }, [])

    // console.log(transactions)

    return (
        <div>
            <CustomContainer>
                <Text fontSize="xl" fontWeight="bold" mb="6">
                    My last 5 transactions
                </Text>
                {transactions &&
                    transactions.map((transaction) => (
                        <div key={transaction.hash}>
                            <Link
                                href={`${BASE_URL}${transaction.hash}`}
                                isExternal
                            >
                                ✔&nbsp;{transaction.hash}
                            </Link>
                            <Divider />
                        </div>
                    ))}
            </CustomContainer>
        </div>
    )
}
