class Config {
    public static serverUrl: string;

    public static _initialize() {
    if (process.env.NODE_ENV === "production") {
      Config.serverUrl = "https://code-blocks-page-by-raz.herokuapp.com";
    
    } else {
      Config.serverUrl = "http://localhost:3001";
    }

}
public url = Config.serverUrl;
}

Config._initialize();
const appConfig = new Config(); // Singleton

export default appConfig;
