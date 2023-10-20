import { useContext } from "react";
import AuthContext from "../auth/AuthContext";

import React from "react";

const useAuth = () => {
    return useContext(AuthContext)
};

export default useAuth;
