//********lodash *********/
//sort by method long hand vs lodash
const numbers = [
  [10, 5],
  [17, 2],
  [34, 1],
  [60, -5]
];

const sorted = _.sortBy(numbers, row => row[1]);
const mapped = _.map(sorted, row => row[1]);

//lodash version
_.chain(numbers)
  .sortBy(row => row[1])
  .map(row => row[1])
  .value();

// *********(knn) algorithm - giving it a bunch of the same, given another bird to compare to population*********
//dummie data
const outputs = [
  [10, 0.5, 16, 1],
  [200, 0.5, 16, 4],
  [350, 0.5, 16, 4],
  [600, 0.5, 16, 5]
];

const predictionPoint = 300;
const k = 3;

//subtracting by the middle point and mirroring results
function distance(point) {
  return Math.abs(point - predictionPoint);
}

//chaining multiple functions in lodash
_.chain(outputs)
  //mapping mirrored results
  .map(row => [distance(row[0]), row[3]])
  //sorting mapped mirrored results
  .sortBy(row => row[0])
  //slicing the results from first to last
  .slice(0, k)
  //reordering the results by second argument of ball end point and how many times it occurred
  .countBy(row => row[1])
  //changing results from array of objects to array of arrays
  .toPairs()
  //sorting results back in the order we want
  .sortBy(row => [1])
  //giving the most common result
  .last()
  //giving the least common result
  .first()
  .parseInt()
  .value();

// ******** pathagorean theorum 3,4,5 *********
const pointA = [1, 1, 1];
const pointB = [4, 5, 6];

//chain lodash function
_.chain(pointA)
  // zip the two arrays and create new arrays that collects data in rows instead of the column.
  .zip(pointB)
  // map and perform 3d pathagorean theorum
  .map(([a, b]) => (a - b) ** 2)
  //taking the sum
  .sum()
  //getting square root of value
  .value() ** 0.5;

//******** more lodash methodologies ********
//these methods does not change nor mutate the original array point variable
const point = [350, 0.5, 16, 4];

//getting all except last value of array
_.initial(point);
//getting only to last value of array
_.last(point);
