const Goal = require('../models/Goal');
const User = require('../models/User');
// Create a Goal
exports.createGoal = async (req, res, next) => {
  try {
    const { title, description, deadline } = req.body;
    const goal = new Goal({ title, description, deadline, user: req.user.id });
    await goal.save();

     // Notify partner if assigned
     const user = await User.findById(goal.partner).populate('partner');

     if (user) {
       sendNotification(user.notificationToken, 'New Goal Created', `${user.name} has created a new goal.`);
     }

    res.status(201).json(goal);
  } catch (error) {
    next(error)
  }
};

// Get all Goals for the user
exports.getGoals = async (req, res, next) => {
  const { page = 1, limit = 10, sort = "createdAt", search } = req.query;

  //filter query
  const filter = {$text: {$search: search}};
  try {
    const goals = await Goal.find(filter)
      .sort(sort)
      .skip((page - 1) * limit) //skip documents baed on the page number
      .limit(limit); //limit number of documents returned

    //cal total pages
    const totalPosts = await Goal.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / limit);
    res.status(200).send({
      posts: goals || [],
      totalPages,
      totalPosts,
      currentPage: Number(page),
    });
  } catch (error) {
    next(error); //passes the error to the error handler
  }
};

exports.updateGoalById = async (req, res, next) => {
  const { id } = req.params;
  const image = req.file ? req.file.path : null;

  try {
    const updatedPost = await Goal.findByIdAndUpdate(
      id,
      {...req.body, image},
      { new: true }
    );
    if (!updatedPost) return res.status(400).send({ message: "Not Found" });
    res.send(200, updatedPost);
  } catch (error) {
    next(error); //passes the error to the error handler
  }
};

exports.getGoal = async(req, res, next) => {
  const { id } = req.params;
  try {
    const goal = await Goal.findById(id);
    if (!goal) return res.status(404).send({ message: "Not Found" });
    res.send(goal);
  } catch (error) {
    next(error); //passes the error to the error handler
  }
}

exports.deletePostById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedPost = await Goal.findByIdAndDelete(id);
    if (!deletedPost) return res.send(404, "Not Found");
    res.status(200).send({ message: "Post deleted successfully" });
  } catch (error) {
    next(error); //passes the error to the error handler
  }
};
