import React, { useState, useEffect } from "react";
import authService from '../../services/authService';
import { useHistory } from "react-router-dom";

export const LandingLayout = () => {
    const history = useHistory();
    useEffect(() => {
        authService.refreshUserAccess().then((response) => {
            if (response) {
                history.push("/app/user-dashboard");
            } else {
                history.push("/auth/login");
            }
        })
    });
    
    return (
        <div>
            Redirecting to athena portal.....
        </div>
    );
};

export default LandingLayout;