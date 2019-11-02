const ORDER_STRINGS = ['order', 'buy'];

const processAction = (userId, action) => {
  return filterOrders(action);
};

export default processAction;

/**
 * Filter actions for shopping tags
 *
 * @param {*} action
 * @returns
 */
const filterOrders = action => {
  const { title } = action;

  const titleArray = title.split(' ');

  const isOrder = titleArray.some(item => {
    return ORDER_STRINGS.includes(item.toLowerCase());
  });
  if (isOrder) return { ...action, tags: ['order'] };

  return action;
};
