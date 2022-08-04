import React, { useCallback, useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import SignInStyle from "./signIn.module.css";
import { userAuthorization } from "../../services/actions/route";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../services/auth";
import { setCookie } from "../../utils/utils";

function SignIn() {
  //console.log(state.route.userAuthorizationSuccess);
  //const location = useLocation();
  const state = useSelector((store) => store);
  //const stateLocation = location.state;
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const [valuePassword, setValuePassword] = useState("");
  const onChangePassword = (e) => {
    setValuePassword(e.target.value);
  };
  // const loginHandler = (evt) => {
  //   evt.preventDefault();
  //   auth.signIn(value, valuePassword);
  // };
  //console.log(stateLocation);
  const auth = useAuth();
  const loginHandler = useCallback(
    (e) => {
      e.preventDefault();
      auth.signIn(value, valuePassword);
      //console.log(auth)
    },
    [auth, value, valuePassword]
  );

  //console.log(auth.user);
  // if (auth.user.name!='') {
  //   return (
  //     <Redirect
  //       to={ stateLocation && stateLocation.from || '/' }
  //     />
  //   );
  // }
  //console.log(auth.user.name)
  if (auth.user.name) {
    return (
      <Redirect
        to={{
          pathname: "/profile",
        }}
      />
    );
  }
  // else if (state.route.userAuthorizationSuccess) {
  //   return (
  //     <Redirect
  //       to={{
  //         pathname: '/login'
  //       }}
  //     />
  //   );
  // }
  // else if (auth.user.name!='') {
  //   return (
  //     <Redirect
  //       to={{
  //         pathname: '/'
  //       }}
  //     />
  //   );
  // }
  return (
    <section className={SignInStyle.main}>
      <form className={SignInStyle.form} onSubmit={loginHandler}>
        <h1 className="pb-6 text text_type_main-medium">Вход</h1>
        <div className={`${SignInStyle.input} pb-6`}>
          <EmailInput name={"email"} value={value} onChange={onChange} />
        </div>
        <div className={`${SignInStyle.input} pb-6`}>
          <PasswordInput
            onChange={onChangePassword}
            value={valuePassword}
            name={"password"}
          />
        </div>
        <div className="pb-20 text">
          <Button>Войти</Button>
        </div>
        <div className={`pb-4 ${SignInStyle.wrap}`}>
          <p
            className={`text text_type_main-small text_color_inactive ${SignInStyle.text}`}
          >
            Вы — новый пользователь?
          </p>
          <Link
            to="/register"
            className={`text text_type_main-small ${SignInStyle.textLink}`}
          >
            Зарегистрироваться
          </Link>
        </div>
        <div className={SignInStyle.wrap}>
          <p
            className={`text text_type_main-small text_color_inactive ${SignInStyle.text}`}
          >
            Забыли пароль?
          </p>
          <Link
            to="/forgot-password"
            className={`text text_type_main-small ${SignInStyle.textLink}`}
          >
            Восстановить пароль
          </Link>
        </div>
      </form>
    </section>
  );
}

export default SignIn;