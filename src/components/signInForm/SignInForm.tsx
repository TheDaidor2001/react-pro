import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { Button, Input } from "../components"
import { useState } from "react"
import { toast } from "react-toastify";
import { signinUser } from '../../features/features';


interface Props {
    onSubmit: () => void
}

export const SignInForm = ({ onSubmit }: Props): JSX.Element => {

    const [data, setData] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({ email: '', password: '', all: '' });

    const dispatch = useAppDispatch()
    const { loading } = useAppSelector((state) => state.users)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const { email, password } = data

        if (!email || !password) {
            setErrors({ ...errors, all: 'All fields are required' })
            return
        }

        if (password.length < 3 || password.length > 20) {
            setErrors({ ...errors, password: 'Password must be between 3 and 20 characters' })
            return
        }

        const result = await dispatch(signinUser(data));

        if (signinUser.rejected.match(result)) {
            toast.error(result.payload, {
                className: 'notification',
                position: 'top-right'
            })
            return
        }

        setErrors({ email: '', password: '', all: '' })
        setData({ email: '', password: '' })
        onSubmit()

    }
    return (
        <>
            <form className="sign-in-form" autoComplete="off" onSubmit={handleSubmit}>
                <h2 className="sign-in-form__title">Sign In</h2>
                <label className="input">
                    <span className="input__heading">Email</span>
                    <Input
                        data_test_id="auth-email"
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={e => setData({ ...data, email: e.target.value })}
                    />
                </label>
                <label className="input">
                    <span className="input__heading">Password</span>
                    <Input
                        className="input-error"
                        data_test_id="auth-password"
                        name="password"
                        type="password"
                        autocomplete="new-password"
                        value={data.password}
                        onChange={e => setData({ ...data, password: e.target.value })}
                        errors={errors}
                    />
                </label>
                <Button
                    data_test_id="auth-submit"
                    className="button "
                    type="button"
                    text={loading ? 'Loading...' : 'Sign In'}
                    to=""
                    btnType="submit"
                    disabled={loading}
                />
            </form>
            {errors.all && <p className="input__error">{errors.all}</p>}
        </>
    )
}
