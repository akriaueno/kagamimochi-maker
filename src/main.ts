import { GameScene } from "./Scene/GameScene";
import { ResultScene } from "./Scene/ResultScene";

function main(param: g.GameMainParameterObject): void {
  const gameScene = new GameScene({ game: g.game });
  g.game.pushScene(gameScene);
  // const resultScene = new ResultScene({ game: g.game });
  // g.game.pushScene(resultScene);
}

export = main;
