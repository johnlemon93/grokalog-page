import config from '../../../config.json';

export default {
  getAll(postSlug, handleLoaded, handleAdded) {
    fetch(`${config.apiBaseUrl}/posts/${postSlug}/comments`)
      .then (res => res.json())
      .then(res => {
        handleLoaded();
        res.data.forEach(cmt => handleAdded(cmt));
      })
      .catch(err => console.error(err));
  },

  create(postSlug, data, handleLoaded, handleAdded) {
    fetch(`${config.apiBaseUrl}/posts/${postSlug}/comments`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        handleLoaded();
        handleAdded(res);
      })
      .catch(err => console.error(err));
  },
};
