import React, { useEffect, useState } from "react";
import * as S from "./style";

const ShurikenGame = () => {
  const [animation, setAnimation] = useState(true);
  const [money, setMoney] = useState(
    () => JSON.parse(window.localStorage.getItem("money")) || 0
  );
  const [shurikenLevel, setShurikenLevel] = useState(
    () => JSON.parse(window.localStorage.getItem("shurikenLevel")) || 1
  );
  const [shurikenSpeed, setShurikenSpeed] = useState(
    () => JSON.parse(window.localStorage.getItem("shurikenSpeed")) || 4
  );

  const onClick = (e) => {
    if (animation === true) {
      setAnimation(false);
      setMoney(money + shurikenLevel * 2);
      const buttonInterval = setInterval(() => {
        setAnimation(true);
      }, shurikenSpeed * 1000);
      setTimeout(function () {
        clearTimeout(buttonInterval);
      }, shurikenSpeed * 1000);
    }
  };

  const levelUp = () => {
    setShurikenLevel(shurikenLevel + 1);
    setMoney(money - shurikenLevel * 20);
    setShurikenSpeed(shurikenSpeed - 0.25);
    console.log("도착함");
  };

  useEffect(() => {
    window.localStorage.setItem("money", JSON.stringify(money));
    window.localStorage.setItem("shurikenLevel", JSON.stringify(shurikenLevel));
    window.localStorage.setItem("shurikenSpeed", JSON.stringify(shurikenSpeed));
  }, [money, shurikenLevel, shurikenSpeed]);

  return (
    <S.MainWrapper>
      <h1>ShurikenGame</h1>
      <S.levelAndMoneyBox>
        <p>Shuriken Level : {shurikenLevel}</p>
        <p>money : {money}$</p>
      </S.levelAndMoneyBox>
      <S.Shuriken
        style={animation ? { animationName: "test" } : {}}
        shuriken
        shurikenSpeed={shurikenSpeed}
      />
      <S.ButtonContainer>
        <button
          onClick={onClick}
          style={
            animation === false
              ? { background: "#161C40", color: "#0FF2B2" }
              : { background: "#0FF2B2", color: "#161C40" }
          }
        >
          {animation === true ? "Throw" : "Returning..."}
        </button>
      </S.ButtonContainer>
      <S.UpgradeWrapper>
        <S.UpgradeContainer>
          <div>Upgrade</div>
          <p>
            표창을 업그레이드 합니다. 표창을 업그레이드 하면 돈이{" "}
            {shurikenLevel * 2 + 2}$로 올라갑니다.
          </p>
          <h2>비용 : {shurikenLevel * 20}$</h2>
          <button
            onClick={money >= shurikenLevel * 20 ? levelUp : {}}
            style={
              money >= shurikenLevel * 20
                ? { background: "#0FF2B2", color: "#161C40" }
                : { background: "#161C40", color: "#0FF2B2" }
            }
          >
            {money >= shurikenLevel * 20 ? "업그레이드" : "돈이 부족합니다"}
          </button>
        </S.UpgradeContainer>
      </S.UpgradeWrapper>
    </S.MainWrapper>
  );
};

export default ShurikenGame;
