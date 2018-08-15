var a = {
  maxTitle: function (value) {
    let val = new String(value);
    return val.length > 23 ? val.slice(0, 23).trim() + "..." : val.trim();
  }
  
}