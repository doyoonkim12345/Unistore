import React, { useState } from "react";
import { LoginBox, LoginInputForm } from "../components/styles/authStyle";
import { authService } from "../fBase";

import { useTranslation } from "react-i18next";

function Auth() {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    let data;
    try {
      if (newAccount) {
        if (!(password === repassword)) {
          alert("비밀번호가 일치하지 않습니다!");
          return;
        }
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // eslint-disable-next-line no-unused-vars
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "repassword") {
      setRepassword(value);
    }
  };

  const onLostClick = (event) => {
    alert("kdyem0628@gmail.com로 문의주세요!");
  };
  /*const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }

    // eslint-disable-next-line no-unused-vars
    const data = await authService.signInWithPopup(provider);
  };*/

  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <LoginBox>
      <LoginInputForm onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder={t("email")}
          required
          value={email}
          onChange={onChange}
        ></input>
        <input
          name="password"
          type="password"
          placeholder={t("pswd")}
          required
          value={password}
          onChange={onChange}
        ></input>
        {newAccount && (
          <input
            name="repassword"
            type="password"
            placeholder={t("repswd")}
            required
            value={repassword}
            onChange={onChange}
          ></input>
        )}
        <button type="submit">{newAccount ? t("signup") : t("login")}</button>
      </LoginInputForm>
      <span onClick={toggleAccount}>
        {newAccount ? t("login") : t("signup")}
      </span>
      <br />
      {!newAccount && <span onClick={onLostClick}>아이디 비밀번호 찾기</span>}
      {error}
    </LoginBox>
  );
}
export default Auth;
