const GetDataFromApi = async(url) => {
  const dataPromise = await fetch(url);

  return dataPromise.json();
};

export default GetDataFromApi;
