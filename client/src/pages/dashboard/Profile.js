import { useState } from "react";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import Loading from "../../components/Loading";

const Profile = () => {
  const {
    user,
    showAlert,
    displayAlert,
    updateUser,
    isLoading,
    updatePassword,
  } = useAppContext();

  const [alert, setAlert] = useState({
    isProfileAlert: false,
    isPasswordAlert: false,
  });

  const [userData, setUserData] = useState({
    name: user?.name,
    email: user?.email,
    lastName: user?.lastName,
    nickname: user?.nickname,
  });

  const initialChangePassword = {
    oldPassword: "",
    newPassword: "",
    reNewPassword: "",
  };
  const [changePassword, setChangePassword] = useState(initialChangePassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert({ ...alert, isProfileAlert: true, isPasswordAlert: false });
    if (
      !userData.name ||
      !userData.email ||
      !userData.lastName ||
      !userData.nickname
    ) {
      // test and remove temporary
      displayAlert("Please provide all values");
      return;
    }

    updateUser(userData);
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    setAlert({ ...alert, isProfileAlert: false, isPasswordAlert: true });
    if (
      !changePassword.oldPassword ||
      !changePassword.newPassword ||
      !changePassword.reNewPassword
    ) {
      displayAlert("Please provide all values");
      return;
    } else if (changePassword.newPassword !== changePassword.reNewPassword) {
      displayAlert("The New Password and the Re-Enter Password doesn't match");
      return;
    } else if (changePassword.newPassword.length < 8) {
      displayAlert("New Password is shorter than the minimum allowed length 8");
      return;
    }
    setChangePassword(initialChangePassword);
    updatePassword(changePassword);
  };

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile </h3>
        {showAlert && alert.isProfileAlert && <Alert />}

        {/* name */}
        <div className="form-center">
          <FormRow
            labelText="First name"
            type="text"
            name="name"
            value={userData.name}
            handleChange={(e) =>
              setUserData({ ...userData, name: e.target.value })
            }
          />
          <FormRow
            labelText="last name"
            type="text"
            name="lastName"
            value={userData.lastName}
            handleChange={(e) =>
              setUserData({ ...userData, lastName: e.target.value })
            }
          />
          <FormRow
            type="email"
            name="email"
            value={userData.email}
            handleChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />

          <FormRow
            type="text"
            name="nickname"
            value={userData.nickname}
            handleChange={(e) =>
              setUserData({ ...userData, nickname: e.target.value })
            }
          />
        </div>
        <div className="btn-end">
          <button
            className="btn"
            type="submit"
            disabled={isLoading || showAlert}
          >
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>

      <form onSubmit={handleSubmitPassword} className="form">
        <h3>change password</h3>
        {showAlert && alert.isPasswordAlert && <Alert />}
        <div className="form-center">
          <FormRow
            labelText="Enter Your Password"
            type="password"
            name="oldPassword"
            value={changePassword.oldPassword}
            handleChange={(e) =>
              setChangePassword({
                ...changePassword,
                oldPassword: e.target.value,
              })
            }
          />
          <FormRow
            labelText="Enter Your New Password"
            type="password"
            name="newPassword"
            value={changePassword.newPassword}
            handleChange={(e) =>
              setChangePassword({
                ...changePassword,
                newPassword: e.target.value,
              })
            }
          />
          <FormRow
            labelText="Re-Enter Your New Password"
            type="password"
            name="reNewPassword"
            value={changePassword.reNewPassword}
            handleChange={(e) =>
              setChangePassword({
                ...changePassword,
                reNewPassword: e.target.value,
              })
            }
          />
        </div>
        <div className="btn-end">
          <button
            className="btn"
            type="submit"
            disabled={isLoading || showAlert}
          >
            {isLoading ? "Please Wait..." : "change password"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
