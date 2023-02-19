import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import PropTypes from "prop-types";

export function PrivateRoute() {
  const { user } = useAuth();

  return user != null ? <Outlet /> : <Navigate to="/login" />;
}

PrivateRoute.propTypes = { path: PropTypes.string };
