import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [userData, setuserData] = useState([]);
  const [index, setindex] = useState(1);
  const getData = async () => {
    const res = await axios.get(
      `https://picsum.photos/v2/list?page=${index+2}&limit=10`
    );
    setuserData(res.data);
    console.log(userData);
  };  

  useEffect(function () {
    getData();
  }, [index]);

  let printUserData = <h3 className="text">Loading...</h3>;
  
  if (userData.length > 0) {
    printUserData = userData.map((elem, idx) => {
      return (
        <div key={idx} className="image-parent">
          <a href={elem.url} target="_blank">
            <div className="image">
              <img className="img" src={elem.download_url} />
            </div>
          </a>
          <h2 className="details">{elem.author}</h2>
        </div>
      );
    });
  }

  return (
    <>
    <div className="Header">Wallpaper App</div>
    <div className="parent">
      <div className="box">{printUserData}</div>

      <div className="bottom">
        <button
          className="btn"
          onClick={() => {
            if (index > 1) {setindex(index - 1)
              setuserData([]);
            };
          }}
        >
          Prev
        </button>
        <h3 className="details">Page{index}</h3>
        <button
          className="btn"
          onClick={() => {
            setindex(index + 1);
            setuserData([])
          }}
        >
          Next
        </button>
      </div>
    </div>

    <div className="footer">Created  by Maxx</div>
    </>
  );
};

export default App;
