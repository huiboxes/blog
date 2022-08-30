const strapi = require("@strapi/strapi");
strapi.compile().then((appContext) => strapi(appContext).start());
