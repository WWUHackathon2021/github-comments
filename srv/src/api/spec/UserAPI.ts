import Profile from "../types/Profile";

export default interface UserAPI {
  getUser(id: string): Promise<Profile | undefined>;
  createUser(profile: Profile): Promise<void>;
}
