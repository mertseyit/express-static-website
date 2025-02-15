const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
//middlewares
const flashMessageMiddleware = require('./middlewares/flashMessagesMiddleware');
const userAuthMiddleware = require('./middlewares/userAuthMiddleware');
//routes
const indexRouter = require('./routes/index.route');
const aboutRouter = require('./routes/about.route');
const servicesRouter = require('./routes/testimonial.route');
const portfolioRouter = require('./routes/portfolio.route');
const blogRouter = require('./routes/blog.route');
const contactRouter = require('./routes/contact.route');
//admin routes
const adminIndexRouter = require('./routes/admin/index.route');
const adminBlogsRouter = require('./routes/admin/blogs.route');
const adminTestimonialsRoute = require('./routes/admin/testimonials.route');
const adminPortfoliosRoute = require('./routes/admin/portfolios.rotue');
const adminFeedbacksRoute = require('./routes/admin/feedbacks.route');
const adminSigninRoute = require('./routes/admin/signin.route');
const adminSignupRoute = require('./routes/admin/signup.route');
const adminLogoutRoute = require('./routes/admin/logout.route');
const adminVerifyEmailRoute = require('./routes/admin/verify-email.route');
const adminProfileRoute = require('./routes/admin/profile.route');
const adminLogsRoute = require('./routes/admin/logs.route');
const sequelize = require('./database/db');
const app = express();

app.enabled('trust proxy', true);
app.use(cors());
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//view engine and static file setup setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
// console.log(path.join(__dirname, 'public'));
app.use('/admin', express.static(path.join(__dirname, 'public')));
//session and flash message setup
app.use(
  session({
    secret: `${process.env.SESSION_SECRET_KEY}`,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(flashMessageMiddleware);
//all routes
app.use(indexRouter);
app.use(aboutRouter);
app.use(servicesRouter);
app.use(portfolioRouter);
app.use(blogRouter);
app.use(contactRouter);
//admin routes
app.use('/admin/home', userAuthMiddleware, adminIndexRouter);
app.use('/admin/blogs', userAuthMiddleware, adminBlogsRouter);
app.use('/admin/testimonials', userAuthMiddleware, adminTestimonialsRoute);
app.use('/admin/portfolios', userAuthMiddleware, adminPortfoliosRoute);
app.use('/admin/feedbacks', userAuthMiddleware, adminFeedbacksRoute);
app.use('/admin/profile', userAuthMiddleware, adminProfileRoute);
app.use('/admin/logs', userAuthMiddleware, adminLogsRoute);
app.use('/admin/signin', adminSigninRoute);
app.use('/admin/signup', adminSignupRoute);
app.use('/admin/auth', adminVerifyEmailRoute);
app.use('/admin/logout', userAuthMiddleware, adminLogoutRoute);

app.use('/*', (req, res, next) => {
  res.status(404).render('404', {
    title: '404 - Page Not Found',
    description: 'Page not Found',
    keywords: 'Page not Found',
  });
});

//basic global error handler
app.use((err, req, res, next) => {
  res.status(500).render('error', {
    msg: err.message,
  });
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection Success !');
    app.listen(process.env.API_PORT, () => {
      console.log(
        `server running on http://${process.env.API_HOST}:${process.env.API_PORT}`
      );
    });
  } catch (error) {
    console.error('Connection Failed::.', error);
  }
})();
