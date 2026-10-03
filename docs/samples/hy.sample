(setv foobar (+ 2 2))
(setv [tim eric] ["jim" "derrick"])
(setv  alpha "a"  beta "b")

(sorted "abcBC"
  :key (fn [x] (.lower x)))

(defn test [a b [c "x"] #* d]
  [a b c d])

(with [o (open "file.txt" "rt")]
  (setv buffer [])
  (while (< (len buffer) 10)
    (.append buffer (next o))))

(lfor
  x (range 3)
  y (range 3)
  :if (= (+ x y) 3)
  (* x y))

(defmacro do-while [test #* body]
  `(do
    ~@body
    (while ~test
      ~@body)))

(setv x 0)
(do-while x
  (print "Printed once."))

;; From https://hylang.org/
