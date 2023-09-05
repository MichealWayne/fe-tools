let result = [];

function clearUpFavorite(data) {
  let i = data.length - 1;
  while (i >= 0) {
      let item = data[i];
      
      if (item.url && item.title) {
          result.push({title: item.title, url: item.url})
      }
      
      if (item.children && item.children.length) {
          clearUpFavorite(item.children);
      }
      i--
  }
}