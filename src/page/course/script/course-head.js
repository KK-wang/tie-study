import $ from 'jquery';

function collection() {
  const collection = $('.collection');
  collection.on('click', () => {
    const classList = collection.attr('class').split(" ");
    if (classList.indexOf('active') !== -1) collection.removeClass('active');
    else collection.addClass('active');
  });
}

export {
  collection
}
