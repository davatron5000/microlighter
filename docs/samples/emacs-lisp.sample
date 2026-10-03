;;; cdl.el --- Common Data Language (CDL) utility functions for GNU Emacs -*- lexical-binding: t -*-

;; Copyright (C) 1993, 2001-2024 Free Software Foundation, Inc.

;; Author: Ata Etemadi <ATAE@spva.physics.imperial.ac.uk>
;; Maintainer: emacs-devel@gnu.org
;; Keywords: data

;;; Commentary:

;;; Code:

(defun cdl-get-file (filename)
  "Run file through ncdump and insert result into buffer after point."
  (interactive "fCDF file: ")
  (message "ncdump in progress...")
  (let ((start (point)))
    (call-process  "ncdump" nil t nil (expand-file-name filename))
    (goto-char start))
  (message "ncdump in progress...done"))

(defun cdl-put-region (filename start end)
  "Run region through ncgen and write results into a file."
  (interactive "FNew CDF file: \nr")
  (message "ncgen in progress...")
  (call-process-region start end "ncgen"
                       nil nil nil "-o" (expand-file-name filename))
  (message "ncgen in progress...done"))

(provide 'cdl)

;;; cdl.el ends here

;; From https://git.savannah.gnu.org/cgit/emacs.git/tree/lisp/cdl.el
