;; Sample: read the state of the keyboard and move the player accordingly
(local dirs {:up [0 -1] :down [0 1] :left [-1 0] :right [1 0]})

(each [key [dx dy] (pairs dirs)]
  (when (love.keyboard.isDown key)
    (let [[px py] player
          x (+ px (* dx player.speed dt))
          y (+ py (* dy player.speed dt))]
      (world:move player x y))))

;; From https://fennel-lang.org/
