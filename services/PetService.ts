import { Values } from "../deps.ts";
import { fetchById, fetchList } from "../logic/basics.ts";
import { ListParams } from "../logic/ValidatorFactory.ts";
import { Pet, IPet } from "../models/Pet.ts";

interface IUpdatePet extends IPet {
  id: number;
}

export class PetService {
  static addPet(body: IPet) {
    return Pet.create([body as Values]);
  }

  static getPet({ id }: { id: number }) {
    return fetchById(Pet, id);
  }

  static listPet(params: ListParams) {
    return fetchList(Pet, params);
  }

  static updatePet({id, ...body}: IUpdatePet ) {
    const data = body as IPet as Values;
    return Pet.where("id", id).update(data);
  }

  static deletePet({id}: {id:number}) {
    return Pet.where('id', id).delete();
  }
}
