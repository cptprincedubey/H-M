const resetPassTemplate = (username, resetlink) => {
  return `
    <div>
        <h1>Hello ${username}</h1>
        <p>Your reset password link is <a href="${resetlink}">here</a></p>
    </div>
    `;
};

module.exports = resetPassTemplate;
