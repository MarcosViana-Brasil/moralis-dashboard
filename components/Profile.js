import { useState } from 'react'
import { useMoralis } from 'react-moralis'
import { Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'

import CustomContainer from './CustomContainer'

export default function Profile({ user }) {
    const [inputUser, setInputUser] = useState('')
    const { setUserData, isUserUpdating } = useMoralis()

    return (
        <CustomContainer>
            <Text>
                <b>😎&nbsp;Username:&nbsp;</b>
                {user.getUsername()}
            </Text>
            <Text>
                <b>💵&nbsp;Wallet Address:&nbsp;</b>
                {user.get('ethAddress').slice(0, 10)}...
                {user.get('ethAddress').slice(32)}
            </Text>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    if (inputUser.trim() !== '') {
                        setUserData({ username: inputUser }).then(() =>
                            setInputUser('')
                        )
                    }
                }}
            >
                <FormControl mt="6" mb="6">
                    <FormLabel htmlFor="username">Set a new username</FormLabel>
                    <Input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="type your user..."
                        value={inputUser}
                        onChange={(e) => setInputUser(e.target.value)}
                    />
                </FormControl>
                <Button
                    type="submit"
                    colorScheme="purple"
                    disabled={isUserUpdating}
                >
                    ✅&nbsp; Change username
                </Button>
            </form>
        </CustomContainer>
    )
}
