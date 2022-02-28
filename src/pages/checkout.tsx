import type { NextPage } from 'next';
import { Box, Button, DateInput, Form, FormField, Heading, Text, TextInput } from 'grommet';
import { useState } from 'react';

const Checkout: NextPage = () => {
    const initialState = {
        donation: 0,
        firstName: '',
        lastName: '',
        cardNumber: '',
        expirationDate: '',
        CVV: ''
    }

    const [state, setState] = useState(initialState);

    return (
        <Box alignSelf="center" margin={{top: "xlarge", horizontal: "10rem"}} direction="row" gap="xlarge">
            <Box gridArea="form" pad="small">
                <Form
                    value={state}
                    validate="blur"
                >
                    <FormField 
                        name="amount"
                        htmlFor="amount"
                        label="Amount to donate"
                        validate={(val) => {
                            val = state.donation;

                            if (val === 0) {
                                return { message: "Donation must be greated than $0", status: "error" }
                            }
                        }}
                    >
                        <Box direction="row">
                        <Text alignSelf="center">$</Text>
                        <TextInput 
                            name="amount"
                            type="number"
                            plain={true}
                            value={state.donation}
                            onChange={(event) => setState({...state, donation: Number(event.target.value)})}
                        />
                        </Box>
                    </FormField>
                        
                    <Box direction="row" justify="between" gap="medium">
                        <FormField 
                            name="firstName"
                            htmlFor="firstName"
                            label="First name" 
                            width="medium"
                            required
                        >
                            <TextInput
                                name="firstName"
                                onChange={(event) => setState({...state, firstName: event.target.value})}
                            />
                        </FormField>

                        <FormField 
                            name="lastName"
                            htmlFor="lastName"
                            label="Last name" 
                            width="medium"
                            required
                        >
                            <TextInput
                                name="lastName"
                                onChange={(event) => setState({...state, lastName: event.target.value})}
                            />
                        </FormField>

                    </Box>

                    <FormField
                        name="cardNumber"
                        htmlFor="cardNumber"
                        label="Card number"
                        validate={(val) => {
                            val = state.cardNumber;

                            if (val.length != 16) {
                                return { message: "Invalid card number", status: "error" }
                            }
                        }}
                        required
                    >
                        <TextInput
                            type="number"
                            name="cardNumber"
                            onChange={(event) => setState({...state, cardNumber: event.target.value})}
                        />
                    </FormField>

                    <Box direction="row" justify="between" gap="medium">
                        <FormField 
                            name="expirationDate"
                            htmlFor="expirationDate"
                            label="Expiration date" 
                            width="medium"
                        >
                            <DateInput
                                name="expirationDate"
                                format="mm/yyyy"
                                onChange={(event) => setState({...state, expirationDate: event.value.toString()})}
                            />
                        </FormField>

                        <FormField 
                            name="CVV"
                            htmlFor="CVV"
                            label="CVV" 
                            width="medium"
                            required
                            validate={(val) => {
                                val = state.CVV;

                                if (val.length != 3) {
                                    return { message: "Invalid CVV number", status: "error"}
                                }
                            }}
                        >
                            <TextInput
                                type="number"
                                name="CVV"
                                onChange={(event) => setState({...state, CVV: event.target.value})}
                            />
                        </FormField>
                    </Box>
                </Form>
            </Box>

            <Box alignSelf="center" align="center" justify="between" height="medium" margin={{left: "xlarge"}}>
                 <Heading margin={{top: "xlarge"}} level="2">You will pay</Heading>
                 <Heading>${state.donation.toLocaleString()}</Heading>
                 <Button primary label="Checkout" margin={{bottom: "large"}}/>
            </Box>
        </Box>
    )
}

export default Checkout;