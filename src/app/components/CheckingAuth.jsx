import { CircularProgress, Flex, Grid, Heading } from '@chakra-ui/react';

export const CheckingAuth = () => {
  return (
    <Grid placeContent={'center'} h="100vh">
      <Flex alignItems={'center'} direction={'column'}>
        <Heading size="xl" fontWeight="600" mb="6">
          Verificando sesión...
        </Heading>
        <CircularProgress isIndeterminate size="60px" color="blue.500" />
      </Flex>
    </Grid>
  );
};
