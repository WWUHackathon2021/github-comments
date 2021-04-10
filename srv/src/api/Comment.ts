export default interface Comment {
  id: number;
  parent: number;
  created: string;
  content: string;
  fullname: string;
  profilePictureURL: string;
  upvoteCount: number;
  userHasUpvoted: number;
}
