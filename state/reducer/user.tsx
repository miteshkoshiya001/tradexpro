import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserType = {
  user: {};
  isLoggedIn: boolean;
  notification: [];
  customPageData: {};
  copyright_text: "";
  socialData: [];
  p2pDetails: {};
  logo: string;
  icoChat: [];
  supportChat: [];
  tradeChat: [];
  notificationData: [];
};

const initialState: any = {
  user: {},
  isLoggedIn: false,
  isLoading: true,
  notification: [],
  p2pDetails: {},
  icoChat: [],
  customPageData: null,
  copyright_text: null,
  socialData: null,
  supportChat: [],
  tradeChat: [],
  logo: "",
  notificationData: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = {};
      state.isLoggedIn = false;
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    setAuthenticationState: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setNotification: (state, action: PayloadAction<any>) => {
      state.notification = action.payload;
    },
    setLogo: (state, action: PayloadAction<any>) => {
      state.logo = action.payload;
    },
    seticoChat: (state, action: any) => {
      state.icoChat = action.payload;
    },
    setChatico: (state, action: any) => {
      state.icoChat = [...state.icoChat, action.payload];
    },
    setsupportChat: (state, action: any) => {
      state.supportChat = action.payload;
    },
    setSupportico: (state, action: any) => {
      state.supportChat = [...state.supportChat, action.payload];
    },
    setTradeChatAll: (state, action: any) => {
      state.tradeChat = action.payload;
    },
    setTradeChat: (state, action: any) => {
      state.tradeChat = [...state.tradeChat, action.payload];
    },

    setCustomPageData: (state, action: any) => {
      state.customPageData = action.payload;
    },
    setCopyright_text: (state, action: any) => {
      state.copyright_text = action.payload;
    },
    setSocialData: (state, action: any) => {
      state.socialData = action.payload;
    },
    setNotificationData: (state, action: any) => {
      state.notificationData = action.payload;
    },
    setOneNotification: (state, action: any) => {
      state.notificationData.unshift(action.payload);
    },
    setP2pDetails: (state, action: any) => {
      state.p2pDetails = action.payload;
    },
    setP2pDetailsOrder: (state, action: any) => {
      state.p2pDetails = {
        ...state.p2pDetails,
        order: action.payload,
      };
    },
  },
});

export const {
  login,
  logout,
  setUser,
  setAuthenticationState,
  setLoading,
  setLogo,
  seticoChat,
  setChatico,
  setsupportChat,
  setSupportico,
  setCustomPageData,
  setCopyright_text,
  setSocialData,
  setNotificationData,
  setTradeChat,
  setTradeChatAll,
  setOneNotification,
  setP2pDetails,
  setP2pDetailsOrder,
} = userSlice.actions;
export default userSlice.reducer;
