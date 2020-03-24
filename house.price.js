//training feature data
// [long, lat]
const features = tf.tensor([
  [-121, 47],
  [-121.2, 46.5],
  [-122, 46.4],
  [-120.9, 46.7]
]);

//training label data
const labels = tf.tensor([[200], [250], [215], [240]]);

//test feature data
const predictionPoint = tf.tensor([-121, 47]);
const k = 2;

//predict label price with KNN algorithm as purpose of regression
features //perform pathagorean theorum to find distance
  .sub(predictionPoint) //prediction point lat and long minus features lat and long
  .pow(2) // taking lat and long square
  .sum(1) // adding lat to long   "1" refering to axis and adding horizontally
  .pow(0.5) // square rooting  to complete pathagorean theorum getting distance of position
  .expandDims(1) //tensor was changed to 1 dimension, need to expandDims to make it 2 dimensions
  .concat(labels, 1) //concate to training labels
  .unstack() //tensors can't be sorted so unstack to split one tensor into array of many by row.
  .sort((a, b) => (a.get(0) > b.get(0) ? 1 : -1)) //sorting distances to derive at best comparison
  //the ternary means if a distance is greater than b distance then return 1 else -1
  // .sort is a javascript array method
  .slice(0, k) //slice out the lowest distance values
  // .slice is the javascript array method not the tensorflow slice method
  .reduce((acc, pair) => acc + pair.get(1), 0) / k; //getting the total of all sorted labels of closest points
//dividing by k value to get the average and derive at best prediction
