test("makeUrl should create the correct PokéAPI URL", () => {
  equal(makeUrl("pikachu"), "https://pokeapi.co/api/v2/pikachu");
  equal(makeUrl("bulbasaur"), "https://pokeapi.co/api/v2/bulbasaur");
});

test("searchParamsToObject should create an object from a querystring", (t) => {
  const actual = searchParamsToObject("name=oliver&email=hello@oliverjam.es");
  const expected = { name: "oliver", email: "hello@oliverjam.es" };
  equal(actual.name, expected.name);
  equal(actual.email, expected.email);
});

test("isLeapYear should handle invalid input", () => {
  equal(isLeapYear("hi"), "Please enter a number", "Input must be a number");
  equal(isLeapYear(-1), "Year cannot be negative", "Input must be positive");
  equal(isLeapYear(2023), false, "2023 should not be a leap year");
});

test("isLeapYear should handle multiples of 4", () => {
  equal(isLeapYear(2020), true, "2020 should be a leap year");
  equal(isLeapYear(2024), true, "2024 should be a leap year");
});

test("isLeapYear should handle multiples of 100", () => {
  equal(isLeapYear(1800), false, "1800 should not be a leap year");
  equal(isLeapYear(300), false, "300 should not be a leap year");
});

test("isLeapYear should handle multiples of 400", () => {
  equal(isLeapYear(2000), true, "2000 should be a leap year");
  equal(isLeapYear(1600), true, "1600 should be a leap year");
});
