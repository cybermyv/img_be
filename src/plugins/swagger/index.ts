import { IPlugin, IPluginInfo } from "../interfaces";
import * as Hapi from "hapi";

import * as Inert from "inert";
import * as Vision from "vision";



const register = async (server: Hapi.Server): Promise<void> => {
  try {
    return server.register([
      Inert,
      Vision,

      {
        plugin: require("hapi-swagger"),
        options: {
          info: {
            title: "Img Api",
            description: "Api Documentation",
            version: "1.0"
          },
          grouping: 'tags',
          tags: [
            {
              name: "img",
              description: "Api img interface."
            }
          ],
          swaggerUI: true,
          documentationPage: true,
          documentationPath: "/docs"
        }
      }
    ]);
  } catch (err) {
    console.log(`Error registering swagger plugin: ${err}`);
  }
};

export default (): IPlugin => {
  return {
    register,
    info: () => {
      return { name: "Swagger Documentation", version: "1.0.0" };
    }
  };
};