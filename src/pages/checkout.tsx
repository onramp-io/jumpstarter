import type { NextPage } from 'next';
import { Box, Button, Form, FormField, Heading, TextInput } from 'grommet';

const Checkout: NextPage = () => {
    return (
        <Box alignSelf="center" margin={{top: "xlarge", horizontal: "10rem"}} direction="row" gap="xlarge">
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

            <Box alignSelf="center" align="center" justify="between" height="medium" margin={{left: "xlarge"}}>
                 <Heading margin={{top: "xlarge"}} level="2">You will pay</Heading>
                 <Heading>$0</Heading>
                 <Button primary label="Checkout" margin={{bottom: "large"}}/>
            </Box>
        </Box>
    )
}

export default Checkout;