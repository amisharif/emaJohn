import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './../../App';
import { redirect } from "react-router-dom";

const PrivateRoute = (children,...rest) => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);

    const loader = async () => {
        const user = loggedInUser.email;
        if (!user) {
          return redirect("/login");
        }
      };
    return (
        <div>

        </div>
    );
};

export default PrivateRoute;