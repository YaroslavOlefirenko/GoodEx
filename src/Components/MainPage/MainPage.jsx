import react, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ContentList from "../ContentList/ContentList";
import { fetchAllCurrencies } from "../../rdx/features/Currencies/currencies";

const MainPage = () => {
  let darkTheme = useSelector((state) => state.theme.darkTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCurrencies());
  }, [dispatch]);

  return (
    <div className={darkTheme ? "dark" : "light"}>
      <ContentList />
    </div>
  );
};

export default MainPage;
