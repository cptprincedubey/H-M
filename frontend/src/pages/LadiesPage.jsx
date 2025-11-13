// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { fetchProductDataHook } from "../hooks/ladiesHook";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { setMessage } from "../features/errorSlice";
import ProductCard from "../components/ProductCard";

const LadiesPage = () => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const { data, isPending, error } = fetchProductDataHook("ladies");
  console.log(data);
  console.log(error);

  // eslint-disable-next-line no-unused-vars
  const { message } = useSelector((state) => state.error);

  if (isPending) return <h1>Loading....</h1>;

  return (
    <div>
      <h1>Products</h1>
      <div className="flex gap-5">
        {data?.productsData.map((elem) => {
          return <ProductCard key={elem._id} product={elem} />;
        })}
      </div>
    </div>
  );
};

export default LadiesPage;
