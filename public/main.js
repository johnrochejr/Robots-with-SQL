const url = '/info';

console.log('loaded script');

document.querySelector('#deleteButton').addEventListener('click', function() {
  let id = this.getAttribute('data-id');
  let _url = `${url}/${id}`;
  fetch(_url, { method: 'delete' }).then(res => res.json()).then(json => {
    window.location = '/';
  });
});
