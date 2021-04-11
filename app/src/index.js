import axios from "axios";

export function getComments(user, reponame) {
  return axios.get(`http://localhost:8080/comments/${user}/${reponame}`).then((x) => x.data.comments);
}

export function postComment(user, reponame, comment) {
  return axios.post(`http://localhost:8080/comments/${user}/${reponame}/comment`, comment).then((x) => x.data);
}

export function putComment(user, reponame, comment) {
  return axios.put(`http://localhost:8080/comments/${user}/${reponame}/comment`, comment).then((x) => x.data);
}
