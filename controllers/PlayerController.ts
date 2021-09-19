import { Request, Response } from "../deps.ts";
import { Controller, CreatedResponse, UpdatedResponse } from "./Controller.ts";
import { PlayerService } from "../services/PlayerService.ts";
import { PlayerSchema, Player } from "../models/Player.ts";
import { ValidatorFactory } from "../utils/ValidatorFactory.ts";

export abstract class PlayerController {
  static className = "playerController";

  static async addPlayer(request: Request, response: Response<CreatedResponse>) {
    await Controller.handleRequest(
      request,
      response,
      PlayerService.addPlayer,
      Player.validator,
    );
  }

  static async getPlayer(request: Request, response: Response<PlayerSchema>) {
    await Controller.handleRequest(
      request,
      response,
      PlayerService.getPlayer,
      ValidatorFactory.buildGetValidator(),
    );
  }

  static async listPlayer(request: Request, response: Response<PlayerSchema[]>) {
    await Controller.handleRequest(
      request,
      response,
      PlayerService.listPlayer,
      ValidatorFactory.buildListValidator(),
    );
  }

  static async putPlayer(request: Request, response: Response<UpdatedResponse>) {
    await Controller.handleRequest(
      request,
      response,
      PlayerService.updatePlayer,
      ValidatorFactory.buildUpdateValidator(Player),
    );
  }

  static async patchPlayer(request: Request, response: Response<UpdatedResponse>) {
    await Controller.handleRequest(
      request,
      response,
      PlayerService.updatePlayer,
      ValidatorFactory.buildPatchValidator(Player),
    );
  }

  static async deletePlayer(request: Request, response: Response<UpdatedResponse>) {
    await Controller.handleRequest(
      request,
      response,
      PlayerService.deletePlayer,
      ValidatorFactory.buildDeleteValidator(),
    );
  }

}