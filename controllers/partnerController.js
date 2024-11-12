const Goal = require('../models/User');

// Assign Partner
exports.assignPartner = async (req, res) => {
  const {id} = req.params;
  try {
    const { partnerId } = req.body;
    const goal = await Goal.findById(id);
   
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    
    goal.partner = partnerId ;
    await goal.save();

    if (goal.partner) {
      sendNotification(goal.partner.notificationToken, 'New Goal Created', `${req.user.name} has created a new goal.`);
    }

    res.json({ message: 'Partner assigned successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
