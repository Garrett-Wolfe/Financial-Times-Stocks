import { useState, useEffect } from "react";
import axios from "axios";

import QueryPage from "./Query";

function MainPage() {

  // useEffect(() => {
  //   axios.get("http://localhost:3001/getUsers").then((response) => {
  //     console.log(response.data);
  //     setInitUsers(response.data.map((data: User) => data.name));
  //   });
  // }, []);

  return <>
  <QueryPage />
  </>;
}

export default MainPage;
