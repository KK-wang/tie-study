import loginByStuID from "./login-way/loginByStuID";
import loginByPhone from "./login-way/loginByPhone";
import loginByWx from "./login-way/loginByWx";

export default function () {
  new loginByStuID();
  new loginByPhone();
  new loginByWx();
}
