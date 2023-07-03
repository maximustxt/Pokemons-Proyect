import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../DB";
import Favorito from "./FavoritoTable";
import User from "./UsuarioTabla";

class UserFavorito extends Model {
  public id!: number;
  public userId!: number;
  public favoritoId!: number;
}

UserFavorito.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    favoritoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "User_Favoritos",
    sequelize, // instancia de Sequelize
    timestamps: false,
  }
);

User.belongsToMany(Favorito, { through: UserFavorito, foreignKey: "userId" });
Favorito.belongsToMany(User, {
  through: UserFavorito,
  foreignKey: "favoritoId",
});

export default UserFavorito;
