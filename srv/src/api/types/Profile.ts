export default interface Profile {
  id: string;
  avatarURL?: string;
  username: string;
  realName: string;
}

export const defaultUser: Profile = {
  id: "1",
  avatarURL: "https://avatars.githubusercontent.com/u/8534300?v=4",
  username: "tkaden4",
  realName: "Kaden Thomas",
};
