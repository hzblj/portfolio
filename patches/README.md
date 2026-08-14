# patches

Applied by `patch-package` from `postinstall`. Each one is a stopgap: when a
release carries the fix, delete the patch and bump the dependency.

## metal-fx+1.0.4.patch

Its shared WebGL renderer poisons its own replacement on teardown — the
`webglcontextlost` event from `loseContext()` lands a task later, by which time
a remount has built a new renderer, and the stale listener marks *that* one as
lost. The frame loop stops on the next tick and every card after the first mount
in a document comes up with no metal on it. On this site that is `/ico`, reached
from the dock without a page load.

Upstream: https://github.com/Jakubantalik/metal-fx/pull/6
