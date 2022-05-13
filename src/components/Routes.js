import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
// component
// import { GapiLogin } from "../common-lib/components/GapiLogin";
import { Layout } from "./Common/Layout";
import { RotateList } from "./Pages/RotateList/Index";
import { Marquee } from "./Pages/Marquee/Index";
import { VideoList } from "./Pages/VideoList/Index";
import { News } from "./Pages/News/Index";
import { Activites } from "./Pages/Activites/Index";
import { AdFloat } from "./Pages/AdFloat/Index";
import { AdPopup } from "./Pages/AdPopup/Index";
import { SpecialGame } from "./Pages/SpecialGame/Index";
import { Category } from "./Pages/Category/Index";
import { CodeEdit } from "./Pages/CodeEdit/Index";
import { Maintain } from "./Pages/Maintain/Index";
import { UserManagement } from "./Pages/UserManagement/Index";
// api
// import { API_URL } from "../configs/apiUrl";

export const Routes = withRouter(({ location: { pathname } }) => {
  // login redirection
  if (localStorage.getItem("isLogin") === "true" && pathname === "/login") {
    window.location.href = window.location.origin + "#/rotate-list";
  }
  // delete Storage
  if (pathname !== "/code-edit") {
    localStorage.removeItem("html-site");
    localStorage.removeItem("html-route");
  }
  if (pathname !== "/category") {
    localStorage.removeItem("category");
  }
  return (
    <Layout pathname={pathname}>
      <Switch>
        {/* <Route
          exact
          path="/login"
          component={() => <GapiLogin apiUrl={API_URL} />}
        /> */}
        <Route exact path="/rotate-list" component={RotateList} />
        <Route exact path="/announcement-list" component={Marquee} />
        <Route exact path="/video" component={VideoList} />
        <Route exact path="/news" component={News} />
        <Route exact path="/activities" component={Activites} />
        <Route exact path="/ad-float" component={AdFloat} />
        <Route exact path="/ad-popup" component={AdPopup} />
        <Route exact path="/special-game" component={SpecialGame} />
        <Route exact path="/category" component={Category} />
        <Route exact path="/code-edit" component={CodeEdit} />
        <Route exact path="/maintain" component={Maintain} />
        <Route exact path="/user-management" component={UserManagement} />
        {/* <Redirect
          from="/"
          to={
            localStorage.getItem("isLogin") === "true"
              ? "./rotate-list"
              : "./login"
          }
          component={RotateList}
        /> */}
        <Redirect from="/" to={"/rotate-list"} component={RotateList} />
      </Switch>
    </Layout>
  );
});
