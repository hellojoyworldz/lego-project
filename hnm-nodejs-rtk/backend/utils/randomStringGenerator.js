const randomStringGenerator = () => {
  const randomString = Array.from(Array(10), () =>
    Math.floor(Math.random() * 10).toString()
  ).join("");

  return randomString;
};

module.exports = randomStringGenerator;
