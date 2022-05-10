import { Box } from '@chakra-ui/react'

export default function CustomContainer({ children }) {
    return (
        <Box
            bg="white"
            width="full"
            height="full"
            px="20"
            pv="10"
            rounded="lg"
            shadow="lg"
            textAlign="left"
            pt="6"
            pb="6"
        >
            {children}
        </Box>
    )
}
