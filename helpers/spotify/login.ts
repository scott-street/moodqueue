import { UserInfo } from '../../types/UserInfo';

export class SpotifyHelper {
  /**
   * generates a random string of a certain length
   * @param length
   */
  static generateRandomString = (length: number) => {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  /**
   * redirect user to spotify's login service
   *
   * also
   * there has to be a better way to do this than force changing the url
   */
  static openSpotifyAccountLogin = () => {
    const rand = SpotifyHelper.generateRandomString(16);
    const redirect_uri = 'http://localhost:3000/api/login';
    const scopes =
      'user-read-private user-read-email user-modify-playback-state playlist-modify-private playlist-modify-public user-library-read';
    //make sure to change show_dialog to false if we don't want to show the spotify login redirect anymore
    const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&scope=${scopes}&redirect_uri=${redirect_uri}&state=${rand}&show_dialog=true`;
    window.location.href = url;
  };

  /**
   * retrieves the user profile of the currently signed in user
   */
  static getUserInfo = async (accessToken: string) => {
    let newUser: UserInfo = {
      id: '',
      name: '',
      email: '',
      profileImages: [],
      profileUrl: ''
    };
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      },
      method: 'GET'
    });
    const data = await response.json();
    newUser = {
      id: data.id,
      name: data.display_name,
      email: data.email,
      profileImages: data.images,
      profileUrl: data.external_urls.spotify
    };

    return newUser;
  };
}
