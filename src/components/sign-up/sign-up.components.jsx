import React, { Component } from 'react';

import FormInput from '../form-input/form-input.component';

import CustomButton from '../custom-button/custom-button.components';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'; 

import './sign-up.styles.scss';

class SignUp extends Component {
    constructor() {
        super();

        this.state = {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state;

        if(password !== confirmPassword) {
            alert('Password don\'t match');
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, {displayName});
            this.setState({
                displayName: "",
                email: "",
                password: "",
                confirmPassword: ""
            });
        } catch(error) {
            console.erro(error);
        }

    }

    handleChange = event => {
        const {value, name} = event.target;

        this.setState({[name]: value});
    }

    render() {
        const {displayName, email, password, confirmPassword} = this.state;

        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have a account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput type="text" name="displayName" value={this.state.displayName} handleChange={this.handleChange} label="Display Name" required />
                    <FormInput type="email" name="email" value={this.state.email} handleChange={this.handleChange} label="Email" required />
                    <FormInput type="password" name="password" value={this.state.password} handleChange={this.handleChange} label="Password" required />
                    <FormInput type="password" name="confirmPassword" value={this.state.confirmPassword} handleChange={this.handleChange} label="Confirm Password" required />
                    <CustomButton type="submit" value="Submit Form"> Sign Up</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;
