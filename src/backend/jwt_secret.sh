#!/bin/bash

$JWT_SECRET=$(openssl rand -hex 32)
# Check if the JWT_SECRET environment variable is set
if grep -q "^JWT_SECRET=" ./.env; then
    sed -i "s/^JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" ./.env
else
    echo "JWT_SECRET=$JWT_SECRET" >> ./.env
fi

