class AppConfig {
}

// Development config:
class DevelopmentConfig extends AppConfig {
  public isDevelopment = true;
  public isProduction = false;
  public port = 3001;
  public frontEndUrl = "http://localhost:3000";
}

// Production config:
class ProductionConfig extends AppConfig {
  public isDevelopment = false;
  public isProduction = true;
}

const appConfig =
  process.env.NODE_ENV === "production"
    ? new ProductionConfig()
    : new DevelopmentConfig();

export default appConfig;