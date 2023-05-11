class HomeController {
  async homePage(req, res, next) {
    try {
      return res.render('home.ejs');
    } catch (err) {
      next(err);
    }
  }

  async aboutPage(req, res, next) {
    try {
      return res.render('about.ejs');
    } catch (err) {
      next(err);
    }
  }
}

export default new HomeController();
