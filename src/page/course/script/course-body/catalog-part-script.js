import $ from 'jquery';

function changeIsGiveStarsActive() {
  const giveStars = $('.give-stars'), labels = $('.give-stars label');
  labels.on('click', () => {
    const classList = giveStars.attr('class').split(" ");
    if (classList.indexOf('active') === -1) giveStars.addClass('active');
  });
}

export {
  changeIsGiveStarsActive
}
