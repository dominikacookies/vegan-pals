const intolerances = {
  gluten: 1,
  peanuts: 0,
  sesame: 0,
  grain: 0,
  soy: 0,
  sulphite: 0,
  "tree nut": 1,
  wheat: 0,
};

// intolerances=gluten,tree nut
const result = Object.entries(intolerances)
  .filter(([key, value]) => value === 1)
  .map(([key, value]) => key)
  .join(",");

console.log(result);
