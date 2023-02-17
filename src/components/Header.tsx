import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ReactComponent as Airplane } from "../assets/airplane.svg";

function Header() {
  const [btnActive, setBtnActive] = useState("");
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setBtnActive("nova");
        break;
      case "/sendNova":
        setBtnActive("nova");
        break;
      case "/sendAtom":
        setBtnActive("atom");
        break;
      default:
        break;
    }
  }, [location]);

  return (
    <div className="h-[25vh] text-white p-10">
      <div className="mb-7 flex justify-center items-center font-bold text-2xl">
        <Airplane className="w-10" />
        &nbsp;Token Sender
      </div>
      <div className="flex justify-center">
        <Link
          to="/sendNova"
          className={
            "min-w-[100px] text-center hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 py-4 text-white rounded font-bold " +
            ("nova" === btnActive ? "bg-blue-500 rounded" : "")
          }
        >
          NOVA
        </Link>
        <div className="w-3"></div>
        <Link
          to="/sendAtom"
          className={
            "min-w-[100px] text-center hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 py-4 text-white rounded font-bold " +
            ("atom" === btnActive ? "bg-violet-500 rounded" : "")
          }
        >
          ATOM
        </Link>
      </div>
    </div>
  );
}

export default Header;
