import React, {useState} from 'react'
import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { API } from '../../service/api';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    margin-top: 2rem;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
    border-radius: 16px
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

// const Error = styled(Typography)`
//     font-size: 10px;
//     color: #ff6161;
//     line-height: 0;
//     margin-top: 10px;
//     font-weight: 600;
// `z

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: ''
}


const Login = () => {
    const [account, toggleAccount] = useState('login')
    const [signup,setSignup] = useState(signupInitialValues)
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    const toggleSignup=()=>{
       account==='login' ? toggleAccount('signup') : toggleAccount('login')
    }

    const onInputChange = (e) =>{
        setSignup({...signup,[e.target.name]:e.target.value})
        console.log({...signup,[e.target.name]:e.target.value})
    }

    const signupUser = async() =>{
       let response = await API.userSignup(signup)
    }
  return (
    <Component>
    <Box>
    
        <Image src={imageURL} alt="blog" />
        {account==='login' ? 
        <Wrapper>
                    <TextField variant="standard" name='username' label='Enter Username' />
                    <TextField variant="standard" name='password' label='Enter Password' />

                    {/* {error && <Error>{error}</Error>} */}

                    <LoginButton variant="contained" >Login</LoginButton>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <SignupButton style={{ marginBottom: 20 }} onClick={toggleSignup}>Create an account</SignupButton>
                </Wrapper>
                :
                <Wrapper>
                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='name' label='Enter Name' />
                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label='Enter Username' />
                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />

                    <SignupButton onClick={signupUser} >Signup</SignupButton>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <LoginButton variant="contained" onClick={toggleSignup}>Already have an account? Sign In</LoginButton>
                </Wrapper>
                }
               
        
    </Box>
</Component>
  )
}

export default Login
