import { configureStore } from "@reduxjs/toolkit";
import toogleMenuReducer from "../components/common/Menu/menuSlice";
import categoryReducer from "../features/Category/categorySlice";
import roomReducer from "../features/Rooms/roomSlice";
import linkReducer from "../features/Links/linkSlice";
import levelReducer from "../features/Levels/levelSlice";
import userReducer from "../features/Users/userSlice";
import marginReducer from "../features/Margin/marginSlice";

const rootReducer = {
  toogleMenu: toogleMenuReducer,
  category: categoryReducer,
  room: roomReducer,
  link: linkReducer,
  level: levelReducer,
  user: userReducer,
  margin: marginReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
