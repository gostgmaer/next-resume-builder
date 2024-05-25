
import { Fragment } from "react";

const Layout = ({ children }) => {
  return (
    <Fragment>

      <div className="min-h-screen ">{children}</div>


    </Fragment>
  );
};

export default Layout;
