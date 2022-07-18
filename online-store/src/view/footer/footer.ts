import './footer.css';
import { createElement } from '../../helpers/functions';

class Footer {

  constructor() {

    const footer: HTMLDivElement = createElement(document.body, 'footer', 'footer');

    const githubContainer: HTMLDivElement = createElement(footer, 'github');
    
    const githubLink: HTMLAnchorElement = createElement(githubContainer, 'a', 'github__link');
    githubLink.href = "https://github.com/shevelevbv";
    githubLink.target = "_blank";

    const githubLogo: HTMLImageElement = createElement(githubLink, 'img', 'github__logo footer__logo');
    githubLogo.src = '../../img/github.svg';
    githubLogo.width = 30;
    githubLogo.height = 30;

    createElement(footer, 'p', 'copyright', '2022');

    const schoolContainer: HTMLDivElement = createElement(footer, 'div', 'rs-school');

    const schoolLink: HTMLAnchorElement = createElement(schoolContainer, 'a', 'github__link');
    schoolLink.href = 'https://rs.school/js';
    schoolLink.target = "_blank";

    const schoolLogo: HTMLImageElement = createElement(schoolLink, 'img', 'rs-school__logo footer__logo');
    schoolLogo.src = '../../img/rs_school_js.svg';
    schoolLogo.alt ="RS School Logo"
    schoolLogo.width = 70;
    schoolLogo.height = 26;

  }

}

export default Footer;