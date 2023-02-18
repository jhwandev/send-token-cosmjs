import { useState } from "react";
import { ReactComponent as Airplane } from "assets/airplane.svg";
import i18n from "i18next";

function Header() {
  const [langBtnText, setLangBtnText] = useState<string | "">("KO");

  const changeLangage = () => {
    setLangBtnText(i18n.language.toUpperCase());
    const lang = i18n.language === "ko" ? "en" : "ko";
    i18n.changeLanguage(lang);
  };

  return (
    <div className="h-[15vh] text-white p-10">
      <div className="font-bold top-5 right-5 absolute text-sm float-right text-white">
        <button
          className="border p-1.5 rounded-lg active:bg-gray-500"
          onClick={changeLangage}
        >
          {langBtnText}
        </button>
      </div>
      <div className="mb-7 flex justify-center items-center font-bold text-3xl">
        <Airplane className="w-10" />
        &nbsp;Token Sender
      </div>
    </div>
  );
}

export default Header;
