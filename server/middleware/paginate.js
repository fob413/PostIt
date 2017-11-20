/**
 * function to return data needed for pagination
 * @export
 * @param {Number} count
 * @param {Number} limit
 * @param {Number} offset
 * @return {object} paginationData
 */
const paginate = (count, limit, offset) => {
  const page = Math.floor(offset / limit) + 1;
  const pageCount = Math.ceil(count / limit);
  const pageSize = (count - offset) > limit ? limit : (count - offset);
  return {
    page,
    pageCount,
    pageSize,
    count
  };
};
export default paginate;
