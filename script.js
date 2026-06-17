fetch('https://api.sampleapis.com/coffee/hot')
  .then((resp) => resp.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));