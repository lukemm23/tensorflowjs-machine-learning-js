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

//******** broadcasting ******** */
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
