/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Image, Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { useNFTBalances } from 'react-moralis'
import CustomContainer from './CustomContainer'

export default function NFTs({ user }) {
    const { getNFTBalances, data } = useNFTBalances()

    const BASE_URL = 'https://ipfs.moralis.io:2053/ipfs/'

    useEffect(() => {
        getNFTBalances({
            params: {
                chain: 'rinkeby',
                address: user.get('ethAddress'),
            },
        })
    }, [])

    console.log(data)

    return (
        <CustomContainer>
            <Text fontSize="xl" fontWeight="bold">
                My NFTs
            </Text>
            {data &&
                data.result.map((nft) => (
                    <Box
                        mt="4"
                        px="2"
                        py="2"
                        borderWidth="1px"
                        borderRadius="md"
                        display="flex"
                        flexDirection="row"
                        key={nft.token_uri}
                    >
                        {nft.image && (
                            <Image
                                src={nft.image}
                                alt="nftImage"
                                width="140px"
                                height="150px"
                            />
                        )}
                        <p>&nbsp;&nbsp;{nft.token_uri}</p>
                    </Box>
                ))}
        </CustomContainer>
    )
}
