const router = require('express').Router();
const { status } = require('http-status');
const createCustomErrorMsg = require('../../helpers/createCustomErrorMsg');
const UserFeedback = require('../../models/UserFeedback');
const logActivityMiddlewre = require('../../middlewares/logActivityMiddleware');

router.get('/', async (req, res, next) => {
  try {
    const user_feedbacks = await UserFeedback.findAll();
    res.status(status.OK).render('admin/feedbacks', {
      activePage: 'feedbacks',
      user_feedbacks: user_feedbacks,
    });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});

router.delete('/delete/:id', logActivityMiddlewre, async (req, res, next) => {
  try {
    const { id } = req.params;

    const existFeedback = UserFeedback.findOne({ where: { id: id } });
    if (!existFeedback) {
      return res.status(status.NOT_FOUND).json({
        message: 'Feedback not found !',
        status: status.NOT_FOUND,
      });
    }

    await UserFeedback.destroy({ where: { id: id } });

    res.status(status.OK).json({
      message: 'Feedback Deleted',
      status: status.OK,
    });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});
module.exports = router;
