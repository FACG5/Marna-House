
exports.get = (req, res) => {
  res.render('admin_login', {
    style: ['login'],
    title: 'Admin login',
    Header: false,
    Footer: false,
    home_page: false,
  });
};
