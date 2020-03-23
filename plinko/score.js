const outputs = [];

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a balls drops into a bucket

  outputs.push([dropPosition, bounciness, size, bucketLabel]);

  // console.log(outputs);
}

function runAnalysis() {
  // Write code here to analyze stuff
  //byclicking analyze, runs splitDataSet function for testSet and trainingSet
  const testSetSize = 100;
  const [testSet, trainingSet] = splitDataSet(outputs, testSetSize);

  //ranging to value of k variable
  _.range(1, 20).forEach(k => {
    //rewriting the forloop to create the predition index
    const accuracy = _.chain(testSet)
      .filter(
        testPoint => knn(trainingSet, _.initial(testPoint), k) === testPoint[3]
      )
      .size()
      .divide(testSetSize)
      .value();

    console.log('for k of', k, 'accuracy is:', accuracy);
  });
}

//knn stands for K-nearest neighbor
function knn(data, point, k) {
  //point has 3 values at this point
  //chaining multiple functions in lodash
  return (
    _.chain(data)
      //mapping mirrored results
      .map(row => {
        return [distance(_.initial(point), point), _.last(row)];
      })
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
      .value()
  );
}

//subtracting by the middle point and mirroring results
function distance(pointA, pointB) {
  //pointA and pointB becomes an array with 3 variables
  // const pointA = [1, 1, 1];
  // const pointB = [4, 5, 6];

  //chain lodash function
  return (
    _.chain(pointA)
      // zip the two arrays and create new arrays that collects data in rows instead of the column.
      .zip(pointB)
      // map and perform 3d pathagorean theorum
      .map(([a, b]) => (a - b) ** 2)
      //taking the sum
      .sum()
      //getting square root of value
      .value() ** 0.5
  );
}

function splitDataSet(data, testCount) {
  //shuffling dataset to random sequence
  const shuffled = _.shuffle(data);

  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);

  return [testSet, trainingSet];
}
