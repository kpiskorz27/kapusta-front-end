const getIsLoggedIn = (state) => state.auth.isLoggedIn;
const getUserEmail = (state) => state.auth.userData?.email || "";
const getUserData = (state) => state.auth.userData;
const getAccessToken = (state) => state.auth.accessToken;
const getRefreshToken = (state) => state.auth.refreshToken;
const getSid = (state) => state.auth.sid;

const authSelectors = {
  getIsLoggedIn,
  getUserEmail,
  getUserData,
  getAccessToken,
  getRefreshToken,
  getSid,
};

export default authSelectors;
