function getProducts(searchQuery, cate) {
  return async (dispatch, getState) => {
    // let url = "http://localhost:3004/products";
    let url = `https://my-json-server.typicode.com/hellojoyworldz/lego-project/products?q=${searchQuery}`;
    let response = await fetch(url);
    let dataList = await response.json();

    let data = [];
    dataList.map((v) => {
      if (cate === "All") data.push(v);
      else if (cate === "New" && v.new) data.push(v);
      else if (cate === "Conscious choice" && v.choice) data.push(v);
    });
    dispatch({ type: "GET_PRODUCT_SUCCESS", payload: { data } });
  };
}

function getProductDetail(id) {
  return async (dispatch, getState) => {
    // let url = `http://localhost:3004/products/${id}`;
    let url = `https://my-json-server.typicode.com/hellojoyworldz/lego-project/products/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    dispatch({ type: "GET_ITEM_SUCCESS", payload: { data } });
  };
}

export const productAction = { getProducts, getProductDetail };
