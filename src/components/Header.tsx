import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ReactComponent as Airplane } from "../assets/airplane.svg";

function Header() {
  const [btnActive, setBtnActive] = useState("");
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/basic":
        setBtnActive("1");
        break;
      case "/advanced":
        setBtnActive("2");
        break;
      default:
        break;
    }
  }, [location]);

  return (
    <div className="h-[25vh] text-white p-16">
      <div className="mb-10 flex justify-center font-bold text-4xl">
        <Airplane className="w-10" />
        &nbsp; Token Sender
      </div>
      <div className="flex justify-center">
        <Link
          to="/basic"
          className={
            "min-w-[100px] text-center hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 mr-3 py-5 px-3 text-white rounded font-bold " +
            ("1" === btnActive ? "bg-blue-500 rounded" : "")
          }
        >
          Basic
        </Link>
        <Link
          to="/advanced"
          className={
            "min-w-[100px] text-center hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 mr-3 py-5 px-3 text-white rounded font-bold " +
            ("2" === btnActive ? "bg-blue-500 rounded" : "")
          }
        >
          Advanced
        </Link>
      </div>
    </div>
  );
}

export default Header;
