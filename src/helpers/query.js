exports.getPagination = (page, limit) => {
  const size = limit ? +limit : 10;
  const offset = page ? page * size : 0; //the number of records that the database must skip before it selects records

  return { size, offset };
};

exports.getPagingData = (data, count, page, limit) => {
  const currentPage = page ? +page : 0;

  const totalPages = Math.ceil(count / limit);

  return { total: count, rows: data, pages: totalPages, current: currentPage };
};
