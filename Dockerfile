# The base image that will have node dep
FROM node:20-alpine

# Set the current working directory in the container
WORKDIR /usr/app

# Copy only two files to the image
COPY package.json package-lock.json ./

# Execute a command while building the container
RUN npm ci \
    apk  --no-cache add curl bash

RUN npm ci && \
    apk  --no-cache add curl bash

RUN apk add curl
# Now copy the project files
COPY . .
# Build the app
RUN npm run build-tsc

HEALTHCHECK --interval=10s --timeout=3s \
    CMD curl -f http://localhost/ || exit 1
# When running the container, execute the following command
CMD ["npm", "run", "dev"]
