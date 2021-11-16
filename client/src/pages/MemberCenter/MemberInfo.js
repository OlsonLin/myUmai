import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import MemberService from "../../services/member.service";
import getValidMessage from "../../validMessage/validMessage";
import Button from "../../components/Button";
import CreditCards from "../../components/CreditCards";
import Calendar from "../../components/Calendar";
import ErrorMessage from "../../components/ErrorMessage";
import moment from "moment";

const MemberInfo = (props) => {
  const { currentUser, setCurrentUser } = props;

  // 錯誤訊息
  const [errorMsg, setErrorMsg] = useState("");

  // 使用者基本資料
  const [memberInfo, setMemberInfo] = useState({
    last_name: "",
    first_name: "",
    telephone: "",
    birthday: "",
  });

  // 密碼修改資料
  const [passwordInfo, setPasswordInfo] = useState({
    passwordConfirm: "",
    newPassword: "",
  });

  // 信用卡資料
  const [creditCardsInfo, setCreditCardsInfo] = useState({
    cvc: "",
    expiry: "",
    name: "",
    number: "5377000000000000",
  });

  // 當currentUser的值存在後，更新資料
  let [defaultDate, setDefaultDate] = useState("");
  useEffect(() => {
    if (currentUser) {
      // 先將日期格式轉換成 YYYY-MM-DD
      let parseBirth = new Date(currentUser.birthday)
        .toLocaleDateString()
        .split("/")
        .join("-");
      setDefaultDate(parseBirth);

      // 更新state
      setMemberInfo({
        last_name: currentUser.last_name || "",
        first_name: currentUser.first_name || "",
        telephone: currentUser.telephone || "",
        birthday: parseBirth || "",
      });

      setCreditCardsInfo({
        cvc: "",
        expiry: "",
        name: currentUser.credit_card_name || "",
        number: currentUser.credit_card_number || "5377000000000000",
      });
    }
  }, [currentUser]);

  // 即時抓取基本資料填寫
  const handleMemberInfoChange = (e) => {
    setMemberInfo({ ...memberInfo, [e.target.name]: e.target.value });
  };

  // 個資修改
  const handleInfoEdit = async () => {
    try {
      let result = await MemberService.infoEdit(memberInfo);

      // 更新成功後，更新當前使用者資料
      let newUser = await AuthService.memberInfo(currentUser.id);
      // 存入local
      localStorage.setItem("user", JSON.stringify(newUser.data.member));
      // 裝入state
      setCurrentUser(AuthService.getCurrentUser());

      // 清空錯誤訊息
      setErrorMsg("");

      window.alert("更新成功！");
    } catch (error) {
      //console.log(error.response);
      let { code } = error.response.data;
      setErrorMsg(getValidMessage("member", code));
    }
  };
  // 生日修改
  const handleBirthdayChange = (day) => {
    setMemberInfo({ ...memberInfo, birthday: day });
  };

  // 付款資訊修改
  const handlePaymentEdit = () => {
    console.log("handlePatmentEdit");
    console.log(creditCardsInfo);
  };

  // 密碼修改容器開關
  const [passwordConOpen, setPasswordConOpen] = useState(false);
  const handlePasswordConOpen = () => {
    passwordConOpen ? setPasswordConOpen(false) : setPasswordConOpen(true);
    setPasswordInfo({
      passwordConfirm: "",
      newPassword: "",
    });
  };

  // 即時抓取密碼填寫
  const handlePasswordChange = (e) => {
    setPasswordInfo({ ...passwordInfo, [e.target.name]: e.target.value });
  };

  // 送出密碼修改
  const handlePasswordEdit = () => {
    console.log(passwordInfo);
  };

  return (
    <div className="MemberInfo">
      <div className="MemberInfo-container">
        <header className="MemberInfo-container-header">
          <h2>會員資訊</h2>
        </header>
        <div className="MemberInfo-container-cards">
          <div className="MemberInfo-container-row">
            <div className="MemberInfo-container-inputCon">
              <label
                className="MemberInfo-container-inputCon-label"
                htmlFor="first-name"
              >
                名字
              </label>
              <input
                type="text"
                name="first_name"
                id="first-name"
                className="MemberInfo-container-inputCon-input"
                value={memberInfo.first_name}
                onChange={handleMemberInfoChange}
              />
            </div>
            <div className="MemberInfo-container-inputCon">
              <label
                className="MemberInfo-container-inputCon-label"
                htmlFor="last-name"
              >
                姓氏
              </label>
              <input
                type="text"
                name="last_name"
                id="last-name"
                className="MemberInfo-container-inputCon-input"
                value={memberInfo.last_name}
                onChange={handleMemberInfoChange}
              />
            </div>
          </div>
          <div className="MemberInfo-container-row">
            <div className="MemberInfo-container-inputCon">
              <label
                className="MemberInfo-container-inputCon-label"
                htmlFor="tele"
              >
                聯絡電話
              </label>
              <input
                type="tele"
                name="telephone"
                id="tele"
                className="MemberInfo-container-inputCon-input"
                value={memberInfo.telephone}
                onChange={handleMemberInfoChange}
              />
            </div>
            <div className="MemberInfo-container-inputCon">
              <label
                className="MemberInfo-container-inputCon-label"
                htmlFor="birth"
              >
                出生日期
              </label>

              {/* <input
                type="date"
                name="birthday"
                id="birth"
                className="MemberInfo-container-inputCon-input"
                value={memberInfo.birthday}
                onChange={handleMemberInfoChange}
              /> */}
              <Calendar onChange={handleBirthdayChange} value={defaultDate} />
            </div>
          </div>
          {errorMsg && <ErrorMessage value={errorMsg} />}
          <div className="MemberInfo-container-row">
            <div
              className={`MemberInfo-container-inputCon MemberInfo-container-passwordCon ${
                passwordConOpen && "MemberInfo-container-passwordCon-active"
              }`}
            >
              <label
                className="MemberInfo-container-inputCon-label"
                htmlFor="password"
              >
                密碼修改
              </label>
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                value={passwordInfo.passwordConfirm}
                placeholder="舊密碼確認"
                className="MemberInfo-container-inputCon-input MemberInfo-container-passwordCon-topInput"
                onChange={handlePasswordChange}
              />
              <input
                type="password"
                name="newPassword"
                id="password"
                value={passwordInfo.newPassword}
                placeholder="輸入新密碼"
                className="MemberInfo-container-inputCon-input MemberInfo-container-passwordCon-bottomInput"
                onChange={handlePasswordChange}
              />
            </div>
            <div className="MemberInfo-container-inputCon-buttonCon">
              <button
                className="MemberInfo-container-inputCon-passwordEditBtn"
                onClick={handlePasswordConOpen}
              >
                {passwordConOpen ? "取消修改" : "修改密碼"}
              </button>
              <button
                className={`MemberInfo-container-inputCon-passwordSubmitBtn ${
                  passwordConOpen &&
                  "MemberInfo-container-inputCon-passwordSubmitBtn-active"
                }`}
                onClick={handlePasswordEdit}
              >
                確認修改
              </button>
            </div>
          </div>
          <div className="MemberInfo-container-buttonCon">
            <Button
              value={"確認修改"}
              className={"button-themeColor"}
              onClick={handleInfoEdit}
            />
          </div>
          <header className="MemberInfo-container-header">
            <h2>付款資訊</h2>
          </header>
          <CreditCards
            creditCardsInfo={creditCardsInfo}
            setCreditCardsInfo={setCreditCardsInfo}
          />

          <div className="MemberInfo-container-buttonCon">
            <Button
              value={"確認修改"}
              className={"button-themeColor"}
              onClick={handlePaymentEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;
