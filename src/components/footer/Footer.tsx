import './footer.css'
import footerImg from '../../assets/images/heart.svg'

export const Footer = (): JSX.Element => {
    return (
        <footer className="footer">
            <span className="footer__text">
                © 2024, from
                <a className="footer__link" href="https://binary-studio.com">
                    binary studio
                </a>
                with
                <img className="footer__icon" src={footerImg} alt="heart" />
            </span>
        </footer>
    );
}


