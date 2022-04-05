type ModelTypeName<ModelType> = ModelType extends string
  ? 'string'
  : ModelType extends number
  ? 'number'
  : ModelType extends boolean
  ? 'boolean'
  : never;

type ModelDefinition<ModelAttrs extends Sails.BaseModelAttrs> = {
  attributes: {
    [ModelAttrName in keyof ModelAttrs]:
      | {
          type?: ModelTypeName<ModelAttrs[ModelAttrName]>;
          required?: boolean;
          allowNull?: true;
          defaultsTo?: ModelAttrs[ModelAttrName];
          isIn?: Array<ModelAttrs[ModelAttrName]>;
          model?: never;
          collection?: never;
          via?: never;
        }
      | {
          type?: never;
          required?: never;
          allowNull?: never;
          defaultsTo?: never;
          isIn?: never;
          model?: string;
          collection?: never;
          via?: never;
        }
      | {
          type?: never;
          required?: never;
          allowNull?: never;
          defaultsTo?: never;
          isIn?: never;
          model?: never;
          collection?: string;
          via?: string;
        };
  };
};

type Game = unknown;
type Card = unknown;
type Hand = Card[];

type UserModelAttrs = {
  username: string;
  encryptedPassword: string;
  game?: Game;
  pNum?: 0 | 1;
  hand?: Hand;
  points?: Card[];
  faceCards?: Card[];
  frozenId?: Card;
  rank?: number;
};

/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

const UserModel: ModelDefinition<UserModelAttrs> = {
  attributes: {
    username: {
      type: 'string',
      required: true,
    },
    encryptedPassword: {
      type: 'string',
      required: true,
    },
    game: {
      model: 'game',
    },
    /**
     * Index of this user within a Game's players collection
     * @value null iff not in game
     * @value 0 or 1 if player 0 or player 1, respectively
     */
    pNum: {
      type: 'number',
      allowNull: true,
      isIn: [0, 1],
    },
    hand: {
      collection: 'card',
      via: 'hand',
    },
    points: {
      collection: 'card',
      via: 'points',
    },
    faceCards: {
      collection: 'card',
      via: 'faceCards',
    },
    /**
     * Id of a card in player's hand that cannot be played this turn
     * @value null iff no card is frozen
     */
    frozenId: {
      model: 'card',
    },
    rank: {
      type: 'number',
      defaultsTo: 1000,
    },
  }, // end attributes
}; // end exports

export default UserModel;

declare var User: Sails.Model<UserModelAttrs>;
