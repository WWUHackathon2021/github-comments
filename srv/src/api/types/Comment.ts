export default interface Comment {
  id: number;
  repoID: string;
  parent: number;
  created: string;
  content: string;
  fullname: string;
  profilePictureURL: string;
  upvoteCount: number;
  // userHasUpvoted: number;
}
