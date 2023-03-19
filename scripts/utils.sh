#!/usr/bin/env bash

# https://linuxize.com/post/bash-check-if-file-exists/

# Print the name of the git repository's working tree's root directory
# Search for 'Tom Hale' in http://stackoverflow.com/questions/957928/is-there-a-way-to-get-the-git-root-directory-in-one-command
# Or, shorter:
# (root=$(git rev-parse --git-dir)/ && cd ${root%%/.git/*} && git rev-parse && pwd)
# but this doesn't cover external $GIT_DIRs which are named other than .git
function git_root {
    local root first_commit
    # git displays its own error if not in a repository
    root=$(git rev-parse --show-toplevel) || return
    if [[ -n $root ]]; then
        echo "$root"
        return
    elif [[ $(git rev-parse --is-inside-git-dir) = true ]]; then
        # We're inside the .git directory
        # Store the commit id of the first commit to compare later
        # It's possible that $GIT_DIR points somewhere not inside the repo
        first_commit=$(git rev-list --parents HEAD | tail -1) ||
            echo "$0: Can't get initial commit" 2>&1 && false && return
        root=$(git rev-parse --git-dir)/.. &&
            # subshell so we don't change the user's working directory
            (
                cd "$root" &&
                    if [[ $(git rev-list --parents HEAD | tail -1) = "$first_commit" ]]; then
                        pwd
                    else
                        echo "${FUNCNAME[0]}: git directory is not inside its repository" 2>&1
                        false
                    fi
            )
    else
        echo "${FUNCNAME[0]}: Can't determine repository root" 2>&1
        false
    fi
}

# Change working directory to git repository root
function cd_git_root {
    local root
    root=$(git_root) || return # git_root will print any errors
    cd "$root" || return
}

# changedFiles="$(git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD)"

# checkForChangedFiles() {
#     echo "$changedFiles" | grep --quiet "$1" && eval "$2"
# }

# packageJsonHasChanged() {
#   echo "Changes to package.json detected, installing updates"
#   npm i
# }

# checkForChangedFiles package.json packageJsonHasChanged

################################################################################
# Executes command with a timeout
# Params:
#   $1 timeout in seconds
#   $2 command
# Returns 1 if timed out 0 otherwise
timeout() {
    time=$1
    # start the command in a subshell to avoid problem with pipes
    # (spawn accepts one command)
    command="/bin/sh -c \"$2\""
    expect -c "set echo \"-noecho\"; set timeout $time; spawn -noecho $command; expect timeout { exit 1 } eof { exit 0 }"
    if [ $? = 1 ]; then
        echo "Timeout after ${time} seconds"
    fi
}

loadEnv() {
    if [ -f "$1" ]; then
        set -a; . "$1"; set +a  # export environment variables from "$1" .env file
    else
        echo "You must create a valid .env file in your root directory"
    fi
}
