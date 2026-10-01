#!/usr/bin/env bash
# Publish the Study Hub: sync site/ to S3, invalidate CloudFront, then commit
# & push to git. Used by the design-research / explain-algo / leetcode-notes
# skills as their final "deploy" step whenever a page/subfolder is added/updated.
#
# Usage (run from anywhere):
#   bash site/publish.sh ["optional commit message"]
#
# Idempotent: if nothing changed, the S3 sync is a no-op and the git step
# reports "nothing to commit" and skips the push. The CloudFront invalidation
# always runs so the CDN serves the freshest objects.
set -euo pipefail

BUCKET="aws-payer-migration-ui-poc-900027735101-us-east-2-an"
PROFILE="sansahu"
REGION="us-east-2"
# CloudFront distribution fronting the bucket (origin domain matches $BUCKET).
CF_DIST_ID="EZ262SCDVP6YM"

# Resolve repo root as the parent of this script's directory (…/site).
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SITE_DIR="$SCRIPT_DIR"

MSG="${1:-"Publish study hub update"}"

# --- [0/3] Preflight: ensure AWS SSO credentials are valid, else log in. ---
# `aws sso login` opens a browser and BLOCKS until you approve (or it times
# out), so the deploy waits for your approval and then continues automatically.
echo "==> [0/3] Checking AWS SSO credentials (profile: $PROFILE)"
if aws sts get-caller-identity --profile "$PROFILE" --region "$REGION" >/dev/null 2>&1; then
  echo "    Credentials valid."
else
  echo "    Credentials expired/missing — launching 'aws sso login --profile $PROFILE'."
  echo "    A browser window will open; approve the request, then this will continue."
  aws sso login --profile "$PROFILE"
  # Verify the login actually worked before we try to deploy.
  if ! aws sts get-caller-identity --profile "$PROFILE" --region "$REGION" >/dev/null 2>&1; then
    echo "    ERROR: still not authenticated after 'aws sso login'. Aborting." >&2
    exit 1
  fi
  echo "    Login successful — continuing."
fi

# Rebuild content-level search index before syncing so it always reflects
# the current state of the site. Silently skipped if Node isn't installed.
if command -v node >/dev/null 2>&1; then
  echo "==> [1/3a] Rebuilding search index"
  node "$SITE_DIR/build-search-index.js" || echo "    (search index build failed — continuing)"
else
  echo "==> [1/3a] Node not found — skipping search index rebuild"
fi

echo "==> [1/3] Syncing $SITE_DIR/ to s3://$BUCKET/ (profile: $PROFILE)"
# No --delete: additive by default so we never nuke unrelated bucket objects.
# --exclude the script itself and any VCS noise.
aws s3 sync "$SITE_DIR/" "s3://$BUCKET/" \
  --profile "$PROFILE" \
  --region "$REGION" \
  --exclude ".git/*" \
  --exclude "publish.sh" \
  --exclude "build-search-index.js"
echo "    S3 sync complete."

echo "==> [2/3] Invalidating CloudFront distribution $CF_DIST_ID (/*)"
INVALIDATION_ID="$(aws cloudfront create-invalidation \
  --distribution-id "$CF_DIST_ID" \
  --paths "/*" \
  --profile "$PROFILE" \
  --query "Invalidation.Id" \
  --output text)"
echo "    Invalidation created: $INVALIDATION_ID (clears in ~1-3 min)."

echo "==> [3/3] Committing & pushing to git"
cd "$REPO_ROOT"
git add -A
if git diff --cached --quiet; then
  echo "    Nothing to commit — working tree clean. Skipping push."
else
  git commit -m "$MSG

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
  git push
  echo "    Pushed to $(git rev-parse --abbrev-ref HEAD)."
fi

echo "==> Done."
echo "    Bucket:     s3://$BUCKET/"
echo "    CloudFront: https://d3a6mlhdo7oono.cloudfront.net/"
