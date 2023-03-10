import React, { CSSProperties, useEffect, useState } from "react";
import "../../styles/main/main.scss";
import MainItem from "./main-item";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { initArray } from "../../store/sort-slice";
import { API_URL } from "constants/constants";
interface Country {
  ID: string;
  Country: string;
  TotalConfirmed: number;
  index?: number;
}

interface MainProps {
  style?: CSSProperties;
}

const Main: React.FC<MainProps> = () => {
  const [items, setItems] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const sortSelector = useSelector((state: any) => state.sortSlice);

  const getData = async () => {
    try {
      if (items.length === 0 && sortSelector.items.length === 0) {
        console.log("Created by Volodymyr Kravets");
        const response = await axios(API_URL);
        dispatch(initArray(response.data.Countries));
        if (response.data.Message !== "") {
          console.log(response.data.Message);
          return;
        }
        setItems(response.data.Countries);
        setIsLoading(false);
      } else {
        setItems(sortSelector.changedItems);
      }
    } catch (error: any) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getData();
  }, [sortSelector.change, sortSelector.changedItems.length]);

  return (
    <main>
      <div className="container">
        <MainItem
          style={{ background: "#2196F3", color: "#fff", cursor: "initial" }}
          Country="Country"
          TotalConfirmed="Total Confirmed"
          index=""
        />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          items.map((item, index) => (
            <MainItem key={item.ID} {...item} index={index} />
          ))
        )}
      </div>
    </main>
  );
};

export default Main;
