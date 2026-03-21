import './Footer.css';

const name = import.meta.env.VITE_NAME as string;

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__copy">
          © {new Date().getFullYear()} <strong>{name}</strong>. All rights reserved.
        </span>
        <span className="footer__made">Built with care.</span>
      </div>
    </footer>
  );
}
