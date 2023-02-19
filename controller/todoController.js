const helloWorld = (req, res) => {
  res.json({ hello: "Hello World" });
};

module.exports = {
  helloWorld,
};
