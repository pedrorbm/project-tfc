import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '..';
import TeamSequelize from '../teams/TeamSequelize';

class MatchSequelize extends Model<InferAttributes<MatchSequelize>,
InferCreationAttributes<MatchSequelize>> {
  declare id: CreationOptional<number>;

  declare homeTeamId: number;

  declare homeTeamGoals: number;

  declare awayTeamId: number;

  declare awayTeamGoals: number;

  declare inProgress: boolean;
}

MatchSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

MatchSequelize.belongsTo(TeamSequelize, { foreignKey: 'homeTeamId', as: 'homeTeam' });

MatchSequelize.belongsTo(TeamSequelize, { foreignKey: 'awayTeamId', as: 'awayTeam' });

TeamSequelize.hasMany(MatchSequelize, { foreignKey: 'homeTeamId' });

TeamSequelize.hasMany(MatchSequelize, { foreignKey: 'awayTeamId' });

export default MatchSequelize;
