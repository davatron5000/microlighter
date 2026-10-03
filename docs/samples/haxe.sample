// Game.hx
class Game {
  // Haxe applications have a static entry point called main
  static function main() {
    // Anonymous structures.
    var playerA = { name: "Simon", move: Paper }
    var playerB = { name: "Nicolas", move: Rock }

    // Array pattern matching. A switch can return a value.
    var result = switch [playerA.move, playerB.move] {
      case [Rock, Scissors] |
           [Paper, Rock] |
           [Scissors, Paper]: Winner(playerA);

      case [Rock, Paper] |
           [Paper, Scissors] |
           [Scissors, Rock]: Winner(playerB);

      case _: Draw;
    }
    // Paper vs Rock, who wins?
    trace('result: $result');
  }
}

// Allow anonymous structure named as type.
typedef Player = { name: String, move: Move }

// Define multiple enum values.
enum Move { Rock; Paper; Scissors; }

// Enums in Haxe are algebraic data type (ADT), so they can hold data.
enum Result {
  Winner(player:Player);
  Draw;
}

// From https://haxe.org/
