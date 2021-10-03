import { IconGithub } from './icons';
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer">
      <a href="/" className="footer__ankor">
        <IconGithub className="footer__ankor-big" />
      </a>
    </div>
  );
}
