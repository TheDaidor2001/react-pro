import { Link } from "react-router-dom";

interface Props {
    text: string;
    link: string;
    dataTestId: string;
    className: string;
    linkText: string;
}

export const FooterForm = ({ text, link, dataTestId, className, linkText }: Props): JSX.Element => {
    return (
        <span>
            {text}
            <Link data-test-id={dataTestId} to={link} className={className}>{linkText}</Link>
        </span>
    )
}
