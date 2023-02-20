import React, { useState } from "react";
import { TICKER } from "utils/const";
import { useLocation, useNavigate } from "react-router-dom";

function NavButtons({ networks }: { networks: string[] }) {
  const location = useLocation();
  const navigate = useNavigate();
  // 현재 시점 네트워크 조회 - TODO : 사용해도 되는 방법인지 확인필요
  const nowNetwork = location.pathname.split("/")[2];
  const [networkBtnActive, setNetworkBtnActive] = useState<string | "">(
    TICKER[nowNetwork]
  );

  /**
   * 버튼 클릭시 네트워크 변경
   * @param token
   */
  const onClickNetworkButton = (token: string) => {
    // TODO : inputData 존재할 경우 경고창 띄우기
    navigate("/token/" + token);
    setNetworkBtnActive(token);
  };

  return (
    <>
      <div className="flex justify-center">
        {networks.map((networkName, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                onClickNetworkButton(networkName);
              }}
              className={
                "m-1.5 min-w-[100px] text-center hover:bg-nav active:bg-nav-light focus:outline-none focus:ring focus:ring-nav-light py-4 text-white rounded font-bold " +
                (networkName === networkBtnActive ? "bg-nav rounded" : "")
              }
            >
              {networkName.toUpperCase()}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default NavButtons;
