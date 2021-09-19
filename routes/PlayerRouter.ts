import { Opine, Router } from "../deps.ts";
import { PlayerController } from "../controllers/PlayerController.ts";

export abstract class PlayerRouter {
  static loadRoutes(app: Opine) {
    const router = new Router();

    router.post("/", PlayerController.addPlayer);
    router.get("/:id", PlayerController.getPlayer);
    router.get("/", PlayerController.listPlayer);
    router.put("/:id", PlayerController.putPlayer);
    router.patch("/:id", PlayerController.patchPlayer);
    router.delete("/:id", PlayerController.deletePlayer);

    app.use("/players", router);
  }
}
