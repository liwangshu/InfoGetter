import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
function NavBar() {
  let navigate = useNavigate();
  return (
    <div class="navbar navbar-expand-sm navbar-light navbar-lewagon" id="nav1">
        <div class="container-fluid">
            <a class="navbar-brand" >
                <img onClick={() => {
                navigate("../");
                }} src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/uikit/logo.png" />
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto">
                <li class="nav-item active">
                    <a class="nav-link" onClick={() => {
                    navigate("../weather");
                    }}>Weather</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" onClick={() => {
                    navigate("../news");
                    }}>News</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" onClick={() => {
                    navigate("../twitter");
                    }}>Twitter</a>
                </li>
                <li class="nav-item dropdown">
                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" data-turbo-method="delete" href="#">Log out</a>
                    </div>
                </li>
            </ul>
        </div>
  </div>
</div>
  );
}
export default NavBar;
