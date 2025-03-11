import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { useUserAuth } from "../hooks/useUserAuth";
import { UserContext } from "../context/userContext";
import EmojiPickerPopup from "../components/EmojiPickerPopup";
import Input from "../components/Inputs/Input";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import toast from "react-hot-toast";

const Profile = () => {
  useUserAuth();
  const [userData, setUserData] = useState({
    updatedIcon: "",
    updatedPassword: "",
    updatedName: "",
  });
  const { user, updateUserField } = useContext(UserContext);

  const handleChange = (key, value) =>
    setUserData({ ...userData, [key]: value });

  useEffect(() => {
    if (user) {
      setUserData({
        ...userData,
        updatedIcon: user.profileImageUrl,
        updatedName: user.fullName,
      });
    }
  }, [user]);
  const onUpdateData = async () => {
    console.log(userData);
    try {
      const response = await axiosInstance.patch(
        API_PATHS.AUTH.UPDATE_USER_INFO,
        {
          ...userData,
        }
      );
      if (response?.data?.user) {
        const { profileImageUrl, fullName } = response?.data?.user;
        updateUserField("profileImageUrl", profileImageUrl);
        updateUserField("fullName", fullName);
      }
      toast.success("User Details updated successfully");
    } catch (error) {
      console.error(
        "Error Updating User Data:",
        error?.response?.data?.message || error?.message
      );
    }
  };

  return (
    <DashboardLayout activeMenu="Profile">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="card">
            <div className="flex justify-between flex-col">
              <EmojiPickerPopup
                icon={userData.updatedIcon}
                onSelect={(selectIcon) =>
                  handleChange("updatedIcon", selectIcon)
                }
              />
              <Input
                value={userData.updatedName}
                onChange={({ target }) =>
                  handleChange("updatedName", target.value)
                }
                placeholder="John..."
                label="Update Name"
                type="text"
              />
              <Input
                value={userData.updatedPassword}
                onChange={({ target }) =>
                  handleChange("updatedPassword", target.value)
                }
                placeholder="*****"
                label="Update Password"
                type="password"
              />

              <div className="mt-6 flex justify-end">
                <button
                  className="add-btn add-btn-fill"
                  onClick={() => onUpdateData()}
                >
                  Update Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
