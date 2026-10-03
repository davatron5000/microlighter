(with-test (:name :aprof-instance :skipped-on (not :immobile-space))
  (let (seen-this seen-that)
    (dolist (line (split-string
                   (with-output-to-string (s)
                     (sb-aprof:aprof-run #'make-structs :stream s))
                   #\newline))
      (when (search "THIS-STRUCT" line) (setq seen-this t))
      (when (search "THAT-STRUCT" line) (setq seen-that t)))
    (assert (and seen-this seen-that))))

(defun my-list (&rest x)
  (declare (optimize sb-c::instrument-consing))
  x)
(compile 'my-list)

#+nil
(let ((l (sb-impl::%hash-table-alist sb-c::*checkgen-used-types*)))
  (format t "~&Types needed by checkgen: ('+' = has internal error number)~%")
  (setq l (sort l #'> :key #'cadr))
  (loop for (type-spec . (count . interr-p)) in l
        do (format t "~:[ ~;+~] ~5D ~S~%" interr-p count type-spec))
  (format t "~&Error numbers not used by checkgen:~%")
  (loop for (spec symbol) across sb-c:+backend-internal-errors+
        when (and (not (stringp spec))
                  (not (gethash spec sb-c::*checkgen-used-types*)))
          do (format t "       ~S~%" spec)))

;; From https://github.com/qingpeng9802/vscode-common-lisp/blob/master/syntaxes/fixtures/cases/demo.lsp
