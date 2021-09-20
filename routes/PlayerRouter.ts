import { Opine, pathJoin, Router } from "../deps.ts";
import { PlayerController } from "../controllers/PlayerController.ts";

export abstract class PlayerRouter {
  /**
   * Registers the routes for this resource in the app server.
   * @param app 
   */
  static registerRoutes(app: Opine, basePath: string) {
    const router = new Router();

    router.post("/", PlayerController.addPlayer);
    router.get("/:id", PlayerController.getPlayer);
    router.get("/", PlayerController.listPlayer);
    router.put("/:id", PlayerController.putPlayer);
    router.patch("/:id", PlayerController.patchPlayer);
    router.delete("/:id", PlayerController.deletePlayer);

    const path = pathJoin(basePath, 'players');
    app.use(path, router);
  }
}
