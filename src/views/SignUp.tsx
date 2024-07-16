import { FooterForm, SignUpForm } from "../components/components"
import { ROUTES } from "../enums/apiRoutes"
import { useNavigate } from "react-router-dom"




export const SignUp = (): JSX.Element => {


    const navigate = useNavigate()

    const onSubmit = () => {
        navigate(ROUTES.HOME)
    }

    return (
        <main className="sign-up-page">
            <h1 className="visually-hidden">Travel App</h1>
            <SignUpForm
                onSubmit={onSubmit}
            />
            <FooterForm
                text=" Already have an account?"
                link={ROUTES.LOGIN}
                dataTestId="auth-sign-in-link"
                className="sign-up-form__link"
                linkText="Sign In"
            />
        </main>
    )
}