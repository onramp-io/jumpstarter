import type { NextPage } from 'next';
import { Box, Button, Form, FormField, Heading, Text, TextInput } from 'grommet';
import { useState, useEffect } from 'react';
import { useAuth } from '@frontend/context/AuthProvider';
import { useRouter } from 'next/router';
import { Alert, AlertTitle } from '@mui/material';
import axios from '../../../axios/instance';

const Checkout: NextPage = () => {
    const initialState = {
        donation: 0,
        projectId: 1,
        firstName: '',
        lastName: '',
        cardNumber: '',
        expirationMonth: '',
        expirationYear: '',
        CVV: ''
    }

    const [state, setState] = useState(initialState);
    const [validForm, setValidForm] = useState(false);
    const [errorMessage, setError] = useState('');
    const { firstName } = useAuth();
    const router = useRouter();

    const checkout = async () => {
        if (validForm) {
            try {
                var userUrl = '/users/get'
                const user = await axios.get(userUrl);
                const body = {
                    userId: user.data.userData['id'],
                    projectId: router.query.projectId,
                    fundAmt: state.donation
                }
                const investmentUrl = '/investments';
                await axios.post(investmentUrl, body);
                router.push('/app/profile');
            } catch (error) {
                console.log(error);
                setError('Invalid form data');
            }
        } else {
            setError('Invalid form');
        }
    }

    useEffect(()=>{
        //make sure url is populated before pulling query params
        if(!router.isReady || !firstName) return;
    
    }, [router.isReady, firstName]); 

    return (
        <>
        <Box>
            {errorMessage !== '' && (
                <Alert severity="error">
                    <AlertTitle>{errorMessage}</AlertTitle>
                </Alert>
            )}
        </Box>
        
        <Box alignSelf="center" margin={{top: "xlarge", horizontal: "10rem"}} direction="row" gap="xlarge">
            <Box gridArea="form" pad="small">
                <Form
                    value={state}
                    validate="blur"
                    onValidate={(event) => {
                        if (event.valid) {
                            setValidForm(true);
                        }
                    }}
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
                            name="expirationMonth"
                            label="Expiration date" 
                            htmlFor="expirationMonth"
                            contentProps={{border: false}}
                            validate={(val) => {
                                val = state.expirationMonth;

                                if (Number(val) < 1 || Number(val) > 12) {
                                    return { message: "Invalid month", status: "error"}
                                }
                            }}
                        >
                        <FormField 
                            name="expirationYear"
                            htmlFor="expirationYear"
                            validate={(val) => {
                                val = state.expirationYear;

                                if (Number(val) < 2023) {
                                    return { message: "Card expired", status: "error"}
                                }
                            }}
                        >
                            <Box direction="row">
                                <TextInput 
                                    type="number"
                                    name="expirationMonth"
                                    placeholder="MM" 
                                    min="1"
                                    max="12"
                                    plain={true}
                                    onChange={(event) => setState({...state, expirationMonth: event.target.value})}
                                />
                                <Text alignSelf="center">/</Text>
                                <TextInput 
                                    type="number"
                                    name="expirationYear"
                                    placeholder="YYYY" 
                                    min="2023"
                                    plain={true}
                                    onChange={(event) => setState({...state, expirationYear: event.target.value})}
                                />
                            </Box>
                        </FormField>
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
                 <Button primary label="Checkout" margin={{bottom: "large"}} onClick={() => {checkout()}}/>
            </Box>
        </Box>
        </>
        
    )
}

export default Checkout;