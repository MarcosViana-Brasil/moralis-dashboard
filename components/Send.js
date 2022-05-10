import {
    Button,
    FormControl,
    FormLabel,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    useToast,
} from '@chakra-ui/react'
import Moralis from 'moralis'
import React, { useState } from 'react'
import { useWeb3Transfer } from 'react-moralis'

import CustomContainer from './CustomContainer'

export default function Send({ user }) {
    const [amount, setAmount] = useState(0)
    const [receiver, setReceiver] = useState('')

    const handleChange = (value) => setAmount(value)

    const toast = useToast()

    const { fetch, isFetching } = useWeb3Transfer({
        amount: Moralis.Units.ETH(amount),
        receiver: receiver,
        type: 'native',
    })

    return (
        <CustomContainer>
            <Text fontSize="xl" fontWeight="bold">
                Send <b>ETH</b>
            </Text>

            <form
                onSubmit={async (e) => {
                    e.preventDefault()
                    await Moralis.enableWeb3()
                    fetch({
                        onSuccess: () => {
                            toast({
                                title: 'ETH successfully sent',
                                description:
                                    'Fresh ETH are showing up into the receiver wallet',
                                status: 'success',
                                duration: 5000,
                                isClosable: true,
                            })
                            setReceiver('')
                        },
                        onError: (error) => {
                            toast({
                                title: 'Error',
                                description: error,
                                status: 'error',
                                duration: 5000,
                                isClosable: true,
                            })
                        },
                    })
                }}
            >
                <FormControl mt="4">
                    <FormLabel htmlFor="amount">Amount of ETH</FormLabel>
                    <NumberInput step={0.1} min={0} onChange={handleChange}>
                        <NumberInputField id="amount" value={amount} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <FormLabel htmlFor="receiver" mt="4">
                        Send to
                    </FormLabel>
                    <Input
                        id="receiver"
                        type="text"
                        placeholder="receiver address..."
                        value={receiver}
                        onChange={(e) => setReceiver(e.target.value)}
                    />
                </FormControl>
                <Button
                    type="submit"
                    colorScheme="purple"
                    mt="4"
                    disabled={isFetching}
                >
                    💸&nbsp;Send
                </Button>
            </form>
        </CustomContainer>
    )
}
