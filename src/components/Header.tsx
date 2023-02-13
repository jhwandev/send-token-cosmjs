import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ReactComponent as Airplane } from "../assets/airplane.svg";

function Header() {
  const [btnActive, setBtnActive] = useState("");
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/sendNova":
        setBtnActive("1");
        break;
      case "/sendNovaUX":
        setBtnActive("2");
        break;
      default:
        break;
    }
  }, [location]);

  return (
    <div className="min-h-[10vh] text-white p-10">
      <div className="mb-10 flex justify-center font-bold text-4xl ">
        <Airplane className="w-10" />
        &nbsp; Token Sender
      </div>
      <div className="flex justify-center">
        <Link
          to="/sendNova"
          className={
            "mr-3 py-5 px-3 text-white " +
            ("1" === btnActive ? "bg-blue-500" : "")
          }
        >
          Send-Nova
        </Link>
        <Link
          to="/sendNovaUX"
          className={
            "py-5 px-3 text-white " + ("2" === btnActive ? "bg-blue-500" : "")
          }
        >
          Send-Nova-UX
        </Link>
      </div>
    </div>
  );
}

export default Header;
