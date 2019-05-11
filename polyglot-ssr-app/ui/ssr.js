const { render } = require('./dist/server.js');

module.exports = async () => {
  const html = await render();
  return html;
}
