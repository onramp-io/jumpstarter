import type { NextPage } from 'next';
import { Box, Button, Form, FormField, Grid, Heading, TextInput } from 'grommet';

const Checkout: NextPage = () => {
    return (
        <Box alignSelf="center" margin="xlarge" direction="row" gap="large">
            <Box gridArea="form" pad="small">
                <Form>
                    <FormField label="Amount to donate">
                        <TextInput/>
                    </FormField>
                        
                    <Box direction="row" justify="between" gap="medium">
                        <FormField label="First name" width="medium">
                            <TextInput/>
                        </FormField>

                        <FormField label="Last name" width="medium">
                            <TextInput/>
                        </FormField>

                    </Box>

                    <FormField label="Card number">
                        <TextInput/>
                    </FormField>

                    <Box direction="row" justify="between" gap="medium">
                        <FormField label="Expiration date" width="medium">
                            <TextInput/>
                        </FormField>

                        <FormField label="CVV" width="medium">
                            <TextInput/>
                        </FormField>
                    </Box>
                </Form>
            </Box>

            <Box gridArea="information">
                 <Heading>You will pay</Heading>
            </Box>
        </Box>
    )
}

export default Checkout;