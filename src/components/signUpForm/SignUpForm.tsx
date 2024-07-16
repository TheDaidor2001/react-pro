import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Button, Input } from "../components";
import { FormEvent, useState } from "react";

import { toast } from "react-toastify";
import { signupUser } from "../../features/features";

interface Props {
    onSubmit: () => void;
}

export const SignUpForm = ({ onSubmit }: Props): JSX.Element => {

    const [data, setData] = useState({ fullName: '', email: '', password: '' })
    const [errors, setErrors] = useState({ email: '', password: '', fullName: '', all: '' });
    const dispatch = useAppDispatch()
    const { loading } = useAppSelector((state) => state.users)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, fullName, password } = data

        if (!fullName || !email || !password) {
            setErrors({ ...errors, all: 'All fields are required' })
            return
        }

        if (password.length < 3 || password.length > 20) {
            setErrors({ ...errors, password: 'Password must bre between 3 and 20 characters' })
            return
        }

        const user = {
            fullName,
            email,
            password
        }

        const result = await dispatch(signupUser(user))

        if (signupUser.rejected.match(result)) {
            toast.error(result.payload, {
                className: 'notification',
                position: 'top-right'
            })
            return
        }
        setErrors({ email: '', password: '', fullName: '', all: '' })
        setData({ fullName: '', email: '', password: '' })
        onSubmit()
    }

    return (
        <form className="sign-up-form" autoComplete="off" onSubmit={handleSubmit}>
            <h2 className="sign-up-form__title">Sign Up</h2>
            <label className="input">
                <span className="input__heading">Full name</span>
                <Input
                    data_test_id="auth-full-name"
                    name="full-name"
                    type="text"
                    value={data.fullName}
                    onChange={(e) => setData({ ...data, fullName: e.target.value })}
                />
            </label>
            <label className="input">
                <span className="input__heading">Email</span>
                <Input
                    data_test_id="auth-email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                />
            </label>
            <label className="input">
                <span className="input__heading">Password</span>
                <Input
                    data_test_id="auth-password"
                    name="password"
                    type="password"
                    autocomplete="new-password"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    errors={errors}
                />
            </label>
            <Button
                data_test_id="auth-submit"
                className="button"
                type="button"
                btnType="submit"
                text={loading ? 'Loading...' : 'Sign Up'}
                to=""
                disabled={loading}
            />
        </form>
    );
}


