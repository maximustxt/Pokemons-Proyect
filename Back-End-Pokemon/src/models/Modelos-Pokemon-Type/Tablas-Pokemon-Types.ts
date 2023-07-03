import {
  Model,
  DataTypes,
  BelongsToManyGetAssociationsMixin,
  BelongsToManySetAssociationsMixin,
} from "sequelize";
import User from "../Modelos-User-Favoritos/UsuarioTabla";
import { sequelize } from "../../DB";

class Pokemon extends Model {
  public id!: number;
  public name!: string;
  public sprites!: {
    back_default: string;
    front_default: string;
    back_shiny: string;
    front_shiny: string;
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  public abilities!: [{ ability: { name: string } }];
  public stats!: [{ base_stat: number; stat: { name: string } }];
  public height!: string;
  public weight!: string;
  public species!: { name: string };
  public Types!: [{ name: string }];

  public getTypes!: BelongsToManyGetAssociationsMixin<Type>;
  public setTypes!: BelongsToManySetAssociationsMixin<Type, number>;

  // Otras propiedades o métodos que puedas necesitar

  // Esta función personalizada te permite agregar tipos relacionados al crear un nuevo pokémon
  public addType = async (types: Type[]): Promise<void> => {
    await this.setTypes(types);
  };
}

Pokemon.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    abilities: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    stats: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    species: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    sprites: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },

  {
    sequelize,
    modelName: "Pokemon",
    tableName: "pokemons",
    timestamps: false, // Excluir las columnas de fecha
  }
);

class Type extends Model {
  public id!: number;
  public name!: string;

  // Otras propiedades o métodos que puedas necesitar
}
Type.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Type",
    tableName: "types",
    timestamps: false, // Excluir las columnas de fecha
  }
);

class Abilitie extends Model {
  public id!: number;
  public name!: string;
  public base_stat!: number;
}

Abilitie.init(
  // no es necesario hacer relacion muchos a muchos directamente debo guardar todos los stats y ponerle un porsentaje.
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Abilitie",
    tableName: "abilitie",
    timestamps: false, // Excluir las columnas de fecha
  }
);

// Definir la relación muchos a muchos entre los modelos Pokemon y Type
Pokemon.belongsToMany(Type, { through: "PokemonType" });
Type.belongsToMany(Pokemon, { through: "PokemonType" });

//  Muchos a Muchos con User y Pokemons creados:
Pokemon.belongsToMany(User, { through: "PokemonUser" });
User.belongsToMany(Pokemon, { through: "PokemonUser" });

export { Pokemon, Type, Abilitie };
