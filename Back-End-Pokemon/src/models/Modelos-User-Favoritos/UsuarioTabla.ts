import { Model, DataTypes, Association, Sequelize } from "sequelize";
import { sequelize } from "../../DB";
import Favorito from "./FavoritoTable";
import { UserAttributes, Favoritos } from "../../Interface/InterfaceAll";
import {
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
} from "sequelize";
import { Pokemon } from "../Modelos-Pokemon-Type/Tablas-Pokemon-Types";

class User extends Model<UserAttributes> implements UserAttributes {
  public id?: number;
  public name!: string;
  public email!: string;
  public password!: string;

  // metodos que nos da sequelize para la relacion muchos a muchos:
  public getPokemons!: BelongsToManyGetAssociationsMixin<Pokemon>;
  public getFavoritos!: BelongsToManyGetAssociationsMixin<Favorito>;
  public addFavorito!: BelongsToManyAddAssociationMixin<Favoritos, number>;
  public removeFavorito!: BelongsToManyRemoveAssociationMixin<Favorito, number>;
  public setFavoritos!: BelongsToManySetAssociationsMixin<Favorito, number>;
  public hasFavorito!: BelongsToManyHasAssociationMixin<Favorito, number>;
  public hasPokemon!: BelongsToManyHasAssociationMixin<Pokemon, number>;
  public addPokemon!: BelongsToManyAddAssociationMixin<Pokemon, number>;

  static associate() {
    User.belongsToMany(Favorito, {
      through: "UserFavorito",
      as: "favoritos",
      foreignKey: "userId",
      otherKey: "favoritoId",
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "User",
    timestamps: false,
  }
);

export default User;
User.associate(); // Llamada al método associate para configurar la asociación Es Es para que pueda funcionar.
