import { Values } from "../deps.ts";
import { ModelFetcher } from "../utils/ModelFetcher.ts";
import { ListParams } from "../utils/ValidatorFactory.ts";
import { Player, PlayerSchema } from "../models/Player.ts";

interface updatePlayerSchema extends PlayerSchema {
  id: number;
}

export abstract class PlayerService {
  static addPlayer(body: PlayerSchema) {
    return Player.create([body as Values]);
  }

  static getPlayer({ id }: { id: number }) {
    return ModelFetcher.fetchById(Player, id);
  }

  static listPlayer(params: ListParams) {
    return ModelFetcher.fetchList(Player, params);
  }

  static updatePlayer({id, ...body}: updatePlayerSchema ) {
    const data = body as PlayerSchema as Values;
    return Player.where("id", id).update(data);
  }

  static deletePlayer({id}: {id:number}) {
    return Player.where('id', id).delete();
  }
}