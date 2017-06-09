class TodoModel {
  constructor(title, completed) {
    this.title = title;
    this.completed = completed || false;
    this.createdAt = Date.now();
    this.results = [];
  }
}

module.exports = TodoModel;
