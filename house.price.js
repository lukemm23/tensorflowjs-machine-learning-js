//training feature data
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

//predict label price
