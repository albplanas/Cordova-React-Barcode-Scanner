export default function GetLocalStorage(query) {

   return  JSON.parse(window.localStorage.getItem(query));


  }