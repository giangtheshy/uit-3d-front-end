import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { getBlockData, getAllData } from "../actions/data.action";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showBar, setShowBar] = useState(false);

  const handleClick = (block) => {
    console.log(block);
    if (block === "ALL") {
      dispatch(getAllData());
    } else {
      dispatch(getBlockData(block));
    }
  };
  return (
    <div className="header">
      <div className="logo" onClick={() => setShowBar((prev) => !prev)}>
        <AiOutlineBars />
      </div>
      <div className="nav-bar">
        <button className="navbar-btn" onClick={() => navigate("/")}>
          Home
        </button>
        <button className="navbar-btn" onClick={() => navigate("/admin")}>
          Admin
        </button>
        <button className="navbar-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
      {showBar && (
        <div className="side-bar">
          <div className="side-bar-header">
            <img
              src="https://yt3.ggpht.com/ytc/AKedOLQcfxC1KxxvhbtLwG7vWuH1DZOi5hAR4MM9m8US=s900-c-k-c0x00ffffff-no-rj"
              alt="logo"
            />
            <div className="side-bar-content">
              <h3>Trường Đại Học</h3>
              <h3>Công Nghệ Thông Tin</h3>
            </div>
          </div>
          <div className="side-bar-btn">
            <button onClick={() => handleClick("ALL")}>Toàn bộ</button>
            <button onClick={() => handleClick("BLOCK_A")}>Tòa A</button>
            <button onClick={() => handleClick("BLOCK_B")}>Tòa B</button>
            <button onClick={() => handleClick("BLOCK_C")}>Tòa C</button>
            <button onClick={() => handleClick("BLOCK_E")}>Tòa E</button>
            <button onClick={() => handleClick("BLOCK_CT")}>Căn tin</button>
            <button onClick={() => handleClick("BLOCK_NX")}>Nhà xe</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
