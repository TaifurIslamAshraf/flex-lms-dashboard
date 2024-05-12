type TParameters = {
  category?: string;
  stock?: string;
  sort?: string;
  page?: number;
  limit?: number;
};

const queryHelper = (parameters: TParameters) => {
  const { category, stock, sort, page, limit } = parameters;

  let queryString = "";

  if (category) {
    queryString += `category=${category}&`;
  }
  if (stock) {
    queryString += `stock=${stock}&`;
  }
  if (sort) {
    queryString += `sort=${sort}&`;
  }
  if (page && limit) {
    queryString += `page=${page}&limit=${limit}&`;
  }

  return queryString;
};

export default queryHelper;
