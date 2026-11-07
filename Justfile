set dotenv-load
set positional-arguments

# List Tasks
default:
    just --list

# Runs the Development-Kit Container
dkc:
    docker pull ghcr.io/leoborai/dkc:latest
    docker run -it --rm \
        -v $(pwd):/app \
        -w /app \
        ghcr.io/leoborai/dkc:latest

# Format all files (auto-fix)
fmt:
    bun run format

# Check formatting and lint rules (no changes)
lint:
    bun run lint

# Type-check Svelte and TypeScript
check:
    bun run check

# Run everything CI runs: lint, type-check and build
ci: lint check
    bun run build
