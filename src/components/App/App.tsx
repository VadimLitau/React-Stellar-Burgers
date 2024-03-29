import React, { useEffect, FC } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import Constructor from "../../pages/constructor";
import Login from "../../pages/login";
import Profile from "../../pages/profile";
import Registration from "../../pages/registration";
import Forgot from "../../pages/forgot";
import Reset from "../../pages/resetPassword";
import PageNotFound from "../../pages/page404";
import Modal from "../Modal/Modal";
import IngredientDetails from "../Modal/IngridientDetails/IngridientDetails";
import Feeds from "../../pages/feeds";
import FeedId from "../FeedId/feedId";
import FeedIdModal from "../FeedId/feedIdModal";
import {
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { useAuth } from "../../services/auth";
import { getUserDate } from "../../services/actions/route";
import { getApiBurgerData } from "../../services/actions";
import AppHeader from "../AppHeader/AppHeader";
import { LocationState } from "../../services/types/data";

const App: FC = () => {
  const history = useHistory();
  const userAuth = useSelector((store) => store.route.userAuthorizationSuccess);
  const auth = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userAuth) {
      document.title = "react burger";
      dispatch(getUserDate(auth.user));
    }
  }, [auth.user, dispatch, userAuth]);

 useEffect(() => {
    document.title = "react burger";
    dispatch(getApiBurgerData());
  }, [dispatch]);

  const location = useLocation<LocationState>();

  const background = location.state?.background;
  function closeModals() {
    history.goBack();
  }

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <ProtectedRoute path="/profile" exact={true}>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact={true}>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/order/:id" exact={true}>
          <FeedId />
        </ProtectedRoute>
        <Route path="/register" exact={true}>
          <Registration />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <Forgot />
        </Route>
        <Route path="/reset-password" exact={true}>
          <Reset />
        </Route>
        <Route path="/" exact={true}>
          <Constructor />
        </Route>
        <Route path="/feeds">
          <Feeds />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <FeedId />
        </Route>
        <Route path="/ingredients/:id" exact={true}>
          <IngredientDetails />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
      {background && (
        <Switch>
          <Route path="/ingredients/:id">
            <Modal
              closeModal={() => {
                closeModals();
              }}
              title={"Детали Ингредиента"}
            >
              <IngredientDetails />
            </Modal>
          </Route>
          <Route path="/feed/:id">
            <Modal
              closeModal={() => {
                closeModals();
              }}
              title={"Детали Заказа"}
            >
              <FeedIdModal />
            </Modal>
          </Route>
          <Route path="/profile/order/:id" exact={true}>
            <Modal
              closeModal={() => {
                closeModals();
              }}
              title={"Детали Заказа"}
            >
              <FeedIdModal />
            </Modal>
          </Route>
        </Switch>
      )}
    </>
  );
};

export default App;
