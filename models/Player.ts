import { DataTypes, Model, number, Schema, string, Type } from "../deps.ts";

/**
 * Player model represents a sport player.
 *   @property name: string;
 *   @property known_name: string;
 *   @property birth_date: string;
 *   @property country_id: number;
 */
export class Player extends Model {
  static table = "players";
  static timestamps = true;
  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      length: 250,
    },
    known_name: {
      type: DataTypes.STRING,
      length: 250,
    },
    birth_date: {
      type: DataTypes.INTEGER,
    },
    country_id: {
      type: DataTypes.INTEGER,
    },
  };
  static defaults = {
    name: "Anonymous",
  };
  static schema = {
    name: string.trim().normalize().between(3, 250).optional(),
    known_name: string.trim().normalize().between(3, 250).optional(),
    birth_date: string.trim().normalize().optional(),
    country_id: number.gt(0),
  };
  static validator = Schema(Player.schema).destruct();
}

/**
 * Interface for Pet resource
 */
 export type IPlayer = Type<typeof Player.schema>;