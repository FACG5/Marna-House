exports.get = (req, res) => {
  res.render('home', {
    style: ['home', 'homeHeader', 'general', 'homeFooter'],
    title: 'Home',
    script: 'home',
    sectionType: 'single :',
  });
};
