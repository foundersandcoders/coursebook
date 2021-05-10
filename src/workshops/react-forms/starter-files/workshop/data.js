const data = [
  {
    id: 2645900,
    name: "Hamburger",
    description:
      "Two fresh high-quality beef patties hot off the grill, on a soft, toasted bun.",
    price: 9,
    category: "burger",
  },
  {
    id: 2645902,
    name: "Cheeseburger",
    description:
      "Our regular two-patty burger with two slices of melted American cheese added.",
    price: 8,
    category: "burger",
  },
  {
    id: 2645905,
    name: "Bacon Burger",
    description:
      "Our regular two-patty burger layered with two strips of crispy, sweet apple-wood smoked bacon.\r\n\r\n",
    price: 9,
    category: "burger",
  },
  {
    id: 2645907,
    name: "Bacon Cheeseburger",
    description:
      "Our regular two patty-burger with two strips of crispy apple-wood smoked bacon and two slices of melted American cheese.",
    price: 9,
    category: "burger",
  },
  {
    id: 2645936,
    name: "Little Hamburger",
    description:
      "One fresh high-quality patty hot off the grill, on a soft, toasted bun.",
    price: 9,
    category: "burger",
  },
  {
    id: 2645952,
    name: "Little Cheeseburger",
    description:
      "Our single patty burger with a slice of melted American cheese added. ",
    price: 9,
    category: "burger",
  },
  {
    id: 2645966,
    name: "Little Bacon Burger",
    description:
      "Our single patty burger with two strips of crispy apple-wood smoked bacon.",
    price: 9,
    category: "burger",
  },
  {
    id: 2645975,
    name: "Little Bacon Cheeseburger",
    description:
      "Our single patty burger with crispy, sweet apple-wood smoked bacon and a slice of melted American cheese.",
    price: 7,
    category: "burger",
  },
  {
    id: 2646012,
    name: "All Beef Hot Dog",
    description:
      "Our All-beef Hotdog, split and grilled lengthwise for a caramelised finish.",
    price: 7,
    category: "hot dog",
  },
  {
    id: 2646021,
    name: "Cheese Dog",
    description:
      "Our All-beef Hotdog, topped with a slice of melted American cheese.",
    price: 7,
    category: "hot dog",
  },
  {
    id: 2646037,
    name: "Bacon Dog",
    description:
      "Our All-beef Hotdog with a layer of crispy, sweet apple-wood smoked bacon.",
    price: 6,
    category: "hot dog",
  },
  {
    id: 2646044,
    name: "Bacon Cheese Dog",
    description:
      "Our All–beef Hotdog with a layer of melted American cheese topped with crispy, sweet apple-wood smoked bacon.",
    price: 8,
    category: "hot dog",
  },
  {
    id: 2646064,
    name: "Veggie Sandwich",
    description:
      "Create your own Veggie Sandwich with any or all of our 15 free toppings.",
    price: 7,
    category: "sandwich",
  },
  {
    id: 2646067,
    name: "Cheese Veggie Sandwich",
    description:
      "Create your own Veggie Sandwich with any or all of our 15 free toppings. Then add melted American cheese.",
    price: 5,
    category: "sandwich",
  },
  {
    id: 2646073,
    name: "Grilled Cheese",
    description:
      "An American classic done the Five Guys way. American cheese melted on an inside-out bun, grilled until golden brown.\r\n\r\n",
    price: 6,
    category: "sandwich",
  },
  {
    id: 2646078,
    name: "BLT",
    description:
      "A pile of our crispy, sweet apple-wood smoked bacon with fresh-cut, full-flavoured tomato and cool, crunchy lettuce on a toasted bun.",
    price: 6,
    category: "sandwich",
  },
  {
    id: 2646088,
    name: "Little Five Guys Style",
    description:
      "Hot, fresh boardwalk-style fries. Cut fresh, cooked twice and salted. Our fries are cooked in pure, tasty peanut oil. ",
    price: 3,
    category: "fries",
  },
  {
    id: 2646091,
    name: "Regular Five Guys Style",
    description:
      "Hot, fresh boardwalk-style fries. Cut fresh, cooked twice and salted. Our fries are cooked in pure, tasty peanut oil.",
    price: 3,
    category: "fries",
  },
  {
    id: 2646095,
    name: "Large Five Guys Style",
    description:
      "Hot, fresh boardwalk-style fries. Cut fresh, cooked twice and salted. Our fries are cooked in pure, tasty peanut oil.",
    price: 4,
    category: "fries",
  },
  {
    id: 6838192,
    name: "Little - Cajun Style",
    description:
      "Our Five Guys Fries with a heavy dose of Cajun spice added. Unsure? Get the seasoning on the side. Our fries are cooked in pure, tasty peanut oil.",
    price: 4,
    category: "fries",
  },
  {
    id: 6838205,
    name: "Regular Cajun Style",
    description:
      "Our Five Guys Fries with a heavy dose of Cajun spice added. Unsure? Get the seasoning on the side. Our fries are cooked in pure, tasty peanut oil.",
    price: 3,
    category: "fries",
  },
  {
    id: 6838213,
    name: "Large Cajun Style ",
    description:
      "Our Five Guys Fries with a heavy dose of Cajun spice added. Unsure? Get the seasoning on the side. Our fries are cooked in pure, tasty peanut oil.",
    price: 3,
    category: "fries",
  },
  {
    id: 2646111,
    name: "Coke",
    description: "500ml.",
    price: 2,
    category: "drink",
  },
  {
    id: 2646114,
    name: "Diet Coke",
    description: "500ml.",
    price: 2,
    category: "drink",
  },
  {
    id: 2646116,
    name: "Sprite",
    description: "500ml.",
    price: 2,
    category: "drink",
  },
  {
    id: 2656134,
    name: "Fanta Orange",
    description: "500ml.",
    price: 2,
    category: "drink",
  },
  {
    id: 2646120,
    name: "Smart Water ",
    description: "600ml.",
    price: 2,
    category: "drink",
  },
  {
    id: 2646121,
    name: "Budweiser",
    description: "330ml.",
    price: 2,
    category: "drink",
  },
  {
    id: 2646125,
    name: "Brooklyn Lager",
    description: "330ml.",
    price: 2.5,
    category: "drink",
  },
  {
    id: 2646129,
    name: "Corona",
    description: "330ml.",
    price: 2,
    category: "drink",
  },
  { id: 2646161, name: "Tomatoes", price: 0.5, category: "topping" },
  { id: 2646157, name: "Lettuce", price: 0.5, category: "topping" },
  { id: 2646177, name: "Fresh Onions", price: 1, category: "topping" },
  { id: 2646162, name: "Grilled Onions", price: 0.75, category: "topping" },
  { id: 2646165, name: "Grilled Mushrooms", price: 0.5, category: "topping" },
  { id: 2646159, name: "Pickles", price: 0.5, category: "topping" },
  { id: 2646182, name: "Jalapeño Peppers", price: 0.5, category: "topping" },
  { id: 2646186, name: "Green Peppers", price: 0.75, category: "topping" },
  { id: 2646174, name: "Relish", price: 0.5, category: "topping" },
  { id: 2646166, name: "Ketchup", price: 0.5, category: "topping" },
  { id: 2646153, name: "Mayo", price: 1, category: "topping" },
  { id: 2646198, name: "BBQ Sauce", price: 1, category: "topping" },
  { id: 2646194, name: "HP Sauce", price: 0.5, category: "topping" },
  { id: 2646201, name: "Hot Sauce", price: 0.5, category: "topping" },
  { id: 2646168, name: "Mustard", price: 0.5, category: "topping" },
  { id: 2646624, name: "Bun", price: 0.75, category: "extra" },
  { id: 2646626, name: "In a Bowl", price: 0.75, category: "extra" },
  { id: 2646627, name: "Five Guys Style", price: 0.75, category: "extra" },
  { id: 2646630, name: "Cajun Style", price: 0.75, category: "extra" },
  { id: 2646916, name: "Whipped Cream", price: 0.75, category: "extra" },
  { id: 2656194, name: "Lettuce Wrap", price: 0.75, category: "extra" },
  { id: 2656237, name: "Add Bacon", price: 0.5, category: "extra" },
  { id: 2656241, name: "Add Cheese", price: 0.75, category: "extra" },
  { id: 2904646, name: "Ketchup on the Side", price: 0.75, category: "extra" },
  { id: 2904648, name: "Mayo on the Side", price: 0.5, category: "extra" },
  { id: 16788695, name: "Add Ketchup", price: 0.75, category: "extra" },
  { id: 16837653, name: "Coke Zero", price: 2, category: "drink" },
  { id: 16837655, name: "Dr Pepper", price: 2, category: "drink" },
];

export default data;
