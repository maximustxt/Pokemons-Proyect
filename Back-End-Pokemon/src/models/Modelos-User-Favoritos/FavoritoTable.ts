import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../DB";
import User from "./UsuarioTabla";

class Favorito extends Model {
  public name!: string;
  public id!: number | string;
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
  public types!: [{ type: { name: string } }];

  static associate() {
    Favorito.belongsToMany(User, {
      through: "UserFavorito",
      as: "usuarios",
      foreignKey: "favoritoId",
      otherKey: "userId",
    });
  }
}

Favorito.init(
  {
    id: {
      type: DataTypes.STRING, // Utiliza DataTypes.STRING para admitir números y cadenas de texto como ID
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sprites: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    types: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Favorito",
    timestamps: false,
  }
);

export default Favorito;
// Favorito.associate();
