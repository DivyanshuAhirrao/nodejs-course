function add(a, b) {
    console.log(a + b);
  }
  function sub(a, b) {
    console.log(a - b);
  }
  function multi(a, b) {
    console.log(a * b);
  }
  function div(a, b) {
    console.log(a / b);
  }
  module.exports={
      addition: add,
      multiplication: multi,
      divide: div
  }