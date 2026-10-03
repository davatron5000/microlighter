From Coq Require Import ssreflect.

(* ensure proofs are well-structured *)
Set Default Goal Selector "!".
#[global] Open Scope general_if_scope.

Module list_playground.
  (* Let's do a typical proof by induction: we'll define [list] as an inductive,
     [app] (list append) as a recursive function, and prove that [app] is
     associative. *)
  Inductive list (A: Type) :=
  | nil
  | cons (x: A) (l: list A).

  (* Fix up implicit arguments. *)
  Arguments nil {A}.
  Arguments cons {A} x l.
  Notation "[]" := nil.
  Infix "::" := cons.

  Fixpoint app {A} (l1 l2: list A): list A :=
    match l1 with
    | [] => l2
    | x :: l1 => x :: app l1 l2
    end.

  Infix "++" := app.

  Theorem app_assoc {A} (l1 l2 l3: list A) :
    (l1 ++ l2) ++ l3 = l1 ++ (l2 ++ l3).
  Proof.
    induction l1 as [|x l1]; simpl.
    - reflexivity.
    - by rewrite IHl1.
  Qed.
End list_playground.
