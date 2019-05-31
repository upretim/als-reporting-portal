
export function multiFilter(array, filters) {
    const filterKeys = Object.keys(filters);
    // filters all elements passing the criteria
    return array.filter((item) => {
      // dynamically validate all filter criteria
      return filterKeys.every(key => {
        // ignores an empty filter
        if (!filters[key].length) return true;
        return filters[key].includes(item[key]);
      });
    });
  }

  // https://stackoverflow.com/questions/16037165/displaying-a-number-in-indian-format-using-javascript

  export function addINRCommaSeparator(number){
      number=number.toString();
      let lastThree = number.substring(number.length-3);
      let otherNumbers = number.substring(0,number.length-3);
      if(otherNumbers != ''){
        lastThree = ',' + lastThree;
        var res =  otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
          return res;
      }
      return lastThree;   
  }