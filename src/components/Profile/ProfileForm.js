import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const history = useHistory();
  const [changed, setChanged] = useState(false);
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  // useEffect(() => {
  //   setTimeout(() => setChanged(false), 10 * 1000);
  // }, [changed]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAgX7XRieUBbGSrySg1ltJ4BkG4fQ0nMC4
    `,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
            password: newPasswordInputRef.current.value,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to change the password!");
      setChanged(true);
      // newPasswordInputRef.current.value = "";
      setTimeout(() => history.replace("/"), 2 * 1000);
    } catch (error) {
      setChanged(false);
      alert(error);
    }
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordInputRef} />
      </div>
      {changed && <p>Password changed successfully!</p>}
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
