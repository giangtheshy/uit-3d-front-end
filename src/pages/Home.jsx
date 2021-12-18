import RenderMap from "../components/RenderMap";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllData } from "../actions/data.action";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllData());
  }, []);
  return (
    <div>
      <RenderMap />
    </div>
  );
};

export default Home;
