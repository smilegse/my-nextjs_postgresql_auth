import React from 'react';

import * as zod from "zod";

const userSchema = zod
    .object({
        userName: zod.string().min(1, 'User is required').max(100),
        email: zod.string().min(1, 'Email is required').email('Invalid email address'),
        password: zod
            .string()
            .min(1, "Password is required")
            .min(8, "Password must have than 8 characters long"),
        confirmPassword: zod.string().min(1, "Password confirmation is required"),
    })
    .refine((data) => data.password === data.confirmPassword,{
        path: ["confirmPassword"],
        message: "Confirm passwords do not match",
    });

const LoginForm = () => {
    return (
        <div>
            
        </div>
    );
};

export default LoginForm;

