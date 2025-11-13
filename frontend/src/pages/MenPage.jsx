// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { fetchProductDataHook } from "../hooks/ladiesHook";

const MenPage = () => {
  const { data = [], isPending } = fetchProductDataHook("men");

  console.log(data);

  if (isPending) return <h1>Loading....</h1>;

  return (
    <div>
      {data
        ? data?.productsData.map((val) => {
            return <p key={val._id}>{val.productName}</p>;
          })
        : "null"}
    </div>
  );
};

export default MenPage;
