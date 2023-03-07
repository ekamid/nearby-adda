/*
  Page always start from 0
  current < page === true
*/

exports.getPagination = (page, limit) => {
  const size = limit ? +limit : null;
  const offset = page && size ? page * size : 0; //the number of records that the database must skip before it selects records

  return { size, offset };
};

exports.getPagingData = (data, count, page, limit) => {
  const currentPage = page ? +page : 0;

  const totalPages = limit ? Math.ceil(count / limit) : 1; //

  return { total: count, rows: data, pages: totalPages, current: currentPage };
};
