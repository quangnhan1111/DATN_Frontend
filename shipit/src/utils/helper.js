import axios from "axios";

const paginate = (followers) => {
    const itemsPerPage = 5
    const numberOfPages = Math.ceil(followers.length / itemsPerPage)

    const newFollowers = Array.from({ length: numberOfPages }, (_, index) => {
        const start = index * itemsPerPage
        return followers.slice(start, start + itemsPerPage)
    })
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from?retiredLocale=vi

    return newFollowers
}


export const handleToggle = (checkboxId, previousState) => {
  const currentIndex = previousState.indexOf(checkboxId);
  let newCheckedArray = [...previousState];
  if (currentIndex === -1) {
    if (checkboxId === 0) {
      newCheckedArray = [];
    } else {
      const filtered = newCheckedArray.filter((item) => item !== 0);
      newCheckedArray = [...filtered];
    }
    newCheckedArray.push(checkboxId);
  } else {
    newCheckedArray.splice(currentIndex, 1);
  }
  return newCheckedArray.sort((a, b) => a - b);
};



