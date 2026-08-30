# Bug Record
Bug: two clients could overwrite the same task.
Fix: add `version`; reject stale updates with HTTP 409.
Result: conflicting changes are surfaced instead of silently overwritten.
