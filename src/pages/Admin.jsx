import React, { useState } from "react";
import "./Admin.scss";
import * as apis from "../apis";

const Admin = () => {
  const [data, setData] = useState({ color: "#7eadf7", size: 0, block: "", value: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const json = JSON.parse(data.value);
    const formatJson = [];
    json.features.forEach((feature) => {
      const coordinates = {
        type: feature.geometry.type === "MultiPolygon" ? "MULTIPOLYGON" : "MULTILINESTRING",
        parts: [],
      };
      feature.geometry.coordinates.forEach((coordinate) => {
        const partItems = feature.geometry.type === "MultiPolygon" ? coordinate[0] : coordinate;
        const part = { points: [] };
        partItems.forEach((point) => {
          const pointFormat = { x: point[0], y: point[1], z: point[2] };
          part.points.push(pointFormat);
        });
        coordinates.parts.push(part);
      });
      formatJson.push(coordinates);
    });
    const result = { ...data, coordinates: formatJson };
    delete result.value;
    setData((prev) => ({ ...prev, value: "" }));
    const res = await apis.addData(result);
  };
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="admin">
      <h1>Admin</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="color">Color</label>:
          <input type="text" className="input" id="color" name="color" value={data.color} onChange={handleChange} />
          <div className="show-color" style={{ backgroundColor: data.color, width: 20, height: 20 }}></div>
        </div>
        <div className="input-group">
          <label htmlFor="size">Size</label>:
          <input type="number" className="input" id="size" name="size" value={data.size} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="block">Block</label>:
          <select name="block" className="input" id="block" value={data.block} onChange={handleChange}>
            <option value="BLOCK_A">BLOCK_A</option>
            <option value="BLOCK_B">BLOCK_B</option>
            <option value="BLOCK_C">BLOCK_C</option>
            <option value="BLOCK_E">BLOCK_E</option>
            <option value="BLOCK_CT">BLOCK_CT</option>
            <option value="BLOCK_NX">BLOCK_NX</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="value">Content file</label>:
          <textarea name="value" className="input" id="file" value={data.value} onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="submit-btn">
          submit
        </button>
      </form>
    </div>
  );
};

export default Admin;
