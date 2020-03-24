// TENSOR FLOW USAGE

// ******** elementwise operations ********
const data = tf.tensor([1, 2, 3]);
data.shape; //[3]

const data = tf.tensor([[1, 2, 3]]);
data.shape; //[1,3]

// elementwise operations - performing an operation towards all data
//  in a tensor
const data = tf.tensor([1, 2, 3]);
const otherData = tf.tensor([4, 5, 6]);
data.add(otherData); //[5,7,9] - this is a new tensor, this is not 'data'

data.sub(otherData); //[-3,-3,-3]
data.mul(otherData); //[4,10,18]
data.div(otherData); //[0.25,0.4,0.5]

// if the shape doesnt match then results will be error undefined
// there are cases where it could be done. they are called broadcasting

//******** broadcasting *********
const data = tf.tensor([1, 2, 3]);
const otherData = tf.tensor([1]);
data.add(otherData); // [2,3,4]
// at each dimension, there need to be atleast one value

// ******** logging tensor data ********
const data = tf.tensor([1, 2, 3]);
data; //the real data is {with alot of crap}
// you have to do data.print
data.print; //tensor[1,2,3]

// ******** tensor accessors ********
const data = tf.tensor([10, 20, 30]);
data[0]; //this array syntax will result in a error
data.get(0); //10
//for 2d tensors, you'll need to give two arguments
const otherData = tf.tensor([
  [10, 20, 30],
  [40, 50, 60]
]);

data.get(0, 0); //10 - first number is row, second number is column
data.get(1, 1); //50
// there is no setter function, only getter function
// the only way is to create a new tensor

// ******* creating slices of data ********
const data = tf.tensor([
  [1, 2, 3],
  [4, 5, 6],
  [1, 2, 3],
  [4, 5, 6]
]);

data.slice([0, 1], [6, 1]); //[[2],[5],[2],[5]] slicing to get middle column of all rows
// first argument is start index position of the column [row index, column index]
// second argument is size of the slice [number of rows, how many values wide]
// second argument's number of rows is hard to find, you can do a data.shape to find the answer
// or you can use special syntax of "-1" - meaning all the records for that parameter

// ******** tensor concatenation ********
const tensorA = tf.tensor([
  [1, 2, 3],
  [4, 5, 6]
]);
const tensorB = tf.tensor([
  [7, 8, 9],
  [11, 12, 13]
]);

tensorA.concat(tensorB, 0); // ([[1, 2, 3],[4, 5, 6],[7, 8, 9],[11, 12, 13]])
tensorA.concat(tensorB, 1); // ([[1, 2, 3, 7, 8, 9],[4, 5, 6, 11, 12, 13])
// second argument refers to the axis of concatenation
// axis "0" will point to horizontal axis and concatenate onto vertical axis
// axis "1" will point to vertical axis and concatenate onto horizontal axis

// ********* summing values along an axis ********
const jumpData = tf.tensor([
  [70, 70, 70],
  [70, 70, 70],
  [70, 70, 70],
  [70, 70, 70]
]);

const playerData = tf.tensor([
  [1, 160],
  [2, 160],
  [3, 160],
  [4, 160]
]);

jumpData.sum(); //[840]
jumpData.sum(0); //[280,280,280]
jumpData.sum(1); //[210,210,210,210]
//sum argument is once again refering to axis - which in this case we want argument to be "1"
jumpData.sum(1).concat(playerData); //this will error out without expandDims

// ******** massaging dimensions with expandDims *********
jumpData.sum(1).concat(playerData); //the shape of the result is a 1 dimensional tensor
// in which concatenation will error
jumpData.sum(1, true).concat(playerData, 1); //[[210,1,160],[210,1,160],[210,1,160],[210,1,160]]
// 1. by adding "true" argument to .sum, the operation keeps results as the same dimension as
//      original data
// 2. by adding "1" argument to .concat will ensure to concate horizontally, since otherwise will
//      error since vertical dimensions of the two tensors does not match

jumpData.sum(1).expandDims(1);
// 1. expandDims will expand tensor by 1 dimension
// 2. by adding "1" argument to .expandDims allows expandDim to expand tensor dimension vertical
jumpData
  .sum(1)
  .expandDims(1)
  .concat(playerData, 1); //will arrive at correct result
