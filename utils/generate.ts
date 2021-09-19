import { lowerFirst, upperFirst } from "./generics.ts";
// 
// Deno script to call from command line for the generation of controllers, 
// services and models from templates.
//
const componentType = Deno.args[0];
const name = Deno.args[1];
const pathToFolder = Deno.args[2];
const fileName = `${upperFirst(name)}${componentType !== 'model' ? upperFirst(componentType) : ''}`;

console.info(`Creating ${componentType} named ${fileName} into folder ${pathToFolder}`);

switch(componentType) {
  case 'controller':
    generateController(name, pathToFolder);
    break;
  case 'model':
    generateModel(name, pathToFolder);
    break;
  case 'service':
    generateService(name, pathToFolder);
    break;
  default:
    console.error('The component you\'re requesting to create is not supported');
}


async function generateController(name: string, pathToFolder: string) {
  const capitalizedName = upperFirst(name);
  const controllerTemplate = `
    import { Request, Response } from "../deps.ts";
    import { Controller, CreatedResponse, UpdatedResponse } from "./Controller.ts";
    import { ${capitalizedName}Service } from "../services/${capitalizedName}Service.ts";
    import { ${capitalizedName}Schema, ${capitalizedName} } from "../models/${capitalizedName}.ts";
    import { ValidatorFactory } from "../utils/ValidatorFactory.ts";

    export abstract class ${capitalizedName}Controller {
      static className = "${lowerFirst(name)}Controller";

      static async add${capitalizedName}(request: Request, response: Response<CreatedResponse>) {
        await Controller.handleRequest(
          request,
          response,
          ${capitalizedName}Service.add${capitalizedName},
          ${capitalizedName}.validator,
        );
      }

      static async get${capitalizedName}(request: Request, response: Response<${capitalizedName}Schema>) {
        await Controller.handleRequest(
          request,
          response,
          ${capitalizedName}Service.get${capitalizedName},
          ValidatorFactory.buildGetValidator(),
        );
      }

      static async list${capitalizedName}(request: Request, response: Response<${capitalizedName}Schema[]>) {
        await Controller.handleRequest(
          request,
          response,
          ${capitalizedName}Service.list${capitalizedName},
          ValidatorFactory.buildListValidator(),
        );
      }

      static async put${capitalizedName}(request: Request, response: Response<UpdatedResponse>) {
        await Controller.handleRequest(
          request,
          response,
          ${capitalizedName}Service.update${capitalizedName},
          ValidatorFactory.buildUpdateValidator(${capitalizedName}),
        );
      }

      static async patch${capitalizedName}(request: Request, response: Response<UpdatedResponse>) {
        await Controller.handleRequest(
          request,
          response,
          ${capitalizedName}Service.update${capitalizedName},
          ValidatorFactory.buildPatchValidator(${capitalizedName}),
        );
      }

      static async delete${capitalizedName}(request: Request, response: Response<UpdatedResponse>) {
        await Controller.handleRequest(
          request,
          response,
          ${capitalizedName}Service.delete${capitalizedName},
          ValidatorFactory.buildDeleteValidator(),
        );
      }

    }
  `;
  await Deno.writeTextFile(`${pathToFolder}/${capitalizedName}Controller.ts`, controllerTemplate);
}

async function generateService(name: string, pathToFolder: string) {
  const capitalizedName = upperFirst(name);
  const serviceTemplate = `
    import { Values } from "../deps.ts";
    import { ModelFetcher } from "../utils/ModelFetcher.ts";
    import { ListParams } from "../utils/ValidatorFactory.ts";
    import { ${capitalizedName}, ${capitalizedName}Schema } from "../models/${capitalizedName}.ts";
    
    interface update${capitalizedName}Schema extends ${capitalizedName}Schema {
      id: number;
    }
    
    export abstract class ${capitalizedName}Service {
      static add${capitalizedName}(body: ${capitalizedName}Schema) {
        return ${capitalizedName}.create([body as Values]);
      }
    
      static get${capitalizedName}({ id }: { id: number }) {
        return ModelFetcher.fetchById(${capitalizedName}, id);
      }
    
      static list${capitalizedName}(params: ListParams) {
        return ModelFetcher.fetchList(${capitalizedName}, params);
      }
    
      static update${capitalizedName}({id, ...body}: update${capitalizedName}Schema ) {
        const data = body as ${capitalizedName}Schema as Values;
        return ${capitalizedName}.where("id", id).update(data);
      }
    
      static delete${capitalizedName}({id}: {id:number}) {
        return ${capitalizedName}.where('id', id).delete();
      }
    }
  `;
  await Deno.writeTextFile(`${pathToFolder}/${capitalizedName}Service.ts`, serviceTemplate);
}

async function generateModel(name: string, pathToFolder: string) {
  const capitalizedName = upperFirst(name);
  const modelTemplate = `
    import { DataTypes, Model, number, Schema, string, Type } from "../deps.ts";

    /**
     * ${capitalizedName} model represents...
     *   @property name: string | undefined;
     */
    export class ${capitalizedName} extends Model {
      static table = "${lowerFirst(name)}s";
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
      };
      static defaults = {
        name: "Anonymous",
      };
      static schema = {
        name: string.trim().normalize().between(3, 40).optional(),
      };
      static validator = Schema(${capitalizedName}.schema).destruct();
    }
    
    /**
     * Type for ${capitalizedName} resource
     */
    export type ${capitalizedName}Schema = Type<typeof ${capitalizedName}.schema>;
  `;
  await Deno.writeTextFile(`${pathToFolder}/${capitalizedName}.ts`, modelTemplate);
}