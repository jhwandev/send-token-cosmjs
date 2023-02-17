/* eslint-disable jsx-a11y/alt-text */
import git from "../assets/git.png";
function Footer() {
  return (
    <div className="flex items-center content-center justify-center text-white text-sm min-h-[5vh] ">
      <a className="flex" href="https://github.com/jhwandev/send-token-cosmjs">
        developed by jhwandev &nbsp;
        <img className="w-5" src={git} />
      </a>
    </div>
  );
}

export default Footer;
