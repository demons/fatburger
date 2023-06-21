const common = {
  host: "db",
  dialect: "postgres",
  timezone: "+00:00",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: `${process.env.DB_PASSWORD}`,
  logging: console.log, // false
  use_env_variable: "",
  define: {
    timestamps: false,
  },
};

module.exports = {
  development: {
    ...common,
  },
  production: {
    ...common,
  },
};
