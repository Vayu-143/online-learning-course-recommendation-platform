import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
    catch (err) {
  console.log(
    "LOGIN ERROR:",
    err.response?.data
  );

  alert(
    err.response?.data?.message ||
    JSON.stringify(
      err.response?.data
    ) ||
    err.message
  );
}