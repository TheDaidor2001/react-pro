
import './button.css'
import { Link } from "react-router-dom"

interface Props {
    data_test_id?: string;
    className?: string;
    to: string;
    text: string;
    type: string;
    onClick?: () => void;
    btnType?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
}

export const Button = ({ className, data_test_id, to, text, type, onClick, btnType, disabled }: Props): JSX.Element => {
    return (
        <>
            {
                type === "button"
                    ? <button data-test-id={data_test_id} className={className} onClick={onClick} type={btnType} disabled={disabled}>{text}</button>
                    : <Link data-test-id={data_test_id} to={to} className={className}>
                        {text}
                    </Link>
            }

        </>
    )
}
