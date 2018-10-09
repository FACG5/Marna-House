

const removeDuplicated = (allRooms) => {
  const filterdRooms = [];
  for (let i = 0; i < allRooms.length; i += 1) {
    filterdRooms[i] = {
      room_num: allRooms[i].room_num,
      price: allRooms[i].price,
    };
    let j = 1;
    while ((allRooms[i + j] !== undefined) && (allRooms[i].room_num === allRooms[i + j].room_num)) {
      allRooms.splice((i + j), 1);
    }
    j = 1;
  }
  return (filterdRooms);
};
const filterResult = (from, to, allResult) => {
  const array = allResult.slice(0);

  for (let i = 0; i < array.length; i += 1) {
    if ((from < array[i].reservation_from && array[i].reservation_from < to)) {
      removeElement(array[i].id, array);
      return filterResult(from, to, array);
    } if ((from < array[i].reservation_to && array[i].reservation_to < to)) {
      removeElement(array[i].id, array);
      return filterResult(from, to, array);
    }
  }
  return (array);
};
const removeElement = (id, array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      array.splice(i, 1);
      i -= 1;
    }
  }
};

module.exports = { filterResult, removeDuplicated };
