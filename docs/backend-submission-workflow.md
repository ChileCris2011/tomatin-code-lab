# Backend submission workflow handoff

Frontend now treats `student_progress.status` as the submission lock:

- `awaiting_review`: locked. The student has one active submitted answer waiting for mentor review.
- `approved`: locked. The assignment is complete.
- `changes_requested`: unlocked. The mentor feedback asks the student to revise and submit again.
- `not_started` and `in_progress`: unlocked.

Backend changes still needed:

1. Enforce this lock in `submit-code` before inserting a `submit` attempt or syncing to GitHub. Reject student submissions for assigned exercises when progress is `awaiting_review` or `approved`.
2. Use a transactional row lock on the matching `student_progress` row so two tabs cannot submit the same assignment concurrently.
3. Keep allowing `run` attempts while locked, but do not let runs move locked progress back to an editable state.
4. When a passing submit is accepted, update progress to `awaiting_review` in the same guarded transaction.
5. Consider adding `student_progress.submitted_attempt_id` pointing at the active submitted attempt. The review queue currently derives the active attempt from the latest submit attempt; an explicit pointer would make mentor reviews deterministic even if old duplicate data exists.
6. Keep `review_submission(..., p_decision => 'changes_requested')` as the unlock path. It already records feedback and moves progress to `changes_requested`.

Suggested rejection copy for the edge function:

- `awaiting_review`: `Tu entrega ya esta esperando revision del mentor.`
- `approved`: `Esta tarea ya fue aprobada.`
