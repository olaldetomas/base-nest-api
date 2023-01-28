#!/bin/bash
docker-compose -f "docker-compose.yml" --env-file dev.env down --rmi local 